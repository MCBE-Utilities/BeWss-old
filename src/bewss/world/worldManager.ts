/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import {
  blockData,
  commandResponse, gettopsolidblockCommand, SlashCommandExecutedConsole, testforblockCommand, topBlockData, 
} from "../@interface/bewss.i"
import bewss from "../bewss"
import axios from "axios"

class worldManager {
  private bewss: bewss
  private itemJSON = "https://minecraft-ids.grahamedgecombe.com/items.json"

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
      name: "Air",
      id: "air",
      data: 0,
      position: {
        x: x,
        y: y,
        z: z,
      },
    }
    const blocks = await this.getBlockData()
    let blockData: blockData
    const blockName = response.body.statusMessage.replace(`The block at ${response.body.position.x},${response.body.position.y},${response.body.position.z} is `, '').replace(' (expected: Air)', '')
      .replace('.', '')
    for (const block of blocks) {
      if (block.name == blockName) {
        blockData = {
          name: blockName,
          id: block.text_type,
          data: block.meta,
          position: response.body.position,
        }
      }
    }

    return blockData
  } 

  async getBlockData(): Promise<Array<{ type: number, meta: number, name: string, text_type: string }>> {
    const response = await axios.get(this.itemJSON)

    return response.data
  }

}

export default worldManager