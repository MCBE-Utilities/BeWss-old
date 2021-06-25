import bewss from "src/bewss/bewss"

class Start {
  private bewss: bewss
  public commandName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.commandName = 'start'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().on(this.commandName, () => {
      this.bewss.getServerManager().onEnabled()
    })
  }

  async onDisabled(): Promise<void> {
    //
  }

}

export = Start
