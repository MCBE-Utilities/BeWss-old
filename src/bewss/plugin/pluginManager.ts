/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import chalk from 'chalk'
import moment from 'moment'
import bewss from "../bewss"
import path, { resolve } from "path"
import fs from "fs"
import childProcess from "child_process"
import pluginApi from './pluginapi/pluginAPI'
import axios from 'axios'
import { examplePluginConfig } from '../@interface/bewss.i'

interface examplePlugin {
  new (pluginApi: pluginApi)
  onEnabled(): Promise<void>
  onDisabled(): Promise<void>
}


class pluginManager {
  private bewss: bewss
  private plugins = new Map<string, { config: examplePluginConfig, plugin: examplePlugin }>() // path: { config, plugin }
  private pluginNames: Array<string> = []
  private latestInterface = "https://raw.githubusercontent.com/PMK744/Node-BEWSS/main/src/bewss/%40interface/bewss.i.ts"
  public root = path.resolve(process.cwd())
  public pluginsPath = path.resolve(this.root, './plugins')

  constructor(bewss: bewss) {
    this.bewss = bewss
  }

  async onEnabled(): Promise<void> {
    await this.loadAll()

    return 
  }

  async onDisabled(): Promise<void> {
    for (const [path, { config, plugin }] of this.plugins.entries()) {
      try {
        plugin.onDisabled()
      } catch (error) {
        this.error(`Plugin "${config.name || path}". Uncaught Exception(s):\n`, error)
      }
    }

    return
  }

  async loadAll(): Promise<void> {
    return new Promise(async (res) => {
      if (!fs.existsSync(this.pluginsPath)) {
        this.warn("ENOENT: Plugins folder does not exist. Creating plugins folder:", `"${this.pluginsPath}"`)
        fs.mkdirSync(this.pluginsPath, { recursive: true })

        return res()
      }

      const pluginsDirs: string[] = []
      for (const item of fs.readdirSync(this.pluginsPath)) {
        if (!fs.statSync(path.resolve(this.pluginsPath, item)).isDirectory()) continue
        pluginsDirs.push(item)
      }

      if (pluginsDirs.length < 1) {
        this.info('No plugins found!')
        
        return res()
      }

      for (const plugin of pluginsDirs) {
        await this.register(resolve(this.pluginsPath, plugin))
      }

      return res()
    })
  }

  async register(path: string): Promise<void> {
    return new Promise(async (res) => {
      try {
        const confPath = resolve(path, "package.json")
        if (!fs.existsSync(confPath)) {
          this.error(`ENOENT: package.json does not exist in "${path}". Skipping plugin!`)

          return res()
        }
        const config: examplePluginConfig = await import(confPath)
        if (!this.verifyConfig(path, config)) return res()
        const entryPoint = resolve(path, config.main)
        const request = await axios.get(this.latestInterface)
        if (!fs.existsSync(resolve(path, "src", "@interface"))) fs.mkdirSync(resolve(path, "src", "@interface"))
        fs.writeFileSync(resolve(path, "src", "@interface", "bewss.i.ts"), request.data)

        let neededUpdate = false
        let succeededUpdate = false
        let buildSuccess = true
        let alreadyBuilt = false

        if (!fs.existsSync(resolve(path, "node_modules")) && (config.dependencies || config.devDependencies)) {
          neededUpdate = true
          succeededUpdate = await this.update(path, config)
        }
        if (neededUpdate && !succeededUpdate) {
          this.error(`Skipping plugin "${config.displayName || path}". Failed to install dependencies.`)
          
          return res()
        }
        if (!fs.existsSync(resolve(path, "dist"))) {
          buildSuccess = await this.build(path, config)
          alreadyBuilt = true
        }
        if (config.devMode !== false && !alreadyBuilt) {
          this.warn(`Plugin "${config.displayName || path}" is in dev mode. Set devMode to false in package.json to disable`)
          buildSuccess = await this.build(path, config)
        }
        if (!buildSuccess) {
          this.error(`Skipping plugin "${config.displayName || path}". Failed to build.`)

          return res()
        }
        try {
          const plugin: examplePlugin = require(entryPoint)
          const newPlugin: examplePlugin = new plugin(new pluginApi(this.bewss, config, path))
          this.info(`Successfully loaded plugin "${config.displayName || path}"`)
          this.pluginNames.push(config.displayName || config.name || path)
          this.plugins.set(path, {
            config,
            plugin: newPlugin, 
          })

          try {
            newPlugin.onEnabled()
          } catch (error) {
            this.error(`Plugin "${config.displayName || path}". Uncaught Exception(s):\n`, error)
          }

        } catch (error) {
          this.error(`Plugin "${config.displayName || path}". Uncaught Exception(s):\n`, error)
        }

      } catch (error) {
        this.error(`Failed to load plugin "${path}". Recieved Error(s):\n`, error)
      }

      return res()
    })
  }
  // path or name
  unregister(name: string): string | undefined {
    const plugin = this.plugins.get(name) || Array.from(this.plugins.values()).find(({ config }) => config.name === name)

    if (!plugin) return
    const path: string = this.getByValue(this.plugins, plugin)
    if (!path) return
  
    plugin.plugin.onDisabled()

    try {
      delete require.cache[require.resolve(resolve(path))]
      delete require.cache[require.resolve(resolve(path, "package.json"))]
      delete require.cache[require.resolve(resolve(path, plugin.config.main))]
    } catch {}

    this.plugins.delete(path)

    return path
  }
  
  // name || path
  async reload(name: string): Promise<void>{
    const unregister = this.unregister(name)
    if (unregister) {
      await this.register(unregister)

      return Promise.resolve()
    }
  }

