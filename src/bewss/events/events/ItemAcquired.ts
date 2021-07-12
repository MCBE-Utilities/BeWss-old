import bewss from "src/bewss/bewss"

class ItemAcquired {
  private bewss: bewss
  public eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'ItemAcquired'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('ItemAcquired')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        if (!packet.includes('header')) return
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'ItemAcquired') return
        this.bewss.getEventManager().emit('ItemAcquired', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('ItemAcquired')
  }

}

export = ItemAcquired
