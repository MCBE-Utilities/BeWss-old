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
    return Promise.resolve()
  }

  async createObjective(objective: string, displayname?: string): Promise<genericScoreboard> {
    const command = this.bewss.getCommandManager().executeCommand(`/scoreboard objectives add ${objective} dummy "${displayname}"`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as genericScoreboard
    if (response.body.statusCode == -2147483648) return
    
    return response
  }

  async removeObjective(objective: string): Promise<genericScoreboard> {
    const command = this.bewss.getCommandManager().executeCommand(`/scoreboard objectives remove ${objective}`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as genericScoreboard
    if (response.body.statusCode == -2147483648) return
  
    return response
  }

  async setdisplay(objective: string, display: displays, layout?: layouts | ""): Promise<genericScoreboard> {
    const command = this.bewss.getCommandManager().executeCommand(`/scoreboard objectives setdisplay ${display} ${objective} ${layout}`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as genericScoreboard
    if (response.body.statusCode == -2147483648) return

    return response
  }

  async getObjectives(): Promise<getObjectives> {
    const command = this.bewss.getCommandManager().executeCommand(`/scoreboard objectives list`) as commandResponse
    const response: getObjectives = await this.bewss.getCommandManager().findResponse(command.requestId) as getObjectives
    if (response.body.statusCode == -2147483648) return
    const raw: Array<string> = response.body.statusMessage.split('\n')
    const objectives: Array<Array<string>> = []
    for await (const string of raw) {
      if (!string.startsWith("§a")) {
        const rawString: Array<string> = string.split(' ')
        objectives.push([rawString[1].replace(':', ''), string.replace(`- ${rawString[1].replace(':', '')}: displays as '`, '').replace(`' and is type 'dummy'`, '')])
      }
    }
    response.body.objectives = objectives

    return response
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
    const command = this.bewss.getCommandManager().executeCommand(`/scoreboard players ${operation} "${target}" ${objective} ${amount}`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as genericScoreboard
    if (response.body.statusCode == -2147483648) return

    return response
  }

  async getScore(target: string, objective: string): Promise<getScore> {
    const command = this.bewss.getCommandManager().executeCommand(`/scoreboard players list "${target}"`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as getScore
    if (response.body.statusCode == -2147483648) return
    const objectiveName = await this.getObjectiveName(objective)
    let score: number
    const raw: Array<string> = response.body.statusMessage.split('\n')
    for (const string of raw) {
      if (!string.startsWith("§a") && string.includes(objectiveName)) {
        const rawString: Array<string> = string.split(' ').reverse()
        score = parseInt(rawString[1])
      }
    }
    response.body.score = score
    response.body.objective = objective
    response.body.objectiveName = objectiveName

    return response
  }

}

export default scoreboardManager
