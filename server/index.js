const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Connect to MongoDB with error handling
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Berhasil terkoneksi ke database"))
  .catch((err) => console.error("Gagal terkoneksi ke database:", err));

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Terjadi kesalahan pada server" });
});

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

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
