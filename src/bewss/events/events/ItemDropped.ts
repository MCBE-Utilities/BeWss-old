import bewss from "src/bewss/bewss"

class ItemDropped {
  private bewss: bewss
  public eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'ItemDropped'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('ItemDropped')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        if (!packet.includes('header')) return
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'ItemDropped') return
        this.bewss.getEventManager().emit('ItemDropped', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('ItemDropped')
  }

}

export = ItemDropped
