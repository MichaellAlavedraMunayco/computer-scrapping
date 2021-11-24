import * as Puppeteer from 'puppeteer';
import * as Cheerio from 'cheerio';
import * as XLSX from 'exceljs';
import * as Chalk from 'chalk';
import * as P from 'ts-prime';

import { extractNumbers } from './extract-numbers.util';
import { decodeUTF8 } from './decode-utf8';
import { generateId } from './generate-id';

const S = {
  extractNumbers,
  decodeUTF8,
  generateId,
};

export {
  Chalk,
  XLSX,
  Puppeteer,
  Cheerio,
  P,
  S,
};
