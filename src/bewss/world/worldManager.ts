/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import {
  blockData,
  commandResponse, gettopsolidblockCommand, SlashCommandExecutedConsole, testforblockCommand, topBlockData, 
} from "../@interface/bewss.i"
import bewss from "../bewss"
import { blocks } from '../../data/1.17/blocks'

class worldManager {
  private bewss: bewss
  constructor(bewss: bewss) {
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    //
  }

  async onDisabled(): Promise<void> {
    //
  }

  async getSurfaceBlock(x: number, z: number): Promise<topBlockData> {
    const command = this.bewss.getCommandManager().executeCommand(`/gettopsolidblock ${x} 255 ${z}`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as gettopsolidblockCommand
    if (response.body.statusCode == -2147483648) return
    
    return {
      name: response.body.blockName,
      position: response.body.position,
    }
  }

  async setblock(x: number, y: number, z: number, block: string): Promise<SlashCommandExecutedConsole> {
    const command = this.bewss.getCommandManager().executeCommand(`/testforblock ${x} ${y} ${z} ${block}`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as any
    if (response.body.statusCode == -2147483648) return
    
    return response
  }

  async getBlock(x: number, y: number, z: number): Promise<blockData> {
    const command = this.bewss.getCommandManager().executeCommand(`/testforblock ${x} ${y} ${z} air`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as testforblockCommand
    if (response.body.statusCode == -2147483648) return
    if (response.body.matches) return {
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

    const blockName = response.body.statusMessage.match(/(?<=is )(.*?)(?= \()/)[0]
    const block = blocks.find(e => e.displayName == blockName) as blockData

    block.position = response?.body?.position

    return block
  } 


  sendMessage(message: string): void {
    this.bewss.getCommandManager().executeCommand(`/tellraw @a {"rawtext":[{"text":"${message}"}]}`)
  }
}

export default worldManager
