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
import { Company, LoggerType, ComputerType, Brand, ScreenType, GraphicType, Currency } from '../enum/enum';
// Service
import { LoggerService } from './service';


export class EfeScraperService implements ScraperInterface {


  logger: LoggerService;
  company: Company;
  dataset: DatasetInterface;
  link: { [name: string]: string } = {
    ComputerCatalog: 'https://www.efe.com.pe/efe/computo',
  };


  constructor() {

    this.logger = new LoggerService(LoggerType.EfeScraperLogger);

    this.company = Company.Efe;

  }

  async scrap(): Promise<DatasetInterface> {

    try {

      this.logger.report('Inicializando el navegador');
      const browser = await Puppeteer.launch({ headless: false });
      const [catalogPage] = await browser.pages();

      this.logger.report('Ingresando al catalogo de productos');
      await catalogPage.goto(this.link.ComputerCatalog, { waitUntil: 'networkidle2', timeout: 0 });

      // this.logger.report('Cargando todos los productos...');
      // await this.scrollToBottom(page);
      // await page.waitForTimeout(3000);

      this.logger.report('Ingresando a los detalles del producto');
      await catalogPage.waitForTimeout(2000);
      await catalogPage.click('div.product_name a[href]', { button: 'middle' });

      const productPage = P.last(await browser.pages());
      await productPage.bringToFront();
      await catalogPage.waitForTimeout(10000);

      this.logger.report('Empezando la extraccion de datos...');
      const computerList: Computer[] = [];
      const computerDimensionList: ComputerDimension[] = [];
      const screenDimensionList: ScreenDimension[] = [];
      const computerMemoryList: ComputerMemory[] = [];
      const graphicMemoryList: GraphicMemory[] = [];
      const diskMemoryList: DiskMemory[] = [];
      const processorList: Processor[] = [];
      const screenList: Screen[] = [];
      const diskList: Disk[] = [];
      const graphicList: Graphic[] = [];
      const inputList: Input[] = [];
      const keyboardList: Keyboard[] = [];
      const webcamList: WebCam[] = [];
      const priceList: Price[] = [];

      const html2 = await productPage.content();
      const $$ = Cheerio.load(html2);

      const getTableValueByItem = (name: string) => {
        const detailList = $$('div.product_page_content div.tab div.content ul').children();
        return $$(detailList).filter((_i, el) => P.equals($$(el).children().first().text().trim(), name + ':')).first().children().last().text().trim();
      };

      const computer = {
        id: S.generateId(),
        sku: P.last($$('span.sku').text().split(':')),
        name: $$('h1.main_header').text().trim(),
        type: getTableValueByItem('Tipo') as ComputerType,
        brand: P.find(P.map($$('h1.main_header').text().trim().split(/\s+/), name => P.convertStringToNameCase(name, 'PascalCase')), name => P.includesAny(Object.values(Brand), [name])),
        model: getTableValueByItem('Modelo'),
        os: getTableValueByItem('Sistema operativo'),
        warranty: P.isDefined(getTableValueByItem('Garantía')),
        warrantyTime: getTableValueByItem('Garantía'),
        url: catalogPage.url(),
        country: undefined,
        company: this.company,
      } as Computer;

      const computerDimension = {
        id: S.generateId(),
        heightCm: getTableValueByItem('Costado').split(/\s+/)[0],
        widthCm: getTableValueByItem('Ancho').split(/\s+/)[0],
        thickCm: getTableValueByItem('Alto').split(/\s+/)[0],
        weightKg: getTableValueByItem('Peso (kg)').split(/\s+/)[0],
        computerId: computer.id,
      } as ComputerDimension;

      const computerMemory = {
        id: S.generateId(),
        capacityGB: getTableValueByItem('Memoria RAM').split(/\s+/)[0].trim(),
        expandable: P.equals(getTableValueByItem('Memoria ampliable'), 'Si'),
        optane: P.equals(getTableValueByItem('Memoria Optane'), 'Si'),
        computerId: computer.id,
      } as ComputerMemory;

      const processor = {
        id: S.generateId(),
        brand: getTableValueByItem('Marca de procesador'),
        generation: S.decodeUTF8(getTableValueByItem('Procesador')),
        velocityGHz: getTableValueByItem('Velocidad de procesador').split(/\s+/)[0].trim(),
        maxVelocityGHz: getTableValueByItem('Velocidad máxima').split(/\s+/)[0].trim(),
        coreCount: getTableValueByItem('Núcleos de procesador'),
        name: getTableValueByItem('Marca de procesador') + ' ' + S.decodeUTF8(getTableValueByItem('Procesador')),
        computerId: computer.id,
      } as Processor;

      const screen = {
        id: S.generateId(),
        type: ScreenType.IPS,
        definition: getTableValueByItem('Definición'),
        touch: P.equals(getTableValueByItem('Pantalla táctil'), 'Si'),
        computerId: computer.id,
      } as Screen;

      const screenDimension = {
        id: S.generateId(),
        sizeInch: S.extractNumbers(getTableValueByItem('Tamaño de pantalla')),
        widthPx: getTableValueByItem('Resolución de pantalla').split('x')[0].trim(),
        heightPx: getTableValueByItem('Resolución de pantalla').split('x')[1].trim(),
        screenId: screen.id,
      } as ScreenDimension;

      const disk = {
        id: S.generateId(),
        hdd: P.equals(getTableValueByItem('Disco duro (DD)'), 'Si'),
        ssd: P.equals(getTableValueByItem('Disco estado sólido (SSD)'), 'Si'),
        allowSecondUnit: P.equals(getTableValueByItem('Permite segunda unidad'), 'Si'),
        allowReplace: P.equals(getTableValueByItem('Permite reemplazo'), 'Si'),
        opticalUnit: P.equals(getTableValueByItem('Unidad óptica'), 'Si'),
        computerId: computer.id,
      } as Disk;

      const diskMemory = {
        id: S.generateId(),
        capacityGB: getTableValueByItem('Capacidad').split('GB')?.length > 1 ? getTableValueByItem('Capacidad').split('GB')[0].trim() : null,
        capacityTB: getTableValueByItem('Capacidad').split('TB')?.length > 1 ? getTableValueByItem('Capacidad').split('TB')[0].trim() : null,
        diskId: disk.id,
      } as DiskMemory;

      const graphic = {
        id: S.generateId(),
        type: P.equals(getTableValueByItem('Tipo de gráficos'), 'DEDICADO') ? GraphicType.Dedicated : GraphicType.Integrated,
        brand: getTableValueByItem('Marca tarjeta gráfica'),
        name: getTableValueByItem('Tarjeta gráfica'),
        computerId: computer.id,
      } as Graphic;

      const graphicMemory = {
        id: S.generateId(),
        capacityGB: getTableValueByItem('Memoria Gráfica')?.split(/\s+/)[0].trim(),
        graphicId: graphic.id,
      } as GraphicMemory;

      const input = {
        id: S.generateId(),
        wifi: P.equals(getTableValueByItem('Wi-Fi'), 'Si'),
        hdmi: P.equals(getTableValueByItem('HDMI'), 'Si'),
        hdmiCount: P.isDefined(getTableValueByItem('HDMI')) ? '1' : null,
        usb2Count: getTableValueByItem('USB 2.0'),
        usb2: P.isDefined(getTableValueByItem('USB 2.0')),
        usb3Count: getTableValueByItem('USB 3.0'),
        usb3: P.isDefined(getTableValueByItem('USB 3.0')),
        usbCCount: getTableValueByItem('USB tipo C'),
        usbC: P.isDefined(getTableValueByItem('USB tipo C')),
        usbCount: getTableValueByItem('Puertos USB'),
        microphone: P.equals(getTableValueByItem('Entrada micrófono'), 'Si'),
        network: P.equals(getTableValueByItem('Puerto de red'), 'Si'),
        vga: P.equals(getTableValueByItem('Conexión VGA'), 'Si'),
        bluetooth: P.equals(getTableValueByItem('Bluetooth'), 'Si'),
        computerId: computer.id,
      } as Input;

      const keyboard = {
        id: S.generateId(),
        illuminated: P.equals(getTableValueByItem('Teclado iluminado'), 'Si'),
        isNumeric: P.equals(getTableValueByItem('Teclado númerico'), 'Si'),
        computerId: computer.id,
      } as Keyboard;

      const webcam = {
        id: S.generateId(),
        included: P.equals(getTableValueByItem('Cámara web'), 'Si'),
        computerId: computer.id,
      } as WebCam;

      const price = {
        id: S.generateId(),
        currency: P.equals($$('span#offerPriceSymbol').first().text().trim(), 'S/') ? Currency.PEN : null,
        realValue: S.extractNumbers($$('span.old_price').first().text().trim()),
        reducedValue: S.extractNumbers($$('span#offerPriceValue').first().text().trim()),
        discountValue: S.extractNumbers($$('div.dscto-prod-NE').text().trim()),
        consulted: new Date().toDateString(),
        computerId: computer.id,
      } as Price;

      computerList.push(computer);
      computerDimensionList.push(computerDimension)
      computerMemoryList.push(computerMemory);
      screenList.push(screen);
      screenDimensionList.push(screenDimension);
      diskList.push(disk);
      diskMemoryList.push(diskMemory);
      graphicList.push(graphic);
      graphicMemoryList.push(graphicMemory);
      processorList.push(processor);
      inputList.push(input);
      keyboardList.push(keyboard);
      webcamList.push(webcam);
      priceList.push(price);

      this.logger.report('Cerrando el navegador');
      await browser.close();

      return {
        computerList,
        computerDimensionList,
        computerMemoryList,
        screenList,
        screenDimensionList,
        graphicList,
        graphicMemoryList,
        diskList,
        diskMemoryList,
        processorList,
        inputList,
        keyboardList,
        webcamList,
        priceList,
      } as DatasetInterface;

    } catch (error) {

      console.log(error); // this.logger.report('Algo salio mal');

      return null;
    }

  }

  async scrollToBottom(page: Puppeteer.Page) {

    const distance = 100, delay = 100;

    while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {

      await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);

      await page.waitForTimeout(delay);

    }

  }

}


      // this.logger.report('Recorriendo lista de computadoras');
      // for (const computerHTML of computerListHTML) {

      //   const computer = new Computer();

      //   computer.name = $(computerHTML).find('div.product_name').text().replace(/[\r\n\t]/igm, '');
      //   computer.url = $(computerHTML).find('div.product_name a').attr('href');

      //   if (computer.name) {
      //     this.logger.report('Agregando computadora: ' + computer.name);
      //     computerList.push(computer);
      //   }

      // }