// Enum
import { LoggerType } from '../enum/enum';


export interface LoggerInterface {


  type: LoggerType;

  report(message: string): void;


}