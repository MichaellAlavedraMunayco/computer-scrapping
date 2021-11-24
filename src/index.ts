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
    computerDimensionList: [...efeDataset.computerDimensionList, ...falabellaDataset.computerDimensionList],
    screenDimensionList: [...efeDataset.screenDimensionList, ...falabellaDataset.screenDimensionList],
    computerMemoryList: [...efeDataset.computerMemoryList, ...falabellaDataset.computerMemoryList],
    graphicMemoryList: [...efeDataset.graphicMemoryList, ...falabellaDataset.graphicMemoryList],
    diskMemoryList: [...efeDataset.diskMemoryList, ...falabellaDataset.diskMemoryList],
    processorList: [...efeDataset.processorList, ...falabellaDataset.processorList],
    screenList: [...efeDataset.screenList, ...falabellaDataset.screenList],
    diskList: [...efeDataset.diskList, ...falabellaDataset.diskList],
    graphicList: [...efeDataset.graphicList, ...falabellaDataset.graphicList],
    inputList: [...efeDataset.inputList, ...falabellaDataset.inputList],
    keyboardList: [...efeDataset.keyboardList, ...falabellaDataset.keyboardList],
    webcamList: [...efeDataset.webcamList, ...falabellaDataset.webcamList],
    priceList: [...efeDataset.priceList, ...falabellaDataset.priceList],
  };


  // Export dataset into XLSX File
  new XLSXExporterService().add(dataset).export();

}

main();