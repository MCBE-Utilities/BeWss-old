import bewss from "src/bewss/bewss"

class PlayerLeave {
  private bewss: bewss
  private eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'PlayerLeave'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('PlayerLeave')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'PlayerLeave') return
        this.bewss.getEventManager().emit('PlayerLeave', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('PlayerLeave')
  }

}

export = PlayerLeave
