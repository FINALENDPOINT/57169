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

// Endpoint untuk menambahkan komentar
router.post("/article/comments", async (req, res) => {
    const { slug } = req.query;
    const { userId, commentText } = req.body; // Ambil data dari body permintaan

    if (!slug) {
        return res.status(400).json({ message: "Slug artikel diperlukan." });
    }

    if (!commentText || !commentText.trim()) {
        return res.status(400).json({ message: "Isi komentar tidak boleh kosong." });
    }
    try {
        const [result] = await db.execute(
            'INSERT INTO comments (article_slug, user_id, comment_text, created_at) VALUES (?, ?, ?, NOW())',
            [slug, userId, commentText]
        );

        if (result.affectedRows > 0) {
            // Setelah komentar ditambahkan, perbarui jumlah komentar di tabel article_popularity (opsional)
            await db.execute(
                'UPDATE popularity_StudentNews SET comments = comments + 1 WHERE article_slug = ?',
                [slug]
            );
            res.status(201).json({ message: 'Komentar berhasil ditambahkan', commentId: result.insertId });
        } else {
            res.status(500).json({ message: 'Gagal menyimpan komentar ke database.' });
        }
    } catch (error) {
        console.error('Error saat menambahkan komentar:', error);
        res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan komentar.' });
    } finally {
    }
});

module.exports = router;