const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Berhasil terkoneksi ke database"))
  .catch((err) => console.error("Gagal terkoneksi ke database:", err));

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/authRoutes"));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
