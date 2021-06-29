/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bewss from "../bewss"
import { v4 as uuidv4 } from 'uuid'
import {
  commandResponse, SlashCommandExecutedConsole, 
} from "../@interface/bewss.i"

class commandManager {
  private bewss: bewss
  private previousCommand: { command: string, requestId: string }
  private commandCache: Array<{ request: string, response: any }> = []

  constructor (bewss: bewss) {
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().on('ConsoleCommandExecuted', (data: string) => {
      const res = this.executeCommand(data)
      this.previousCommand = res || undefined
    })
    this.bewss.getEventManager().on('SlashCommandExecutedConsole', (packet: any) => {
      this.cacheCommand(packet)
      if (this.previousCommand == undefined) return
      if (this.previousCommand.requestId != packet.header.requestId) return
      if (this.previousCommand.command.startsWith('/me')) return this.bewss.getLogger().info(`[External] Message Sent`)
      if (this.previousCommand.command.startsWith('/say')) return this.bewss.getLogger().info(`[External] ${packet.body.message}`)
      
      return this.bewss.getLogger().info(packet.body.statusMessage)
    }) 
  }

  async onDisabled(): Promise<void> {
    return Promise.resolve()
  }

  private cacheCommand(packet: any): void {
    this.commandCache.push({
      request: packet.header.requestId,
      response: packet, 
    })
  }

  private async loadDefaultCommands(): Promise<void> {
    //
  }

  findResponse(requestId: string): Promise<SlashCommandExecutedConsole> {
    return new Promise((res) => {
      const inv = setInterval(() => {
        const cache = this.commandCache.find(({ request }) => request === requestId)
        if (cache == undefined) return
        clearInterval(inv)

        return res(cache.response)
      }, 1)
    })
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
