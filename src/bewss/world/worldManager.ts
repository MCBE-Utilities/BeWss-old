import {
  blockData,
  SlashCommandExecutedConsole,
  topBlockData, 
} from "../@interface/bewss.i"
import bewss from "../bewss"
import { blocks } from '../../data/1.17/blocks'

class worldManager {
  private bewss: bewss
  constructor(bewss: bewss) {
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    return
  }

  async onDisabled(): Promise<void> {
    return
  }

  async getSurfaceBlock(x: number, z: number): Promise<topBlockData> {
    const command = await this.bewss.getCommandManager().executeCommand(`/gettopsolidblock ${x} 255 ${z}`)
    if (command.body.statusCode == -2147483648) return
    
    return {
      name: command.body.blockName,
      position: command.body.position,
    }
  }

  async setblock(x: number, y: number, z: number, block: string, data: number): Promise<SlashCommandExecutedConsole> {
    const command = await this.bewss.getCommandManager().executeCommand(`/setblock ${x} ${y} ${z} ${block} ${data}`)
    if (command.body.statusCode == -2147483648) return
    
    return command
  }

  async getBlock(x: number, y: number, z: number): Promise<blockData> {
    const command = await this.bewss.getCommandManager().executeCommand(`/testforblock ${x} ${y} ${z} air`)
    if (command.body.statusCode == -2147483648) return
    if (command.body.matches) return {
      id: 0,
      displayName: 'Air',
      name: 'air',
      hardness: 0,
      resistance: 0,
      minStateId: 134,
      maxStateId: 134,
      drops: [],
      diggable: true,
      transparent: true,
      filterLight: 0,
      emitLight: 0,
      boundingBox: 'empty',
      stackSize: 0,
      defaultState: 0,
      position: {
        x: x,
        y: y,
        z: z,
      },
    }

    const blockName = command.body.statusMessage.match(/(?<=is )(.*?)(?= \()/)[0]
    const block = blocks.find(e => e.displayName == blockName) as blockData

    block.position = command?.body?.position

    return block
  } 


  sendMessage(message: string): void {
    this.bewss.getCommandManager().executeCommand(`/tellraw @a {"rawtext":[{"text":"${message}"}]}`)
  }
}

export default worldManager
