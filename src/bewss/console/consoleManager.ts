/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bewss from "../bewss"
import readline from "readline"
import getFiles from "../util/getFiles"

class consoleManager {
  private bewss: bewss
  private commands = {
    command: new Map(),
  }
  private commandNames: Array<string> = []
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
      if (!this.commandNames.includes(parsedCommand[0])) return this.bewss.getLogger().error('This command doesn\'t exsist!')
      this.bewss.getEventManager().emit(parsedCommand[0], data.replace('-', ''))
    })
    this.commands.command.forEach((x: any) => {
      x.onEnabled()
    })
  }

  async onDisabled(): Promise<void> {
    this.readline.close()
    this.commands.command.forEach((x: any) => {
      x.onDisabled()
    })
  }

  private async loadDefaultCommands(): Promise<void> {
    const commands: any = await getFiles(__dirname + '/commands')
    await commands.forEach((x: string) => {
      if (x.endsWith('.ts')) return
      const CommandClass = require(x)
      const newCommand = new CommandClass(this.bewss)
      if (newCommand.commandName == undefined) return this.bewss.getLogger().error('[Commands] Your command must contain an commandName!')
      this.commandNames.push(newCommand.commandName)
      this.commands.command.set(newCommand.commandName, newCommand)
    })

    return
  }

  registerCommand(command: string): void {
    if (this.commandNames.includes(command)) return this.bewss.getLogger().error(`The command "${command}" is an already registered command!`)
    this.commandNames.push(command)
  }

  getCommandNames(): Array<string> {
    return this.commandNames
  }

}

export default consoleManager
