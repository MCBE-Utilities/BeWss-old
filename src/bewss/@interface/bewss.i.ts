/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

export interface bewssOptions {
  /**
   * @default 8080
   */
  port?: number
}
export interface bewss {
  new (options?: bewssOptions)
  getLogger(): logger
  getServerManager(): serverManager
  getConsoleManager(): consoleManager
  getCommandManager(): commandManager
  getEventManager(): eventManager
  getWorldManager(): worldManager
  getEntityManager(): entityManager
  getPlayerManager(): playerManager
  getAgentManager(): agentManager
  getScoreboardManager(): scoreboardManager
}

export interface pluginApi {
  new (bewss: bewss, config: examplePluginConfig, path: string)
  getLogger(color?: colors): logger
  getServerManager(): serverManager
  getConsoleManager(): consoleManager
  getCommandManager(): commandManager
  getEventManager(): eventManager
  getWorldManager(): worldManager
  getEntityManager(): entityManager
  getPlayerManager(): playerManager
  getAgentManager(): agentManager
  getScoreboardManager(): scoreboardManager
  setColor(color: colors): void
}

export interface examplePluginConfig {
  name: string
  displayName: string
  version: string
  description: string
  devMode: boolean
  main: string
  scripts: {
    build: string
    dev: string
    start: string
    [key: string]: string
  }
  author: string
  license: string
  dependencies: {
    [key: string]: string
  }
  devDependencies: {
    [key: string]: string
  }
  [key: string]: unknown
}

type colors = (
  "black" |
  "red" |
  "green" |
  "yellow" |
  "blue" |
  "magenta" |
  "cyan" |
  "white" |
  "gray"
)

export interface logger {
  success(...content: unknown[]): void
  info(...content: unknown[]): void
  warn(...content: unknown[]): void
  error(...content: unknown[]): void
}

interface ServerEventValues {
  wsslistening: []
  wssconnected: []
  wssclosed: []
  wsserror: [Error]
  wssmessage: [any]
}

export interface serverManager {
  new(bewss: bewss)
  sendJSON(json: JSON): void
  sendBuffer(buffer: Buffer): void
  getServer(): serverManager
  on<K extends keyof ServerEventValues>(event: K, callback: (...args: ServerEventValues[K]) => void): this
  on<S extends string | symbol>(
    event: Exclude<S, keyof ServerEventValues>,
    callback: (...args: unknown[]) => void,
  ): this
  once<K extends keyof ServerEventValues>(event: K, callback: (...args: ServerEventValues[K]) => void): this
  once<S extends string | symbol>(
    event: Exclude<S, keyof ServerEventValues>,
    callback: (...args: unknown[]) => void,
  ): this
  emit<K extends keyof ServerEventValues>(event: K, ...args: ServerEventValues[K]): boolean
  emit<S extends string | symbol>(
    event: Exclude<S, keyof ServerEventValues>,
    ...args: unknown[]
  ): boolean
}

interface CommandEventValues {
  CommandRegistered: [{ name: string }]
}

export interface consoleManager {
  new(bewss: bewss)
  getCommandName(): Array<string>
  registerCommand(command: string): void
  on<K extends keyof CommandEventValues>(event: K, callback: (...args: CommandEventValues[K]) => void): this
  on<S extends string | symbol>(
    event: Exclude<S, keyof CommandEventValues>,
    callback: (...args: unknown[]) => void,
  ): this
  once<K extends keyof CommandEventValues>(event: K, callback: (...args: CommandEventValues[K]) => void): this
  once<S extends string | symbol>(
    event: Exclude<S, keyof CommandEventValues>,
    callback: (...args: unknown[]) => void,
  ): this
  emit<K extends keyof CommandEventValues>(event: K, ...args: CommandEventValues[K]): boolean
  emit<S extends string | symbol>(
    event: Exclude<S, keyof CommandEventValues>,
    ...args: unknown[]
  ): boolean
}

