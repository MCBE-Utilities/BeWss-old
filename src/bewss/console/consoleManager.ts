/* eslint-disable @typescript-eslint/no-var-requires */
import bewss from "../bewss"
import readline from "readline"
import {
  Help,
  Quit,
  Reindex,
  Reload,
  Restart,
  Start,
  Stop,
} from "./commands/index"

export interface exampleCommand {
  onEnabled(): Promise<void>
  onDisabled(): Promise<void>
}
class consoleManager {
  private bewss: bewss
  private commands = new Map<string, exampleCommand | undefined>()
  private readline: readline.Interface

  constructor (bewss: bewss) {
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
      const parsedCommand: Array<string> = data.replace('-', '').split(' ')
      if (!this.getCommandNames().includes(parsedCommand[0])) return this.bewss.getLogger().error('This command doesn\'t exist!')
      this.bewss.getEventManager().emit(parsedCommand[0], data.replace('-', ''))
    })
    for (const command of this.commands.values()) {
      if (command) {
        command.onEnabled()
      }
    }

    return
  }

  async onDisabled(): Promise<void> {
    this.readline.close()
    for (const command of this.commands.values()) {
      if (command) {
        command.onDisabled()
      }
    }

    return Promise.resolve()
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
  }

  getCommandNames(): Array<string> {
    return Array.from(this.commands.keys())
  }

}

export default consoleManager
