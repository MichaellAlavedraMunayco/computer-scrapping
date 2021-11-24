// Enum
import { Company } from '../enum/enum';
// Interface
import { DatasetInterface } from '../interface/interface';
// Service
import { LoggerService } from '../service/service';


export interface ScraperInterface {


  logger: LoggerService;
  company: Company;
  dataset: DatasetInterface;
  link: { [name: string]: string };


  scrap(): Promise<DatasetInterface>;

}