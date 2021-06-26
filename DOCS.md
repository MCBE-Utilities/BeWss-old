## Getting started with Plugins
Example Script:
```typescript
import { pluginApi } from './@interface/bewss.i'

class examplePlugin {
    private api: pluginApi

    constructor(api: pluginApi) {
        this.api = api
        this.api.setColor('green')
    }

    async onEnabled() {
        this.api.getLogger().info('Plugin enabled!')
    }

    async onDisabled() {
        this.api.getLogger().success('Plugin disabled!')
    }
}

export = examplePlugin
```

## Main Plugin Functions

```typescript
this.api.setColor() // sets the color of the plugin; This will show in the users console
this.api.getLogger() // returns Logger for the console
this.api.getServerManager() // returns Sever Manager
this.api.getConsoleManager() // returns Console Manager
this.api.getCommandManager() // returns Command Manager
this.api.getPlayerManager() // returns Player Manager
this.api.getAgentManager() // returns Agent Manager
this.api.getScoreboardManager() // returns Scoreboard Manager 
this.api.getEventManager() // returns Event Manager
```

## Setting the color of plugin 

Colors:
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  
```typescript
this.api.setColor(`red`)
```
## Console Logger

You can pass through a string or object and it will log it to the users console
  - Methods 
    - Info
    - Warn
    - Success
    - Error

```typescript
this.api.getConsoleManager().info(`Plugin Enabled`) 
```

## Server Manager

```typescript
this.api.getServerManager().onEnabled() // Enables Webserver
this.api.getServerManager().onDisabled() // Disables Webserver
```




