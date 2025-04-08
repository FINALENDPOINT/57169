const mongoose = require("mongoose");
const { Schema } = mongoose;

const newsSchema = new Schema({
  kategori: String,
  judul: String,
  gambar: String,
  tim_redaksi: String,
  tagar: [String],
  sumber: String,
  tanggal: Date,
});

const NewsModel = mongoose.model("News", newsSchema);

module.exports = NewsModel;
