/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bewss from '../bewss'
import { EventEmitter } from 'events'
import { v4 as uuidv4 } from 'uuid'
import { EventValues } from '../@interface/bewss.i'
import {
  AgentCommand,
  AgentCreated,
  BlockBroken,
  BlockPlaced,
  BossKilled,
  EntitySpawned,
  ItemAcquired,
  ItemCrafted,
  ItemDestroyed,
  ItemDropped,
  ItemUsed,
  MobInteracted,
  MobKilled,
  PlayerDied,
  PlayerJoin,
  PlayerLeave,
  PlayerMessage,
  PlayerTeleported,
  PlayerTransform,
  PlayerTravelled,
  RawEvent,
  SlashCommandExecuted,
} from "./events/index"

interface exampleEvent {
  onEnabled(): Promise<void>
  onDisabled(): Promise<void>
}
interface eventManager {
  new(bewss: bewss)
  onEnabled(): Promise<void>
  onDisabled(): Promise<void>
  registerEvent(event: string): Promise<void>
  unregisterEvent(event: string): Promise<void>
  on<K extends keyof EventValues>(event: K, callback: (...args: EventValues[K]) => void): this
  on<S extends string | symbol>(
    event: Exclude<S, keyof EventValues>,
    callback: (...args: unknown[]) => void,
  ): this
  once<K extends keyof EventValues>(event: K, callback: (...args: EventValues[K]) => void): this
  once<S extends string | symbol>(
    event: Exclude<S, keyof EventValues>,
    callback: (...args: unknown[]) => void,
  ): this
  emit<K extends keyof EventValues>(event: K, ...args: EventValues[K]): boolean
  emit<S extends string | symbol>(
    event: Exclude<S, keyof EventValues>,
    ...args: unknown[]
  ): boolean
}

class eventManager extends EventEmitter {
  private bewss: bewss
  private events =  new Map<string, exampleEvent>()

  constructor(bewss: bewss) {
    super()
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    this.on('wss-connected', async () => {
      this.setMaxListeners(100)
      await this.loadDefaultEvents()
      for (const event of this.events.values()) {
        event.onEnabled()
      }
    })
  }

  async onDisabled(): Promise<void> {
    for (const event of this.events.values()) {
      event.onDisabled()
    }

    return Promise.resolve()
  }

  async registerEvent(event: string): Promise<void> {
    this.bewss.getServerManager().getServer()
      .send(JSON.stringify(
        {
          "body": {
            "eventName": event,
          },
          "header": {
            "requestId": uuidv4(),
            "messagePurpose": 'subscribe',
            "version": 1,
          },
        },
      ))
  } 

  async unregisterEvent(event: string): Promise<void> {
    this.bewss.getServerManager().getServer()
      .send(JSON.stringify(
        {
          "body": {
            "eventName": event,
          },
          "header": {
            "requestId": uuidv4(),
            "messagePurpose": 'unsubscribe',
            "version": 1,
          },
        },
      ))
  }

  private async loadDefaultEvents(): Promise<void> {
    const agentCommand = new AgentCommand(this.bewss)
    this.events.set(agentCommand.eventName, agentCommand)
    const agentCreated = new AgentCreated(this.bewss)
    this.events.set(agentCreated.eventName, agentCreated)
    const blockBroken = new BlockBroken(this.bewss)
    this.events.set(blockBroken.eventName, blockBroken)
    const blockPlaced = new BlockPlaced(this.bewss)
    this.events.set(blockPlaced.eventName, blockPlaced)
    const bossKilled = new BossKilled(this.bewss)
    this.events.set(bossKilled.eventName, bossKilled)
    const entitySpawned = new EntitySpawned(this.bewss)
    this.events.set(entitySpawned.eventName, entitySpawned)
    const itemAcquired = new ItemAcquired(this.bewss)
    this.events.set(itemAcquired.eventName, itemAcquired)
    const itemCrafted = new ItemCrafted(this.bewss)
    this.events.set(itemCrafted.eventName, itemCrafted)
    const itemDestroyed = new ItemDestroyed(this.bewss)
    this.events.set(itemDestroyed.eventName, itemDestroyed)
    const itemDropped = new ItemDropped(this.bewss)
    this.events.set(itemDropped.eventName, itemDropped)
    const itemUsed = new ItemUsed(this.bewss)
    this.events.set(itemUsed.eventName, itemUsed)
    const mobInteracted = new MobInteracted(this.bewss)
    this.events.set(mobInteracted.eventName, mobInteracted)
    const mobKilled = new MobKilled(this.bewss)
    this.events.set(mobKilled.eventName, mobKilled)
    const playerDied = new PlayerDied(this.bewss)
    this.events.set(playerDied.eventName, playerDied)
    const playerJoin = new PlayerJoin(this.bewss)
    this.events.set(playerJoin.eventName, playerJoin)
    const playerLeave = new PlayerLeave(this.bewss)
    this.events.set(playerLeave.eventName, playerLeave)
    const playerMessage = new PlayerMessage(this.bewss)
    this.events.set(playerMessage.eventName, playerMessage)
    const playerTeleported = new PlayerTeleported(this.bewss)
    this.events.set(playerTeleported.eventName, playerTeleported)
    const playerTransform = new PlayerTransform(this.bewss)
    this.events.set(playerTransform.eventName, playerTransform)
    const playerTravelled = new PlayerTravelled(this.bewss)
    this.events.set(playerTravelled.eventName, playerTravelled)
    const rawEvent = new RawEvent(this.bewss)
    this.events.set(rawEvent.eventName, rawEvent)
    const slashCommandExecuted = new SlashCommandExecuted(this.bewss)
    this.events.set(slashCommandExecuted.eventName, slashCommandExecuted)
  }

}

export default eventManager
