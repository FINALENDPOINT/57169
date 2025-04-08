const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");

const test = (req, res) => {
  res.json("Berhasil uji get cuk");
};

const registerUser = async (req, res) => {
  try {
    const {
      namaLengkap,
      userName,
      email,
      password,
      jenisKelamin,
      alamat,
      pekerjaan,
    } = req.body;

    if (!namaLengkap) {
      return res.json({
        error: "Pastikan nama di isi",
      });
    }
    if (!userName) {
      return res.json({
        error: "Pastikan username di isi",
      });
    }
    const validEmail = await User.findOne({ email });
    if (validEmail) {
      return res.json({
        error: "Email sudah terdaftar",
      });
    }
    if (!password || password.length < 8) {
      return res.json({
        error: "Password harus lebih dari 8 karakter",
      });
    }
    if (!alamat) {
      return res.json({
        error: "Pastikan alamat di isi",
      });
    }
    if (!pekerjaan) {
      return res.json({
        error: "Pastikan pekerjaan di isi",
      });
    }
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      namaLengkap,
      userName,
      email,
      password: hashedPassword,
      jenisKelamin,
      alamat,
      pekerjaan,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName) {
      return res.status(400).json({ error: "Username harus diisi" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password harus diisi" });
    }
    // cek apakah user udah ada?
    const user = await User.findOne({ userName });
    if (!user) {
      return res.json({
        error: "User tidak ditemukan",
      });
    }
    // cek apakah password benar?
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.json({
        error: "Password salah",
      });
    }
    return res.status(200).json({
      message: "Login berhasil",
      user: {
        userName: user.userName,
        email: user.email,
        namaLengkap: user.namaLengkap,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
};
