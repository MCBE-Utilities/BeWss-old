# AgentManager

## Basic Info
- Agents are a native feature of Minecraft Education Editon, they can be programed to perform certain tasks.
- Agents are only available by using BeWss or another websocket program.

## Referencing
```ts
this.api.getAgentManager()
```

## create
- Creates an agent
```ts
this.api.getAgentManager().create()
```

## getPosition
- Returns the agents position
```ts
this.api.getAgentManager().getPosition()
```

## teleport
- Teleports the agent to a given position
```ts
this.api.getAgentManager().teleport(0, 10, 0)
```

## inspect
- Inspects a block
```ts
this.api.getAgentManager().inspect('forward')
```

## inspectData
- Inspects the data of a block
```ts
this.api.getAgentManager().inspectData()
```

## setItem
- Sets an item in the agents inventory
```ts
this.api.getAgentManager().setItem(1, 'diamond', 32, 0)
```

## getItem
- Returns the item data of a given slot
```ts
this.api.getAgentManager().getItem(1)
```

## getItemCount
- Returns the item count of a given slot
```ts
this.api.getAgentManager().getItemCount()
```

## transferItem
- Transfers in item from a given slot to another given slot
```ts
this.api.getAgentManager().transferItem(1, 16, 5)
```

## dropItem
- Drops an item from a given slot
```ts
this.api.getAgentManager().dropItem(1, 4, 'forward')
```

## turn
- Rotates the agent
```ts
this.api.getAgentManager().turn('right')
```

## move
- Moves the agent
```ts
this.api.getAgentManager().move('forward')
```

## attack
- Attacks in a given direction
```ts
this.api.getAgentManager().attack('forward')
```

## place
- Places a block from a given slot
```ts
this.api.getAgentManager().place(1, 'forward')
```

## destroy
- Destroys a block
```ts
this.api.getAgentManager().destroy('forward')
```

## till
- Tills dirt
```ts
this.api.getAgentManager().till('forward')
```