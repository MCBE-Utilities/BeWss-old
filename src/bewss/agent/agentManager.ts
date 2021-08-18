import {
  createAgent,
  directions,
  getPositionAgent,
  genericAgent,
  teleportAgent, 
} from "../@interface/bewss.i"
import bewss from "../bewss"

class agentManager {
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

  async create(): Promise<createAgent> {
    const command = await this.bewss.getCommandManager().executeCommand('/agent create')

    return command
  }

  async getPosition(): Promise<getPositionAgent> {
    const command = await this.bewss.getCommandManager().executeCommand('/agent getposition')

    return command
  }

  async teleport(x: number, y: number, z: number): Promise<teleportAgent> {
    const command = await this.bewss.getCommandManager().executeCommand(`/agent tp ${x} ${y} ${z}`)

    return command
  }

  async inspect(direction: directions): Promise<genericAgent> {
    const command = await this.bewss.getCommandManager().executeCommand(`/agent inspect ${direction}`)

    return command
  }

  async inspectData(direction: directions): Promise<genericAgent> {
    const command = await this.bewss.getCommandManager().executeCommand(`/agent inspectdata ${direction}`)

    return command
  }

  async setItem(slot: number, item: string, amount: number, data: number): Promise<genericAgent> {
    const command = await this.bewss.getCommandManager().executeCommand(`/agent setitem ${slot} ${item} ${amount} ${data}`)

    return command
  }

  async getItem(slot: number): Promise<genericAgent> {
    const command = await this.bewss.getCommandManager().executeCommand(`/agent getitemdetail ${slot}`)

    return command
  }

  async  getItemCount(slot: number): Promise<genericAgent> {
    const command = await this.bewss.getCommandManager().executeCommand(`/agent getitemcount ${slot}`)

    return command
  }

  async transferItem(slot: number, amount: number, destslot: number): Promise<genericAgent> {
    const command = await this.bewss.getCommandManager().executeCommand(`/agent transfer ${slot} ${amount} ${destslot}`)

    return command
  }

  async dropItem(slot: number, amount: number, direction: directions): Promise<genericAgent> {
    const command = await this.bewss.getCommandManager().executeCommand(`/agent drop ${slot} ${amount} ${direction}`)

    return command
  }

  async turn(direction: directions): Promise<genericAgent> {
    const command = await this.bewss.getCommandManager().executeCommand(`/agent turn ${direction}`)

    return command
  }

  async move(direction: directions): Promise<genericAgent> {
    const command = await this.bewss.getCommandManager().executeCommand(`/agent move ${direction}`)

    return command
  }

  async attack(direction: directions): Promise<genericAgent> {
    const command = await this.bewss.getCommandManager().executeCommand(`/agent attack ${direction}`)

    return command
  }

  async place(slot: number, direction: directions): Promise<genericAgent> {
    const command = await this.bewss.getCommandManager().executeCommand(`/agent place ${slot} ${direction}`)

    return command
  }

  async destroy(direction: directions): Promise<genericAgent> {
    const command = await this.bewss.getCommandManager().executeCommand(`/agent destroy ${direction}`)

    return command
  }

  async collect(item: string): Promise<genericAgent> {
    const command = await this.bewss.getCommandManager().executeCommand(`/agent collect ${item}`)

    return command
  }

  async till(direction: directions): Promise<genericAgent> {
    const command = await this.bewss.getCommandManager().executeCommand(`/agent till ${direction}`)

    return command
  }

}

export default agentManager
