import Server from '../../node-bewss'
import Direction from '../mctype/direction'

class Agent {
  private server
  private wsserver
  private logger

  constructor(server: Server) {
    this.server = server
    this.wsserver = this.server.wsserver
    this.logger = this.server.getLogger()
  }

  public onEnabled(): void {
    this.logger.info('Test: Loaded Agent Class Commands')
  }

  public async agentGetPosition(): Promise<void> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand('agent getposition')
      this.server.getCommandManager().on('commandPacket', (packet) => {
        res(JSON.parse(packet).body.position)
      })
    })
  }
  
  public async agentMove(direction: string): Promise<Direction> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand(`agent move ${direction}`)
      this.server.getCommandManager().on('commandPacket', (packet) => {
        res(JSON.parse(packet).body.statusMessage)
      })
    })
  }
  
  public async agentTurn(direction: string): Promise<Direction> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand(`agent turn ${direction}`)
      this.server.getCommandManager().on('commandPacket', (packet) => {
        res(JSON.parse(packet).body.statusMessage)
      })
    })
  }
  
  public async agentAttack(direction: string): Promise<Direction> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand(`agent attack ${direction}`)
      this.server.getCommandManager().on('commandPacket', (packet) => {
        res(JSON.parse(packet).body.statusMessage)
      })
    })
  }
  
  public async agentPlace(direction: string): Promise<Direction> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand(`agent place 1 ${direction}`)
      this.server.getCommandManager().on('commandPacket', (packet) => {
        res(JSON.parse(packet).body.statusMessage)
      })
    })
  }
  
  public async agentDestroy(direction: string): Promise<Direction> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand(`agent destroy ${direction}`)
      this.server.getCommandManager().on('commandPacket', (packet) => {
        res(JSON.parse(packet).body.statusMessage)
      })
    })
  }
  
  public async agentTill(direction: string): Promise<Direction> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand(`agent till ${direction}`)
      this.server.getCommandManager().on('commandPacket', (packet) => {
        res(JSON.parse(packet).body.statusMessage)
      })
    })
  }

}
export default Agent
