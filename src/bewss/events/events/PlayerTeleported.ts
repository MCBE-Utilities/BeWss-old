import bewss from "src/bewss/bewss"

class PlayerTeleported {
  private bewss: bewss
  public eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'PlayerTeleported'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('PlayerTeleported')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'PlayerTeleported') return
        this.bewss.getEventManager().emit('PlayerTeleported', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('PlayerTeleported')
  }

}

export = PlayerTeleported
