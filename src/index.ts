import mcwss from './node-bewss'
const wssserver = new mcwss()

// User connected to server
wssserver.on('ServerConnected', async () => {
  const agent = await wssserver.getCommandManager().getAgentCommands()
  await agent.agentDestroy('forward')
  await agent.agentMove('forward')
  await agent.agentTurn('right')
  await agent.agentMove('forward')
  await agent.agentMove('forward')
  await agent.agentMove('forward')
  await agent.agentTurn('right')
  await agent.agentTill('down')
  await agent.agentPlace('down')
})

// Starts server on Port 1111
wssserver.startServer(1111)
