// Enum
import { ComputerType, Country } from '../enum/enum';

export class Computer {

  id: string;

  sku?: string;
  name?: string;
  type?: ComputerType;
  brand?: string;
  model?: string;
  os?: string;
  warranty?: boolean;
  warrantyTime?: string;
  likes?: string;
  url?: string;
  country?: Country;
  company?: string;


  constructor() { }



}