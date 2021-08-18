import {
  displays, genericScoreboard, getObjectives, getScore, layouts, operations,
} from "../@interface/bewss.i"
import bewss from "../bewss"

class scoreboardManager {
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

  async createObjective(objective: string, displayname?: string): Promise<genericScoreboard> {
    const command = await this.bewss.getCommandManager().executeCommand(`/scoreboard objectives add ${objective} dummy "${displayname}"`)
    if (command.body.statusCode == -2147483648) return
    
    return command
  }

  async removeObjective(objective: string): Promise<genericScoreboard> {
    const command = await this.bewss.getCommandManager().executeCommand(`/scoreboard objectives remove ${objective}`)
    if (command.body.statusCode == -2147483648) return
  
    return command
  }

  async setdisplay(objective: string, display: displays, layout?: layouts | ""): Promise<genericScoreboard> {
    const command = await this.bewss.getCommandManager().executeCommand(`/scoreboard objectives setdisplay ${display} ${objective} ${layout}`)
    if (command.body.statusCode == -2147483648) return

    return command
  }

  async getObjectives(): Promise<getObjectives> {
    const command = await this.bewss.getCommandManager().executeCommand(`/scoreboard objectives list`)
    if (command.body.statusCode == -2147483648) return
    const raw: Array<string> = command.body.statusMessage.split('\n')
    const objectives: Array<Array<string>> = []
    for await (const string of raw) {
      if (!string.startsWith("§a")) {
        const rawString: Array<string> = string.split(' ')
        objectives.push([rawString[1].replace(':', ''), string.replace(`- ${rawString[1].replace(':', '')}: displays as '`, '').replace(`' and is type 'dummy'`, '')])
      }
    }
    command.body.objectives = objectives

    return command
  }

  async getObjectiveName(objective: string): Promise<string> {
    let displayname: string
    const objectives = await this.getObjectives()
    if (objectives == undefined) return
    for (const obj of objectives.body.objectives) {
      if (obj[0] == objective) {
        displayname = obj[1]
      }
    }

    return displayname
  }

  async updateScore(target: string, operation: operations, objective: string, amount: number): Promise<genericScoreboard> {
    const command = await this.bewss.getCommandManager().executeCommand(`/scoreboard players ${operation} "${target}" ${objective} ${amount}`)
    if (command.body.statusCode == -2147483648) return

    return command
  }

  async getScore(target: string, objective: string): Promise<getScore> {
    const command = await this.bewss.getCommandManager().executeCommand(`/scoreboard players list "${target}"`)
    if (command.body.statusCode == -2147483648) return
    const objectiveName = await this.getObjectiveName(objective)
    let score: number
    const raw: Array<string> = command.body.statusMessage.split('\n')
    for (const string of raw) {
      if (!string.startsWith("§a") && string.includes(objectiveName)) {
        const rawString: Array<string> = string.split(' ').reverse()
        score = parseInt(rawString[1])
      }
    }
    command.body.score = score
    command.body.objective = objective
    command.body.objectiveName = objectiveName

    return command
  }

}

export default scoreboardManager
