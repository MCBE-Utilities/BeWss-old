import bewss from "src/bewss/bewss"

class MobInteracted {
  private bewss: bewss
  private eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'MobInteracted'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('MobInteracted')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'MobInteracted') return
        this.bewss.getEventManager().emit('MobInteracted', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('MobInteracted')
  }

}

module.exports = MobInteracted
