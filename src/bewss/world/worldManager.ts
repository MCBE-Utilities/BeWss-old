import bewss from "../bewss"

class worldManager {
  private bewss: bewss
  private itemJSON = "https://minecraft-ids.grahamedgecombe.com/items.json"

  constructor(bewss: bewss) {
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    //
  }

  async onDisabled(): Promise<void> {
    //
  }

}

export default worldManager
