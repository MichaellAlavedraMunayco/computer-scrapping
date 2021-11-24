// Util
import { P } from '../util/util';
// Enum
import { Currency } from '../enum/enum';

export class Price {

  id: string;

  realValue?: string;
  reducedValue?: string;
  discountValue?: string;
  currency?: string;
  consulted?: string;

  computerId?: string;


  constructor() {

    this.id = P.uuidv4();

    this.currency = Currency.PEN;
    this.consulted = new Date().toISOString();

  }

}