// Tool
import * as chalk from 'chalk';
// Enum
import { LoggerType } from "src/enum/logger.type.enum";
// Interface
import { LoggerInterface } from 'src/interface/logger.interface';


export class LoggerService implements LoggerInterface {


  type: LoggerType;


  constructor(type: LoggerType) {

    this.type = type;

  }

  public report(message: string) {
    console.log(`${chalk.yellow(this.type)} ${chalk.blue(new Date().toLocaleString())} \t ${chalk.white(message)}`);
  }


}