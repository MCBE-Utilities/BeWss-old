import bewss from "src/bewss/bewss"

class Reindex {
  private bewss: bewss
  private commandName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.commandName = 'reindex'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().on(this.commandName, async () => {
      await this.bewss.getPluginManager().reIndex()
      this.bewss.getLogger().success('Reindexed plugin folder.')
    })
  }

  async onDisabled(): Promise<void> {
    //
  }

}

export = Reindex
