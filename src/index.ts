import mcwss from './node-bewss'
import direction from './utils/mctype/direction'
const wssserver = new mcwss()

// User connected to server
wssserver.on('ServerConnected', async () => {

  const agent = await wssserver.getCommandManager().getAgentCommands()
  console.log(await agent.agentGetPosition())
})

// Starts server on Port 1111
wssserver.startServer(1111)
