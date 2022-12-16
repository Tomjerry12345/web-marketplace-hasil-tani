// const {validationResult} = require('express-validator');
// const path = require('path');
// const fs = require('fs');

const RincianPesanan = require("../models/rincianPesanan");

exports.tambahRincianPesanan = (req, res, next) => {
  const alamatPembeli = req.body.dataRincianPesanan.alamatPembeli;
  const harga = req.body.dataRincianPesanan.harga;
  const jumlah = req.body.dataRincianPesanan.jumlah;
  const metodePembayaran = req.body.dataRincianPesanan.metodePembayaran;
  const namaProduk = req.body.dataRincianPesanan.namaProduk;
  const rincian = req.body.dataRincianPesanan.rincian;
  const statusPenerima = req.body.dataRincianPesanan.statusPenerima;
  const statusPengiriman = req.body.dataRincianPesanan.statusPengiriman;
  const userNamePenjual = req.body.dataRincianPesanan.userNamePenjual;
  const usernamePembeli = req.body.dataRincianPesanan.usernamePembeli;

  console.log(`namaProduk => ${JSON.stringify(namaProduk)}`);
  console.log(`userNamePenjual => ${JSON.stringify(userNamePenjual)}`);

  const dataRincianPesanan = new RincianPesanan({
    alamatPembeli,
    harga,
    jumlah,
    metodePembayaran,
    namaProduk,
    rincian,
    statusPenerima,
    statusPengiriman,
    usernamePenjual: userNamePenjual,
    usernamePembeli,
  });

  dataRincianPesanan
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Data Rincian Tersimpan",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.getRincianPesanan = (req, res, next) => {
  let totalItems;
  const username = req.body.username;
  const jenisAkun = req.body.jenisAkun;

  let query = jenisAkun === "Konsumen" ? "usernamePembeli" : "usernamePenjual";

  console.log(`query => ${query}`);

  RincianPesanan.find({
    [query]: username,
  })
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return RincianPesanan.find({ [query]: username });
    })
    .then((result) => {
      console.log(`result => ${result}`);
      res.status(200).json({
        message: "Data produk berhasil di get",
        data: result,
        totalData: totalItems,
      });
    })
    .catch((err) => next(err));
};

exports.updateRincianPesanan = (req, res, next) => {
  const id = req.params.id;

  const { message, jenisAkun } = req.body.data;

  if (jenisAkun === "Konsumen") {
    RincianPesanan.findById(id)
      .then((rincian) => {
        if (!rincian) {
          const err = new Error("Produk tidak ditemukan");
          err.status = 404;
          err.data = null;
          throw err;
        }

        rincian.statusPenerima = message;
        return rincian.save();
      })
      .then((result) => {
        res.status(200).json({
          message: "Update berhasil",
          data: result,
        });
      })
      .catch((err) => next(err));
  } else {
    RincianPesanan.findById(id)
      .then((rincian) => {
        if (!rincian) {
          const err = new Error("Produk tidak ditemukan");
          err.status = 404;
          err.data = null;
          throw err;
        }

        rincian.statusPengiriman = message;
        return rincian.save();
      })
      .then((result) => {
        res.status(200).json({
          message: "Update berhasil",
          data: result,
        });
      })
      .catch((err) => next(err));
  }
};

exports.deleteRincianPesanan = (req, res, next) => {
  const id = req.params.id;

  RincianPesanan.findById(id)
    .then((pesanan) => {
      if (!pesanan) {
        const err = new Error("Produk tidak ditemukan");
        err.status = 404;
        err.data = null;
        throw err;
      }

      return RincianPesanan.findByIdAndRemove(id);
    })
    .then((result) => {
      res.status(200).json({
        message: "Hapus berhasil",
        data: result,
      });
    })
    .catch((err) => next(err));
};
