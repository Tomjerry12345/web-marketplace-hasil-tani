const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Produk = new Schema({
  namaProduk: {
    type: String,
    required: true,
  },
  deskripsiProduk: {
    type: String,
    required: true,
  },
  kategori: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  stok: {
    type: Number,
    required: true,
  },
  userNamePenjual: {
    type: String,
    required: true,
  },
  namaPenjual: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Produk", Produk);
