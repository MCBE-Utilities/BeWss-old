/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  commandResponse, SlashCommandExecutedConsole, 
} from "../@interface/bewss.i"
import bewss from "../bewss"

class entityManager {
  private bewss: bewss

  constructor(bewss: bewss) {
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().on('PlayerMessage', async (pk) => {
      if (pk.body.properties.Message != 'test') return
      console.log(await this.getEntityList())
    })
  }

  async onDisabled(): Promise<void> {
    return
  }

  async getEntityList(): Promise<Array<string>> {
    const command = this.bewss.getCommandManager().executeCommand('/testfor @e[type=!item,type=!player]') as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as any
    if (response.body.statusCode == -2147483648) return ['']

    return response.body.victim
  }

  async summonEntity(entity: string, name: string, x: number, y: number, z: number): Promise<SlashCommandExecutedConsole> {
    const command = this.bewss.getCommandManager().executeCommand(`/give ${entity} ${name} ${x} ${y} ${z}`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId)

    return response
  }

  async executeCommandAsEntity(name: string, commands: string): Promise<SlashCommandExecutedConsole> {
    const command = this.bewss.getCommandManager().executeCommand(`/execute @e[name="${name}"] ~ ~ ~ ${commands}`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as any

    return response
  }

  async removeEntity(name: string): Promise<SlashCommandExecutedConsole> {
    const command = this.bewss.getCommandManager().executeCommand(`/kill @e[type=!player,c=1,name="${name}"]`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as any

    return response
  }
}

export default entityManager
