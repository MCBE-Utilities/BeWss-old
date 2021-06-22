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
<<<<<<< HEAD
    //
=======
    for (const plugin of this.plugins.values()) {
      plugin.onDisabled()
    }

    return
  }

  async loadPlugins(): Promise<void> {
    return new Promise(async (res) => {
      const folders: Array<string> = []

      const pluginFolderPath = path.resolve(process.cwd(), `../plugins`)
      if (!fs.existsSync(pluginFolderPath)) {
        this.warn("Plugins dir not found skipping plugin manager. To use plugins please create a dir named \"plugins\" in this location:", '"' + path.resolve(process.cwd(), `../`) + '"')
        
        return res()
      }
      const pluginFolder = fs.readdirSync(pluginFolderPath)

      for (const file of pluginFolder) {
        if (!fs.statSync(path.resolve(process.cwd(), `../plugins/${file}`)).isDirectory()) continue
        folders.push(file)
      }
  
      if (folders.length < 1) {
        this.info('No plugins found!')
        res()
      }

      for (const folder of folders) {
        try {
          const pluginPath = path.resolve(process.cwd(), `../plugins/${folder}`)
          if (!fs.existsSync(path.resolve(pluginPath, 'package.json'))) return this.error(`plugins/${folder} missing package.json. Cannot load plugin!`)
          const config: examplePluginConfig = require(path.resolve(pluginPath, 'package.json'))
          const mainEntry = path.resolve(pluginPath, config.main)
          fse.copySync(path.resolve(process.cwd(), 'src/bewss/@interface'), path.resolve(`${pluginPath}/src/@interface`))
          let neededUpdate = false
          let succeededUpdate = true
          if (!fs.existsSync(path.resolve(pluginPath, "node_modules"))) {
            neededUpdate = true
            succeededUpdate = await this.updatePlugin(pluginPath, config)
          }
          if (neededUpdate && !succeededUpdate) return this.warn(`Skipping plugin "${config.name}" due to errors during installing dependencies`)
          let buildSuc = true
          let alrbuilt = false
          if (!fs.existsSync(path.resolve(pluginPath, "dist"))) {
            const resp = await this.buildPlugin(pluginPath, config)
            buildSuc = resp
            alrbuilt = resp
          }
          if (!config.devMode === false && !alrbuilt) {
            this.warn(`[${config.name}] devMode enabled, set devMode to false in package.json to disable`)
            buildSuc = await this.buildPlugin(pluginPath, config)
          }
          if (buildSuc) {
            try {
              const PluginClass = require(mainEntry)
              const newPlugin = new PluginClass(this.bewss)
              this.info(`Successfully loaded ${config.name}!`)
              this.plugins.set(config.name, newPlugin)
            } catch (error) {
              this.error(`"${config.name}"` + "Uncaught Exception(s):\n", error)
            }
          } else {
            this.warn(`Skipping plugin "${config.name}" due to errors during building`)
          }
        } catch (error) {
          this.error("Failed to load plugin " + `plugins/${folder}, ` + "Recieved Error(s):\n", error)
        }
      }

      res()
    })
>>>>>>> 94cdbed25af3c8450102be8da41aeaada28362a5
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
