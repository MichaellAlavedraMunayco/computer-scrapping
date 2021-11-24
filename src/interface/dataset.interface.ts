// Model
import {
  Computer,
  ComputerDimension,
  ComputerMemory,
  Screen,
  ScreenDimension,
  Graphic,
  GraphicMemory,
  Disk,
  DiskMemory,
  Processor,
  Input,
  Keyboard,
  WebCam,
  Price,
} from '../model/model';

export interface DatasetInterface {

  computerList: Computer[];
  computerDimensionList: ComputerDimension[];
  computerMemoryList: ComputerMemory[],
  screenList: Screen[];
  screenDimensionList: ScreenDimension[],
  graphicList: Graphic[];
  graphicMemoryList: GraphicMemory[],
  diskList: Disk[];
  diskMemoryList: DiskMemory[],
  processorList: Processor[];
  inputList: Input[];
  keyboardList: Keyboard[];
  webcamList: WebCam[];
  priceList: Price[];

}