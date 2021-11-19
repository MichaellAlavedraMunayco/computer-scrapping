const { v4: uuidv4 } = require('uuid');

class Computer {

  id;

  sku;
  name;
  type;
  brand;
  model;
  os;
  warranty;
  warrantyTime;
  likes;
  url;
  madeIn;

  company;


  constructor (sku, name, type) {

    this.id = uuidv4();

    this.sku = sku;
    this.name = name;
    this.type = type;

  }

}

module.exports = Computer;