export interface commandManager {
  new(bewss: bewss)
  executeCommand(command: string): commandResponse
  findResponse(requestId: string): Promise<SlashCommandExecutedConsole>
  registerCommand(command: string): void
  getCommandNames(): Array<string>
  on<K extends keyof CommandEventValues>(event: K, callback: (...args: CommandEventValues[K]) => void): this
  on<S extends string | symbol>(
    event: Exclude<S, keyof CommandEventValues>,
    callback: (...args: unknown[]) => void,
  ): this
  once<K extends keyof CommandEventValues>(event: K, callback: (...args: CommandEventValues[K]) => void): this
  once<S extends string | symbol>(
    event: Exclude<S, keyof CommandEventValues>,
    callback: (...args: unknown[]) => void,
  ): this
  emit<K extends keyof CommandEventValues>(event: K, ...args: CommandEventValues[K]): boolean
  emit<S extends string | symbol>(
    event: Exclude<S, keyof CommandEventValues>,
    ...args: unknown[]
  ): boolean
}

export interface customCommandResponse {
  sender: string
  args: Array<string>
}

export interface commandResponse {
  command: string
  requestId: string
}

export interface worldManager {
  new(bewss): bewss
  getSurfaceBlock(x: number, z: number): Promise<topBlockData>
  getBlock(x: number, y: number, z: number): Promise<blockData>
  setblock(x: number, y: number, z: number, block: string, data: number): Promise<SlashCommandExecutedConsole>
  sendMessage(message: string): void
}

export interface entityManager {
  new(bewss: bewss)
  getEntityList(): Promise<Array<string>>
  summonEntity(entity: string, name: string, x: number, y: number, z: number): Promise<SlashCommandExecutedConsole>
  executeCommandAsEntity(name: string, commands: string): Promise<SlashCommandExecutedConsole>
  removeEntity(name: string): Promise<SlashCommandExecutedConsole>
  removeEntities(entity: string, amount: number): Promise<void>
  getTags(name: string): Promise<Array<string>>
  hasTag(name: string, tag: string): Promise<boolean>
}

export interface playerManager {
  new(bewss: bewss)
  getLocalPlayerName(): string
  getPlayerList(): Promise<Array<string>>
  sendMessage(type: messageType , target: string, content: string | Array<titlerawComponets>): void
  sendTitle(type: messageType, target: string, content: string | Array<titlerawComponets>, title: titles): void
  getPlayerPosition(target: string): Promise<playerPosition>
  getPlayerPositionRealms(target: string): Promise<playerPositionRealms>
  inPosition(target: string, startX: number, startY: number, startZ: number, directionX: number, directionY: number, directionZ: number): Promise<boolean>
  getTags(target: string): Promise<Array<string>>
  hasTag(target: string, tag: string): Promise<boolean>
  addTag(target: string, tag: string): Promise<SlashCommandExecutedConsole>
  removeTag(target: string, tag: string): Promise<SlashCommandExecutedConsole>
  kick(target: string, reason: string): Promise<SlashCommandExecutedConsole>
  teleport(target: string, x: number , y: number, z: number): Promise<SlashCommandExecutedConsole>
  give(target: string, item: string, amount: number, data: number): Promise<SlashCommandExecutedConsole>
  replaceItem(target: string, container: containers, slot: number, item: string, amount: number, data: number): Promise<SlashCommandExecutedConsole>
  updateGamemode(target: string, gamemode: gamemodes): Promise<SlashCommandExecutedConsole>
  updateAbility(target: string, ability: abilites, enabled: boolean): Promise<SlashCommandExecutedConsole>
  getXpLevel(target: string): Promise<number>
  addXp(target: string, amount: number): Promise<SlashCommandExecutedConsole>
  addXpLevel(target: string, amount: number): Promise<SlashCommandExecutedConsole>
  removeXp(target: string, amount: number): Promise<SlashCommandExecutedConsole>
  removeXpLevel(target: string, amount: number): Promise<SlashCommandExecutedConsole>
  getItemCount(target: string, item: string): Promise<number>
}

export type containers = (
  "slot.armor" |
  "slot.armor.chest" |
  "slot.armor.feet" |
  "slot.armor.head" |
  "slot.armor.legs" |
  "slot.chest" |
  "slot.enderchest" |
  "slot.hotbar" |
  "slot.inventory" |
  "slot.saddle" |
  "slot.weapon.mainhand" |
  "slot.weapon.offhand"
)

export type gamemodes = (
  "adventure" |
  "creative" |
  "survival" |
  "default"
)

export type abilites = (
  "mayfly" |
  "mute" |
  "worldbuilder"
)

