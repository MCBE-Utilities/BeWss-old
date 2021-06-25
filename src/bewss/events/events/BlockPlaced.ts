import bewss from "src/bewss/bewss"

class BlockPlaced {
  private bewss: bewss
  public eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'BlockPlaced'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('BlockPlaced')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'BlockPlaced') return
        this.bewss.getEventManager().emit('BlockPlaced', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('BlockPlaced')
  }

}

export = BlockPlaced
