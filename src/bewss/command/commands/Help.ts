import bewss from "src/bewss/bewss"

class Help {
  private bewss: bewss
  public commandName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.commandName = 'help'
  }

  async execute(sender: string): Promise<void> {
    const commands = this.bewss.getCommandManager().getCommandNames()
    this.bewss.getPlayerManager().sendMessage('text', sender, `§dBeWss§r §7- §aFound ${commands.length} commands!`)
    commands.forEach((command: string) => {
      this.bewss.getPlayerManager().sendMessage('text', sender, `   §7-${command}`)
    })
  }

}

export = Help
