# ScoreboardManager

## Referencing
```ts
this.api.getScoreboardManager()
```

## createObjective
- Creates a scoreboard objective
```ts
this.api.getScoreboardManager().createObjective('testscore', 'Score Display')
```

## removeObjective
- Removes a scoreboard objective
```ts
this.api.getScoreboardManager().removeObjective('testscore')
```

## setdisplay
- Sets an objective to a display slot
```ts
this.api.getScoreboardManager().setdisplay('testscore', 'sidebar', 'ascending')
```

## getObjectives
- Returns an array of all objectives on the current world
```ts
this.api.getScoreboardManager().getObjectives()
```

## getObjectiveName
- Returns the name of a given objective
```ts
this.api.getScoreboardManager().getObjectiveName('testscore')
```

## updateScore
- Updates the score of a given player
```ts
this.api.getScoreboardManager().updateScore('PlayerName', 'add', 'testscore', 10)
```

## getScore
- Returns the score of a given player
```ts
this.api.getScoreboardManager().getScore('PlayerName', 'testscore')
```