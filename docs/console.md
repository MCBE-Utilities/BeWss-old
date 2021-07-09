# ConsoleManager

## Referencing
```ts
this.api.getConsoleManager()
```

## getCommandNames
- Returns an array of all the registered commands
```ts
this.api.getConsoleManager().getCommandNames()
```

## registerCommand
- Registers a command that can be executed from the console.
```ts
this.api.getConsoleManager().registerCommand('testcommand')
```

# events

## registerEvent
- Fires when a command is registered to the console
```ts
this.api.getConsoleManager().on('CommandRegistered', (command) => {})
```

## consoleCommand
- Fires when a registered command is fired
```ts
this.api.getConsoleManager().on('testcommand', (data: customCommandResponse) => {})
```

# Creating a simple console command
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
      this.api.getConsoleManager().registerCommand('ping')
      this.api.getConsoleManager().on('ping', (data: customCommandResponse) => {
        const sender = data.sender // Will always return as "CONSOLE"
        const args = data.args // Arguments places after the command
        this.api.getLogger().success('Pong!')
      })
    }

    async onDisabled(): Promise<void> {
      this.api.getLogger().success('Plugin disabled!')
    }
}
```