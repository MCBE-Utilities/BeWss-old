/* eslint-disable @typescript-eslint/no-var-requires */
import bewss from "../bewss"
import readline from "readline"
import { EventEmitter } from 'events'
import {
  Help,
  Quit,
  Reindex,
  Reload,
  Restart,
  Start,
  Stop,
} from "./commands/index"
import { customCommandResponse } from "../@interface/bewss.i"

export interface exampleCommand {
  execute(args: Array<string>): Promise<void>
}
class consoleManager extends EventEmitter {
  private bewss: bewss
  private commands = new Map<string, exampleCommand | undefined>()
  private readline: readline.Interface

  constructor (bewss: bewss) {
    super()
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    await this.loadDefaultCommands()
    this.readline = readline.createInterface({ 
      input: process.stdin,
      output: process.stdout,
    })
    this.readline.on('line', (data: string) => {
      if (!data.startsWith('/') && !data.startsWith('-')) return this.bewss.getLogger().error('Invailed syntax! Use / to execute Bedrock commands, or use - to execute BEWSS commands.')
      if (data.startsWith('/') && this.bewss.getServerManager().getServer() == undefined) return this.bewss.getLogger().error('A user must be connect before running a Bedrock command.')
      if (data.startsWith('/')) return this.bewss.getEventManager().emit('ConsoleCommandExecuted', data)
      const parsedCommand = this.parseCommand(data)
      if (!this.getCommandNames().includes(parsedCommand.command)) return this.bewss.getLogger().error('This command doesn\'t exist!')
      const commandData = this.commands.get(parsedCommand.command)
      if (commandData == undefined) return this.emit(parsedCommand.command, {
        sender: "CONSOLE",
        args:  parsedCommand.args,
      } as customCommandResponse)
      
      return commandData.execute(parsedCommand.args)
    })

    return
  }

  async onDisabled(): Promise<void> {
    this.readline.close()

    return Promise.resolve()
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
    const quitCommand = new Quit(this.bewss)
    this.commands.set(quitCommand.commandName, quitCommand)
    const reindexCommand = new Reindex(this.bewss)
    this.commands.set(reindexCommand.commandName, reindexCommand)
    const reloadCommand = new Reload(this.bewss)
    this.commands.set(reloadCommand.commandName, reloadCommand)
    const restartCommand = new Restart(this.bewss)
    this.commands.set(restartCommand.commandName, restartCommand)
    const startCommand = new Start(this.bewss)
    this.commands.set(startCommand.commandName, startCommand)
    const stopCommand = new Stop(this.bewss)
    this.commands.set(stopCommand.commandName, stopCommand)

    return
  }

  registerCommand(command: string): void {
    if (this.getCommandNames().includes(command)) return this.bewss.getLogger().error(`The command "${command}" is an already a registered command!`)
    this.commands.set(command, undefined)
    this.emit('CommandRegistered', { name: command })
  }

  getCommandNames(): Array<string> {
    return Array.from(this.commands.keys())
  }

}

export default consoleManager
