// Util
import { P } from '../util/util';
// Enum
import { MemoryType } from '../enum/enum';


export class Memory {

  id: string;

  type?: MemoryType;
  capacityGB?: string;
  optane?: boolean;
  expandable?: boolean;

  computerId?: string;
  diskId?: string;
  graphicId?: string;


  constructor() {

    this.id = P.uuidv4();

  }


}