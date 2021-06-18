/* eslint-disable @typescript-eslint/no-var-requires */
import bewss from "../bewss"
import readline from "readline"
import getFiles from "../util/getFiles"
import path from "path"

interface exampleCommand {
  new (bewss: bewss)
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
      command.onEnabled()
    }

    return
  }

  async onDisabled(): Promise<void> {
    this.readline.close()
    for (const command of this.commands.values()) {
      command.onDisabled()
    }

    return
  }

  private async loadDefaultCommands(): Promise<void> {
    const commandFiles: string[] = await getFiles(path.resolve(__dirname, "commands"))
    for (const file of commandFiles) {
      if (file.endsWith('.ts')) return
      const CommandClass = require(file)
      const newCommand = new CommandClass(this.bewss)
      if (newCommand.commandName == undefined) return this.bewss.getLogger().error('[Commands] Your command must contain an commandName!')
      this.commands.set(newCommand.commandName, newCommand)
    }

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
