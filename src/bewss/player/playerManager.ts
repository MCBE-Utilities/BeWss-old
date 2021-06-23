/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  playerPosition, titles, 
} from "../@interface/bewss.i"
import bewss from "../bewss"

class playerManager {
  private bewss: bewss
  private localePlayerName: string

  constructor(bewss: bewss) {
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    this.bewss.getEventManager().on('wss-connected', () => {
      const command = this.bewss.getCommandManager().executeCommand('/getlocalplayername') as { command: string, requestId: string }
      this.bewss.getEventManager().on('SlashCommandExecutedConsole', (packet: any) => {
        if (command.requestId != packet.header.requestId) return
        this.localePlayerName = packet.body.localplayername
      })
    })
  }

  async onDisabled(): Promise<void> {
    this.localePlayerName = ""
  }

  getLocalPlayerName(): string {
    return this.localePlayerName
  }

  getPlayerList(): Promise<Array<string>> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand('/list') as { command: string, requestId: string }
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: any) => {
        if (command.requestId != packet.header.requestId) return
        const playersString: string = packet.body.players
        res(playersString.split(', '))
      })
    })
  }

  sendMessage(target: string, content: string): void {
    if (target == "@s") target = this.localePlayerName
    if (target.includes("@s" || "@p" || "@r" || "@a" || "@e")) {
      this.bewss.getCommandManager().executeCommand(`/tellraw ${target} {"rawtext":[{"text":"${content}"}]}`)
    } else {
      this.bewss.getCommandManager().executeCommand(`/tellraw "${target}" {"rawtext":[{"text":"${content}"}]}`)
    }
  }

  sendTitleraw(target: string, content: string, title: titles): void {
    if (target == "@s") target = this.localePlayerName
    if (target.includes("@s" || "@p" || "@r" || "@a" || "@e")) {
      this.bewss.getCommandManager().executeCommand(`/titleraw ${target} ${title} {"rawtext":[{"text":"${content}"}]}`)
    } else {
      this.bewss.getCommandManager().executeCommand(`/titleraw "${target}" ${title} {"rawtext":[{"text":"${content}"}]}`)
    }
  }

  getPlayerPosition(target: string): Promise<playerPosition | undefined> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/querytarget "${target}"`) as { command: string, requestId: string }
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: any) => {
        if (command.requestId != packet.header.requestId || packet == undefined) return res(undefined)
        if (packet.body.details == undefined) return res(undefined)
        res(JSON.parse(packet.body.details)[0])
      })
    })
  }

  getTags(target: string): Promise<Array<string>> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/tag "${target}" list`) as { command: string, requestId: string }
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: any) => {
        if (command.requestId != packet.header.requestId) return
        const raw: Array<string> = packet.body.statusMessage.split(' ')
        const tags: Array<string> = []
        for (const string of raw) {
          if (string.startsWith("§a")) tags.push(string.replace('§a', '').replace('§r', '')
            .replace(',', ''))
        }
        res(tags)
      })
    })
  }

  hasTag(target: string, tag: string): Promise<boolean> {
    return new Promise(async (res) => {
      const tags = await this.getTags(target)
      if (!tags.includes(tag)) res(false)
      res(true)
    })
  }

}

export default playerManager
