import bewss from "src/bewss/bewss"

class Reload {
  private bewss: bewss
  public commandName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.commandName = 'reload'
  }

  async execute(): Promise<void> {
    await this.bewss.getPluginManager().reloadAll()
    this.bewss.getLogger().success('All plugins reloaded.')
  }

}

export = Reload
