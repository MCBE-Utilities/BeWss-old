# EventManager

## Referencing
```ts
this.api.getEventManager()
```

## registerEvent
- Registers a event
```ts
this.api.getEventManager().registerEvent('PlayerMessage')
```

## unregisterEvent
- Unregisters a event
```ts
this.api.getEventManager().unregisterEvent('PlayerMessage')
```

# Default Events

## AgentCommand
- Fires when an agent command is executed

## AgentCreated
- Fires when an agent is created

## BlockBroken
- Fires when a block is destroyed

## BlockPlaced
- Fires when a block is placed

## BossKilled
- Fires when a boss entity is killed

## EntitySpawned
- Fires when an entity is spawned

## ItemAcquired
- Fires when a item is picked up

## ItemCrafted
- Fires when a item is crafted

## ItemDestroyed
- Fires when a item is destroyed

## ItemDropped
- Fires when a item is dropped

## ItemUsed
- Fires when a item is used on an entity

## MobInteracted
- Fires when a player interacts with a mob

## MobKilled
- Fires when a mob is killed

## PlayerDied
- Fires when a player dies

## PlayerLeave
- Fires when a player leaves the world

## PlayerJoin
- Fires when a player joins the world

## PlayerMessage
- Fires when a player sends a message in chat

## PlayerTeleported
- Fires when a player teleports

## PlayerTransform
- Fires when a player moves

## PlayerTravelled
- Fires when a player travelled

## SlashCommandExecuted
- Fires when a player executes a command

## RawEvent
- Fires any event that is fired

# Event Listening
- Every default command has a typing in the interface, allowing for autofill.

```ts
import {
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
      // Listening for chat
      this.api.getEventManager().on('PlayerMessage', (packet) => {
        if (packet.body.properties.Message != 'ping') return
        this.api.getPlayerManager().sendMessage('text', packet.body.properties.Sender, 'Pong!')
      })
      // Listening for a block placed
      this.api.getEventManager().on('BlockPlaced', (packet) => {
        this.api.getPlayerManager().sendMessage('text', packet.body.properties.Sender, `Block Placed: §c${packet.body.properties.Block}`)
      })
    }

    async onDisabled(): Promise<void> {
      this.api.getLogger().success('Plugin disabled!')
    }
}
```