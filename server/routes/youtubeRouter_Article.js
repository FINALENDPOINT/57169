const express = require("express")
const router = express.Router()
const youtube = require("../models/Youtube_Models")

router.get("/article", async (req, res) => {
    const title = req.query.title

    try {
        if (!title) {
            return res.status(400).json({message: "Title is required"})
        }

        const article = await youtube.findOne({judul: title})

        if (!article) {
            return res.status(400).json({message: `artikel dengan judul: ${article} tidak ditemukan`})
        }

        res.status(200).json(article)
    }
    catch (error) {
        console.error(`Error saat sedang mencari konten: ${article}`)
        res.status(500).json({message: 'Terjadi kesalahan server'})
    }
})

module.exports = router