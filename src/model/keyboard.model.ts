// Util
import { P } from '../util/util';


export class Keyboard {

  id: string;

  illuminated?: boolean;
  isNumeric?: boolean;

  computerId?: string;


  constructor() {

    this.id = P.uuidv4();

  }


}