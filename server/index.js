const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const db = require("./config/database");

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Berhasil terkoneksi ke MongoDB"))
  .catch((err) => console.error("Gagal terkoneksi ke MongoDB:", err));

// Tidak perlu db.connect() untuk MySQL jika pakai pool!

// Routes
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/newsRouter"));
app.use("/", require("./routes/youtubeRouter"));

const Student_News_Seed = require("./seeding_news/seed_Student_News");
app.use("/StudentNews", Student_News_Seed);
app.use("/StudentNews", require("./routes/newsRouter_Category"));
app.use("/StudentNews", require("./routes/newsRouter_Article"));

const Youtube_seed = require("./seeding_news/seed_Youtube");
app.use("/Youtube", Youtube_seed);
app.use("/Youtube", require("./routes/youtubeRouter_Category"));
app.use("/Youtube", require("./routes/youtubeRouter_Article"));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Terjadi kesalahan pada server" });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server berjalan di port ${port}`));
