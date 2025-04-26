const express = require("express");
const router = express.Router();
const News = require("../models/StudentNews_Models");

router.get("/category", async (req, res) => {
  const category = req.query.category;
  // // Jika kategori diberikan, filter berita berdasarkan kategori (dikonversi ke lowercase untuk konsistensi)
  const query = category ? { kategori: category.toLowerCase() } : {};

  // console.log(`nilai kategory:${category}`)
  // console.log(`nilai kategori:${query}`)

  try {
    const newsData = await News.find(query);
    res.json(newsData);
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;