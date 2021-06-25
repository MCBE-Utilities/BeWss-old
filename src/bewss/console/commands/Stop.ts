import bewss from "src/bewss/bewss"

class Stop {
  private bewss: bewss
  public commandName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.commandName = 'stop'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().on(this.commandName, () => {
      this.bewss.getServerManager().onDisabled()
    })
  }

  async onDisabled(): Promise<void> {
    //
  }

}

export = Stop
