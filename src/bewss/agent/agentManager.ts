import {
  commandResponse, createAgent, directions, getPositionAgent, genericAgent, teleportAgent, 
} from "../@interface/bewss.i"
import bewss from "../bewss"

class agentManager {
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

  create(): Promise<createAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand('/agent create') as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: createAgent) => {
        if (command == undefined) return res(undefined)
  
        return res(packet)
      })
    })
  }

  getPosition(): Promise<getPositionAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand('/agent getposition') as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: getPositionAgent) => {
        if (command == undefined) return res(undefined)

        return res(packet)
      })
    })
  }

  teleport(x: number, y: number, z: number): Promise<teleportAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/agent tp ${x} ${y} ${z}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: teleportAgent) => {
        if (command == undefined) return res(undefined)

        return res(packet)
      })
    })
  }

  inspect(direction: directions): Promise<genericAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/agent inspect ${direction}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericAgent) => {
        if (command == undefined) return res(undefined)

        return res(packet)
      })
    })
  }

  inspectData(direction: directions): Promise<genericAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/agent inspectdata ${direction}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericAgent) => {
        if (command == undefined) return res(undefined)

        return res(packet)
      })
    })
  }

  setItem(slot: number, item: string, amount: number, data: number): Promise<genericAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/agent setitem ${slot} ${item} ${amount} ${data}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericAgent) => {
        if (command == undefined) return res(undefined)

        return res(packet)
      })
    })
  }

  getItem(slot: number): Promise<genericAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/agent getitemdetail ${slot}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericAgent) => {
        if (command == undefined) return res(undefined)

        return res(packet)
      })
    })
  }

  getItemCount(slot: number): Promise<genericAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/agent getitemcount ${slot}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericAgent) => {
        if (command == undefined) return res(undefined)

        return res(packet)
      })
    })
  }

  transferItem(slot: number, amount: number, destslot: number): Promise<genericAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/agent transfer ${slot} ${amount} ${destslot}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericAgent) => {
        if (command == undefined) return res(undefined)

        return res(packet)
      })
    })
  }

  dropItem(slot: number, amount: number, direction: directions): Promise<genericAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/agent drop ${slot} ${amount} ${direction}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericAgent) => {
        if (command == undefined) return res(undefined)

        return res(packet)
      })
    })
  }

  turn(direction: directions): Promise<genericAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/agent turn ${direction}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericAgent) => {
        if (command == undefined) return res(undefined)

        return res(packet)
      })
    })
  }

  move(direction: directions): Promise<genericAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/agent move ${direction}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericAgent) => {
        if (command == undefined) return res(undefined)

        return res(packet)
      })
    })
  }

  attack(direction: directions): Promise<genericAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/agent attack ${direction}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericAgent) => {
        if (command == undefined) return res(undefined)

        return res(packet)
      })
    })
  }

  place(slot: number, direction: directions): Promise<genericAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/agent place ${slot} ${direction}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericAgent) => {
        if (command == undefined) return res(undefined)

        return res(packet)
      })
    })
  }

  destroy(direction: directions): Promise<genericAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/agent destroy ${direction}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericAgent) => {
        if (command == undefined) return res(undefined)

        return res(packet)
      })
    })
  }

  collect(item: string): Promise<genericAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/agent collect ${item}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericAgent) => {
        if (command == undefined) return res(undefined)

        return res(packet)
      })
    })
  }

  till(direction: directions): Promise<genericAgent> {
    return new Promise((res) => {
      const command = this.bewss.getCommandManager().executeCommand(`/agent till ${direction}`) as commandResponse
      this.bewss.getEventManager().once('SlashCommandExecutedConsole', (packet: genericAgent) => {
        if (command == undefined) return res(undefined)

        return res(packet)
      })
    })
  }

}

export default agentManager
