// Enum
import { ScreenType } from '../enum/enum';


export class Screen {

  id: string;

  type?: ScreenType | null;
  definition?: string;
  touch?: boolean;

  computerId?: string;


  constructor() { }


}