export interface scoreboardManager {
  new(bewss: bewss)
  createObjective(objective: string, displayname?: string): Promise<genericScoreboard>
  removeObject(objective: string): Promise<genericScoreboard>
  setdisplay(objective: string, display: displays, layout?: layouts | ""): Promise<genericScoreboard>
  getObjectives(): Promise<getObjectives>
  getObjectiveName(objective: string): Promise<string>
  updateScore(target: string, operation: operations, objective: string, amount: number): Promise<genericScoreboard>
  getScore(target: string, objective: string): Promise<getScore>
}

export type titles = (
  "actionbar" |
  "title" |
  "subtitle"
)

export type messageType = (
  "json" | 
  "text"
)

type selector = (
  "@s" | "@p" | "@r" | "@a" | "@e" 
  )

export interface titlerawComponets {
    text?: string
    selecter?: selector | string
    score?: {
      name: selector | string
      objective: string
    }
}

export interface playerPosition {
  dimension: number
  position: {
    x: number
    y: number
    z: number
  }
  uniqueId: string
  yRot: number
}

export interface playerPositionRealms {
  x: number
  y: number
  z: number
}

export interface CommandValues {
  AgentCommandExecued: [unknown]
  ListCommandExecuted: [unknown]
  QueryTargetCommandExecuted: [unknown]
  TagCommandExecuted: [unknown]
  ScoreboardObjectiveCommandExecuted: [unknown]
  ScoreboardPlayerCommandExecuted: [unknown]
}

export interface EventValues {
  PlayerMessage: [PlayerMessage]
  SlashCommandExecuted: [SlashCommandExecuted]
  SlashCommandExecutedConsole: [SlashCommandExecutedConsole]
  BlockBroken: [BlockBroken]
  BlockPlaced: [BlockPlaced]
  EntitySpawned: [EntitySpawned]
  ItemAcquired: [ItemAcquired]
  ItemCrafted: [ItemCrafted]
  ItemDestroyed: [ItemDestroyed]
  ItemDropped: [unknown] // Doesnt work
  ItemUsed: [ItemUsed]
  MobInteracted: [MobInteracted]
  MobKilled: [MobKilled]
  PlayerDied: [PlayerDied]
  PlayerJoin: [unknown] // Doesnt work
  PlayerLeave: [unknown] // Doesnt work
  PlayerTravelled: [PlayerTravelled]
  PlayerTransform: [PlayerTransform]
  PlayerTeleported: [PlayerTeleported]
  BossKilled: [BossKilled]
  RawEvent: [unknown] // Fires when any event is fired.
  AgentCommand: [AgentCommand]
  AgentCreated: [AgentCreated]
}

interface eventHeader {
  messagePurpose: string
  requestId: string
  version: number
}

