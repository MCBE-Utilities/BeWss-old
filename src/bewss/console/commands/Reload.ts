import bewss from "src/bewss/bewss"

class Reload {
  private bewss: bewss
  private commandName: string

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

module.exports = Reload
