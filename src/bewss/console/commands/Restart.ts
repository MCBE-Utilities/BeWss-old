import bewss from "src/bewss/bewss"

class Restart {
  private bewss: bewss
  public commandName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.commandName = 'restart'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().on(this.commandName, () => {
      this.bewss.getServerManager().onDisabled()
      setTimeout(() => {
        this.bewss.getServerManager().onEnabled()
      }, 1000)
    })
  }

  async onDisabled(): Promise<void> {
    //
  }

}

export = Restart
