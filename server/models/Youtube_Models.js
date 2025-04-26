const mongoose = require("mongoose")

const Youtube_Schema = mongoose.Schema({
    kategori : {type: String, required : true},
    judul : {type: String, required: true, unique: true},
    video_id : {type: String, required: true, unique: true},
    teks: {type: [String], required: true},
    tanggal: {type: Date, default: Date.now},
    tim_redaksi: {type: String, required: true},
    tagar: {type: [String], required: true},
})

module.exports = mongoose.model('Youtube_Schema', Youtube_Schema)

