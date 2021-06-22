/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bewss from '../bewss'
import { EventEmitter } from 'events'
import getFiles from '../util/getFiles'
import { v4 as uuidv4 } from 'uuid'
import { EventValues } from '../@interface/bewss.i'
import path from 'path'

interface exampleEvent {
  new(bewss: bewss)
  onEnabled(): Promise<void>
  onDisabled(): Promise<void>
}
interface eventManager {
  new(bewss: bewss)
  onEnabled(): Promise<void>
  onDisabled(): Promise<void>
  registerEvent(event: string): Promise<void>
  unregisterEvent(event: string): Promise<void>
  on<K extends keyof EventValues>(event: K, callback: (...args: EventValues[K]) => void): this
  on<S extends string | symbol>(
    event: Exclude<S, keyof EventValues>,
    callback: (...args: unknown[]) => void,
  ): this
  once<K extends keyof EventValues>(event: K, callback: (...args: EventValues[K]) => void): this
  once<S extends string | symbol>(
    event: Exclude<S, keyof EventValues>,
    callback: (...args: unknown[]) => void,
  ): this
  emit<K extends keyof EventValues>(event: K, ...args: EventValues[K]): boolean
  emit<S extends string | symbol>(
    event: Exclude<S, keyof EventValues>,
    ...args: unknown[]
  ): boolean
}

class eventManager extends EventEmitter {
  private bewss: bewss
  private events =  new Map<string, exampleEvent>()

  constructor(bewss: bewss) {
    super()
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    this.on('wss-connected', async () => {
      this.setMaxListeners(100)
      await this.loadDefaultEvents()
      for (const event of this.events.values()) {
        event.onEnabled()
      }
    })
  }

  async onDisabled(): Promise<void> {
    for (const event of this.events.values()) {
      event.onDisabled()
    }
  }

  async registerEvent(event: string): Promise<void> {
    this.bewss.getServerManager().getServer()
      .send(JSON.stringify(
        {
          "body": {
            "eventName": event,
          },
          "header": {
            "requestId": uuidv4(),
            "messagePurpose": 'subscribe',
            "version": 1,
          },
        },
      ))
  } 

  async unregisterEvent(event: string): Promise<void> {
    this.bewss.getServerManager().getServer()
      .send(JSON.stringify(
        {
          "body": {
            "eventName": event,
          },
          "header": {
            "requestId": uuidv4(),
            "messagePurpose": 'unsubscribe',
            "version": 1,
          },
        },
      ))
  }

  private async loadDefaultEvents(): Promise<void> {
    const eventFiles: string[] = await getFiles(path.resolve(__dirname, 'events'))
    for (const event of eventFiles) {
      if (event.endsWith('.ts')) return
      const EventClass = require(event)
      const newEvent = new EventClass(this.bewss)
      if (newEvent.eventName == undefined) return this.bewss.getLogger().error('[Events] Your event must contain an eventName!')
      this.events.set(newEvent.eventName, newEvent)
    }
  }

}

export default eventManager
