import chalk from 'chalk'
import moment from 'moment'

class Logger {
  public success(content: string): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.magenta("[BeWss]")} ${chalk.green("[Success]")} ${content}`)
  }

  public info(content: string): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.magenta("[BeWss]")} ${chalk.cyan("[Info]")} ${content}`)
  }

  public warn(content: string): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.magenta("[BeWss]")} ${chalk.yellow("[Warn]")} ${content}`)
  }

  public error(content: string): void {
    console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.magenta("[BeWss]")} ${chalk.red("[Error]")} ${content}`)
  }
}

export default Logger
