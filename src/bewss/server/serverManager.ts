import bewss from "../bewss"
import Websocket from 'ws'
import { EventEmitter } from 'events'

class serverManager extends EventEmitter {
  private bewss: bewss
  private ws: Websocket.Server
  private server: Websocket
  private port: number
  private inv

  constructor (bewss: bewss, port: number) {
    super()
    this.bewss = bewss
    this.port = port
  }

  async onEnabled(): Promise<void> {
    this.startProcessTitle()
    await this.createServer()
  }

  async onDisabled(): Promise<void> {
    clearInterval(this.inv)
    this.ws.close()
    this.emit('wssclosed')
    this.bewss.getLogger().info('Websocket server closed.')
    this.server = undefined
    
    return
  }

  private async createServer(): Promise<void> {
    return new Promise((res) => {
      this.ws = new Websocket.Server({ port: this.port })

      this.ws.on('listening', () => {
        this.emit('wsslistening')
        this.bewss.getLogger().info(`Websocket server started! To connect to your server do "/connect 127.0.0.1:${this.port}" in your Minecraft world.`)
      })
      this.ws.on('connection', (server: Websocket) => {
        this.server = server
        this.emit('wssconnected')
        this.server.setMaxListeners(50)
        this.bewss.getLogger().info('User connected to the server!')
        this.bewss.getLogger().info('Do -help for a list of BeWss commands, do /help for a list of Bedrock commands.')
      })
      this.ws.on('error', (err) => {
        this.emit('wsserror', err)
        this.bewss.getLogger().error("Failed to open ws server on port", this.port + ".", "Incrementing port by 1 and attempting again in 5.00s")
        setTimeout(() => {
          this.port++
          this.createServer()
        }, 5000)

        res()
      })
    })
  }

  private startProcessTitle(): void {
    this.inv = setInterval(() => {
      const plugins = this.bewss.getPluginManager().getPlugins()
      let pluginDisplay = plugins.join(', ')
      if (plugins.length == 0) pluginDisplay = 'None'

      process.title = `Minecraft Bedrock Edition - BeWss | Plugins Loaded - ${pluginDisplay}`
    }, 10)
  }

  sendJSON(json: JSON): void {
    this.server.send(JSON.stringify(json))
  }

  sendBuffer(buffer: Buffer): void {
    this.server.send(buffer)
  }

  getServer(): Websocket {
    return this.server
  }

}

export default serverManager
