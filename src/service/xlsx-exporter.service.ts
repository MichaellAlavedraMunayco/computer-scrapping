// Util
import { XLSX, P } from '../util/util';
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

    this.logger.report('Contruyendo archivo XLSX');
    const workbook = new XLSX.Workbook();


    this.logger.report('Agregando computer worksheet ...');
    const computerWorksheet = workbook.addWorksheet('Computer');

    computerWorksheet.columns = this.column.computer;
    computerWorksheet.views = this.view;

    this.dataset.computerList.forEach(computer => { computerWorksheet.addRow(computer); });


    this.logger.report('Agregando price worksheet ...');
    const priceWorksheet = workbook.addWorksheet('Price');

    priceWorksheet.columns = this.column.price;
    priceWorksheet.views = this.view;

    this.dataset.priceList.forEach(price => { priceWorksheet.addRow(price); });


    const filename = `dataset-${P.first(P.uuidv4().split('-'))}.xlsx`;

    this.logger.report('Exportando archivo en src/export con el nombre: ' + filename);
    workbook.xlsx.writeFile('src/export/' + filename);

  }


}