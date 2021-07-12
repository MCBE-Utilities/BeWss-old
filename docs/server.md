# ServerManager

## Referencing
```ts
this.api.getServerManager()
```

## sendJSON
- Sends raw json to the server
```ts
this.api.getServerManager().sendJSON({})
```

## sendBuffer
- Sends buffer to the server
```ts
this.api.getServerManager().sendBuffer(Buffer)
```

## getServer
- Returns the websocket server instance
```ts
this.api.getServerManager().getServer()
```

# Server Events

## wsslistening
- Fires when the Websocket is listening. Returns no data.

## wssconnected
- Fires when a user connects to the Websocket. Returns no data.

## wssclosed
- Fires when a user diconnects from the Websocket. Returns no data.

## wsserror
- Fires when a error occurs from the Websocket. Returns Error.

## wssmessage
- Fires when the Websocket recieves data. Returns data as string or buffer.