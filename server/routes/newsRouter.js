const express = require("express")
const router = express.Router()
const News = require("../models/StudentNews_Models")
const cors = require("cors")

router.get('/StudentNews', cors({ origin: 'https://news.unteyojourney.myhost.id' }), async (req, res) => {
  try {
    const student_news = await News.find()
    res.status(200).json(student_news)
  }
  catch (error) {
    res.status(500).json({message: "Gagal menambahkan rute student news:", error: error.message})
  }
})

module.exports = router