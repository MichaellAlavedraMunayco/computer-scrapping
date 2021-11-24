// Util
import { P } from '../util/util';


export class Dimension {

  id: string;

  widthCm?: string;
  heightCm?: string;
  widthPx?: string;
  heightPx?: string;
  thickCm?: string;
  weightKg?: string;
  sizeInch?: string;

  computerId?: string;
  screenId?: string;


  constructor() {

    this.id = P.uuidv4();

  }


}