// Scraper
import { EfeScraper } from './scraper/efe.scraper';
// Util
import { log } from './util/logger';

async function main() {

  const efeScraper = new EfeScraper()

  const result = await efeScraper.scrap();

  log('Resultado: ' + result);

}

main();