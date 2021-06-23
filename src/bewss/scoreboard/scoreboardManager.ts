import {
  commandResponse, displays, genericScoreboard, getObjectives, getScore, layouts, operations,
} from "../@interface/bewss.i"
import bewss from "../bewss"

class scoreboardManager {
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

  createObjective(objective: string, displayname?: string): Promise<genericScoreboard> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/scoreboard objectives add ${objective} dummy "${displayname}"`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericScoreboard) => {
        if (command == undefined || command.requestId != packet.header.requestId) return res(undefined)
  
        return res(packet)
      })
    })
  }

  removeObject(objective: string): Promise<genericScoreboard> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/scoreboard objectives remove ${objective}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericScoreboard) => {
        if (command == undefined || command.requestId != packet.header.requestId) return res(undefined)
  
        return res(packet)
      })
    })
  }

  setdisplay(objective: string, display: displays, layout?: layouts | ""): Promise<genericScoreboard> {
    return new Promise((res) => {
      if (layout == undefined) layout = ""
      const command = this.bewss.getCommandManager().executeCommand(`/scoreboard objectives setdisplay ${display} ${objective} ${layout}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericScoreboard) => {
        if (command == undefined || command.requestId != packet.header.requestId) return res(undefined)
  
        return res(packet)
      })
    })
  }

  getObjectives(): Promise<getObjectives> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/scoreboard objectives list`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: getObjectives) => {
        if (command == undefined || command.requestId != packet.header.requestId) return res(undefined)
        const raw: Array<string> = packet.body.statusMessage.split('\n')
        const objectives: Array<Array<string>> = []
        for (const string of raw) {
          if (!string.startsWith("§a")) {
            const rawString: Array<string> = string.split(' ')
            objectives.push([rawString[1].replace(':', ''), string.replace(`- ${rawString[1].replace(':', '')}: displays as '`, '').replace(`' and is type 'dummy'`, '')])
          }
        }
        packet.body.objectives = objectives

        return res(packet)
      })
    })
  }

  getObjectiveName(objective: string): Promise<string> {
    return new Promise(async (res) => {
      let displayname: string
      const objectives = await (await this.getObjectives()).body.objectives
      for (const obj of objectives) {
        if (obj[0] == objective) {
          displayname = obj[1]
        }
      }

      return res(displayname)
    })
  }

  updateScore(target: string, operation: operations, objective: string, amount: number): Promise<genericScoreboard> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/scoreboard players ${operation} ${target} ${objective} ${amount}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericScoreboard) => {
        if (command == undefined || command.requestId != packet.header.requestId) return res(undefined)
  
        return res(packet)
      })
    })
  }

  getScore(target: string, objective: string): Promise<getScore> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/scoreboard players list ${target}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', async (packet: getScore) => {
        if (command == undefined || command.requestId != packet.header.requestId) return res(undefined)
        const objectiveName = await this.getObjectiveName(objective)
        let score: number
        const raw: Array<string> = packet.body.statusMessage.split('\n')
        for (const string of raw) {
          if (!string.startsWith("§a") && string.includes(objectiveName)) {
            const rawString: Array<string> = string.split(' ').reverse()
            score = parseInt(rawString[1])
          }
        }
        packet.body.score = score
        packet.body.objective = objective
        packet.body.objectiveName = objectiveName

        return res(packet)
      })
    })
  }

}

export default scoreboardManager
