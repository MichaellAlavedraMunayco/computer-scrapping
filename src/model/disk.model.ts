// Util
import { P } from '../util/util';


export class Disk {

  id: string;

  hdd?: boolean;
  ssd?: boolean;
  ssdReader?: boolean;
  opticalUnit?: boolean;
  allowSecondUnit?: boolean;
  allowReplace?: boolean;

  computerId?: string;


  constructor() {

    this.id = P.uuidv4();

  }


}