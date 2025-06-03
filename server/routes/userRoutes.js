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
// @route   PUT /profile (atau /api/users/profile)
// @access  Protected
router.put('/profile', protect, async (req, res) => {
    try {
        const userId = req.user.id; // ID pengguna dari token (via middleware protect)
        const { namalengkap, email, jenisKelamin, alamat, pekerjaan, userName } = req.body;

        // Kumpulkan field yang akan diupdate dan nilainya
        const fieldsToUpdate = [];
        const valuesToUpdate = [];

        // Cek setiap field yang mungkin dikirim dari req.body
        // Hanya tambahkan ke query jika field tersebut ada di req.body
        if (namalengkap !== undefined) {
            fieldsToUpdate.push("namalengkap = ?");
            valuesToUpdate.push(namalengkap);
        }
        if (email !== undefined) {
            fieldsToUpdate.push("email = ?");
            valuesToUpdate.push(email);
            // PERTIMBANGAN: Tambahkan validasi format email di sini
            // PERTIMBANGAN: Tangani error jika email sudah digunakan (unique constraint di DB)
        }
        if (jenisKelamin !== undefined) {
            fieldsToUpdate.push("jenisKelamin = ?");
            valuesToUpdate.push(jenisKelamin);
        }
        if (alamat !== undefined) {
            fieldsToUpdate.push("alamat = ?");
            valuesToUpdate.push(alamat);
        }
        if (pekerjaan !== undefined) {
            fieldsToUpdate.push("pekerjaan = ?");
            valuesToUpdate.push(pekerjaan);
        }
        if (userName !== undefined) {
            fieldsToUpdate.push("userName = ?");
            valuesToUpdate.push(userName);
            // PERTIMBANGAN: Tangani error jika userName sudah digunakan (unique constraint di DB)
        }

        // Jika tidak ada field yang dikirim untuk diupdate
        if (fieldsToUpdate.length === 0) {
            return res.status(400).json({ message: 'Tidak ada data untuk diperbarui.' });
        }

        // Tambahkan userId ke akhir array values untuk klausa WHERE
        valuesToUpdate.push(userId);

        // Buat query UPDATE SQL
        const setClause = fieldsToUpdate.join(', '); // Contoh: "namalengkap = ?, email = ?"
        const updateQuery = `UPDATE users SET ${setClause} WHERE id = ?`;

        const [result] = await db.execute(updateQuery, valuesToUpdate);

        if (result.affectedRows === 0) {
            // Ini bisa terjadi jika ID pengguna tidak ditemukan (meskipun middleware sudah mengecek),
            // atau jika tidak ada data yang benar-benar berubah (beberapa DB mengembalikan affectedRows 0 jika nilai sama).
            // Kita akan tetap mencoba mengambil data user untuk memastikan.
            const [checkUserRows] = await db.execute("SELECT id, userName, email, namalengkap, jenisKelamin, alamat, pekerjaan FROM users WHERE id = ?", [userId]);
            if (checkUserRows.length === 0) {
                 return res.status(404).json({ message: 'User tidak ditemukan untuk diperbarui.' });
            }
            // Jika user ada tapi affectedRows = 0, mungkin karena tidak ada perubahan data
            return res.json({
                message: 'Tidak ada data yang diubah, atau profil sudah sesuai.',
                user: checkUserRows[0]
            });
        }

        // Ambil data pengguna yang sudah diperbarui untuk dikirim sebagai respons (tanpa password)
        const [updatedUserRows] = await db.execute(
            "SELECT id, userName, email, namalengkap, jenisKelamin, alamat, pekerjaan FROM users WHERE id = ?",
            [userId]
        );

        // Seharusnya selalu ada jika affectedRows > 0
        if (updatedUserRows.length === 0) {
             return res.status(404).json({ message: 'User tidak ditemukan setelah proses pembaruan.' });
        }

        res.json({
            message: 'Profil berhasil diperbarui',
            user: updatedUserRows[0]
        });

    } catch (error) {
        console.error("Error saat update profile:", error.name, '-', error.message, error.code);
        // Tangani error spesifik MySQL, misalnya ER_DUP_ENTRY untuk unique constraint
        if (error.code === 'ER_DUP_ENTRY') {
            // Pesan ini bisa lebih spesifik jika Anda tahu field mana yang menyebabkan duplikasi
            // misalnya dengan memeriksa error.message.includes('email') atau error.message.includes('userName')
            return res.status(400).json({ message: 'Gagal memperbarui profil. Email atau Username mungkin sudah digunakan oleh pengguna lain.' });
        }
        res.status(500).json({ message: 'Terjadi kesalahan pada server saat memperbarui profil.' });
    }
});

module.exports = router;