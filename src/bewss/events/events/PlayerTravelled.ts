import bewss from "src/bewss/bewss"

class PlayerTravelled {
  private bewss: bewss
  public eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'PlayerTravelled'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('PlayerTravelled')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'PlayerTravelled') return
        this.bewss.getEventManager().emit('PlayerTravelled', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('PlayerTravelled')
  }

}

export = PlayerTravelled
