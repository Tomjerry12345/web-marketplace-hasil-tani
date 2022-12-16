const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  namaLengkap: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  jenisKelamin: {
    type: String,
    required: true,
  },
  noHp: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  kabupaten: {
    type: String,
    required: true,
  },
  kecamatan: {
    type: String,
    required: true,
  },
  kategori: {
    type: String,
    required: true,
  },
  statusLogin: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Users", Users);
