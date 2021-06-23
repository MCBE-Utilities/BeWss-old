/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bewss from "../bewss"
import { v4 as uuidv4 } from 'uuid'
import { commandResponse } from "../@interface/bewss.i"

class commandManager {
  private bewss: bewss
  private previousCommand: { command: string, requestId: string }

  constructor (bewss: bewss) {
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().on('ConsoleCommandExecuted', (data: string) => {
      const res = this.executeCommand(data)
      this.previousCommand = res || undefined
    })
    this.bewss.getEventManager().on('SlashCommandExecutedConsole', (packet: any) => {
      if (this.previousCommand == undefined) return
      if (this.previousCommand.requestId != packet.header.requestId) return
      if (this.previousCommand.command.startsWith('/me')) return this.bewss.getLogger().info(`[External] Message Sent`)
      if (this.previousCommand.command.startsWith('/say')) return this.bewss.getLogger().info(`[External] ${packet.body.message}`)
      
      return this.bewss.getLogger().info(packet.body.statusMessage)
    })
  }

  async onDisabled(): Promise<void> {
    //
  }

  executeCommand(command: string): commandResponse | void {
    if (this.bewss.getServerManager().getServer() == undefined) return this.bewss.getLogger().error('A user must be connect before running a Bedrock command.')
    const requestId = uuidv4()
    this.bewss.getServerManager().getServer()
      .send(JSON.stringify(
        {
          "body": {
            "commandLine": command,
            "version": 1,
          },
          "header": {
            "requestId": requestId,
            "messagePurpose": "commandRequest",
            "version": 1,
          },
        },
      ))

    return {
      command: command,
      requestId: requestId,
    } as commandResponse
  }

}

export default commandManager
