const express = require("express")
const router = express.Router()
const News = require("../models/news")

router.get("/article", async (req, res) => {
    const title = req.query.title
    console.log(`nilai title adalah ${title}`)

    try {
        if (!title) {
            return res.status(400).json({message: "Title is required"})
        }

        const article = await News.findOne({judul: title})

        if (!article) {
            return res.status(404).json({message: `Artikel dengan judul ${title} tidak ditemukan`})
        }

        res.status(200).json(article)
    } 
    catch(error) {
        console.error(`Error saat mencari artikel ${error}`)
        res.status(500).json({message: `Terjadi kesalah pada server.`})
    }
})

module.exports = router