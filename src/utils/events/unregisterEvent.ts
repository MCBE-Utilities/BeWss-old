import Server from '../../node-bewss'
import { v4 as uuidv4 } from 'uuid'

class unregisterEvent {
  private server
  private wsserver
  private logger

  constructor(event: string, server: Server) {
    this.server = server
    this.wsserver = this.server.wsserver
    this.logger = this.server.getLogger()
    this.register(event, "unsubscribe")
  }
  private register(event: string, purpose: string): void {
    this.logger.warn(`Event Unregistered: ${event}`)
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
export default unregisterEvent
