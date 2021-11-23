// Enum
import { LoggerType } from '../enum/logger.type.enum';


export interface LoggerInterface {


  type: LoggerType;

  report(message: string): void;


}