interface PlayerMessage {
  body: {
    eventName: string
    measurements: null
    properties: {
      AcountType: number
      ActiveSessionID: string
      AppSessionID: string
      Biome: number
      Build: string
      BuildNum: string
      BuildPlat: number
      Cheevos: boolean
      ClientId: string
      CurrentNumDevices: number
      Difficulty: string
      Dim: number
      DnAPlat: string
      GlobalMultiplayerCorrelationId: string
      Message: string
      MessageType: string
      Mode: number
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      Sender: string
      Seq: number
      ServerId: string
      UserId: string
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      locale: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

interface SlashCommandExecuted {
  body: {
    eventName: string
    measurements: null
    properties: {
      AcountType: number
      ActiveSessionID: string
      AppSessionID: string
      Biome: number
      Build: string
      BuildNum: string
      BuildPlat: number
      Cheevos: boolean
      ClientId: string
      CommandName: string
      CurrentNumDevices: number
      Difficulty: string
      Dim: number
      DnAPlat: string
      GlobalMultiplayerCorrelationId: string
      Mode: number
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      Seq: number
      ServerId: string
      UserId: string
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      locale: string
      vrMode: boolean
    }
  }
  header: eventHeader
}
export interface SlashCommandExecutedConsole {
  header: eventHeader
  body: {
    statusCode: number
  }
}

interface BlockBroken {
  body: {
    eventName: string
    measurements: {
      Count: number
    }
    properties: {
      AcountType: number
      ActiveSessionID: string
      AppSessionID: string
      Biome: number
      Block: string
      Build: string
      BuildNum: string
      BuildPlat: number
      Cheevos: boolean
      ClientId: string
      CurrentNumDevices: number
      Difficulty: string
      Dim: number
      DnAPlat: string
      GlobalMultiplayerCorrelationId: string
      Mode: number
      NameSpace: string
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      Seq: number
      ServerId: string
      UserId: string
      Variant: number
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      locale: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

interface BlockPlaced {
  body: {
    eventName: string
    measurements: {
      Count: number
    }
    properties: {
      AcountType: number
      ActiveSessionID: string
      AppSessionID: string
      Biome: number
      Block: string
      Build: string
      BuildNum: string
      BuildPlat: number
      Cheevos: boolean
      ClientId: string
      CurrentNumDevices: number
      Difficulty: string
      Dim: number
      DnAPlat: string
      GlobalMultiplayerCorrelationId: string
      Mode: number
      NameSpace: string
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      Seq: number
      ServerId: string
      UserId: string
      Variant: number
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      locale: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

interface EntitySpawned {
  body: {
    eventName: string
    measurements: null
    properties: {
      AcountType: number
      ActiveSessionID: string
      AppSessionID: string
      Biome: number
      Build: string
      BuildNum: string
      BuildPlat: number
      Cheevos: boolean
      ClientId: string
      CurrentNumDevices: number
      Difficulty: string
      Dim: number
      DnAPlat: string
      GlobalMultiplayerCorrelationId: string
      Mode: number
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      Seq: number
      ServerId: string
      SpawnType: number
      UserId: string
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      locale: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

interface ItemAcquired {
  body: {
    eventName: string
    measurements: {
      Count: number
    }
    properties: {
      AcountType: number
      AcquisitionMethodID: number
      ActiveSessionID: string
      AppSessionID: string
      AuxType: number
      Biome: number
      Build: string
      BuildNum: string
      BuildPlat: number
      Cheevos: boolean
      ClientId: string
      CurrentNumDevices: number
      Difficulty: string
      Dim: number
      DnAPlat: string
      GlobalMultiplayerCorrelationId: string
      Mode: number
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      Seq: number
      ServerId: string
      UserId: string
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      locale: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

interface ItemCrafted {
  body: {
    eventName: string
    measurements: {
      Count: number
    }
    properties: {
      AcountType: number
      ActiveSessionID: string
      AppSessionID: string
      AuxType: number
      Biome: number
      Build: string
      BuildNum: string
      BuildPlat: number
      Cheevos: boolean
      ClientId: string
      CurrentNumDevices: number
      Difficulty: string
      Dim: number
      DnAPlat: string
      DnIgnore: boolean
      EndingTabID: number
      HasCraftableFilterOn: boolean
      Mode: number
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      RecipeBookShown: boolean
      StartingTabID: number
      Type: number
      UsedCraftingTable: boolean
      UsedSearchBar: boolean
      UserId: string
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      locale: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

interface ItemDestroyed {
  body: {
    eventName: string
    measurements: {
      Count: number
    }
    properties: {
      AcountType: number
      ActiveSessionID: string
      AppSessionID: string
      AuxType: number
      Biome: number
      Build: string
      BuildNum: string
      BuildPlat: number
      Cheevos: boolean
      ClientId: string
      CurrentNumDevices: number
      Difficulty: string
      Dim: number
      DnAPlat: string
      GlobalMultiplayerCorrelationId: string
      Mode: number
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      Seq: number
      ServerId: string
      UserId: string
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      locale: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

interface ItemUsed {
  body: {
    eventName: string
    measurements: {
      Count: number
    }
    properties: {
      AcountType: number
      ActiveSessionID: string
      AppSessionID: string
      AuxType: number
      Biome: number
      Build: string
      BuildNum: string
      BuildPlat: number
      Cheevos: boolean
      ClientId: string
      CurrentNumDevices: number
      Difficulty: string
      Dim: number
      DnAPlat: string
      GlobalMultiplayerCorrelationId: string
      Mode: number
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      Seq: number
      ServerId: string
      UserId: string
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      locale: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

interface MobInteracted {
  body: {
    eventName: string
    measurements: null
    properties: {
      AcountType: number
      ActiveSessionID: string
      AppSessionID: string
      Biome: number
      Build: string
      BuildNum: string
      BuildPlat: number
      Cheevos: boolean
      ClientId: string
      CurrentNumDevices: number
      Difficulty: string
      Dim: number
      DnAPlat: string
      GlobalMultiplayerCorrelationId: string
      InteractionType: number
      MobColor: number
      MobType: number
      MobVariant: number
      Mode: number
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      Seq: number
      ServerId: string
      UserId: string
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      locale: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

interface MobKilled {
  body: {
    eventName: string
    measurements: null
    properties: {
      AcountType: number
      ActiveSessionID: string
      AppSessionID: string
      ArmorFeetAuxType: number
      ArmorFeetId: string
      ArmorHeadAuxType: number
      ArmorHeadId: string
      ArmorLegsAuxType: number
      ArmorLegsId: string
      ArmorTorsoAuxType: number
      ArmorTorsoId: string
      Biome: number
      Build: string
      BuildNum: string
      BuildPlat: number
      Cheevos: boolean
      ClientId: string
      CurrentNumDevices: number
      Difficulty: string
      Dim: number
      DnAPlat: string
      GlobalMultiplayerCorrelationId: string
      IsMonster: boolean
      KillMethodType: number
      MobType: number
      MobVariant: number
      Mode: number
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      PlayerIsHiddenFrom: boolean
      Seq: number
      ServerId: string
      UserId: string
      weaponAuxType: number
      waeponType: string
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      locale: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

interface PlayerDied {
  body: {
    eventName: string
    measurements: null
    properties: {
      AcountType: number
      ActiveSessionID: string
      AppSessionID: string
      Biome: number
      Build: string
      BuildNum: string
      BuildPlat: number
      Cheevos: boolean
      ClientId: string
      CurrentNumDevices: number
      Difficulty: string
      Dim: number
      DnAPlat: string
      GlobalMultiplayerCorrelationId: string
      InRaid: boolean
      KillerEntity: number
      MobType: number
      Mode: number
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      Seq: number
      ServerId: string
      UserId: string
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      locale: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

interface PlayerTravelled {
  body: {
    eventName: string
    measurements: {
      MetersTravelled: number
      NewBiome: number
      PosAvgX: number
      PosAvgY: number
      PosAvgZ: number
    }
    properties: {
      ActiveSessionID: string
      Biome: number
      Build: string
      BuildNum: string
      BuildPlat: number
      Cheevos: boolean
      ClientId: string
      DeviceSessionId: string
      Difficulty: string
      Dim: number
      DnAPlat: string
      PlayerGameMode: number
      UserId: string
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

interface PlayerTransform {
  body: {
    eventName: string
    measurements: null
    properties: {
      AcountType: number
      ActiveSessionID: string
      AppSessionID: string
      Biome: number
      Build: string
      BuildNum: string
      BuildPlat: number
      Cheevos: boolean
      ClientId: string
      CurrentNumDevices: number
      Difficulty: string
      Dim: number
      DnAPlat: string
      GlobalMultiplayerCorrelationId: string
      Mode: number
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      PlayerId: string
      PlayerYRot: number
      PosX: number
      PosY: number
      PosZ: number
      Seq: number
      ServerId: string
      UserId: string
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      locale: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

interface PlayerTeleported {
  body: {
    eventName: string
    measurements: null
    properties: {
      AcountType: number
      Biome: number
      Build: string
      BuildNum: string
      BuildPlat: number
      Cheevos: boolean
      ClientId: string
      CurrentNumDevices: number
      Difficulty: string
      Dim: number
      DnAPlat: string
      DnAIgnore: boolean
      MetersTravelled: number
      Mode: number
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      TeleportationCause: number
      TeleportationItem: number
      Seq: number
      ServerId: string
      UserId: string
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      locale: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

interface BossKilled {
  body: {
    eventName: string
    measurements: null
    properties: {
      AcountType: number
      Biome: number
      Build: string
      BuildNum: string
      BuildPlat: number
      Cheevos: boolean
      ClientId: string
      CurrentNumDevices: number
      Difficulty: string
      Dim: number
      DnAPlat: string
      DnAIgnore: boolean
      Mode: number
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      Seq: number
      ServerId: string
      UserId: string
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      locale: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

interface AgentCommand {
  body: {
    eventName: string
    measurements: null
    properties: {
      AccountType: number
      ActiveSessionID: string
      AppSessionID: string
      Biome: number
      BuildNum: string
      BuildPlat: string
      Cheevos: boolean
      ClientId: string
      CurrentNumDevices: number
      DeviceSessionId: string
      Difficulty: string
      Dim: number
      DnAPlat: string
      GlobalMultiplayerCorrelationId: string
      Mode: number
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      Result: string
      Seq: number
      ServerId: string
      UserId: string
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      local: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

interface AgentCreated {
  body: {
    eventName: string
    measurements: null
    properties: {
      AccountType: number
      ActiveSessionID: string
      AppSessionID: string
      Biome: number
      BuildNum: string
      BuildPlat: string
      Cheevos: boolean
      ClientId: string
      CurrentNumDevices: number
      DeviceSessionId: string
      Difficulty: string
      Dim: number
      DnAPlat: string
      GlobalMultiplayerCorrelationId: string
      Mode: number
      NetworkType: number
      Plat: string
      PlayerGameMode: number
      Seq: number
      ServerId: string
      UserId: string
      WorldFeature: number
      WorldSessionId: string
      editionType: string
      isTrial: number
      local: string
      vrMode: boolean
    }
  }
  header: eventHeader
}

export interface eventManager {
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

interface agentManager {
  new(bewss: bewss)
  create(): Promise<createAgent>
  getPosition(): Promise<getPositionAgent>
  teleport(x: number, y: number, z: number): Promise<teleportAgent>
  inspect(direction: directions): Promise<genericAgent>
  inspectData(direction: directions): Promise<genericAgent>
  setItem(slot: number, item: string, amount: number, data: number): Promise<genericAgent>
  getItem(slot: number): Promise<genericAgent>
  getItemCount(slot: number): Promise<genericAgent>
  transferItem(slot: number, amount: number, destslot: number): Promise<genericAgent>
  dropItem(slot: number, amount: number, direction: directions): Promise<genericAgent>
  turn(direction: directions): Promise<genericAgent>
  move(direction: directions): Promise<genericAgent>
  attack(direction: directions): Promise<genericAgent>
  place(slot: number, direction: directions): Promise<genericAgent>
  destroy(direction: directions): Promise<genericAgent>
  collect(item: string): Promise<genericAgent>
  till(direction: directions): Promise<genericAgent>
}

// Agent Command Responses
interface commandHeader {
  messagePurpose: string
  requestId: string
  version: number
}

export type directions = (
  "forward" |
  "back" |
  "right" |
  "left" |
  "up" |
  "down"
)

export interface createAgent extends SlashCommandExecutedConsole {
  body: {
    details: string
    statusCode: number
    statusMessage: string
  }
  header: commandHeader
}

export interface getPositionAgent extends SlashCommandExecutedConsole {
  body: {
    position: {
      x: number
      y: number
      z: number
    }
    statusCode: number
    statusMessage: string
    'y-rot': number
  }
}

export interface teleportAgent extends SlashCommandExecutedConsole {
  body: {
    statusCode: number
    statusMessage: string
  }
}

export interface genericAgent extends SlashCommandExecutedConsole {
  body: {
    statusCode: number
    statusMessage: string
  }
}

// WorldManager
export interface blockData { 
  id: number
  displayName: string
  name: string
  hardness: number
  resistance: number
  minStateId: number
  maxStateId: number
  drops: Array<unknown>
  diggable: boolean
  transparent: boolean
  filterLight: number
  emitLight: number
  boundingBox: string
  stackSize: number
  defaultState: number 
  position: {
    x: number
    y: number
    z: number
  }
}

export interface topBlockData {
  name: string
  position: {
    x: number
    y: number
    z: number
  }
}

export interface testforblockCommand extends SlashCommandExecutedConsole {
   body: {
     matches: boolean
     position: {
       x: number
       y: number
       z: number
     }
     statusCode: number
     statusMessage: string
   }
}

export interface gettopsolidblockCommand extends SlashCommandExecutedConsole {
  body: {
    blockName: string
    position: {
      x: number
      y: number
      z: number
    }
    statusCode: number
  }
}

// ScoreboardManager Responses

export type displays = (
  "belowname" |
  "list" |
  "sidebar"
)

export type layouts = (
  "ascending" | "descending"  | ""
)

export type operations = (
  "add" |
  "remove" |
  "set"
)

export interface genericScoreboard extends SlashCommandExecutedConsole {
  body: {
    statusCode: number
    statusMessage: string
  }
}

export interface getObjectives extends SlashCommandExecutedConsole {
  body: {
    statusCode: number
    statusMessage: string
    objectives: Array<Array<string>>
  }
}

export interface getScore extends SlashCommandExecutedConsole {
  body: {
    statusCode: number
    statusMessage: string
    score: number
    objective: string
    objectiveName: string
  }
}

export default bewss
