import mcwss from './node-mcwss'
const wssserver = new mcwss()

// User connected to server
wssserver.on('ServerConnected', () => {

  // Example of using the eventManager
  wssserver.getEventManager().registerAllEvents() // Registering all events is not recommended. May cause the client to crash. Only register events that will be needed.
  wssserver.getEventManager().on('eventPacket', (packet) => {
    const pasredPacket = JSON.parse(packet)
    console.log(pasredPacket)
  })

  // Example of using the commandManager
  wssserver.getCommandManager().executeCommand('say Hello World!')
  wssserver.getCommandManager().on('commandPacket', (packet) => {
    const pasredPacket = JSON.parse(packet)
    console.log(pasredPacket)

    const commandExecuted = wssserver.getCommandManager().getPreviousCommand()
    console.log(`Command Executed: ${commandExecuted}`)
  })

})

wssserver.startServer(1111)
