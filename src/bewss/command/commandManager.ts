/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bewss from "../bewss"
import { v4 as uuidv4 } from 'uuid'
import { EventEmitter } from 'events'
import {
  customCommandResponse, SlashCommandExecutedConsole, 
} from "../@interface/bewss.i"
import {
  Help,
  Reindex,
  Reload,
} from "./commands/index"

export interface exampleCommand {
  execute(sender: string, args: Array<string>): Promise<void>
}
class commandManager extends EventEmitter {
  private bewss: bewss
  private previousCommand: any
  private commandCache: Array<{ request: string, response: any }> = []
  private commands = new Map<string, exampleCommand | undefined>()
  private _requests = new Map<string, string>()
  private _inv

  constructor (bewss: bewss) {
    super()
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    await this.loadDefaultCommands()

    this.bewss.getEventManager().on('ConsoleCommandExecuted', (data: string) => {
      const res = this.executeCommand(data)
      this.previousCommand = res
    })
    this.bewss.getEventManager().on('SlashCommandExecutedConsole', (packet: any) => {
      this.cacheCommand(packet)
      if (this.previousCommand == undefined) return
      if (this.previousCommand.requestId != packet.header.requestId) return
      if (this.previousCommand.command.startsWith('/me')) return this.bewss.getLogger().info(`[External] Message Sent`)
      if (this.previousCommand.command.startsWith('/say')) return this.bewss.getLogger().info(`[External] ${packet.body.message}`)
      
      return this.bewss.getLogger().info(packet.body.statusMessage)
    }) 
    this.bewss.getEventManager().on('PlayerMessage', (packet) => {
      if (!packet.body.properties.Message.startsWith('-')) return
      const parsedCommand = this.parseCommand(packet.body.properties.Message)
      if (!this.getCommandNames().includes(parsedCommand.command)) return this.bewss.getPlayerManager().sendMessage('text', packet.body.properties.Sender, '§dBeWss§r §l§7>§r §cThat command doesnt exist. Do -help for a list of commands.')
      const commandData = this.commands.get(parsedCommand.command)
      if (commandData == undefined) return this.emit(parsedCommand.command, {
        sender: packet.body.properties.Sender,
        args:  parsedCommand.args,
      } as customCommandResponse)

      return commandData.execute(packet.body.properties.Sender,  parsedCommand.args)
    })
    this._inv = setInterval(() => {
      if (this._requests.size > 0) {
        const [uuid, command] = Array.from(this._requests.entries())[0]
        if (uuid) {
          this._requests.delete(uuid)
          this.bewss.getServerManager().getServer()
            .send(JSON.stringify(
              {
                "body": {
                  "commandLine": command,
                  "version": 1,
                },
                "header": {
                  "requestId": uuid,
                  "messagePurpose": "commandRequest",
                  "version": 1,
                },
              },
            ))
        }
      }
    })
  }

  async onDisabled(): Promise<void> {
    clearInterval(this._inv)

    return
  }

  private cacheCommand(packet: any): void {
    this.commandCache.push({
      request: packet.header.requestId,
      response: packet, 
    })
  }

  private parseCommand(content: string): {command: string, args: Array<string>} {
    const command = content.replace('-', '').split(' ')[0]
    const args = content.replace(`-${command} `, '').split(' ')
    
    return {
      command: command,
      args: args,
    }
  }

  private async loadDefaultCommands(): Promise<void> {
    const helpCommand = new Help(this.bewss)
    this.commands.set(helpCommand.commandName, helpCommand)
    const reindexCommand = new Reindex(this.bewss)
    this.commands.set(reindexCommand.commandName, reindexCommand)
    const reloadCommand = new Reload(this.bewss)
    this.commands.set(reloadCommand.commandName, reloadCommand)
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

  async executeCommand(command: string): Promise<any>
  async executeCommand(command: string, callback: (err: any, res: SlashCommandExecutedConsole) => void): Promise<void>
  async executeCommand(command: string, callback?: (err: any, res: SlashCommandExecutedConsole) => void): Promise<SlashCommandExecutedConsole | void> {
    if (this.bewss.getServerManager().getServer() == undefined) return this.bewss.getLogger().error('A user must be connect before running a Bedrock command.')
    try {
      const requestId = uuidv4()
      this._requests.set(requestId, command)
      const response = await this.findResponse(requestId)
      if (callback) {
        return callback(undefined, response)
      } else {
        return new Promise((res) => {
          res(response)
        })
      }
    } catch (error) {
      if (callback) {
        return callback(error, undefined)
      } else {
        return new Promise((res, rej) => {
          rej(error)
        })
      }
    }
  }

  registerCommand(command: string): void {
    if (this.getCommandNames().includes(command)) return this.bewss.getLogger().error(`The command "${command}" is an already a registered command!`)
    this.commands.set(command, undefined)
    this.emit('CommandRegistered', { name: command })
  }

  getCommandNames(): Array<string> {
    return Array.from(this.commands.keys())
  }

  async reloadAll(): Promise<void> {
    this.commands = new Map<string, exampleCommand | undefined>()
    await this.loadDefaultCommands()

    return
  }

}

export default commandManager
