import bewss from "src/bewss/bewss"

class AgentCommand {
  private bewss: bewss
  public eventName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
    this.eventName = 'AgentCommand'
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().registerEvent('AgentCommand')
    this.bewss.getServerManager().getServer()
      .on('message', (packet: string) => {
        if (!packet.includes('header')) return
        const parsedPacket = JSON.parse(packet)
        if (parsedPacket.header.messagePurpose != 'event') return
        if (parsedPacket.body.eventName != 'AgentCommand') return
        this.bewss.getEventManager().emit('AgentCommand', parsedPacket)
      })
  }

  async onDisabled(): Promise<void> {
    this.bewss.getEventManager().unregisterEvent('AgentCommand')
  }

}

export = AgentCommand
