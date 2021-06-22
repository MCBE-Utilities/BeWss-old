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
  PlayerMessage: [unknown]
  SlashCommandExecuted: [unknown]
  BlockBroken: [unknown]
  BlockPlaced: [unknown]
  EntitySpawned: [unknown]
  ItemAcquired: [unknown]
  ItemCrafted: [unknown]
  ItemDestroyed: [unknown]
  ItemDropped: [unknown] // Doesnt work
  ItemUsed: [unknown]
  MobInteracted: [unknown]
  MobKilled: [unknown]
  PlayerDied: [unknown]
  PlayerJoin: [unknown] // Doesnt work
  PlayerLeave: [unknown] // Doesnt work
  PlayerTravelled: [unknown]
  PlayerTransform: [unknown]
  PlayerTeleported: [unknown]
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
