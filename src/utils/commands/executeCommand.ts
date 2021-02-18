import Server from '../../node-bewss'
import { v4 as uuidv4 } from 'uuid'

class executeCommand {
  private server
  private wsserver
  private logger

  constructor(command: string, server: Server) {
    this.server = server
    this.wsserver = this.server.wsserver
    this.logger = this.server.getLogger()
    this.execute(command, "commandRequest")
  }
  private execute(command: string, purpose: string): void {
    this.wsserver.send(JSON.stringify(
      {
        "body": {
          "commandLine": command,
          "version": 1,
        },
        "header": {
          "requestId": uuidv4(),
          "messagePurpose": purpose,
          "version": 1,
        },
      },
    ))
  }
}
export default executeCommand
