/* eslint-disable @typescript-eslint/no-explicit-any */
import { commandResponse } from "../@interface/bewss.i"
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
}

export default entityManager
