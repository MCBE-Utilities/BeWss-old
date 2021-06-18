import bewss from "src/bewss/bewss"

class BlockBroken {
  private bewss: bewss
  private eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'BlockBroken'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('BlockBroken')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'BlockBroken') return
        this.bewss.getEventManager().emit('BlockBroken', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('BlockBroken')
  }

}

module.exports = BlockBroken
