import bewss from "src/bewss/bewss"

class Stop {
  private bewss: bewss
  public commandName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.commandName = 'stop'
  }

  async execute(args: Array<string>): Promise<void> {
    this.bewss.getServerManager().onDisabled()
  }

}

export = Stop
