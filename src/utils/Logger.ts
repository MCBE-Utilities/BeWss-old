import chalk from 'chalk'
import moment from 'moment'

class Logger {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {

  }

  public success(content: string): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.green("[SUCCESS]")} ${content}`)
  }

  public info(content: string): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.cyan("[INFO]")} ${content}`)
  }

  public warn(content: string): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.yellow("[WARN]")} ${content}`)
  }

  public error(content: string): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.red("[ERROR]")} ${content}`)
  }
}
export default Logger
