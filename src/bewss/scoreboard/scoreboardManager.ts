import {
  commandResponse, createObjective,
} from "../@interface/bewss.i"
import bewss from "../bewss"

class scoreboardManager {
  private bewss: bewss

  constructor(bewss: bewss) {
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().on('wss-connected', () => {
      this.createObjective('test', 'test objective')
    })
  }

  async onDisabled(): Promise<void> {
    //
  }

  createObjective(objective: string, displayname?: string): Promise<createObjective> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/scoreboard objectives add ${objective} dummy ${displayname}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: createObjective) => {
        if (command == undefined) return res(undefined)
  
        return res(packet)
      })
    })
  }

}

export default scoreboardManager
