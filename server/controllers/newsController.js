const News = require("../models/news");

const newsController = async (req, res) => {
  const news = await News.findOne({ judul });
  console.log(news);
};

module.exports = [newsController];
