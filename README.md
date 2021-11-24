<!--
Created: Thu Nov 18 2021 12:56:11 GMT-0400 (hora de Bolivia)
Modified: Wed Nov 24 2021 14:48:59 GMT-0400 (hora de Bolivia)
-->

# Computer Scrapping

Tool that extracts data from the pages of companies that sell computers in the city of Trujillo - Peru, exports them in an XLSX file according to a relational data model, and displays them on a Power BI dashboard.

## Objectives

* Use web scraping techniques to the selected websites to obtain the data. (minimum 03 web pages and 02 web scraping techniques)
* Build the Dashboard in Power BI that shows the dynamic analysis of the data

## Steps

### 1. Search for companies that sell computers in Trujillo

* [Falabella](https://www.falabella.com.pe/)
* [La Curacao](https://www.lacuracao.pe/)
* [Oechsle](https://www.oechsle.pe/)
* [Efe](https://www.efe.com.pe/)
* [Hiraoka](https://hiraoka.com.pe/)
* [Coolbox](https://www.coolbox.pe/)

### 2. Design of the data model

* [DB Diagram](https://dbdiagram.io/) - Data Modeling Tool

![datamodel](https://raw.githubusercontent.com/MichaellAlavedraMunayco/computer-scrapping/main/.github/images/computers.database.png)

Download Data Model PDF File [here](https://raw.githubusercontent.com/MichaellAlavedraMunayco/computer-scrapping/main/.github/docs/computers.database.pdf)

### 3. Search for tools for data extraction

* Node JS - Javascript Engine
* [Puppeteer](https://www.npmjs.com/package/puppeteer) - Web page manipulation tool
* [Cheerio JS](https://www.npmjs.com/package/cheerio) - Web page querier tool like JQuery
* [Excel JS](https://www.npmjs.com/package/exceljs) - Tool for exporting extracted data to XLSX file

### 4. Charts

* What brand of computer is more and less expensive?
* Which computer has more and less processing capacity?
* Which computer has more and less storage capacity?
