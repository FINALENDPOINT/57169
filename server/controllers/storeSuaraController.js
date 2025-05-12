const db = require("../config/database");
const path = require("path");
const fs = require("fs");

const storeSuara = async (req, res) => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS opini (
        id INT AUTO_INCREMENT PRIMARY KEY,
        kategori VARCHAR(100),
        judul VARCHAR(255),
        gambar VARCHAR(255),
        teks TEXT,
        tanggal DATE,
        tagar VARCHAR(255)
      );
    `);

    const { kategori, judul, teks, tanggal, tagar } = req.body;
    let gambarFilename = null; 

    // Menangani gambar jika ada di request
    // req.files akan tersedia berkat express-fileupload
    if (req.files && req.files.gambar) {
      const gambarFile = req.files.gambar;
      // Buat nama file yang unik untuk menghindari penimpaan, contoh: timestamp + nama asli
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      gambarFilename = uniqueSuffix + "-" + gambarFile.name;

      const uploadPath = path.join(__dirname, "..", "uploads", gambarFilename);
      const uploadsDir = path.join(__dirname, "..", "uploads");

      // Jika tidak menggunakan createParentPath: true di middleware fileUpload,
      // pastikan direktori uploads ada:
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Memindahkan file gambar ke folder uploads
      // Fungsi mv adalah bagian dari express-fileupload
      await gambarFile.mv(uploadPath); // mv() mengembalikan Promise jika tidak ada callback

      // gambar = gambarFile.name; // Sudah diubah menjadi gambarFilename dengan nama unik
    } else {
      // Tambahkan log jika tidak ada file gambar untuk debugging
      console.log(
        "Tidak ada file gambar yang diunggah atau req.files.gambar tidak ditemukan."
      );
    }
    await db.execute(
      "INSERT INTO opini (kategori, judul, gambar, teks, tanggal, tagar) VALUES (?, ?, ?, ?, ?, ?)",
      [
        kategori || null,
        judul || null,
        gambarFilename,
        teks || null,
        tanggal || null,
        tagar || null,
      ]
    );

    res.status(201).json({
      message: "Opini berhasil ditambahkan",
      data: {
        kategori,
        judul,
        gambar: gambarFilename,
        teks,
        tanggal,
        tagar,
      },
    });
  } catch (error) {
    console.error("Error di storeSuara:", error);
    res.status(500).json({
      error: "Terjadi kesalahan di server: " + error.message,
    });
  }
};

module.exports = {
  storeSuara,
};