  async reloadAll(): Promise<void> {
    await this.bewss.getCommandManager().reloadAll()
    const plugins = [...this.plugins.keys()]
    for (const plugin of plugins) {
      await this.reload(plugin)
    }

    return Promise.resolve()
  }

  async reIndex(): Promise<void> {
    const pluginsDirs: string[] = []
    for (const item of fs.readdirSync(this.pluginsPath)) {
      if (!fs.statSync(path.resolve(this.pluginsPath, item)).isDirectory()) continue
      pluginsDirs.push(item)
    }

    if (pluginsDirs.length < 1) {
      this.info('No plugins found! Unregistering all currently registered')
      
      for (const plugin of this.plugins.keys()) {
        this.unregister(plugin)
      }

      return Promise.resolve()
    }

    const currentPlugins = Array.from(this.plugins.keys())

    for (const plugin of pluginsDirs) {
      const path = resolve(this.pluginsPath, plugin)
      if (currentPlugins.includes(path)) continue

      this.info(`[ReIndex] New Plugin Found "${plugin}"`)
      await this.register(path)
    }
    const pluginDirz: string[] = []
    for (const dir of pluginsDirs) {
      pluginDirz.push(resolve(this.pluginsPath, dir))
    }
    for (const plugin of currentPlugins) {
      if (pluginDirz.includes(plugin)) continue

      this.info(`[ReIndex] Could not resolve "${plugin}".. Unregistering`)
      this.unregister(plugin)
    }

    return Promise.resolve()
  }

  getByValue(map: Map<unknown, unknown>, searchValue: any): any {
    for (const [k, v] of map.entries()) {
      if (v === searchValue)
        return k
    }
  }

  private async update(path: string, config: examplePluginConfig): Promise<boolean> {
    return new Promise((res) => {
      this.info(`Installing dependencies for "${config.displayName || path}"`)
      childProcess.exec('npm i', {
        cwd: path,
      }, (err, out, s) => {
        if (err) {
          this.error(`Failed to install dependencies for "${config.displayName || path}". Recieved Error(s):\n`, out, s)
          res(false)
        } else {
          this.info(`Finished installing dependencies for "${config.displayName || path}"`)
          res(true)
        }
      })
    })
  }
  private async build(path: string, config: examplePluginConfig): Promise<boolean> {
    return new Promise((res) => {
      this.info(`Attempting to build "${config.displayName || path}"`)
      childProcess.exec('npm run build', {
        cwd: path,
      }, (err, out) => {
        if (err) {
          this.error(`Failed to build "${config.displayName || path}". Recieved Error(s):\n`, out)
          res(false)
        } else {
          this.info(`Successfully built "${config.displayName || path}"`)
          res(true)
        }
      })
    })
  }

  verifyConfig(path: string, config: examplePluginConfig): boolean {
    if (config.displayName == undefined) this.warn(`@${config.author}, your plugin is missing "displayName" in your package.json. Your plugin will be refered as "${path}"`)
    if (!config.version) this.warn(`plugin "${config.displayName || path}" missing version prop in package.json`)
    if (config.devMode === undefined) this.info(`plugin "${config.displayName || path}" missing devMode prop in package.json. Auto defaults to true!`)
    if (!config.main) {
      this.error(`plugin "${config.displayName || path}" missing main prop in package.json. Cannot start plugin without valid path to main file!`)
      
      return false
    }
    if (!config.scripts) {
      this.error(`plugin "${config.displayName || path}" missing scripts in package.json. Cannot start plugin without needed scripts!`)

      return false
    }
    if (!config.scripts.build) {
      this.error(`plugin "${config.displayName || path}" missing scripts.build in package.json. Cannot start plugin without needed scripts!`)

      return false
    }
    // if (!config.scripts.start) {
    //   this.error(`plugin "${config.name || path}" missing main scripts.start in package.json. Cannot start plugin without needed scripts!`)

    //   return false
    // }
    if (!config.dependencies && !config.devDependencies) {
      this.info(`WOW @${config.author || config.displayName || path}, your plugin has absolutely no depedencies! However, you should probably add "@types/node" as a devdependency.`)
    }

    if (!config.devDependencies) {
      this.warn(`plugin "${config.displayName || path}" does not have @types/node. This is known to cause issues for some people. Please add "@types/node" as a devdependency to your project`)
    }

    if (config.devDependencies) {
      const devDependencies = Object.keys(config.devDependencies)
      if (!devDependencies.includes("@types/node")) {
        this.warn(`plugin "${config.displayName || path}" does not have @types/node. This is known to cause issues for some people. Please add "@types/node" as a devdependency to your project`)
      }
    }

    if (config.devDependencies && !config.dependencies) {
      const devDependencies = Object.keys(config.devDependencies)
      const filterTypes = devDependencies.filter(d => d !== "@types/node")
      if (filterTypes.length < 1) {
        this.info(`Great job @${config.author || config.displayName || path}! your plugin has absolutely no depedencies!`)
      }
    }

    if (config.dependencies) {
      const dependencies = Object.keys(config.dependencies)
      const dependencyFilter = dependencies.filter(i => i !== "ts-node" && i !== "typescript")
      let onlyTypes = true
      if (config.devDependencies) {
        const devDependencies = Object.keys(config.devDependencies)
        const filterTypes = devDependencies.filter(d => d !== "@types/node")
        if (filterTypes .length > 1) {
          onlyTypes = false
        }
      }
      if (dependencyFilter.length < 1 && onlyTypes) {
        this.info(`Congrats @${config.author || config.displayName || path}, your plugin does not use any dependencies other than the needed ones!`)
      }
    } 

    return true
  }

  getPlugins(): Array<string> {
    return this.pluginNames
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
