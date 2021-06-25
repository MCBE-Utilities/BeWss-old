import bewss from "src/bewss/bewss"

class Quit {
  private bewss: bewss
  private commandName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.commandName = 'quit'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().on(this.commandName, () => {
      this.bewss.onDisabled()
    })
  }

  async onDisabled(): Promise<void> {
    //
  }

}

export = Quit
