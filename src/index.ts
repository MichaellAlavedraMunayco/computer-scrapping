// Service
import {
  EfeScraperService,
  FalabellaScraperService,
  XLSXExporterService
} from './service/service';
// Interface
import { DatasetInterface } from './interface/interface';


async function main() {

  // Get dataser from Efe Store
  const efeScraper = new EfeScraperService()
  const efeDataset = await efeScraper.scrap();


  // Get dataser from Falabella
  const falabellaScraper = new FalabellaScraperService()
  const falabellaDataset = await falabellaScraper.scrap();


  // Join datasets
  const dataset: DatasetInterface = {
    computerList: [...efeDataset.computerList, ...falabellaDataset.computerList],
    priceList: [...efeDataset.priceList, ...falabellaDataset.priceList],
  };


  // Export dataset into XLSX File
  new XLSXExporterService().add(dataset).export();

}

main();