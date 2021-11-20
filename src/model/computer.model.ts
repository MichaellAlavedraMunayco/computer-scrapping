// Tool
import { v4 as uuidv4 } from 'uuid';
// Enum
import { ComputerType } from 'src/enum/computer.type.enum';

export class Computer {

  id: string;

  sku?: string;
  name?: string;
  type?: ComputerType;
  brand?: string;
  model?: string;
  os?: string;
  warranty?: string;
  warrantyTime?: string;
  likes?: string;
  url?: string;
  madeIn?: string;
  company?: string;


  constructor() {

    this.id = uuidv4();

  }

}