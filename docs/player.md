# PlayerManager

## Referencing
```ts
this.api.getPlayerManager()
```

## getLocalPlayerName
- Returns the name of the connected user
```ts
this.api.getPlayerManager().getLocalPlayerName()
```

## getPlayerList
- Returns an array of player names on the world
```ts
this.api.getPlayerManager().getPlayerList()
```

## sendMessage
- Sends a message to a given player
```ts
this.api.getPlayerManager().sendMessage('text', 'PlayerName', 'Hello World!')
```

## sendTitle
- Sends a titleraw to a given player
```ts
this.api.getPlayerManager().sendTitle('text', 'PlayerName', 'Hello World!', 'actionbar')
```

## getPlayerPosition
- Returns the position of a given player
```ts
this.api.getPlayerManager().getPlayerPosition('PlayerName')
```

## inPosition
- Returns boolean if a given player is inside a given position
```ts
this.api.getPlayerManager().inPosition('PlayerName', 0, 0, 0, 10, 10, 10)
```

## getTags
- Returns an array of tags on a given player
```ts
this.api.getPlayerManager().getTags('PlayerName')
```

## hasTag
- Returns boolean if a given player has a given tag
```ts
this.api.getPlayerManager().hasTag('PlayerName', 'testtag')
```

## addTag
- Adds a tag to a given player
```ts
this.api.getPlayerManager().addTag('PlayerName', 'testtag')
```

## removeTag
- Removes a tag from a given player
```ts
this.api.getPlayerManager().removeTag('PlayerName', 'testtag')
```

## kick
- Kicks a given player from the current game session
```ts
this.api.getPlayerManager().kick('PlayerName', 'Kick for AFK')
```

## give
- Gives a given player an item
```ts
this.api.getPlayerManager().give('PlayerName', 'diamond', 32, 0)
```

## teleport
- Teleports a given player to a given position
```ts
this.api.getPlayerManager().teleport('PlayerName', 0, 10, 0)
```

## replaceItem
- Replaces an item in a given players inventory
```ts
this.api.getPlayerManager().replaceItem('PlayerName', 'slot.inventory', 0, 'diamond', 32, 0)
```

## updateGamemode
- Updates given players gamemode
```ts
this.api.getPlayerManager().updateGamemode('PlayerName', 'creative')
```

## updateAbility
- Updates the abilities of a given player
```ts
this.api.getPlayerManager().updateAbility('PlayerName', 'mayfly', true)
```

## getXpLevel
- Returns the given players xp level
```ts
this.api.getPlayerManager().getXpLevel('PlayerName')
```

## addXp
- Adds xp to a given player
```ts
this.api.getPlayerManager().addXp('PlayerName', 10)
```

## addXpLevel
- Adds xp levels to a given player
```ts
this.api.getPlayerManager().addXpLevel('PlayerName', 10)
```

## removeXp
- Removes xp from a given player
```ts
this.api.getPlayerManager().removeXp('PlayerName', 10)
```

## removeXpLevel
- Removes xp levels from a given player
```ts
this.api.getPlayerManager().removeXpLevel('PlayerName', 10)
```