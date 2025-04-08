const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  namaLengkap: String,
  userName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  jenisKelamin: String,
  alamat: String,
  pekerjaan: String,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
