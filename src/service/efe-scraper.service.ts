// Tool
import * as puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import * as P from "ts-prime";
// Model
import { Computer } from '../model/computer.model';
// import { Price } from '../model/price.model';
import { DatasetInterface } from 'src/interface/dataset.interface';
// Interface
import { ScraperInterface } from '../interface/scraper.interface';
// Enum
import { LoggerType } from '../enum/logger.type.enum';
import { ComputerType } from '../enum/computer.type.enum';
import { Brand } from '../enum/brand.enum';
import { Company } from '../enum/company.enum';
// Service
import { LoggerService } from './logger.service';


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
      const browser = await puppeteer.launch({ headless: false });
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
      await productPage.waitForTimeout(10000);

      this.logger.report('Empezando la extraccion de datos...');
      const computerList: Computer[] = [];

      const html2 = await productPage.content();
      const $$ = cheerio.load(html2);

      const detailList = $$('div.product_page_content div.tab div.content ul').children();

      const computer = new Computer();

      computer.sku = P.last($$('span.sku').text().split(':'));
      computer.name = $$('h1.main_header').text().trim();
      computer.type = $$(detailList).filter((_i, el) => P.equals($$(el).children().first().text().trim(), 'Tipo:')).first().children().last().text().trim() as ComputerType;
      computer.brand = P.find(P.map(computer.name.split(/\s+/), name => P.convertStringToNameCase(name, 'PascalCase')), name => P.includesAny(Object.values(Brand), [name]));
      computer.model = $$(detailList).filter((_i, el) => P.equals($$(el).children().first().text().trim(), 'Modelo:')).first().children().last().text().trim();
      computer.os = $$(detailList).filter((_i, el) => P.equals($$(el).children().first().text().trim(), 'Sistema operativo:')).first().children().last().text().trim();
      computer.warranty = P.isDefined($$(detailList).filter((_i, el) => P.equals($$(el).children().first().text().trim(), 'Garantía:')));
      computer.warrantyTime = $$(detailList).filter((_i, el) => P.equals($$(el).children().first().text().trim(), 'Garantía:')).first().children().last().text().trim();
      computer.url = catalogPage.url();
      computer.country = undefined;
      computer.company = this.company;

      if (P.isDefined(computer.name)) {
        this.logger.report('Agregando computadora: ' + computer.name);
        computerList.push(computer);
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

      this.logger.report('Cerrando el navegador');
      await browser.close();

      return { computerList, priceList: [] } as DatasetInterface;

    } catch (error) {

      console.log(error); // this.logger.report('Algo salio mal');

      return null;
    }

  }

  async scrollToBottom(page: puppeteer.Page) {

    const distance = 100, delay = 100;

    while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {

      await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);

      await page.waitForTimeout(delay);

    }

  }

}