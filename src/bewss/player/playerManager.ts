/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  playerPosition, titles, messageType, titlerawComponets, commandResponse,
} from "../@interface/bewss.i"
import bewss from "../bewss"

class playerManager {
  private bewss: bewss
  private localePlayerName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().on('wss-connected', async () => {
      const command = this.bewss.getCommandManager().executeCommand('/getlocalplayername') as commandResponse
      const response = await this.bewss.getCommandManager().findResponse(command.requestId) as any
      this.localePlayerName = response.body.localplayername
    })
  }

  async onDisabled(): Promise<void> {
    this.localePlayerName = ""
    
    return Promise.resolve()
  }

  getLocalPlayerName(): string {
    return this.localePlayerName
  }

  async getPlayerList(): Promise<Array<string>> {
    const command = this.bewss.getCommandManager().executeCommand('/list') as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as any
    const playersString: string = response.body.players

    return playersString.split(', ')
  }

  sendMessage(type: messageType , target: string, content: string | Array<titlerawComponets>): void {
    if (type == "text") {
      if (target == "@s") target = this.localePlayerName
      if (target.includes("@s" || "@p" || "@r" || "@a" || "@e")) {
        this.bewss.getCommandManager().executeCommand(`/tellraw ${target} {"rawtext":[{"text":"${content}"}]}`)
      } else {
        this.bewss.getCommandManager().executeCommand(`/tellraw "${target}" {"rawtext":[{"text":"${content}"}]}`)
      }
    }

    if (type == "json") {
      if (target == "@s") target = this.localePlayerName
      if (target.includes("@s" || "@p" || "@r" || "@a" || "@e")) {
        this.bewss.getCommandManager().executeCommand(`/tellraw ${target} {"rawtext":${JSON.stringify(content)}}`)
      } else {
        this.bewss.getCommandManager().executeCommand(`/tellraw "${target}" {"rawtext":${JSON.stringify(content)}}`)
      }
    }
  }

  sendTitle(type: messageType, target: string, content: string | Array<titlerawComponets>, title: titles): void {
    if (type == "text") {
      if (target == "@s") target = this.localePlayerName
      if (target.includes("@s" || "@p" || "@r" || "@a" || "@e")) {
        this.bewss.getCommandManager().executeCommand(`/titleraw ${target} ${title} {"rawtext":[{"text":"${content}"}]}`)
      } else {
        this.bewss.getCommandManager().executeCommand(`/titleraw "${target}" ${title} {"rawtext":[{"text":"${content}"}]}`)
      }
    }

    if (type == "json") {
      if (target == "@s") target = this.localePlayerName
      console.log(JSON.stringify(content))
      if (target.includes("@s" || "@p" || "@r" || "@a" || "@e")) {
        this.bewss.getCommandManager().executeCommand(`/titleraw ${target} ${title} {"rawtext":${JSON.stringify(content)}}`)
      } else {
        this.bewss.getCommandManager().executeCommand(`/titleraw "${target}" ${title} {"rawtext":${JSON.stringify(content)}}`)
      }
    }
  }

  async getPlayerPosition(target: string): Promise<playerPosition> {
    const command = this.bewss.getCommandManager().executeCommand(`/querytarget "${target}"`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as any

    return JSON.parse(response.body.details)[0]
  }

  async getTags(target: string): Promise<Array<string>> {
    const command = this.bewss.getCommandManager().executeCommand(`/tag "${target}" list`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as any
    const raw: Array<string> = response.body.statusMessage.split(' ')
    const tags: Array<string> = []
    for (const string of raw) {
      if (string.startsWith("§a")) tags.push(string.replace('§a', '').replace('§r', '')
        .replace(',', ''))
    }

    return tags
  }

  async hasTag(target: string, tag: string): Promise<boolean> {
    const tags = await this.getTags(target)
    if (!tags.includes(tag)) return false

    return true
  }

}

export default playerManager
