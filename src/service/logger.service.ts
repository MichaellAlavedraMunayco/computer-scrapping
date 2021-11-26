// Util
import { Chalk } from '../util/util';
// Enum
import { LoggerType } from '../enum/enum';
// Interface
import { LoggerInterface } from '../interface/interface';


export class LoggerService implements LoggerInterface {


  type: LoggerType;


  constructor(type: LoggerType) {

    this.type = type;

  }

  public report(message: string) {
    console.log(
      `${Chalk.yellow(this.type)} ${Chalk.blue(new Date().toTimeString().split(' ')[0])} ${Chalk.white(message)}`
    );
  }


}