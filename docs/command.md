# CommandManager

## Referencing
```ts
this.api.getCommandManager()
```

## executeCommand
- Executes a command ingame
```ts
this.api.getCommandManager().executeCommand('/give @a diamond')
```

## findResponse
- Returns the response of a command that was executed through the commandManager
```ts
const command = this.api.getCommandManager().executeCommand('/give @a diamond')
const repsonse = await this.api.getCommandManager().findResponse(command.requestId)
```

## getCommandNames
- Returns an array of all the registered commands
```ts
this.api.getCommandManager().getCommandNames()
```

## registerCommand
- Registers a command that can be executed from in-gam.
```ts
this.api.getCommandManager().registerCommand('testcommand')
```

# events

## registerEvent
- Fires when a command is registered to the commandManager
```ts
this.api.getCommandManager().on('CommandRegistered', (command) => {})
```

## CommandExecuted
- Fires when a registered command is fired
```ts
this.api.getCommandManager().on('testcommand', (data: customCommandResponse) => {})
```

# Creating a simple Command command
```ts
import {
  customCommandResponse,
  pluginApi,
} from './@interface/bewss.i'

class examplePlugin {
    private api: pluginApi
  
    constructor(api: pluginApi) {
      this.api = api
      this.api.setColor('green')
    }

    async onEnabled(): Promise<void> {
      this.api.getLogger().info('Plugin enabled!')
      this.api.getCommandManager().registerCommand('ping')
      this.api.getCommandManager().on('ping', async (data: customCommandResponse) => {
        const sender = data.sender // The name of the sender
        const args = data.args // Arguments places after the command
        const command = this.api.getCommandManager().executeCommand(`say Pong! @${sender}`)
        const repsonse = await this.api.getCommandManager().findResponse(command.requestId) // async function required
        console.log(response)
      })
    }

    async onDisabled(): Promise<void> {
      this.api.getLogger().success('Plugin disabled!')
    }
}
```