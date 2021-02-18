import { EventEmitter } from 'events'
import Server from '../../node-mcwss'
import constants from '../constants'
const { events } = constants

import registerEvent from './registerEvent'
import unregisterEvent from './unregisterEvent'

class eventManager extends EventEmitter {
  private server
  private wsserver
  private logger
  private registeredEvents: string[] = []

  constructor(server: Server) {
    super()
    this.server = server
    this.wsserver = this.server.wsserver
    this.logger = this.server.getLogger()
  }

  public onEnable(): void {
    this.wsserver.on('message', (packet) => {
      const pasredPacket = JSON.parse(packet)
      if (pasredPacket.header.messagePurpose != 'event') return
      this.emit("eventPacket", packet)
    })
  }

  public onDisable(): void {
    this.unregisterAllEvents()
  }

  public registerAllEvents(): void {
    if (!this.server) return this.logger.error("No Established Connection To Websocket")
    for (const event of events) {
      this.registeredEvents.push(event)
      new registerEvent(event, this.server)
    }
  }

  public unregisterAllEvents(): void {
    if (!this.server) return this.logger.error("No Established Connection To Websocket")
    for (const event of this.registeredEvents) {
      this.registeredEvents = this.registeredEvents.filter(i => i !== event)
      new unregisterEvent(event, this.server)
    }
  }

  public registerEvent(event: string): void {
    if (!this.server) return this.logger.error("No Established Connection To Websocket")
    if (!events.includes(event)) return this.logger.error(`The event "${event}" doesn't exsist!`)
    if (this.registeredEvents.includes(event)) return this.logger.error(`The event "${event}" is already registered!`)
    this.registeredEvents.push(event)
    new registerEvent(event, this.server)
  }

  public unregisterEvent(event: string): void {
    if (!this.server) return this.logger.error("No Established Connection To Websocket")
    if (!events.includes(event)) return this.logger.error(`The event "${event}" doesn't exsist!`)
    if (!this.registeredEvents.includes(event)) return this.logger.error(`The event "${event}" is not registered!`)
    this.registeredEvents = this.registeredEvents.filter(i => i !== event)
    new unregisterEvent(event, this.server)
  }

  public getRegisteredEvents(): string[] {
    return this.registeredEvents
  }
}
export default eventManager
