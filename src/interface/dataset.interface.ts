// Model
import {
  Computer,
  ComputerDimension,
  ScreenDimension,
  ComputerMemory,
  GraphicMemory,
  DiskMemory,
  Processor,
  Screen,
  Disk,
  Graphic,
  Input,
  Keyboard,
  WebCam,
  Price,
} from '../model/model';

export interface DatasetInterface {

  computerList: Computer[];
  computerDimensionList: ComputerDimension[];
  screenDimensionList: ScreenDimension[],
  computerMemoryList: ComputerMemory[],
  graphicMemoryList: GraphicMemory[],
  diskMemoryList: DiskMemory[],
  processorList: Processor[];
  screenList: Screen[];
  diskList: Disk[];
  graphicList: Graphic[];
  inputList: Input[];
  keyboardList: Keyboard[];
  webcamList: WebCam[];
  priceList: Price[];

}