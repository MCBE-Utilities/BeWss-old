import bewss from "./bewss/bewss"

new bewss({
  port: 8080,
}).getEventManager()
  .on('PlayerTeleported', (pk: any) => {
    console.log(pk)
  })
