// Enum
import { Company } from '../enum/company.enum';
// Interface
import { DatasetInterface } from '../interface/dataset.interface';
// Service
import { LoggerService } from 'src/service/logger.service';


export interface ScraperInterface {


  logger: LoggerService;

  company: Company;

  dataset: DatasetInterface;

  link: { [name: string]: string };


  scrap(): Promise<DatasetInterface>;

}