const { v4: uuidv4 } = require('uuid');
const Currency = require('../types/currency.type');

class Price {

  id;

  realValue;
  reducedValue;
  discountValue;
  currency;
  consulted;

  computerId;


  constructor (realValue, reducedValue, discountValue, computerId) {

    this.id = uuidv4();

    this.realValue = realValue;
    this.reducedValue = reducedValue;
    this.discountValue = discountValue;
    this.currency = Currency.PEN;
    this.consulted = new Date().toISOString();

    this.computerId = computerId;

  }

}

module.exports = Price;