const express = require("express");
const router = express.Router();
const News = require("../models/news"); // Pastikan path model disesuaikan

// Route dengan parameter dinamis 'category'
// Jika diakses: /StudentNews/Sosial, maka req.params.category akan bernilai "Sosial"
// Jika parameter tidak diberikan, misalnya hanya /StudentNews, maka akan mengembalikan semua berita
router.get("/StudentNews/:category?", async (req, res) => {
  const { category } = req.params;
  // Jika kategori diberikan, filter berita berdasarkan kategori (dikonversi ke lowercase untuk konsistensi)
  const query = category ? { kategori: category.toLowerCase() } : {};

  try {
    const newsData = await News.find(query);
    res.json(newsData);
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;