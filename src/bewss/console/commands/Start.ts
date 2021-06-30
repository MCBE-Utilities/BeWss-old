import bewss from "src/bewss/bewss"

class Start {
  private bewss: bewss
  public commandName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.commandName = 'start'
  }

  async execute(): Promise<void> {
    this.bewss.getServerManager().onEnabled()
  }

}

export = Start
