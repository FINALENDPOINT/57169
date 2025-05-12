const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");

const register = async (req, res) => {
  try {
    await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT PRIMARY KEY AUTO_INCREMENT,
          namaLengkap VARCHAR(255) NOT NULL,
          userName VARCHAR(255) NOT NULL UNIQUE,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          jenisKelamin ENUM('Laki-laki', 'Perempuan') NOT NULL,
          alamat TEXT NOT NULL,
          pekerjaan VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    const {
      namaLengkap,
      userName,
      email,
      password,
      jenisKelamin,
      alamat,
      pekerjaan,
    } = req.body;

    if (
      !namaLengkap ||
      !userName ||
      !email ||
      !password ||
      !jenisKelamin ||
      !alamat ||
      !pekerjaan
    ) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    const [existingUser] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      "INSERT INTO users (namaLengkap, userName, email, password, jenisKelamin, alamat, pekerjaan) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        namaLengkap,
        userName,
        email,
        hashedPassword,
        jenisKelamin,
        alamat,
        pekerjaan,
      ]
    );

    res.status(201).json({ message: "User berhasil didaftarkan" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register };
