import bewss from "src/bewss/bewss"

class PlayerMessage {
  private bewss: bewss
  private eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'PlayerMessage'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('PlayerMessage')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'PlayerMessage') return
        this.bewss.getEventManager().emit('PlayerMessage', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('PlayerMessage')
  }

}

export = PlayerMessage
