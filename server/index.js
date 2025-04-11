const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Berhasil terkoneksi ke database"))
  .catch((err) => console.error("Gagal terkoneksi ke database:", err));

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/newsRouter"))

const Student_News_Seed = require("./seeding_news/seed_Student_News")
app.use("/StudentNews", Student_News_Seed)

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
