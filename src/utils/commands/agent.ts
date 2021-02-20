import { dir } from 'console'
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

  public async agentTp(x: number, y: number, z: number): Promise<Direction> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand(`agent tp ${x} ${y} ${z}`)
      this.server.getCommandManager().on('commandPacket', (packet) => {
        res(JSON.parse(packet).body.statusMessage)
      })
    })
  }

  public async agentInspect(direction: string): Promise<Direction> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand(`agent inspect ${direction}`)
      this.server.getCommandManager().on('commandPacket', (packet) => {
        res(JSON.parse(packet).body.statusMessage)
      })
    })
  }

  public async agentInspectData(direction: string): Promise<Direction> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand(`agent inspectdata ${direction}`)
      this.server.getCommandManager().on('commandPacket', (packet) => {
        res(JSON.parse(packet).body.statusMessage)
      })
    })
  }

  public async agentSetItem(slotNumber: number, itemName: string, quantity: number, itemData: string, itemComponents: string): Promise<void> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand(`agent setitem ${slotNumber} ${itemName} ${quantity} ${itemData} ${itemComponents}`)
      this.server.getCommandManager().on('commandPacket', (packet) => {
        res(JSON.parse(packet).body.position)
      })
    })
  }

  public async agentGetItem(slotNumber: number): Promise<void> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand(`agent getitemdetail ${slotNumber}`)
      this.server.getCommandManager().on('commandPacket', (packet) => {
        res(JSON.parse(packet).body.position)
      })
    })
  }

  public async agentGetItemCount(slotNumber: number): Promise<void> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand(`agent getitemcount ${slotNumber}`)
      this.server.getCommandManager().on('commandPacket', (packet) => {
        res(JSON.parse(packet).body.position)
      })
    })
  }

  public async agentTransferItem(slotNumber: number, quantity: number, destSlotNumeber: number): Promise<void> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand(`agent transfer ${slotNumber} ${quantity} ${destSlotNumeber}`)
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
  
  public async agentDrop(slotNumber: number, quantity: number, direction: string): Promise<Direction> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand(`agent drop ${slotNumber} ${quantity} ${direction}`)
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
  
  public async agentPlace(slotNumber: number, direction: string): Promise<Direction> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand(`agent place ${slotNumber} ${direction}`)
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
  
  public async agentCollect(item: string): Promise<Direction> {
    return new Promise((res) => {
      this.server.getCommandManager().executeCommand(`agent collect ${item}`)
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
