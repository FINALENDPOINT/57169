// File: routes/userRoutes.js
const db = require("../config/database");
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Impor middleware protect
// Sesuaikan path ini agar merujuk pada model User Sequelize Anda
const User = require('../models/user'); // atau const { User } = require('../models');

// @desc    Mendapatkan profil pengguna yang sedang login
// @route   GET /api/users/profile  (atau /profile jika base path di server.js adalah /api/users)
// @access  Protected
router.get('/profile', protect, async (req, res) => {
    // Middleware 'protect' sudah memverifikasi token dan mengisi 'req.user'
    // dengan data pengguna (tanpa password).
    
    // Kirim kembali data pengguna yang relevan.
    // Pastikan field ini ada di model Sequelize User Anda.
    res.json({
        id: req.user.id, // 'id' dari req.user yang di-set oleh middleware
        userName: req.user.userName,
        email: req.user.email,
        namalengkap: req.user.namalengkap,
        jenisKelamin: req.user.jenisKelamin,
        alamat: req.user.alamat,
        pekerjaan: req.user.pekerjaan,
        // Tambahkan field lain yang relevan jika ada
    });
});

// @desc    Memperbarui profil pengguna yang sedang login
// @route   PUT /api/users/profile (atau /profile)
// @access  Protected
router.put('/profile', protect, async (req, res) => {
    try {
        // Ambil instance user dari database menggunakan ID dari token (via req.user)
        // Ini memastikan kita bekerja dengan instance Sequelize yang "hidup"
        const user = await User.findByPk(req.user.id);

        if (user) {
            // Update field yang diizinkan dari req.body
            // Jika req.body.<field> tidak ada, maka nilai lama user.<field> akan tetap digunakan.
            user.namalengkap = req.body.namalengkap || user.namalengkap;
            user.email = req.body.email || user.email; // Pertimbangkan validasi email unik jika diubah
            user.jenisKelamin = req.body.jenisKelamin || user.jenisKelamin;
            user.alamat = req.body.alamat || user.alamat;
            user.pekerjaan = req.body.pekerjaan || user.pekerjaan;
            // user.userName = req.body.userName || user.userName; // Hati-hati jika mengizinkan perubahan userName, pastikan unik.

            // Jika Anda mengizinkan perubahan password di sini, itu perlu penanganan khusus
            // dengan hashing (bcrypt) seperti saat registrasi, dan field password lama mungkin diperlukan.

            const updatedUser = await user.save(); // Simpan perubahan ke database

            res.json({
                id: updatedUser.id,
                userName: updatedUser.userName,
                email: updatedUser.email,
                namalengkap: updatedUser.namalengkap,
                jenisKelamin: updatedUser.jenisKelamin,
                alamat: updatedUser.alamat,
                pekerjaan: updatedUser.pekerjaan,
                message: 'Profil berhasil diperbarui'
            });
        } else {
            // Seharusnya tidak terjadi jika middleware protect bekerja dengan benar
            // dan user tidak dihapus setelah token dibuat.
            res.status(404).json({ message: 'User tidak ditemukan untuk diperbarui' });
        }
    } catch (error) {
        console.error("Error saat update profile:", error.name, '-', error.message);
        // Tangani kemungkinan error validasi dari Sequelize (misalnya email duplikat jika ada constraint unique)
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            // Mengambil pesan error yang lebih mudah dibaca dari Sequelize
            const messages = error.errors.map(e => e.message);
            return res.status(400).json({ message: 'Data tidak valid', errors: messages });
        }
        res.status(500).json({ message: 'Terjadi kesalahan pada server saat memperbarui profil' });
    }
});

module.exports = router;