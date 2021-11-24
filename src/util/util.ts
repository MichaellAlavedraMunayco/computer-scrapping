import * as Puppeteer from 'puppeteer';
import * as Cheerio from 'cheerio';
import * as XLSX from 'exceljs';
import * as Chalk from 'chalk';
import * as P from 'ts-prime';

import { extractNumbers } from './extract-numbers.util';

const S = {
  extractNumbers,
};

export {
  Chalk,
  XLSX,
  Puppeteer,
  Cheerio,
  P,
  S,
};
