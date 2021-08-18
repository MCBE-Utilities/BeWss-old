/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  playerPosition, titles, messageType, titlerawComponets, playerPositionRealms, SlashCommandExecutedConsole, containers, gamemodes, abilites,
} from "../@interface/bewss.i"
import bewss from "../bewss"

class playerManager {
  private bewss: bewss
  private localePlayerName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    this.bewss.getServerManager().on('wssconnected', async () => {
      const command = await this.bewss.getCommandManager().executeCommand('/getlocalplayername')
      if (command.body.statusCode == -2147483648) return
      this.localePlayerName = command.body.localplayername
    })
  }

  async onDisabled(): Promise<void> {
    this.localePlayerName = ""
    
    return
  }

  getLocalPlayerName(): string {
    return this.localePlayerName
  }

  async getPlayerList(): Promise<Array<string>> {
    const command = await this.bewss.getCommandManager().executeCommand('/list')
    if (command.body.players == undefined || command.body.statusCode == -2147483648) return
    const playersString: string = command.body.players

    return playersString.split(', ')
  }

  sendMessage(type: messageType , target: string, content: string | Array<titlerawComponets>): void {
    if (type == "text") {
      if (target == "@s") target = this.localePlayerName
      if (/^@s$|^@a$|^@p$|^@r$|^@e$/.test(target)) {
        this.bewss.getCommandManager().executeCommand(`/tellraw ${target} {"rawtext":[{"text":"${content}"}]}`)
      } else {
        this.bewss.getCommandManager().executeCommand(`/tellraw "${target}" {"rawtext":[{"text":"${content}"}]}`)
      }
    }

    if (type == "json") {
      if (target == "@s") target = this.localePlayerName
      if (/^@s$|^@a$|^@p$|^@r$|^@e$/.test(target)) {
        this.bewss.getCommandManager().executeCommand(`/tellraw ${target} {"rawtext":${JSON.stringify(content)}}`)
      } else {
        this.bewss.getCommandManager().executeCommand(`/tellraw "${target}" {"rawtext":${JSON.stringify(content)}}`)
      }
    }
  }

  sendTitle(type: messageType, target: string, content: string | Array<titlerawComponets>, title: titles): void {
    if (type == "text") {
      if (target == "@s") target = this.localePlayerName
      if (/^@s$|^@a$|^@p$|^@r$|^@e$/.test(target)) {
        this.bewss.getCommandManager().executeCommand(`/titleraw ${target} ${title} {"rawtext":[{"text":"${content}"}]}`)
      } else {
        this.bewss.getCommandManager().executeCommand(`/titleraw "${target}" ${title} {"rawtext":[{"text":"${content}"}]}`)
      }
    }

    if (type == "json") {
      if (target == "@s") target = this.localePlayerName
      if (/^@s$|^@a$|^@p$|^@r$|^@e$/.test(target)) {
        this.bewss.getCommandManager().executeCommand(`/titleraw ${target} ${title} {"rawtext":${JSON.stringify(content)}}`)
      } else {
        this.bewss.getCommandManager().executeCommand(`/titleraw "${target}" ${title} {"rawtext":${JSON.stringify(content)}}`)
      }
    }
  }

  async getPlayerPosition(target: string): Promise<playerPosition> {
    const command = await this.bewss.getCommandManager().executeCommand(`/querytarget "${target}"`)
    if (command == undefined || command.body.statusCode == -2147483648) return

    return JSON.parse(command.body.details)[0]
  }

  async getPlayerPositionRealms(target: string): Promise<playerPositionRealms> {
    return new Promise((res) => {
      this.bewss.getCommandManager().executeCommand(`/execute "${target}" ~ ~ ~ tp ~ ~ ~`)
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
    const command = await this.bewss.getCommandManager().executeCommand(`/execute @a[name="${target}",x=${startX},y=${startY},z=${startZ},dx=${directionX},dy=${directionY},dz=${directionZ}] ~ ~ ~ testfor @s`)
    if (command.body.statusCode == -2147352576) return false

    return true
  }

  async getTags(target: string): Promise<Array<string>> {
    const command = await this.bewss.getCommandManager().executeCommand(`/tag "${target}" list`)
    if (command == undefined || command.body.statusCode == -2147483648) return
    const raw: Array<string> = command.body.statusMessage.split(' ')
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
    const command = await this.bewss.getCommandManager().executeCommand(`/tag "${target}" add "${tag}"`)

    return command
  } 

  async removeTag(target: string, tag: string): Promise<SlashCommandExecutedConsole> {
    const command = await this.bewss.getCommandManager().executeCommand(`/tag "${target}" remove "${tag}"`)

    return command
  } 

  async kick(target: string, reason: string): Promise<SlashCommandExecutedConsole> {
    const command = await this.bewss.getCommandManager().executeCommand(`/kick "${target}" ${reason}`)

    return command
  }

  async teleport(target: string, x: number , y: number, z: number): Promise<SlashCommandExecutedConsole> {
    const command = await this.bewss.getCommandManager().executeCommand(`/tp "${target}" ${x} ${y} ${z}`)

    return command
  }

  async give(target: string, item: string, amount: number, data: number): Promise<SlashCommandExecutedConsole> {
    const command = await this.bewss.getCommandManager().executeCommand(`/give "${target}" ${item} ${amount} ${data}`)

    return command
  }

  async replaceItem(target: string, container: containers, slot: number, item: string, amount: number, data: number): Promise<SlashCommandExecutedConsole> {
    const command = await this.bewss.getCommandManager().executeCommand(`/replaceitem entity "${target}" ${container} ${slot} ${item} ${amount} ${data}`)

    return command
  }

  async updateGamemode(target: string, gamemode: gamemodes): Promise<SlashCommandExecutedConsole> {
    const command = await this.bewss.getCommandManager().executeCommand(`/gamemode ${gamemode} "${target}"`)

    return command
  }

  async updateAbility(target: string, ability: abilites, enabled: boolean): Promise<SlashCommandExecutedConsole> {
    const command = await this.bewss.getCommandManager().executeCommand(`/ability "${target}" ${ability} ${enabled}`)

    return command
  }

  async getXpLevel(target: string): Promise<number> {
    const command = await this.bewss.getCommandManager().executeCommand(`/xp 0 "${target}"`) as any

    return command.body.level
  }

  async addXp(target: string, amount: number): Promise<SlashCommandExecutedConsole> {
    const command = await this.bewss.getCommandManager().executeCommand(`/xp ${amount} "${target}"`)

    return command
  }

  async addXpLevel(target: string, amount: number): Promise<SlashCommandExecutedConsole> {
    const command = await this.bewss.getCommandManager().executeCommand(`/xp ${amount}l "${target}"`)

    return command
  }

  async removeXp(target: string, amount: number): Promise<SlashCommandExecutedConsole> {
    const command = await this.bewss.getCommandManager().executeCommand(`/xp -${amount} "${target}"`)

    return command
  }

  async removeXpLevel(target: string, amount: number): Promise<SlashCommandExecutedConsole> {
    const command = await this.bewss.getCommandManager().executeCommand(`/xp -${amount}l "${target}"`)

    return command
  }

  async getItemCount(target: string, item: string): Promise<number> {
    const command = await this.bewss.getCommandManager().executeCommand(`/clear "${target}" ${item} 0 0`) as any
    if (command.body.statusMessage.includes('no items to remove')) return 0

    return parseInt(command.body.statusMessage.replace(`${target} has `, '').replace(' items that match the criteria', ''))
  }
}

export default playerManager
