const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");

const JWT_SECRET = process.env.JWT_SECRET || "terasiBalap";

const loginAuthor = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res
        .status(400)
        .json({ error: "Username dan password wajib diisi" });
    }

    const [users] = await db.execute(
      "SELECT * FROM authors WHERE userName = ?",
      [userName]
    );
    console.log("Hasil user:", users);

    if (users.length === 0) {
      return res.status(401).json({ error: "Kredensial tidak valid" });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password yang dimasukkan:", password);
    console.log("Password terenkripsi di DB:", user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Kredensial tidak valid" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        namaLengkap: user.namaLengkap,
        userName: user.userName,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        namaLengkap: user.namaLengkap,
        userName: user.userName,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

const verifyTokenAuthor = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Format token tidak valid" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token telah kedaluwarsa" });
    }
    return res.status(401).json({ error: "Token tidak valid" });
  }
};

module.exports = {
  loginAuthor,
  verifyTokenAuthor,
};
