/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable newline-per-chained-call */
/* eslint-disable prefer-rest-params */
import bewss from "./bewss/bewss"
import fs from 'fs'
import path from 'path'
import util from 'util'

const logDir = path.resolve(process.cwd(), './', 'logs')
const lastSessionLog = path.resolve(logDir, 'last-session.log')
const allLog = path.resolve(logDir, 'all.log')

fs.mkdirSync(logDir, { recursive: true })
fs.writeFileSync(lastSessionLog, "")
if (!fs.existsSync(allLog)) {
  fs.writeFileSync(allLog, "")
  console.log("Creating New All Log")
}

const lastSession = fs.createWriteStream(lastSessionLog)
const allTime = fs.createWriteStream(allLog, { flags: "a" })

function writeStreams (item: any): void {
  lastSession.write(item)
  allTime.write(item)
}

function closeStreams (): void {
  allTime.close()
  lastSession.close()
}

console.log = function(): void {
  process.stdout.write(util.format.apply(this, arguments) + '\n')
  writeStreams(Array.from(arguments).join(" ").replace(/\u001b\[.*?m/g, "") + "\n")
}
console.info = function(): void {
  process.stdout.write(util.format.apply(this, arguments) + '\n')
  writeStreams(Array.from(arguments).join(" ").replace(/\u001b\[.*?m/g, "") + "\n")
}
console.warn = function(): void {
  process.stdout.write(util.format.apply(this, arguments) + '\n')
  writeStreams(Array.from(arguments).join(" ").replace(/\u001b\[.*?m/g, "") + "\n")
}
console.debug = function(): void {
  process.stdout.write(util.format.apply(this, arguments) + '\n')
  writeStreams(Array.from(arguments).join(" ").replace(/\u001b\[.*?m/g, "") + "\n")
}
console.error = function(): void {
  process.stderr.write(util.format.apply(this, arguments) + '\n')
  writeStreams(Array.from(arguments).join(" ").replace(/\u001b\[.*?m/g, "") + "\n")
}

process.on('beforeExit', () => {
  closeStreams()
})

new bewss({
  port: 8080,
})
