// Util
// import { Puppeteer, Cheerio, P } from '../util/util';
// Model
// import { Computer, Price } from '../model/model';
// Interface
import { DatasetInterface, ScraperInterface } from '../interface/interface';
// Enum
import { Company } from '../enum/enum';
// Service
import { LoggerService } from './service';

export class FalabellaScraperService implements ScraperInterface {


  logger: LoggerService;
  company: Company;
  dataset: DatasetInterface;

  link: { [name: string]: string } = {
    LaptopCatalog: 'https://www.falabella.com.pe/falabella-pe/category/cat40712/Laptops',
    LaptopProduct: 'https://www.falabella.com.pe/falabella-pe/product/{sku}/{name}'
  }


  constructor() {

    // this.http = new Request({ delay: 10 * 1000 });

  }

  async scrap(): Promise<DatasetInterface> {

    try {

      // const catalogHTML = await this.http.request(FalabellaLinks.LaptopCatalog);
      // const catalogPage = load(catalogHTML);

      // const computerList = [];
      // const priceList = [];

      // const productList = catalogPage('div#testId-searchResults-products').children('div.search-results-list');

      // for (const product of productList) {

      //   const sku = catalogPage(product).find('div[data-key]').attr('data-key');
      //   const name = catalogPage(product).find('b.pod-subTitle').text();
      //   const type = ComputerType.Laptop;

      //   const computer = new Computer(sku, name, type);

      //   computerList.push(computer);

      //   const modifiedLink = FalabellaLinks.LaptopProduct
      //     .replace('{sku}', computer.sku).replace('{name}', computer.name.replace(/\s+/g, '-').replace(/\'+/g, '-'));

      //   console.log(modifiedLink);

      //   const productHTML = await this.http.request(modifiedLink);
      //   const productPage = load(await productHTML);

      //   const realValue = productPage('li.price-0').text().replace(/\D/g, '');
      //   const reducedValue = productPage('li.price-1').text().replace(/\D/g, '')
      //   const discountValue = productPage('div.pod-badges-PDP').last().text().replace('% DCTO', '');

      //   const price = new Price(realValue, reducedValue, discountValue, computer.id);

      //   priceList.push(price);

      // }

      // this.computerList = computerList;
      // this.priceList = priceList;

      return {
        computerList: [],
        priceList: [],
      };

    } catch (error) {

      console.error(error);

      return null;
    }

  }

}