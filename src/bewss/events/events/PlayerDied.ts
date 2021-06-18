import bewss from "src/bewss/bewss"

class PlayerDied {
  private bewss: bewss
  private eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'PlayerDied'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('PlayerDied')
    this.bewss.getServerManager().getServer()
      .on('message', (packet) => {
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'PlayerDied') return
        this.bewss.getEventManager().emit('PlayerDied', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('PlayerDied')
  }

}

module.exports = PlayerDied
