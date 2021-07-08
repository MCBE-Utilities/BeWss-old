import bewss from "src/bewss/bewss"

class Reload {
  private bewss: bewss
  public commandName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.commandName = 'reload'
  }

  async execute(sender: string): Promise<void> {
    if (sender != this.bewss.getPlayerManager().getLocalPlayerName()) return this.bewss.getPlayerManager().sendMessage('text', sender, "§dBeWss§r §7§l>§r §cYou don't have permission to use this command!")
    await this.bewss.getPluginManager().reloadAll()
    this.bewss.getPlayerManager().sendMessage('text', sender, "§dBeWss§r §7§l>§r §aPlugin folder reloaded! Check terminal for more details.")
  }

}

export = Reload
