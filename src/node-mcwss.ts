import { EventEmitter } from 'events'
import { Server } from 'ws'
import Logger from './utils/Logger'

import eventManager from './utils/events/eventManager'
import commandManager from './utils/commands/commandManager'

class mcwss extends EventEmitter {
  private wsserver = null
  private logger = null
  private eventManager = null
  private commandManager = null
  private ws: Server

  constructor() {
    super()
    this.logger = new Logger()
  }
  
  public startServer(port: number): void {
    this.ws = new Server({ port })
    this.ws.on('connection', (wsserver) => {
      this.wsserver = wsserver
      this.eventManager = new eventManager(this)
      this.commandManager = new commandManager(this)
      this.onEnable()
      this.emit("ServerConnected", true)
    })
    this.ws.on('close', (wsserver) => {
      this.logger.success(`Disconnected: ${wsserver}`)
      this.onDisable()
    })
    this.logger.info(`WSServer Started! Connect using: /wsserver 127.0.0.1:${port}`)
    this.emit('AwaitingServerConnection', port)
  }

  public onEnable(): void {
    this.logger.info('User Connected!')
    this.eventManager.onEnable()
    this.commandManager.onEnable()
  }

  public onDisable(): void {
    this.logger.info('User Disconnected!')
    this.eventManager.onDisable()
    this.commandManager.onDisable()
  }

  public getEventManager(): eventManager  {
    return this.eventManager
  }
  
  public getCommandManager(): commandManager {
    return this.commandManager
  }

  public getLogger(): Logger {
    return this.logger
  }

}
export default mcwss
