/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bewss from '../bewss'
import { EventEmitter } from 'events'
import getFiles from '../util/getFiles'
import { v4 as uuidv4 } from 'uuid'

interface EventValues {
  PlayerMessage: [unknown]
  SlashCommandExecuted: [unknown]
  BlockBroken: [unknown]
  BlockPlaced: [unknown]
  EntitySpawned: [unknown]
  ItemAcquired: [unknown]
  ItemCrafted: [unknown]
  ItemDestroyed: [unknown]
  ItemDropped: [unknown] // Doesnt work
  ItemUsed: [unknown]
  MobInteracted: [unknown]
  MobKilled: [unknown]
  PlayerDied: [unknown]
  PlayerJoin: [unknown] // Doesnt work
  PlayerLeave: [unknown] // Doesnt work
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
  private events = {
    event: new Map(),
  }

  constructor(bewss: bewss) {
    super()
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    await this.setMaxListeners(50)
    await this.loadDefaultEvents()
    this.events.event.forEach((x: any) => {
      x.onEnabled()
    })
  }

  async onDisabled(): Promise<void> {
    this.events.event.forEach((x: any) => {
      x.onDisabled()
    })
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
    const events: any = await getFiles(__dirname + '/events')
    await events.forEach((x: string) => {
      if (x.endsWith('.ts')) return
      const EventClass = require(x)
      const newEvent = new EventClass(this.bewss)
      if (newEvent.eventName == undefined) return this.bewss.getLogger().error('[Events] Your event must contain an eventName!')
      this.events.event.set(newEvent.eventName, newEvent)
    })

    return
  }

}

export default eventManager
