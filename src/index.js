const FalabellaScraper = require('./scraper/falabella.scraper');

async function main() {

  const falabellaResult = await new FalabellaScraper().scrap();

  console.log(falabellaResult.priceList);

}

main();