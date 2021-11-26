// Util
import { Puppeteer, Cheerio, P, S } from '../util/util';
// Model
import {
  Computer, Processor, Price,
  ComputerDimension, ScreenDimension,
  Screen, Disk, ComputerMemory,
  GraphicMemory, DiskMemory, Graphic,
  Input, Keyboard, WebCam
} from '../model/model';
// Interface
import { DatasetInterface, ScraperInterface } from '../interface/interface';
// Enum
import { Company, LoggerType, ComputerType, Brand, Currency, ScreenType, GraphicType } from '../enum/enum';
// Service
import { LoggerService } from './service';


export class CoolboxScraperService implements ScraperInterface {


  logger: LoggerService;
  company: Company;
  dataset: DatasetInterface;
  link: string = 'https://www.coolbox.pe/laptops-monitores-y-tablets/laptops/laptops';


  constructor() {

    this.logger = new LoggerService(LoggerType.CoolboxScraperLogger);

    this.dataset = {
      computerList: [],
      computerDimensionList: [],
      computerMemoryList: [],
      screenList: [],
      screenDimensionList: [],
      graphicList: [],
      graphicMemoryList: [],
      diskList: [],
      diskMemoryList: [],
      processorList: [],
      inputList: [],
      keyboardList: [],
      webcamList: [],
      priceList: [],
    }

    this.company = Company.Coolbox;

  }

