import { Computer } from '../model/computer.model';
import { Price } from '../model/price.model';

export interface DatasetInterface {

  computerList?: Computer[];
  priceList?: Price[];

}