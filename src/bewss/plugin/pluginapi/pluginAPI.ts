import commandManager from "src/bewss/command/commandManager"
import consoleManager from "src/bewss/console/consoleManager"
import eventManager from "src/bewss/events/eventManager"
import serverManager from "src/bewss/server/serverManager"
import playerManager from "src/bewss/player/playerManager"
import agentManager from "src/bewss/agent/agentManager"
import scoreboardManager from "src/bewss/scoreboard/scoreboardManager"
import bewss from "../../bewss"
import { examplePluginConfig } from '../../@interface/bewss.i'
import {
  default as Logger,
  colors,
} from './logger'
import worldManager from "src/bewss/world/worldManager"

class pluginAPI {
  private bewss: bewss
  public config: examplePluginConfig
  public path: string
  public color: colors = 'red'
  private logger: Logger

  constructor(bewss: bewss, config: examplePluginConfig, path: string) {
    this.bewss = bewss
    this.config = config
    this.path = path
    this.logger = new Logger(this, this.color)
  }

  setColor(color: colors): void {
    this.color = color
  }

  getLogger(color?: colors): Logger {
    this.logger.color = color || this.color

    return this.logger
  }

  getServerManager(): serverManager {
    return this.bewss.getServerManager()
  }

  getConsoleManager(): consoleManager {
    return this.bewss.getConsoleManager()
  }

  getCommandManager(): commandManager {
    return this.bewss.getCommandManager()
  }

  getWorldManager(): worldManager {
    return this.bewss.getWorldManager()
  }

  getPlayerManager(): playerManager {
    return this.bewss.getPlayerManager()
  }

  getAgentManager(): agentManager {
    return this.bewss.getAgentManager()
  }

  getScoreboardManager(): scoreboardManager {
    return this.bewss.getScoreboardManager()
  }

  getEventManager(): eventManager {
    return this.bewss.getEventManager()
  }

}

export default pluginAPI
