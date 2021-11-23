// Tool
import * as P from "ts-prime";
// Enum
import { Currency } from 'src/enum/currency.enum';


export class Price {

  id: string;

  realValue: string;
  reducedValue: string;
  discountValue: string;
  currency: string;
  consulted: string;

  computerId: string;


  constructor(realValue: string, reducedValue: string, discountValue: string, computerId: string) {

    this.id = P.uuidv4();

    this.realValue = realValue;
    this.reducedValue = reducedValue;
    this.discountValue = discountValue;
    this.currency = Currency.PEN;
    this.consulted = new Date().toISOString();

    this.computerId = computerId;

  }

}