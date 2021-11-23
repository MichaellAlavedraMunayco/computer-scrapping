// Tool
import * as P from 'ts-prime';
import { Workbook } from 'exceljs';
// Enum
import { LoggerType } from '../enum/logger.type.enum';
// Interface
import { DatasetInterface } from '../interface/dataset.interface';
import { ExporterInterface } from '../interface/exporter.interface';
// Service
import { LoggerService } from './logger.service';


export class XLSXExporterService implements ExporterInterface {


  logger: LoggerService;

  dataset: DatasetInterface;


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
    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet('Computer');

    worksheet.columns = [
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
    ];

    this.dataset.computerList.forEach((computer, _i) => { worksheet.addRow(computer); });

    worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 1, activeCell: 'A1' }];

    const filename = `dataset-${P.first(P.uuidv4().split('-'))}.xlsx`;

    this.logger.report('Exportando archivo en src/export con el nombre: ' + filename);
    workbook.xlsx.writeFile('src/export/' + filename);

  }


}