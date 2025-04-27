const express = require("express")
const router = express.Router()
const youtube = require("../models/Youtube_Models")

router.get('/Youtube', async (req, res) => {
    try {
        const content = await youtube.find()
        res.status(200).json(content)
    }
    catch (error) {
        res.status(500)/json({
            message: "gagal menambahkan rute youtube content", error: error.message
        })
    }
})

module.exports = router