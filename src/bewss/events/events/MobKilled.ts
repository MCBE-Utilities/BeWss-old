import bewss from "src/bewss/bewss"

class MobKilled {
  private bewss: bewss
  public eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'MobKilled'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('MobKilled')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        if (!packet.includes('header')) return
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'MobKilled') return
        this.bewss.getEventManager().emit('MobKilled', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('MobKilled')
  }

}

export = MobKilled
