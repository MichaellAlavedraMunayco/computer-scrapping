// Util
import { P } from '../util/util';


export class Processor {

  id: string;

  name?: string;
  brand?: string;
  generation?: string;
  velocityGHz?: string;
  maxVelocityGHz?: string;
  coreCount?: string;
  
  computerId?: string;


  constructor() {

    this.id = P.uuidv4();

  }


}