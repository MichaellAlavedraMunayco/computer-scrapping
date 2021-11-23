// Interface
import { DatasetInterface } from './dataset.interface';
// Service
import { LoggerService } from 'src/service/logger.service';


export interface ExporterInterface {


  logger: LoggerService;

  dataset: DatasetInterface;


  add(dataset: DatasetInterface): ExporterInterface;

  export(): void;

}