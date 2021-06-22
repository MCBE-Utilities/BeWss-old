import bewss from "src/bewss/bewss"
import { EventValues } from "../../@interface/bewss.i"

class BossKilled {
  private bewss: bewss
  private eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'BossKilled'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('BossKilled')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'BossKilled') return
        this.bewss.getEventManager().emit('BossKilled', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('BossKilled')
  }

}

module.exports = BossKilled
