import Server from '../../node-bewss'
import { v4 as uuidv4 } from 'uuid'

class registerEvent {
  private server
  private wsserver
  private logger

  constructor(event: string, server: Server) {
    this.server = server
    this.wsserver = this.server.wsserver
    this.logger = this.server.getLogger()
    this.register(event, "subscribe")
  }
  private register(event: string, purpose: string): void {
    this.logger.success(`Event Registered: ${event}`)
    this.wsserver.send(JSON.stringify(
      {
        "body": {
          "eventName": event,
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
export default registerEvent
