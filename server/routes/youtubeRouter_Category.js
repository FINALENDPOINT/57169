const express = require("express")
const router = express.Router()
const youtube = require("../models/Youtube_Models")

router.get('/category', async (req, res) => {
    const category = req.query.category
    const query = category ? { kategori: category } : {}

    try {
        const contentData = await youtube.find(query)
        res.json(contentData)
    }
    catch (error) {
        console.error("Gagal mengambil konten:", error)
        res.status(500).json({error: "content youtube kategori gagal"})
    }
})

module.exports = router