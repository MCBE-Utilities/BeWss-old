/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk'
import moment from 'moment'
import bewss from "../bewss"
import path from "path"
import fs from "fs"
import fse from "fs-extra"
import childProcess from "child_process"

class pluginManager {
  private bewss: bewss
  private plugins = {
    plugin: new Map(),
  }

  constructor (bewss: bewss) {
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    await this.loadPlugins()
    await this.plugins.plugin.forEach((plugin: any) => {
      plugin.onEnabled()
    })

    return
  }

  async onDisabled(): Promise<void> {
    this.plugins.plugin.forEach((plugin: any) => {
      plugin.onDisabled()
    })
  }

  async loadPlugins(): Promise<void> {
    return new Promise(async (res: any) => {
      const folders: Array<string> = []

      const pluginFolder = fs.readdirSync(__dirname + '../../../../../plugins')
      pluginFolder.forEach((file: string) => {
        if (file.includes('.')) return
        folders.push(file)
      })
  
      if (folders.length == 0) {
        this.info('No plugins found!')
        res()
      }

      await folders.forEach(async (folder: string) => {
        if (!fs.existsSync(path.resolve(__dirname + `../../../../../plugins/${folder}/package.json`))) return this.error('Your plugin must include a package.json!')
        const pluginPath = `../../../../../plugins/${folder}`
        const config = require(path.resolve(__dirname + `${pluginPath}/package.json`))
        const mainEntry = path.resolve(__dirname + `${pluginPath}/${config.main}/`)
        fse.copySync(path.resolve(__dirname + '../../../../src/bewss/@interface'), path.resolve(__dirname + `${pluginPath}/src/@interface`))
        if (!fs.existsSync(path.resolve(__dirname + pluginPath + "/node_modules"))) await this.updatePlugin(pluginPath, config)
        if (!fs.existsSync(path.resolve(__dirname + pluginPath + "/dist"))) await this.buildPlugin(pluginPath, config)
        if (config.devMode == true || config.devMode == undefined) {
          this.warn(`[${config.name}] Is running in devMode. Be sure to disable devMode in package.json before production!`)
          await this.buildPlugin(pluginPath, config)
        }
        const PluginClass = require(mainEntry)
        const newPlugin = new PluginClass(this.bewss)
        this.info(`Successfully loaded ${config.name}!`)
        this.plugins.plugin.set(config.name, newPlugin)
      })
      setTimeout(() => res(), 100)
    })
  }

  private async updatePlugin(pluginPath: string, config: any): Promise<void> {
    this.info(`[${config.name}] Installing node packages...`)
    await childProcess.execSync('npm i', {
      stdio: 'ignore',
      cwd: path.resolve(__dirname + pluginPath),
    })
    this.info(`[${config.name}] Installing node packages complete!`)

    return
  }

  private async buildPlugin(pluginPath: string, config: any): Promise<void> {
    this.info(`[${config.name}] Building plugin...`)
    await childProcess.execSync('npm run build', {
      stdio: 'ignore',
      cwd: path.resolve(__dirname + pluginPath), 
    })
    this.info(`[${config.name}] Build complete!`)

    return
  }

  private info(content: string): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.blue("[PluginManager]")} ${chalk.cyan("[Info]")} ${content}`)
  }

  private warn(content: string): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.blue("[PluginManager]")} ${chalk.yellow("[Warn]")} ${content}`)
  }

  private error(content: string): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.blue("[PluginManager]")} ${chalk.red("[Error]")} ${content}`)
  }

}

export default pluginManager
