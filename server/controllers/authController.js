const User = require("../models/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { hashPassword, comparePassword } = require("../helpers/auth");
const bcrypt = require("bcrypt"); // Add missing bcrypt import

const test = (req, res) => {
  res.json("Berhasil uji get cuk");
};

// register
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

// login
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
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email tidak boleh kosong" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email tidak ditemukan." });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
      debug: true,
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.log("SMTP server connection error:", error);
      } else {
        console.log("SMTP server connection verified");
      }
    });

    const resetLink = `http://localhost:5173/resetPassword/${token}`;

    // Send email with better error handling
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Reset Password",
        html: `<p>Klik link berikut untuk reset password:</p><a href="${resetLink}">${resetLink}</a>`,
      });
      console.log("Password reset email sent to:", user.email);
      res.json({ success: true });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
      return res
        .status(500)
        .json({ error: "Gagal mengirim email reset password." });
    }
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password tidak boleh kosong" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password harus minimal 8 karakter" });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Token tidak valid atau kadaluarsa." });
    }

    // Use hashPassword helper function instead of direct bcrypt
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return res.json({ success: true });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res
      .status(500)
      .json({ error: "Terjadi kesalahan saat reset password." });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
