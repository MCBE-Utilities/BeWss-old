import bewss from "src/bewss/bewss"

class MobInteracted {
  private bewss: bewss
  public eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'MobInteracted'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('MobInteracted')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        if (!packet.includes('header')) return
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

export = MobInteracted
