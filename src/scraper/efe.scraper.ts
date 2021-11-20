// Tool
import * as puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
// Model
import { Computer } from '../model/computer.model';
import { Price } from '../model/price.model';
// Util
import { log } from '../util/logger';


export class EfeScraper {


  computerList: Computer[];
  priceList: Price[];


  constructor() {

    this.computerList = [];
    this.priceList = [];

  }

  async scrap() {

    try {

      log('Inicializando el navegador');
      const browser = await puppeteer.launch({ headless: false });

      log('Abriendo nueva pestaña en el navegador');
      const page = await browser.newPage();

      log('Configuracion dimensiones de la pagina');
      await page.setViewport({ width: 1500, height: 800 });

      log('Redirigiendo a pagina de la empresa Efe');
      await page.goto(EfeLinks.ComputerCatalog, { waitUntil: 'networkidle2', timeout: 0 });

      log('Extrayendo datos...');
      const html = await page.content();
      // const data = await page.evaluate(() => document.querySelector('*').outerHTML);

      const $ = cheerio.load(html);

      const computerList: Computer[] = [];

      const computerListHTML = $('ul#contentResultScroll').children();

      log('Recorriendo lista de computadoras');
      for (const computerHTML of computerListHTML) {

        const computer = new Computer();

        computer.name = $(computerHTML).find('div.product_name').text();
        computer.url = $(computerHTML).find('div.product_name a').attr('href');

        log('Agregando computadora: ' + computer.name);
        computerList.push(computer);

      }

      log('Cerrando el navegador');
      await browser.close();

      return { computerList };

    } catch (error) {

      console.log(error);
      log('Algo salio mal');
      return null;
    }

  }

}

const EfeLinks = {
  ComputerCatalog: 'https://www.efe.com.pe/efe/computo',
}