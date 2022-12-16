const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pembayaran = new Schema({
    alamatPembeli: {
        type: String,
        required: true
    },
    harga: {
        type: Array,
        required: true
    },
    jumlah: {
        type: Array,
        required: true
    },
    metodePembayaran: {
        type: String,
        required: true
    },
    namaProduk: {
        type: Array,
        required: true
    },
    rincian: {
        type: Object,
        required: true
    },
    statusPenerima: {
        type: String,
        required: true
    },
    statusPengiriman: {
        type: String,
        required: true
    },
    usernamePenjual: {
        type: Array,
        required: true
    },
    usernamePembeli: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Pembayaran', Pembayaran);