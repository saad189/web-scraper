const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

const PORT = 5500;
const SCRAPE_URL = "https://www.theguardian.com/uk";
const SCRAPE_ITEM = ".fc-item__title";

axios(SCRAPE_URL)
  .then((result) => {
    const html = result.data;
    const loaded = cheerio.load(html);
    const articles = [];
    loaded(SCRAPE_ITEM, html).each(function () {
      const title = loaded(this).text();
      const url = loaded(this).find("a").attr("href");
      articles.push({ title, url });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
