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
}

export interface logger {
  success(content: string): void
  info(content: string): void
  warn(content: string): void
  error(content: string): void
}

export interface serverManager {
  new(bewss: bewss)
  getServer(): any
}

export interface consoleManager {
  new(bewss: bewss)
  getCommandName(): Array<string>
  registerCommand(command: string): void
}

export interface commandManager {
  new(bewss: bewss)
  executeCommand(command: string): object
}

export interface EventValues {
  PlayerMessage: [PlayerMessage]
  SlashCommandExecuted: [SlashCommandExecuted]
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
  BossKilled: [{body: object, header: object}]
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

export default bewss
