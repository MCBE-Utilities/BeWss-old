import commandManager from "src/bewss/command/commandManager"
import consoleManager from "src/bewss/console/consoleManager"
import eventManager from "src/bewss/events/eventManager"
import serverManager from "src/bewss/server/serverManager"
import bewss from "../../bewss"
import { examplePluginConfig } from '../../@interface/bewss.i'
import {
  default as Logger,
  colors,
} from './logger'
import playerManager from "src/bewss/player/playerManager"
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

  getPlayerManager(): playerManager {
    return this.bewss.getPlayerManager()
  }

  getEventManager(): eventManager {
    return this.bewss.getEventManager()
  }

}

export default pluginAPI
