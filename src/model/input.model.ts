// Util
import { P } from '../util/util';


export class Input {

  id: string;

  wifi?: boolean;
  hdmi?: boolean;
  hdmiCount?: string;
  usb2?: boolean;
  usb3?: boolean;
  usbC?: boolean;
  usbcount?: string;
  cd?: boolean;
  blueray?: boolean;
  tv?: boolean;
  headphone?: boolean;
  microphone?: boolean;
  ethernet?: boolean;
  network?: boolean;
  vga?: boolean;
  bluetooth?: boolean;

  computerId?: string;


  constructor() {

    this.id = P.uuidv4();

  }


}