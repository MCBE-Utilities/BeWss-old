import bewss from "./bewss/bewss"

new bewss({
  port: 8080,
}).getEventManager()
  .on('AgentCreated', (pk) => {
    console.log(pk)
  })
