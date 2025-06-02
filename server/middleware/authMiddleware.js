// File: middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
// Impor koneksi database 'db' Anda. Sesuaikan path ini!
// Ini harus menjadi objek yang sama yang Anda gunakan di authLoginController.js
// yang memiliki metode .execute()
const db = require('../config/database'); // CONTOH PATH, SESUAIKAN

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET tidak terdefinisi di environment variable untuk middleware.");
    process.exit(1);
}

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, JWT_SECRET);

            // Mengambil data pengguna dari MySQL menggunakan db.execute,
            // berdasarkan 'id' yang ada di payload token (decoded.userId).
            const sqlQuery = "SELECT * FROM users WHERE id = ?";
            const [rows] = await db.execute(sqlQuery, [decoded.userId]);

            if (rows.length > 0) {
                req.user = rows[0]; // Ambil data pengguna pertama yang ditemukan
                // Hapus password dari objek req.user demi keamanan sebelum diteruskan
                if (req.user && req.user.password) {
                    delete req.user.password;
                }
            } else {
                // Jika tidak ada user yang ditemukan dengan ID tersebut
                return res.status(401).json({ message: 'Otorisasi gagal, user tidak ditemukan dengan ID tersebut' });
            }
            
            if (!req.user) { // Pengecekan tambahan jika rows[0] undefined (seharusnya sudah ditangani di atas)
                return res.status(401).json({ message: 'Otorisasi gagal, user tidak valid setelah pencarian' });
            }
            
            next();

        } catch (error) {
            console.error('Kesalahan pada auth middleware:', error.name, '-', error.message);
            // Cetak error lengkap untuk debugging jika perlu
            // console.error(error); 
            
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Token tidak valid atau rusak, otorisasi gagal' });
            }
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token kedaluwarsa, silakan login kembali' });
            }
            // Untuk error lain (misalnya dari database saat query)
            return res.status(401).json({ message: 'Tidak terotorisasi, proses token atau pengambilan data user gagal' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Tidak terotorisasi, tidak ada token yang diberikan' });
    }
};

module.exports = { protect };