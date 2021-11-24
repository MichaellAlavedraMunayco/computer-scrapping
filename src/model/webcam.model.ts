// Util
import { P } from '../util/util';


export class WebCam {

  id: string;

  included?: boolean;

  computerId?: string;


  constructor() {

    this.id = P.uuidv4();

  }


}