import bewss from "src/bewss/bewss"

class ItemCrafted {
  private bewss: bewss
  private eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'ItemCrafted'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('ItemCrafted')
    this.bewss.getServerManager().getServer()
      .on('message', (packet) => {
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'ItemCrafted') return
        this.bewss.getEventManager().emit('ItemCrafted', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('ItemCrafted')
  }

}

module.exports = ItemCrafted
