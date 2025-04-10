const mongoose = require("mongoose");

const Student_News_Schema = mongoose.Schema({
    kategori : {type: String, required: true},
    judul: {type: String, required: true, unique: true},
    gambar: {type: String, required: true},
    teks: {type: [String], required: true},
    tanggal: {type: Date, default: Date.now},
    tim_redaksi: {type: String, required: true},
    tagar: {type: [String], required: true},
    sumber: {type: String, required: true},
});

const Student_News_Model = mongoose.model("News", Student_News_Schema);

module.exports = Student_News_Model;
