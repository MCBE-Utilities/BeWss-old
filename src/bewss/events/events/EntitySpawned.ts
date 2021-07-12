import bewss from "src/bewss/bewss"

class EntitySpawned {
  private bewss: bewss
  public eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'EntitySpawned'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('EntitySpawned')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        if (!packet.includes('header')) return
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'EntitySpawned') return
        this.bewss.getEventManager().emit('EntitySpawned', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('EntitySpawned')
  }

}

export = EntitySpawned
