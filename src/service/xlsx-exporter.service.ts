// Util
import { XLSX, S } from '../util/util';
// Enum
import { LoggerType } from '../enum/enum';
// Interface
import { DatasetInterface, ExporterInterface } from '../interface/interface';
// Service
import { LoggerService } from './service';


export class XLSXExporterService implements ExporterInterface {


  logger: LoggerService;
  dataset: DatasetInterface;

  column: { [model: string]: Array<Partial<XLSX.Column>> } = {
    computer: [
      { header: 'id', key: 'id' },
      { header: 'sku', key: 'sku' },
      { header: 'type', key: 'type' },
      { header: 'brand', key: 'brand' },
      { header: 'model', key: 'model' },
      { header: 'os', key: 'os' },
      { header: 'warranty', key: 'warranty' },
      { header: 'warrantyTime', key: 'warrantyTime' },
      { header: 'likes', key: 'likes' },
      { header: 'url', key: 'url' },
      { header: 'country', key: 'country' },
      { header: 'company', key: 'company' },
    ],
    computerDimension: [
      { header: 'id', key: 'id' },
      { header: 'widthCm', key: 'widthCm' },
      { header: 'heightCm', key: 'heightCm' },
      { header: 'thickCm', key: 'thickCm' },
      { header: 'weightKg', key: 'weightKg' },
      { header: 'computerId', key: 'computerId' },
    ],
    screenDimension: [
      { header: 'id', key: 'id' },
      { header: 'sizeInch', key: 'sizeInch' },
      { header: 'widthPx', key: 'widthPx' },
      { header: 'heightPx', key: 'heightPx' },
      { header: 'screenId', key: 'screenId' },
    ],
    computerMemory: [
      { header: 'id', key: 'id' },
      { header: 'capacityGB', key: 'capacityGB' },
      { header: 'capacityTB', key: 'capacityTB' },
      { header: 'optane', key: 'optane' },
      { header: 'expandable', key: 'expandable' },
      { header: 'computerId', key: 'computerId' },
    ],
    graphicMemory: [
      { header: 'id', key: 'id' },
      { header: 'capacityGB', key: 'capacityGB' },
      { header: 'capacityTB', key: 'capacityTB' },
      { header: 'graphicId', key: 'graphicId' },
    ],
    diskMemory: [
      { header: 'id', key: 'id' },
      { header: 'capacityGB', key: 'capacityGB' },
      { header: 'capacityTB', key: 'capacityTB' },
      { header: 'diskId', key: 'diskId' },
    ],
    processor: [
      { header: 'id', key: 'id' },
      { header: 'name', key: 'name' },
      { header: 'brand', key: 'brand' },
      { header: 'generation', key: 'generation' },
      { header: 'velocityGHz', key: 'velocityGHz' },
      { header: 'maxVelocityGHz', key: 'maxVelocityGHz' },
      { header: 'coreCount', key: 'coreCount' },
      { header: 'computerId', key: 'computerId' },
    ],
    screen: [
      { header: 'id', key: 'id' },
      { header: 'type', key: 'type' },
      { header: 'definition', key: 'definition' },
      { header: 'touch', key: 'touch' },
      { header: 'computerId', key: 'computerId' },
    ],
    disk: [
      { header: 'id', key: 'id' },
      { header: 'hdd', key: 'hdd' },
      { header: 'ssd', key: 'ssd' },
      { header: 'ssdReader', key: 'ssdReader' },
      { header: 'opticalUnit', key: 'opticalUnit' },
      { header: 'allowSecondUnit', key: 'allowSecondUnit' },
      { header: 'allowReplace', key: 'allowReplace' },
      { header: 'computerId', key: 'computerId' },
    ],
    graphic: [
      { header: 'id', key: 'id' },
      { header: 'name', key: 'name' },
      { header: 'type', key: 'type' },
      { header: 'brand', key: 'brand' },
      { header: 'computerId', key: 'computerId' },
    ],
    input: [
      { header: 'id', key: 'id' },
      { header: 'wifi', key: 'wifi' },
      { header: 'hdmi', key: 'hdmi' },
      { header: 'hdmiCount', key: 'hdmiCount' },
      { header: 'usb2', key: 'usb2' },
      { header: 'usb2Count', key: 'usb2Count' },
      { header: 'usb3', key: 'usb3' },
      { header: 'usb3Count', key: 'usb3Count' },
      { header: 'usbC', key: 'usbC' },
      { header: 'usbCCount', key: 'usbCCount' },
      { header: 'usbCount', key: 'usbCount' },
      { header: 'cd', key: 'cd' },
      { header: 'blueray', key: 'blueray' },
      { header: 'tv', key: 'tv' },
      { header: 'headphone', key: 'headphone' },
      { header: 'microphone', key: 'microphone' },
      { header: 'ethernet', key: 'ethernet' },
      { header: 'network', key: 'network' },
      { header: 'vga', key: 'vga' },
      { header: 'bluetooth', key: 'bluetooth' },
      { header: 'computerId', key: 'computerId' },
    ],
    keyboard: [
      { header: 'id', key: 'id' },
      { header: 'illuminated', key: 'illuminated' },
      { header: 'isNumeric', key: 'isNumeric' },
      { header: 'computerId', key: 'computerId' },
    ],
    webcam: [
      { header: 'id', key: 'id' },
      { header: 'included', key: 'included' },
      { header: 'computerId', key: 'computerId' },
    ],
    price: [
      { header: 'id', key: 'id' },
      { header: 'realValue', key: 'realValue' },
      { header: 'reducedValue', key: 'reducedValue' },
      { header: 'discountValue', key: 'discountValue' },
      { header: 'currency', key: 'currency' },
      { header: 'consulted', key: 'consulted' },
      { header: 'computerId', key: 'computerId' },
    ],
  };

