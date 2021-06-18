import bewss from "src/bewss/bewss"

class Help {
  private bewss: bewss
  private commandName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.commandName = 'help'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().on(this.commandName, () => {
      this.bewss.getLogger().info('Node BeWSS by PMK744\nHere is a list of commands:')
      for (const command of this.bewss.getConsoleManager().getCommandNames()) {
        console.log(` -${command}`)
      }
    })
  }

  async onDisabled(): Promise<void> {
    //
  }

}

module.exports = Help
