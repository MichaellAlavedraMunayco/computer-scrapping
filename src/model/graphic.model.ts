// Util
import { P } from '../util/util';
// Enum
import { GraphicType } from '../enum/enum';

export class Graphic {

  id: string;

  name?: string;
  type?: GraphicType;
  brand?: string;

  computerId?: string;


  constructor() {

    this.id = P.uuidv4();

  }


}