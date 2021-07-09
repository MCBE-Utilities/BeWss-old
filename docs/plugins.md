# Package.json
## Basic Info
- The BeWss pluginManager allows for any node modules to be used with your plugin via npm or yarn.
- Plugins in BeWss can be written in TypeScript or JavaScript. TypeScript allows for more helpfull documentations and auto-typings.
- [examplePlugin](https://github.com/PMK744/Node-BEWSS/tree/main/docs/examplePlugin)

## Dev Mode
- Dev mode is boolean option in the package.json that allows for a plugin to be rebuilt each time it is loaded or reloaded.
- If the option is set to true, BeWss will build the plugin each time BeWss starts up, or when -reload is executed in-game or within the terminal. If the option is set to false, BeWss will not build the plugin on start up.
- It is recommended to disabled Dev Mode for a production release.

## Example package.json
```json
{
  "name": "exampleplugin",
  "version": "1.0.0",
  "description": "examplePlugin for BeWss",
  "devMode": false,
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "dev": "ts-node src/index.ts",
    "start": "node dist/index.js"
  },
  "author": "You!",
  "license": "ISC",
  "dependencies": {
    "ts-node": "^10.0.0",
    "typescript": "^4.3.2"
  },
  "devDependencies": {
    "@types/node": "^15.12.4"
  }
}
```

# Creating a plugin
## Basic Info
- Creating plugins for BeWss can be very simple, but yet can get very complicated by the type of project you are creating.
- When you run your plugin for the first time, BeWss will automatically create a folder called ```@interface``` and install a file called ```bewss.i.ts``` within that folder.
- The file that it installed is the BeWss interface that includes all typings for BeWss. This will allow autofill for functions and events, which is very helpfull for development.
- Each time your plugin is ran, BeWss will automatically update the interface to the latest version, so you don't have to update it each time BeWss get a update.

## Index.ts
- This is where your source code will go. Index.ts is normally found in the src folder of your project.

```ts
import {
  pluginApi, 
} from './@interface/bewss.i' // The interface that BeWss auto downloads

class examplePlugin {
    private api: pluginApi
  
    constructor(api: pluginApi) {
      this.api = api // References the pluginAPI for BeWss
      this.api.setColor('green') // Sets the color of the plugin displayname in terminal
    }

    async onEnabled(): Promise<void> {
      this.api.getLogger().info('Plugin enabled!')
      // The onEnabled function is called each time the plugin is started
    }

    async onDisabled(): Promise<void> {
      this.api.getLogger().success('Plugin disabled!')
      // The onDiabled function is called each time the plugin is shutting down
    }
}

export = examplePlugin

```

# Using BeWss PluginAPI
- [ServerManager](https://github.com/PMK744/Node-BEWSS/blob/main/docs/server.md)
- [ConsoleManager](https://github.com/PMK744/Node-BEWSS/blob/main/docs/console.md)
- [CommandManager](https://github.com/PMK744/Node-BEWSS/blob/main/docs/command.md)
- [WorldManager](https://github.com/PMK744/Node-BEWSS/blob/main/docs/world.md)
- [EntityManager](https://github.com/PMK744/Node-BEWSS/blob/main/docs/entity.md)
- [PlayerManager](https://github.com/PMK744/Node-BEWSS/blob/main/docs/player.md)
- [AgentManager](https://github.com/PMK744/Node-BEWSS/blob/main/docs/agent.md)
- [ScoreboardManager](https://github.com/PMK744/Node-BEWSS/blob/main/docs/scoreboard.md)
- [EventManager](https://github.com/PMK744/Node-BEWSS/blob/main/docs/event.md)