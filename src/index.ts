import mcwss from './node-bewss'
import Agent from './utils/commands/agent'
const wssserver = new mcwss()

// User connected to server
wssserver.on('ServerConnected', async () => {
  wssserver.getEventManager().registerEvent('PlayerMessage')
  wssserver.getEventManager().on('eventPacket', async (packet) => {
    const parsedCommand = JSON.parse(packet)
    if (parsedCommand.body.eventName != 'PlayerMessage') return

    const prefix = 's.'

    const msg = parsedCommand.body.properties.Message
    const sender = parsedCommand.body.properties.Sender

    if (!msg.startsWith(prefix)) return
    
    const command = msg.replace(prefix, '')
    console.log(command)

    if (command == 'agent give'){
      const agent = wssserver.getCommandManager().getAgentCommands()
      wssserver.getCommandManager().executeCommand('spawnitem dirt 0 4 0 64')
      wssserver.getCommandManager().on('commandPacket', (packet) => {
        console.log(JSON.parse(packet))
      })
    }
  })
})

// Starts server on Port 1111
wssserver.startServer(1111)
