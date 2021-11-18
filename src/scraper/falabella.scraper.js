const request = require('request-promise');
const cheerio = require('cheerio');

class FalabellaScraper {

  pageURL;

  constructor () {

    this.pageURL = 'http://quotes.toscrape.com/';

    return this;
  }

  async scrap() {

    try {

      const $ = await request({ uri: this.pageURL, transform: body => cheerio.load(body) });

      return $('title').html();

    } catch (e) {

      console.log(e);

    }

  }

}

module.exports = FalabellaScraper;