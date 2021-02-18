import Server from '../../node-bewss'
import commandManager from './commandManager'
import direction from '../mctype/direction'

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
    this.server.getCommandManager().executeCommand('agent getposition')
    this.server.getCommandManager().on('commandPacket', (packet) => {
      const pasredPacket = JSON.parse(packet)
      console.log("Agent Getposition")
    })
  }
  
  public agentMove(direction: direction): void {
    //
  }
  
  public agentTurn(direction: direction): void {
    //
  }
  
  public agentAttack(direction: direction): void {
    //
  }
  
  public agentPlace(direction: direction): void {
    //
  }
  
  public agentDestroy(direction: direction): void {
    //
  }
  
  public agentTill(direction: direction): void {
    //
  }

}
export default Agent
