import bewss from "src/bewss/bewss"

class AgentCreated {
  private bewss: bewss
  private eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'AgentCreated'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('AgentCreated')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'AgentCreated') return
        this.bewss.getEventManager().emit('AgentCreated', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('AgentCreated')
  }

}

module.exports = AgentCreated
