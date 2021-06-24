/* eslint-disable @typescript-eslint/no-explicit-any */
import bewss from "../bewss"
import { Server } from 'ws'

class serverManager {
  private bewss: bewss
  private ws: Server
  private server: any
  private port: number

  constructor (bewss: bewss, port: number) {
    this.bewss = bewss
    this.port = port
  }

  async onEnabled(): Promise<void> {
    process.title = 'Minecraft Bedrock Edition - BeWss'
    await this.createServer()
    this.ws.on('listening', () => {
      this.bewss.getEventManager().emit('wss-listening')
      this.bewss.getLogger().info(`Websocket server started! To connect to your server do "/connect 127.0.0.1:${this.port}" in your Minecraft world.`)
    })
    this.ws.on('connection', (wss: Server) => {
      this.server = wss
      this.server.setMaxListeners(50)
      this.bewss.getEventManager().emit('wss-connected')
      this.bewss.getLogger().info('User connected to the server!')
      this.bewss.getLogger().info('Do -help for a list of BeWss commands, do /help for a list of Bedrock commands.')
    })
  }

  async onDisabled(): Promise<void> {
    this.ws.close()
    this.bewss.getEventManager().emit('wss-closed')
    this.bewss.getLogger().info('Websocket server closed.')
    
    return Promise.resolve()
  }

  private async createServer(): Promise<void> {
    return new Promise((res) => {
      try {
        this.ws = new Server({ port: this.port })
      } catch (error) {
        this.bewss.getLogger().error(error)
      }
      res()
    })
  }

  getServer(): any {
    return this.server
  }

}

export default serverManager
