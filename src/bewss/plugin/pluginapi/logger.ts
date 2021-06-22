import chalk from "chalk"
import moment from "moment"
import pluginAPI from "./pluginApi"

export type colors = (
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

class logger {
  private pluginAPI: pluginAPI
  public color: colors
  
  constructor(pluginAPI: pluginAPI, color: colors) {
    this.pluginAPI = pluginAPI
    this.color = color
  }

  public success(...content: unknown[]): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.blue("[PluginApi]")} ${chalk[this.color](`[${this.pluginAPI.config.name || this.pluginAPI.path}]`)} ${chalk.green("[Success]")}`, ...content)
  }

  public info(...content: unknown[]): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.blue("[PluginApi]")} ${chalk[this.color](`[${this.pluginAPI.config.name || this.pluginAPI.path}]`)} ${chalk.cyan("[Info]")}`, ...content)
  }

  public warn(...content: unknown[]): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.blue("[PluginApi]")} ${chalk[this.color](`[${this.pluginAPI.config.name || this.pluginAPI.path}]`)} ${chalk.yellow("[Warn]")}`, ...content)
  }

  public error(...content: unknown[]): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.blue("[PluginApi]")} ${chalk[this.color](`[${this.pluginAPI.config.name || this.pluginAPI.path}]`)} ${chalk.red("[Error]")}`, ...content)
  }

}

export default logger
