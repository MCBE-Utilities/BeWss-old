import bewss from "src/bewss/bewss"

class Help {
  private bewss: bewss
  public commandName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.commandName = 'help'
  }

  async execute(): Promise<void> {
    this.bewss.getLogger().info('Node BeWSS by PMK744\nHere is a list of commands:')
    for (const command of this.bewss.getConsoleManager().getCommandNames()) {
      console.log(` -${command}`)
    }
  }

}

export = Help
