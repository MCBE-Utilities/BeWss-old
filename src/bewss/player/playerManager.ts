/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  playerPosition, titles, messageType, titlerawComponets, commandResponse, playerPositionRealms, SlashCommandExecutedConsole, containers, gamemodes, abilites,
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
      if (response.body.statusCode == -2147483648) return
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
    if (response.body.players == undefined || response.body.statusCode == -2147483648) return
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
    if (response == undefined || response.body.statusCode == -2147483648) return

    return JSON.parse(response.body.details)[0]
  }

  async getPlayerPositionRealms(target: string): Promise<playerPositionRealms> {
    return new Promise((res) => {
      this.bewss.getCommandManager().executeCommand(`/execute "${target}" ~ ~ ~ tp ~ ~ ~`) as commandResponse
      this.bewss.getEventManager().on('PlayerTransform', (packet) => {
        return res({
          x: packet.body.properties.PosX,
          y: packet.body.properties.PosY,
          z: packet.body.properties.PosZ,
        })
      })
    })
  }

  async inPosition(target: string, startX: number, startY: number, startZ: number, directionX: number, directionY: number, directionZ: number): Promise<boolean> {
    const command = this.bewss.getCommandManager().executeCommand(`/execute @a[name="${target}",x=${startX},y=${startY},z=${startZ},dx=${directionX},dy=${directionY},dz=${directionZ}] ~ ~ ~ testfor @s`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as any
    if (response.body.statusCode == -2147352576) return false

    return true
  }

  async getTags(target: string): Promise<Array<string>> {
    const command = this.bewss.getCommandManager().executeCommand(`/tag "${target}" list`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as any
    if (response == undefined || response.body.statusCode == -2147483648) return
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

  async addTag(target: string, tag: string): Promise<SlashCommandExecutedConsole> {
    const command = this.bewss.getCommandManager().executeCommand(`/tag "${target}" add "${tag}"`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId)

    return response
  } 

  async removeTag(target: string, tag: string): Promise<SlashCommandExecutedConsole> {
    const command = this.bewss.getCommandManager().executeCommand(`/tag "${target}" remove "${tag}"`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId)

    return response
  } 

  async kick(target: string, reason: string): Promise<SlashCommandExecutedConsole> {
    const command = this.bewss.getCommandManager().executeCommand(`/kick "${target}" ${reason}`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId)

    return response
  }

  async teleport(target: string, x: number , y: number, z: number): Promise<SlashCommandExecutedConsole> {
    const command = this.bewss.getCommandManager().executeCommand(`/tp "${target}" ${x} ${y} ${z}`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId)

    return response
  }

  async give(target: string, item: string, amount: number, data: number): Promise<SlashCommandExecutedConsole> {
    const command = this.bewss.getCommandManager().executeCommand(`/give "${target}" ${item} ${amount} ${data}`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId)

    return response
  }

  async replaceItem(target: string, container: containers, slot: number, item: string, amount: number, data: number): Promise<SlashCommandExecutedConsole> {
    const command = this.bewss.getCommandManager().executeCommand(`/replaceitem entity "${target}" ${container} ${slot} ${item} ${amount} ${data}`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId)

    return response
  }

  async updateGamemode(target: string, gamemode: gamemodes): Promise<SlashCommandExecutedConsole> {
    const command = this.bewss.getCommandManager().executeCommand(`/gamemode ${gamemode} "${target}"`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId)

    return response
  }

  async updateAbility(target: string, ability: abilites, enabled: boolean): Promise<SlashCommandExecutedConsole> {
    const command = this.bewss.getCommandManager().executeCommand(`/ability "${target}" ${ability} ${enabled}`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId)

    return response
  }

  async getXpLevel(target: string): Promise<number> {
    const command = this.bewss.getCommandManager().executeCommand(`/xp 0 "${target}"`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId) as any

    return response.body.level
  }

  async addXp(target: string, amount: number): Promise<SlashCommandExecutedConsole> {
    const command = this.bewss.getCommandManager().executeCommand(`/xp ${amount} "${target}"`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId)

    return response
  }

  async addXpLevel(target: string, amount: number): Promise<SlashCommandExecutedConsole> {
    const command = this.bewss.getCommandManager().executeCommand(`/xp ${amount}l "${target}"`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId)

    return response
  }

  async removeXp(target: string, amount: number): Promise<SlashCommandExecutedConsole> {
    const command = this.bewss.getCommandManager().executeCommand(`/xp -${amount} "${target}"`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId)

    return response
  }

  async removeXpLevel(target: string, amount: number): Promise<SlashCommandExecutedConsole> {
    const command = this.bewss.getCommandManager().executeCommand(`/xp -${amount}l "${target}"`) as commandResponse
    const response = await this.bewss.getCommandManager().findResponse(command.requestId)

    return response
  }
}

export default playerManager
