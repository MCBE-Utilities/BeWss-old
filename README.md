# BEWSS
Bewss is a tool to make interfacing with websockets on MCBE easy!
Join our [discord](https://discord.gg/9S4aKh684W) for community plugin releases, get support, or suggest new features for upcoming releases.

[Latest Bewss Release](https://github.com/PMK744/Node-BEWSS/releases)

## PluginAPI
Bewss has a well developed plugin system and api. Each plugin for bewss is its own node package and will support any node module via npm or yarn.
Plugin documentation is still in the works and will be updated once complete.
For a plugin example visit our discord and look in the bewss-plugins channel for the example plugin.

## Minecraft Websockets
Minecraft Bedrock Edition uses websockets for interprocess communication we can connect to these sockets with the commands `/connect` and `/wsserver` in-game (both of these commands have the same effect). Once connected to the websocket, the connection will not close until either the game is closed or some other 3rd part interruption. The connection will however stay open when say a player leaves a singleplayer world and joins another server.
Websockets in Minecraft can be used for simple command communication between a player and a server. Additionally, the server can choose to
listen for certain events sent by the client and act upon receiving them.

In order to be able to execute the `/connect` and `/wsserver` commands, cheats must be enabled. This means that connecting on third party
servers is not possible, and only on the dedicated servers when cheats are enabled. It is possible to connect on a singleplayer world and
join a server after that, but commands executed by the websocket server will not work. Events will still be sent by the client however.

Bewss is based off of [mcwss](https://github.com/Sandertv/mcwss) but written in Typescript.

## Getting started

  -   You need [Node.js](https://nodejs.org) v14.x and [npm](https://www.npmjs.com).
  -   Download or clone the repository `git clone https://github.com/PMK744/node-bewss.git`.
  -   Install dependencies `npm install`
  -   Before running production build you have to build it `npm run build`
  -   You're done, you can run it using `npm run start` or `node .` (or `npm run dev` for development)
  -   Check `src/index.ts` for basic usage examples.