import bewss from "src/bewss/bewss"

class SlashCommandExecuted {
  private bewss: bewss
  private eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'SlashCommandExecuted'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('SlashCommandExecuted')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        const parsedPacket = JSON.parse(packet)
        this.bewss.getEventManager().emit('SlashCommandExecuted', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('SlashCommandExecuted')
  }

}

module.exports = SlashCommandExecuted
