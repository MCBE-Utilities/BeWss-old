import bewss from "src/bewss/bewss"

class ItemDestroyed {
  private bewss: bewss
  public eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'ItemDestroyed'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('ItemDestroyed')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        if (!packet.includes('header')) return
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'ItemDestroyed') return
        this.bewss.getEventManager().emit('ItemDestroyed', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('ItemDestroyed')
  }

}

export = ItemDestroyed
