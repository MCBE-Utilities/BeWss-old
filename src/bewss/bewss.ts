import { bewssOptions } from './@interface/bewss.i'
import commandManager from "./command/commandManager"
import consoleManager from "./console/consoleManager"
import eventManager from "./events/eventManager"
import Logger from "./logger/logger"
import pluginManager from "./plugin/pluginManager"
import serverManager from "./server/serverManager"
import worldManager from './world/worldManager'
import playerManager from "./player/playerManager"
import agentManager from "./agent/agentManager"
import scoreboardManager from './scoreboard/scoreboardManager'

class bewss {
  private logger: Logger

  private serverManager: serverManager
  private consoleManager: consoleManager
  private commandManager: commandManager
  private pluginManager: pluginManager
  private worldManager: worldManager
  private playerManager: playerManager
  private agentManager: agentManager
  private scoreboardManager: scoreboardManager
  private eventManager: eventManager
  private port = 8080

  constructor(options?: bewssOptions) {
    if (options) {
      this.port = options.port
        ? options.port
        : 8080
    }
    this.logger = new Logger()
    this.serverManager = new serverManager(this, this.port)
    this.consoleManager = new consoleManager(this)
    this.commandManager = new commandManager(this)
    this.pluginManager = new pluginManager(this)
    this.worldManager = new worldManager(this)
    this.playerManager = new playerManager(this)
    this.agentManager = new agentManager(this)
    this.scoreboardManager = new scoreboardManager(this)
    this.eventManager = new eventManager(this)
    this.onEnabled()
  }

  async onEnabled(): Promise<void> {
    await this.pluginManager.onEnabled()
    this.serverManager.onEnabled()
    this.consoleManager.onEnabled()
    this.commandManager.onEnabled()
    this.worldManager.onEnabled()
    this.playerManager.onEnabled()
    this.agentManager.onEnabled()
    this.scoreboardManager.onEnabled()
    this.eventManager.onEnabled()
  }

  async onDisabled(): Promise<void> {
    await this.pluginManager.onDisabled()
    await this.serverManager.onDisabled()
    await this.consoleManager.onDisabled()
    await this.commandManager.onDisabled()
    await this.worldManager.onDisabled()
    await this.playerManager.onDisabled()
    await this.agentManager.onDisabled()
    await this.scoreboardManager.onDisabled()
    await this.eventManager.onDisabled()
    
    // Give Small Time Before Exit
    setTimeout(() => {
      process.exit(0)
    }, 1500)
  }

  getLogger(): Logger {
    return this.logger
  }

  getPluginManager(): pluginManager {
    return this.pluginManager
  }

  getServerManager(): serverManager {
    return this.serverManager
  }

  getConsoleManager(): consoleManager {
    return this.consoleManager
  }

  getCommandManager(): commandManager {
    return this.commandManager
  }

  getWorldManager(): worldManager {
    return this.worldManager
  }

  getPlayerManager(): playerManager {
    return this.playerManager
  }

  getAgentManager(): agentManager {
    return this.agentManager
  }

  getScoreboardManager(): scoreboardManager {
    return this.scoreboardManager
  }

  getEventManager(): eventManager {
    return this.eventManager
  }

}

export default bewss