  async scrap(): Promise<DatasetInterface> {

    try {

      this.logger.report('Inicializando el navegador');

      const browser = await Puppeteer.launch({ headless: false, defaultViewport: null });
      const [catalogPage] = await browser.pages();

      this.logger.report('Ingresando al catalogo de productos');
      await catalogPage.goto(this.link, { waitUntil: 'networkidle2', timeout: 0 });
      await catalogPage.waitForTimeout(5000);

      this.logger.report('Recorriendo lista de computadoras');
      const computerCardList = await catalogPage.$$('div.vtex-search-result-3-x-gallery a.vtex-product-summary-2-x-clearLink[href]');
      const computerCardLimit = 5;

      for (let computerCardIndex = 0; computerCardIndex < computerCardList.length; computerCardIndex++) {

        if (P.equals(computerCardIndex, computerCardLimit)) break;

        this.logger.report('Ingresando a los detalles del producto #' + (computerCardIndex + 1));
        await computerCardList[computerCardIndex].click({ button: 'middle' });

        await catalogPage.waitForTimeout(15000);
        const [_, productPage] = await browser.pages();
        await productPage.bringToFront();
        await productPage.waitForTimeout(15000);

        this.logger.report('Empezando la extraccion de datos...');
        const productHTML = await productPage.content();
        const $ = Cheerio.load(productHTML);

        const getTableValueByItem = (name: string) => {
          const detailList = $('div.coolboxpe-custom-store-components-0-x-props > div');
          return $(detailList).filter((_i, el) => P.equals($(el).children().first().text().trim(), name)).children().last().text().trim();
        };

        const computer = {
          id: S.generateId(),
          sku: $('span.vtex-product-identifier-0-x-product-identifier__value').text().trim(),
          name: $('div.coolboxpe-custom-store-components-0-x-titulo').text().trim(),
          type: ComputerType.Laptop,
          brand: P.convertStringToNameCase(getTableValueByItem('Marca'), 'PascalCase') as Brand,
          model: getTableValueByItem('Modelo'),
          os: getTableValueByItem('Nombre de SO'),
          warranty: P.isDefined(getTableValueByItem('Garantía')),
          warrantyTime: getTableValueByItem('Garantía'),
          url: productPage.url(),
          company: this.company,
        } as Computer;

        const computerDimension = {
          id: S.generateId(),
          heightCm: getTableValueByItem('Alto')?.split(/\s+/)[0],
          widthCm: getTableValueByItem('Ancho')?.split(/\s+/)[0],
          thickCm: getTableValueByItem('Profundidad')?.split(/\s+/)[0],
          weightKg: getTableValueByItem('Peso').split(/\s+/)[0],
          computerId: computer.id,
        } as ComputerDimension;

        const computerMemory = {
          id: S.generateId(),
          capacityGB: getTableValueByItem('Memoria RAM').split(/\s+/)[0].trim(),
          expandable: false,
          optane: false,
          computerId: computer.id,
        } as ComputerMemory;

        const processor = {
          id: S.generateId(),
          brand: getTableValueByItem('Procesador'),
          generation: getTableValueByItem('Detalle del procesador'),
          velocityGHz: getTableValueByItem('Detalle del procesador'),
          maxVelocityGHz: getTableValueByItem('Detalle del procesador'),
          coreCount: getTableValueByItem('Detalle del procesador'),
          name: getTableValueByItem('Procesador'),
          computerId: computer.id,
        } as Processor;

        const screen = {
          id: S.generateId(),
          type: getTableValueByItem('Tipo de pantalla') as ScreenType,
          definition: getTableValueByItem('Resolución de pantalla'),
          touch: P.equals(getTableValueByItem('Pantalla Touch'), 'Sí'),
          computerId: computer.id,
        } as Screen;

        const resolutionRow = getTableValueByItem('Resolución de la pantalla') || '';
        const resolutionMatch = resolutionRow.match(/(\d+ x \d+)/g)?.length == 1 ? resolutionRow.match(/(\d+ x \d+)/g)[0] : '';
        const resolutionSplit = resolutionMatch.split('x').length == 2 ? resolutionMatch.split('x') : [null, null];

        const screenDimension = {
          id: S.generateId(),
          sizeInch: S.extractNumbers(getTableValueByItem('Tamaño de pantalla')),
          widthPx: resolutionSplit[0]?.trim(),
          heightPx: resolutionSplit[1]?.trim(),
          screenId: screen.id,
        } as ScreenDimension;

        const disk = {
          id: S.generateId(),
          hdd: P.isDefined(getTableValueByItem('Capacidad de Disco duro')),
          ssd: P.isDefined(getTableValueByItem('Capacidad de Disco sólido (SSD)')),
          ssdReader: false,
          allowSecondUnit: null,
          allowReplace: null,
          opticalUnit: null,
          computerId: computer.id,
        } as Disk;

        const diskMemory = {
          id: S.generateId(),
          capacityGB: getTableValueByItem('Capacidad de Disco duro').match(/(\d+\s*GB)/g)?.length == 1 ? getTableValueByItem('Capacidad de Disco duro').match(/(\d+\s*GB)/g)[0].split('GB')[0].trim() : null,
          capacityTB: getTableValueByItem('Capacidad de Disco duro').match(/(\d+\s*TB)/g)?.length == 1 ? getTableValueByItem('Capacidad de Disco duro').match(/(\d+\s*TB)/g)[0].split('TB')[0].trim() : null,
          diskId: disk.id,
        } as DiskMemory;

        const graphic = {
          id: S.generateId(),
          type: getTableValueByItem('Tipo de gráficos') as GraphicType,
          brand: getTableValueByItem('Detalle del procesador gráfico'),
          name: getTableValueByItem('Detalle del procesador gráfico'),
          computerId: computer.id,
        } as Graphic;

        const graphicMemory = {
          id: S.generateId(),
          capacityGB: getTableValueByItem('Capacidad tarjeta de video').match(/(\d+\s*GB)/g)?.length == 1 ? getTableValueByItem('Capacidad tarjeta de video').match(/(\d+\s*GB)/g)[0].split('GB')[0].trim() : null,
          graphicId: graphic.id,
        } as GraphicMemory;

        const input = {
          id: S.generateId(),
          wifi: P.equals(getTableValueByItem('Wi-Fi'), 'Sí'),
          hdmi: P.equals(getTableValueByItem('Puertos HDMI'), 'Sí'),
          hdmiCount: getTableValueByItem('Puertos HDMI'),
          usb2Count: getTableValueByItem('Puertos USB'),
          usb2: null,
          usb3Count: getTableValueByItem('Puertos USB'),
          usb3: null,
          usbCCount: getTableValueByItem('Puertos USB'),
          usbC: null,
          usbCount: getTableValueByItem('Entradas USB'),
          microphone: P.equals(getTableValueByItem('Entrada de audio'), 'Sí'),
          network: P.equals(getTableValueByItem('Puerto de red'), 'Sí'),
          vga: P.equals(getTableValueByItem('Conexión VGA'), 'Sí'),
          bluetooth: P.equals(getTableValueByItem('Bluetooth'), 'Sí'),
          computerId: computer.id,
        } as Input;

        const keyboard = {
          id: S.generateId(),
          illuminated: P.equals(getTableValueByItem('Teclado iluminado'), 'Sí'),
          isNumeric: P.equals(getTableValueByItem('Teclado numérico'), 'Sí'),
          computerId: computer.id,
        } as Keyboard;

        const webcam = {
          id: S.generateId(),
          included: P.isDefined(getTableValueByItem('Cámara web')),
          computerId: computer.id,
        } as WebCam;

        const realValue = S.extractNumbers($('span.vtex-store-components7-x-listPriceValue').text().trim());
        const reducedValue = S.extractNumbers($('span.vtex-store-components7-x-sellingPrice').text().trim());
        const discountValue = P.isDefined(realValue) && P.isDefined(reducedValue) ? Math.round(100 - (P.toFloat(reducedValue) * 100 / P.toFloat(realValue))).toString() : '0';

        const price = {
          id: S.generateId(),
          currency: Currency.PEN,
          realValue,
          reducedValue,
          discountValue,
          consulted: new Date().toDateString(),
          computerId: computer.id,
        } as Price;

        this.dataset.computerList.push(computer);
        this.dataset.computerDimensionList.push(computerDimension)
        this.dataset.computerMemoryList.push(computerMemory);
        this.dataset.screenList.push(screen);
        this.dataset.screenDimensionList.push(screenDimension);
        this.dataset.diskList.push(disk);
        this.dataset.diskMemoryList.push(diskMemory);
        this.dataset.graphicList.push(graphic);
        this.dataset.graphicMemoryList.push(graphicMemory);
        this.dataset.processorList.push(processor);
        this.dataset.inputList.push(input);
        this.dataset.keyboardList.push(keyboard);
        this.dataset.webcamList.push(webcam);
        this.dataset.priceList.push(price);

        await productPage.close();

      }

      this.logger.report('Cerrando el navegador');
      await browser.close();

      return this.dataset;

    } catch (error) {

      console.log(error);

      return null;
    }

  }


}