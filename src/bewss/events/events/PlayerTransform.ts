import bewss from "src/bewss/bewss"

class PlayerTransform {
  private bewss: bewss
  private eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'PlayerTransform'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('PlayerTransform')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'PlayerTransform') return
        this.bewss.getEventManager().emit('PlayerTransform', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('PlayerTransform')
  }

}

module.exports = PlayerTransform
