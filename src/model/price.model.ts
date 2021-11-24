// Enum
import { Currency } from '../enum/enum';

export class Price {

  id: string;

  realValue?: string;
  reducedValue?: string;
  discountValue?: string;
  currency?: Currency;
  consulted?: string;

  computerId?: string;


  constructor() { }

}