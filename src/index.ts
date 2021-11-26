// Service
import {
  CoolboxScraperService,
  EfeScraperService,
  OechsleScraperService,
  XLSXExporterService
} from './service/service';


async function main() {

  await coolboxScrap(false);
  await oechsleScrap(false);
  await efeScrap(true);

}


async function coolboxScrap(enable: boolean): Promise<void> {

  if (!enable) return;

  const coolboxScraper = new CoolboxScraperService()
  const coolboxDataset = await coolboxScraper.scrap();
  new XLSXExporterService().add(coolboxDataset).export();

}


async function oechsleScrap(enable: boolean): Promise<void> {

  if (!enable) return;

  const oechsleScraper = new OechsleScraperService()
  const oechsleDataset = await oechsleScraper.scrap();
  new XLSXExporterService().add(oechsleDataset).export();

}


async function efeScrap(enable: boolean): Promise<void> {

  if (!enable) return;

  const efeScraper = new EfeScraperService()
  const efeDataset = await efeScraper.scrap();
  new XLSXExporterService().add(efeDataset).export();

}


main();