const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res
        .status(400)
        .json({ error: "username dan password wajib diisi" });
    }

    const [users] = await db.execute("SELECT * FROM users WHERE userName = ?", [
      userName,
    ]);

    if (users.length === 0) {
      return res.status(401).json({ error: "username atau password salah" });
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "username atau password salah" });
    }

    console.log("authlogin",JWT_SECRET)

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userName: user.userName,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    console.log("token", token)

    res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        namaLengkap: user.namaLengkap,
        userName: user.userName,
        email: user.email,
        jenisKelamin: user.jenisKelamin,
        alamat: user.alamat,
        pekerjaan: user.pekerjaan,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ error: "Akses ditolak. Token tidak ditemukan" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Format token tidak valid" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token tidak valid" });
  }
};

module.exports = {
  login,
  verifyToken,
};
