const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Berhasil terkoneksi ke database"))
  .catch((err) => console.error("Gagal terkoneksi ke database:", err));

// app.use(cors());
app.use(express.json());

app.use(cors({
  origin: 'http://news.unteyojourney.myhost.id', // Atur origin sesuai kebutuhan
  credentials: true // Jika menggunakan cookie
}));

app.use((req, res, next) => {
  // Allow requests from https://news.unteyojourney.myhost.id/
  res.header('Access-Control-Allow-Origin', 'https://news.unteyojourney.myhost.id');
  // Alternatively, allow all origins (less secure)
  // res.header('Access-Control-Allow-Origin', '*');
  // You might also need to set allowed methods and headers
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/newsRouter"))
app.use("/", require("./routes/youtubeRouter"))

const Student_News_Seed = require("./seeding_news/seed_Student_News")
app.use("/StudentNews", Student_News_Seed)
app.use("/StudentNews", require("./routes/newsRouter_Category"))
app.use("/StudentNews", require("./routes/newsRouter_Article"))


const Youtube_seed = require("./seeding_news/seed_Youtube")
app.use("/Youtube", Youtube_seed)
app.use("/Youtube", require("./routes/youtubeRouter_Category"))
app.use("/Youtube", require("./routes/youtubeRouter_Article"))

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
