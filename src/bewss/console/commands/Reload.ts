import bewss from "src/bewss/bewss"

class Reload {
  private bewss: bewss
  public commandName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.commandName = 'reload'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().on(this.commandName, async () => {
      await this.bewss.getPluginManager().reloadAll()
      this.bewss.getLogger().success('All plugins reloaded.')
    })
  }

  async onDisabled(): Promise<void> {
    //
  }

}

export = Reload
