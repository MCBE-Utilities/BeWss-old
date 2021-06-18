/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  readdirSync, statSync, 
} from "fs"
import Path from "path"

export default async function getFiles(path: string): Promise<Array<string>> {
  const entries = readdirSync(path).map((entries) => Path.join(path, entries))
  const dirPath = entries.filter((entry) => statSync(entry).isFile())
  const dirFiles = entries.filter((entry) => !dirPath.includes(entry)).reduce((entry, entries) => entry.concat(this.getFiles(entries)), [])
  
  return [...dirPath, ...dirFiles] as any
}
