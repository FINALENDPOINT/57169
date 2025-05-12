const bcrypt = require("bcryptjs");
const db = require("../config/database");

const registerauthor = async (req, res) => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS authors (
        id INT PRIMARY KEY AUTO_INCREMENT,
        namaLengkap VARCHAR(255) NOT NULL UNIQUE,
        userName VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const { namaLengkap, userName, password } = req.body;

    if (!namaLengkap || !userName || !password) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    const [existingUser] = await db.execute(
      "SELECT * FROM authors WHERE userName = ?",
      [userName]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Username sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      "INSERT INTO authors (namaLengkap, userName, password) VALUES (?, ?, ?)",
      [namaLengkap, userName, hashedPassword]
    );

    res.status(201).json({ message: "Author berhasil didaftarkan" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerauthor };
