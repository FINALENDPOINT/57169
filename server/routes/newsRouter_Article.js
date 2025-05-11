// const express = require("express")
// const router = express.Router()
// const News = require("../models/StudentNews_Models")

// router.get("/article", async (req, res) => {
//     const title = req.query.title
//     console.log(`nilai title adalah ${title}`)

//     try {
//         if (!title) {
//             return res.status(400).json({message: "Title is required"})
//         }

//         const article = await News.findOne({judul: title})

//         if (!article) {
//             return res.status(404).json({message: `Artikel dengan judul ${title} tidak ditemukan`})
//         }

//         res.status(200).json(article)
//     } 
//     catch(error) {
//         console.error(`Error saat mencari artikel ${error}`)
//         res.status(500).json({message: `Terjadi kesalah pada server.`})
//     }
// })

// module.exports = router

const express = require('express');
const router = express.Router();
const News = require('../models/StudentNews_Models'); // Pastikan path ke model News benar
const db = require("../config/database"); // Pastikan path ke koneksi database MySQL benar

// Endpoint untuk mendapatkan artikel berdasarkan slug (menggunakan req.query)
router.get("/article", async (req, res) => {
  const slug = req.query.slug;
  console.log("nilai slug adalah " + slug);
  try {
    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }
    const article = await News.findOne({ slug: slug }); // Cari artikel berdasarkan field slug
    if (!article) {
      return res.status(404).json({ message: `Artikel dengan slug ${slug} tidak ditemukan` });
    }
    res.status(200).json(article);
  } catch (error) {
    console.error(`Error saat mencari artikel berdasarkan slug ${error}`);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

// Endpoint untuk mendapatkan komentar berdasarkan slug (menggunakan req.query)
router.get("/article/comments", async (req, res) => {
  const slug = req.query.slug;
  try {
    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }
    try {
      const [comments] = await db.execute(
        'SELECT id, user_id, comment_text, created_at FROM comments WHERE article_slug = ? ORDER BY created_at DESC',
        [slug]
      );
      res.status(200).json(comments);
    } finally {
    }
  } catch (error) {
    console.error(`Error saat mengambil komentar untuk slug ${slug}:`, error);
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil komentar." });
  }
});

module.exports = router;