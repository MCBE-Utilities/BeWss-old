/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
interface bewss {
  getLogger(): logger
  getServerManager(): serverManager
  getConsoleManager(): consoleManager
  getCommandManager(): commandManager
  getEventManager(): eventManager
}

interface logger {
  success(content: string): void
  info(content: string): void
  warn(content: string): void
  error(content: string): void
}

interface serverManager {
  new(bewss: bewss)
  getServer(): any
}

interface consoleManager {
  new(bewss: bewss)
  getCommandName(): Array<string>
  registerCommand(command: string): void
}

interface commandManager {
  new(bewss: bewss)
  executeCommand(command: string): object
}

interface EventValues {
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

export default bewss
