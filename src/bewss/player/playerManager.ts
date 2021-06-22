/* eslint-disable @typescript-eslint/no-explicit-any */
import { playerPosition } from "../@interface/bewss.i"
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
      this.bewss.getEventManager().on('SlashCommandExecuted', (packet: any) => {
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
      this.bewss.getEventManager().on('SlashCommandExecuted', (packet: any) => {
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

  getPlayerPosition(target: string): Promise<playerPosition> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/querytarget "${target}"`) as { command: string, requestId: string }
      this.bewss.getEventManager().on('SlashCommandExecuted', (packet: any) => {
        if (command.requestId != packet.header.requestId) return
        
        res(JSON.parse(packet.body.details)[0])
      })
    })
  }
}

export default playerManager
