import bewss from "src/bewss/bewss"

class ItemUsed {
  private bewss: bewss
  public eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'ItemUsed'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('ItemUsed')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        if (!packet.includes('header')) return
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'ItemUsed') return
        this.bewss.getEventManager().emit('ItemUsed', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('ItemUsed')
  }

}

export = ItemUsed
