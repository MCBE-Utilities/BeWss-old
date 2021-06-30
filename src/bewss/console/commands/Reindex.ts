import bewss from "src/bewss/bewss"

class Reindex {
  private bewss: bewss
  public commandName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.commandName = 'reindex'
  }

  async execute(): Promise<void> {
    await this.bewss.getPluginManager().reIndex()
    this.bewss.getLogger().success('Reindexed plugin folder.')
  }

}

export = Reindex
