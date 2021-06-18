import bewss from "src/bewss/bewss"

class Exit {
  private bewss: bewss
  private commandName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.commandName = 'exit'
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

module.exports = Exit
