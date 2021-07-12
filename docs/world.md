# WorldManager

## Referencing
```ts
this.api.getWorldManager()
```

## getSurfaceBlock
- Returns the surface block of the given position
```ts
this.api.getWorldManager().getSurfaceBlock(0, 0)
```

## setBlock
- Places a block at a given position
```ts
this.api.getWorldManager().getSurfaceBlock(0, 10, 0, 'stone')
```

## getBlock
- Returns the data of a block at a given position
```ts
this.api.getWorldManager().getBlock(0, 10, 0)
```

## sendMessage
- Sends a message to all connected users
```ts
this.api.getWorldManager().sendMessage('Hello World!')
```