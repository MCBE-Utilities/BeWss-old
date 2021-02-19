import { EventEmitter } from 'events'
import Server from '../../node-bewss'

import executeCommand from './executeCommand'

import Agent from './agent'

class commandManager extends EventEmitter {
  private server
  private wsserver
  private logger
  private previousCommand

  constructor(server: Server) {
    super()
    this.server = server
    this.wsserver = this.server.wsserver
    this.logger = this.server.getLogger()
  }

  public async onEnable(): Promise<void>  {
    this.server.getEventManager().registerEvent('SlashCommandExecuted')
    this.wsserver.on('message', (packet) => {
      const pasredPacket = JSON.parse(packet)
      if (pasredPacket.header.messagePurpose != 'commandResponse') return
      this.emit("commandPacket", packet)
    })
  }

  public async onDisable(): Promise<void> {
    this.logger.info('Disabled')
  }

  public getAgentCommands(): Agent {
    return new Agent(this.server)
  }

  public executeCommand(command: string): void {
    new executeCommand(command, this.server)
    this.previousCommand = command
  }

  public getPreviousCommand(): string[] {
    return this.previousCommand
  }

}
export default commandManager
