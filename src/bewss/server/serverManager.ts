import bewss from "../bewss"
import Websocket from 'ws'

class serverManager {
  private bewss: bewss
  private ws: Websocket.Server
  private server: Websocket
  private port: number

  constructor (bewss: bewss, port: number) {
    this.bewss = bewss
    this.port = port
  }

  async onEnabled(): Promise<void> {
    process.title = 'Minecraft Bedrock Edition - BeWss'
    await this.createServer()
  }

  async onDisabled(): Promise<void> {
    this.ws.close()
    this.bewss.getEventManager().emit('wss-closed')
    this.bewss.getEventManager().emit('wssclosed', this.server)
    this.bewss.getLogger().info('Websocket server closed.')
    this.server = undefined
    
    return Promise.resolve()
  }

  private async createServer(): Promise<void> {
    return new Promise((res) => {
      this.ws = new Websocket.Server({ port: this.port })

      this.ws.once('listening', () => {
        this.bewss.getEventManager().emit('wss-listening')
        this.bewss.getLogger().info(`Websocket server started! To connect to your server do "/connect 127.0.0.1:${this.port}" in your Minecraft world.`)
      })
      this.ws.once('connection', (server: Websocket) => {
        this.server = server
        this.server.setMaxListeners(50)
        this.bewss.getEventManager().emit('wss-connected')
        this.bewss.getEventManager().emit('wssconnected', this.server)
        this.bewss.getLogger().info('User connected to the server!')
        this.bewss.getLogger().info('Do -help for a list of BeWss commands, do /help for a list of Bedrock commands.')
      })
      this.ws.once('error', () => {
        this.bewss.getLogger().error("Failed to open ws server on port", this.port + ".", "Incrementing port by 1 and attempting again in 5.00s")
        setTimeout(() => {
          this.port++
          this.createServer()
        }, 5000)

        res()
      })
    })
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