  view: Array<Partial<XLSX.WorksheetView>> = [{ state: 'frozen', xSplit: 0, ySplit: 1, activeCell: 'A1' }];


  constructor() {

    this.logger = new LoggerService(LoggerType.XLXSExporterLogger);

    return this;
  }


  public add(dataset: DatasetInterface): XLSXExporterService {

    this.logger.report('Procesando dataset para exportacion');
    this.dataset = dataset;

    return this;
  }


  public export(): void {

    if (!this.dataset?.computerList?.length) {

      this.logger.report('Exportacion omitida por falta de datos');
      return;
    }

    this.logger.report('Contruyendo archivo XLSX');
    const workbook = new XLSX.Workbook();


    this.logger.report('Agregando computer worksheet ...');
    const computerWorksheet = workbook.addWorksheet('Computer');
    computerWorksheet.columns = this.column.computer;
    computerWorksheet.views = this.view;
    this.dataset.computerList.forEach(computer => { computerWorksheet.addRow(computer); });


    this.logger.report('Agregando computer dimension worksheet ...');
    const computerDimensionWorksheet = workbook.addWorksheet('ComputerDimension');
    computerDimensionWorksheet.columns = this.column.computerDimension;
    computerDimensionWorksheet.views = this.view;
    this.dataset.computerDimensionList.forEach(computerDimension => { computerDimensionWorksheet.addRow(computerDimension); });


    this.logger.report('Agregando screen dimension worksheet ...');
    const screenDimensionWorksheet = workbook.addWorksheet('ScreenDimension');
    screenDimensionWorksheet.columns = this.column.screenDimension;
    screenDimensionWorksheet.views = this.view;
    this.dataset.screenDimensionList.forEach(screenDimension => { screenDimensionWorksheet.addRow(screenDimension); });


    this.logger.report('Agregando computer memory worksheet ...');
    const computerMemoryWorksheet = workbook.addWorksheet('ComputerMemory');
    computerMemoryWorksheet.columns = this.column.computerMemory;
    computerMemoryWorksheet.views = this.view;
    this.dataset.computerMemoryList.forEach(computerMemory => { computerMemoryWorksheet.addRow(computerMemory); });


    this.logger.report('Agregando graphic memory worksheet ...');
    const graphicMemoryWorksheet = workbook.addWorksheet('GraphicMemory');
    graphicMemoryWorksheet.columns = this.column.graphicMemory;
    graphicMemoryWorksheet.views = this.view;
    this.dataset.graphicMemoryList.forEach(graphicMemory => { graphicMemoryWorksheet.addRow(graphicMemory); });


    this.logger.report('Agregando disk memory worksheet ...');
    const diskMemoryWorksheet = workbook.addWorksheet('DiskMemory');
    diskMemoryWorksheet.columns = this.column.diskMemory;
    diskMemoryWorksheet.views = this.view;
    this.dataset.diskMemoryList.forEach(diskMemory => { diskMemoryWorksheet.addRow(diskMemory); });


    this.logger.report('Agregando processor worksheet ...');
    const processorWorksheet = workbook.addWorksheet('Processor');
    processorWorksheet.columns = this.column.processor;
    processorWorksheet.views = this.view;
    this.dataset.processorList.forEach(processor => { processorWorksheet.addRow(processor); });


    this.logger.report('Agregando screen worksheet ...');
    const screenWorksheet = workbook.addWorksheet('Screen');
    screenWorksheet.columns = this.column.screen;
    screenWorksheet.views = this.view;
    this.dataset.screenList.forEach(screen => { screenWorksheet.addRow(screen); });


    this.logger.report('Agregando disk worksheet ...');
    const diskWorksheet = workbook.addWorksheet('Disk');
    diskWorksheet.columns = this.column.disk;
    diskWorksheet.views = this.view;
    this.dataset.diskList.forEach(disk => { diskWorksheet.addRow(disk); });


    this.logger.report('Agregando graphic worksheet ...');
    const graphicWorksheet = workbook.addWorksheet('Graphic');
    graphicWorksheet.columns = this.column.graphic;
    graphicWorksheet.views = this.view;
    this.dataset.graphicList.forEach(graphic => { graphicWorksheet.addRow(graphic); });


    this.logger.report('Agregando input worksheet ...');
    const inputWorksheet = workbook.addWorksheet('Input');
    inputWorksheet.columns = this.column.input;
    inputWorksheet.views = this.view;
    this.dataset.inputList.forEach(input => { inputWorksheet.addRow(input); });


    this.logger.report('Agregando keyboard worksheet ...');
    const keyboardWorksheet = workbook.addWorksheet('Keyboard');
    keyboardWorksheet.columns = this.column.keyboard;
    keyboardWorksheet.views = this.view;
    this.dataset.keyboardList.forEach(keyboard => { keyboardWorksheet.addRow(keyboard); });


    this.logger.report('Agregando webcam worksheet ...');
    const webcamWorksheet = workbook.addWorksheet('Webcam');
    webcamWorksheet.columns = this.column.webcam;
    webcamWorksheet.views = this.view;
    this.dataset.webcamList.forEach(webcam => { webcamWorksheet.addRow(webcam); });


    this.logger.report('Agregando price worksheet ...');
    const priceWorksheet = workbook.addWorksheet('Price');
    priceWorksheet.columns = this.column.price;
    priceWorksheet.views = this.view;
    this.dataset.priceList.forEach(price => { priceWorksheet.addRow(price); });


    const filename = `dataset-${S.generateId()}.xlsx`;

    this.logger.report('Exportando archivo en src/dataset/' + filename);
    workbook.xlsx.writeFile('src/dataset/' + filename);

  }


}