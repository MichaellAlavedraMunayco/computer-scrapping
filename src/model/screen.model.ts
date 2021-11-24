// Util
import { P } from '../util/util';
// Enum
import { ScreenType } from '../enum/enum';


export class Screen {

  id: string;

  type?: ScreenType | null;
  definition?: string;
  touch?: boolean;

  computerId?: string;


  constructor() {

    this.id = P.uuidv4();

  }


}