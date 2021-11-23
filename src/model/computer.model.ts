// Tool
import * as P from "ts-prime";
// Enum
import { ComputerType } from 'src/enum/computer.type.enum';
import { Country } from "src/enum/country.enum";

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


  constructor() {

    this.id = P.uuidv4();

  }



}