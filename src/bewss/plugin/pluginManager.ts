import chalk from 'chalk'
import moment from 'moment'
import bewss from "../bewss"
import path from "path"
import fs from "fs"
import fse from "fs-extra"
import childProcess from "child_process"

interface examplePlugin {
  new (bewss: bewss)
  onEnabled(): Promise<void>
  onDisabled(): Promise<void>
}

interface examplePluginConfig {
  name: string
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
  devdependencies: {
    [key: string]: string
  }
  [key: string]: unknown
}
class pluginManager {
  private bewss: bewss
  private plugins = new Map<string, { config: examplePluginConfig, plugin: examplePlugin }>()

  constructor(bewss: bewss) {
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    //
  }

  async onDisabled(): Promise<void> {
    //
  }

  async register(): Promise<void> {
    
  }


  private info(...content: unknown[]): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.blue("[PluginManager]")} ${chalk.cyan("[Info]")}`, ...content)
  }
  private warn(...content: unknown[]): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.blue("[PluginManager]")} ${chalk.yellow("[Warn]")}`, ...content)
  }
  private error(...content: unknown[]): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.blue("[PluginManager]")} ${chalk.red("[Error]")}`, ...content)
  }

}

export default pluginManager
