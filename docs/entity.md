# EntityManager

## Referencing
```ts
this.api.getEntityManager()
```

## getEntityList
- Returns an array of all found entity on that current world
```ts
this.api.getEntityManager().getEntityList()
```

## summonEntity
- Summons a given entity as a given position
```ts
this.api.getEntityManager().summonEntity('zombie', 'billy', 0, 10, 0)
```

## executeCommandAsEntity
- Executes a command as a given entity
```ts
this.api.getEntityManager().executeCommandAsEntity('billy', 'say Howdy!')
```

## removeEntity
- Removes a given entity
```ts
this.api.getEntityManager().removeEntity('billy')
```

## removeEntities
- Remove a given amount of a given entity
```ts
this.api.getEntityManager().removeEntities('zombie', 10)
```

## getTag
- Returns an array tags on a given entity
```ts
this.api.getEntityManager().getTags('billy')
```

## hasTag
- Returns boolean on a given tag of a given entity
```ts
this.api.getEntityManager().getEntityList('billy', 'testTag')
```