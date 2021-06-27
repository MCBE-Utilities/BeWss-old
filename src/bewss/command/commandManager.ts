/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bewss from "../bewss"
import { v4 as uuidv4 } from 'uuid'
import {
  commandResponse, SlashCommandExecutedConsole, 
} from "../@interface/bewss.i"
import { EventEmitter } from 'events'

interface commandManager {
  new(bewss: bewss)
  onEnabled(): Promise<void>
  onDisabled(): Promise<void>
  registerEvent(event: string): Promise<void>
  unregisterEvent(event: string): Promise<void>
  on<K extends keyof CommandValues>(event: K, callback: (...args: CommandValues[K]) => void): this
  on<S extends string | symbol>(
    event: Exclude<S, keyof CommandValues>,
    callback: (...args: unknown[]) => void,
  ): this
  once<K extends keyof CommandValues>(event: K, callback: (...args: CommandValues[K]) => void): this
  once<S extends string | symbol>(
    event: Exclude<S, keyof CommandValues>,
    callback: (...args: unknown[]) => void,
  ): this
  emit<K extends keyof CommandValues>(event: K, ...args: CommandValues[K]): boolean
  emit<S extends string | symbol>(
    event: Exclude<S, keyof CommandValues>,
    ...args: unknown[]
  ): boolean
}

export interface CommandValues {
  AgentCommandExecued: [unknown]
  ListCommandExecuted: [unknown]
  QueryTargetCommandExecuted: [unknown]
  TagCommandExecuted: [unknown]
  ScoreboardObjectiveCommandExecuted: [unknown]
  ScoreboardPlayerCommandExecuted: [unknown]
}

class commandManager extends EventEmitter{
  private bewss: bewss
  private previousCommand: { command: string, requestId: string }
  private commandCache: Array<{ request: string, response: any }> = []

  constructor (bewss: bewss) {
    super()
    this.bewss = bewss
    this.setMaxListeners(Infinity)
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().on('ConsoleCommandExecuted', (data: string) => {
      const res = this.executeCommand(data)
      this.previousCommand = res || undefined
    })
    this.bewss.getEventManager().on('SlashCommandExecutedConsole', (packet: any) => {
      this.cacheCommand(packet)
      this.commandEvent(packet)
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

  private commandEvent(packet: any): void | boolean {
    if (packet.body.statusMessage == undefined) return
    if (packet.body.statusMessage.includes('There are ')) return this.emit('ListCommandExecuted', packet)
    if (packet.body.statusMessage.includes('Target data: ')) return this.emit('QueryTargetCommandExecuted', packet)
    if (packet.body.statusMessage.includes('tag')) return this.emit('TagCommandExecuted', packet)
    if (packet.body.statusMessage.includes('players') || packet.body.statusMessage.includes('Set [') || packet.body.statusMessage.includes('tracked objective')) return this.emit('ScoreboardPlayerCommandExecuted', packet)
    if (packet.body.statusMessage.includes('objective') && !packet.body.statusMessage.includes('%')) return this.emit('ScoreboardObjectiveCommandExecuted', packet)
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
