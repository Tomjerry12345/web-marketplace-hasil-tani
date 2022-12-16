const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

const Produk = require("../models/produk");

exports.createProduk = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorValue = errors.array();
    const msg = errorValue[0].msg;
    const err = new Error(msg);
    err.status = 400;
    throw err;
  }

  if (!req.file) {
    const err = new Error("Image harus di upload");
    err.status = 422;
    throw err;
  }

  const namaProduk = req.body.namaProduk;
  const deskripsiProduk = req.body.deskripsiProduk;
  const kategori = req.body.kategori;
  const harga = req.body.harga;
  const stok = req.body.stok;
  const userNamePenjual = req.body.userNamePenjual;
  const namaPenjual = req.body.namaPenjual;
  const image = req.file.path.replace(/\\/g, "/");

  console.log("req.body => ", req.body);

  const dataProduk = new Produk({
    namaProduk,
    deskripsiProduk,
    kategori,
    harga,
    stok,
    userNamePenjual,
    namaPenjual,
    image,
  });

  dataProduk
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Data Produk Tersimpan",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

// exports.getPerpageProduk = (req, res, next) => {
//     const currentPage = req.query.page || 1;
//     const perPage = req.query.perPage || 5;
//     let totalItems;

//     Produk.find().countDocuments()
//     .then(count => {
//         totalItems = count
//         return Produk.find()
//         .skip((currentPage - 1) * perPage)
//         .limit(perPage)
//     })
//     .then(result => {
//         res.status(200).json({
//             message: 'Data produk berhasil di get',
//             data: result,
//             totalData: totalItems,
//             perPage: perPage,
//             currentPage: currentPage
//         })
//     })
//     .catch(err => next(err))
// }

exports.getAllProduk = (req, res, next) => {
  let totalItems;

  Produk.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Produk.find();
    })
    .then((result) => {
      res.status(200).json({
        message: "Data produk berhasil di get",
        data: result,
        totalData: totalItems,
      });
    })
    .catch((err) => next(err));
};

exports.getProdukByName = (req, res, next) => {
  let totalItems;
  const username = req.params.username;

  console.log(`getProdukByName => ${username}`);

  Produk.find({
    userNamePenjual: username,
  })
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Produk.find({ userNamePenjual: username });
    })
    .then((result) => {
      res.status(200).json({
        message: "Data produk berhasil di get",
        data: result,
        totalData: totalItems,
      });
    })
    .catch((err) => next(err));
};

exports.updateProduk = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorValue = errors.array();
    const msg = errorValue[0].msg;
    const err = new Error(msg);
    err.status = 400;
    throw err;
  }

  // if (!req.file) {
  //   const err = new Error("Image harus di upload");
  //   err.status = 422;
  //   throw err;
  // }

  let image;

  if (req.body.image === undefined) {
    if (!req.file) {
      const err = new Error("Image harus di upload");
      err.status = 422;
      throw err;
    }

    if (req.file.path.includes("\\")) image = req.file.path.replace(/\\/g, "/");
    else image = req.file.path;
  } else {
    image = req.body.image;
  }

  const namaProduk = req.body.namaProduk;
  const deskripsiProduk = req.body.deskripsiProduk;
  const kategori = req.body.kategori;
  const harga = req.body.harga;
  const stok = req.body.stok;
  // const image = req.file.path.replace(/\\/g, "/");
  const produkId = req.params.produkId;

  console.log(`image => ${image}`);

  Produk.findById(produkId)
    .then((produk) => {
      if (!produk) {
        const err = new Error("Produk tidak ditemukan");
        err.status = 404;
        err.data = null;
        throw err;
      }

      // if (produk.image !== image) {
      //   removeImage(produk.image);
      // }

      produk.namaProduk = namaProduk;
      produk.deskripsiProduk = deskripsiProduk;
      produk.kategori = kategori;
      produk.harga = harga;
      produk.stok = stok;
      produk.image = image;

      return produk.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update berhasil",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.updateStok = (req, res, next) => {
  const stok = req.body.stok;
  const produkId = req.params.produkId;

  console.log(`update stok => ${produkId}`);
  console.log(`stok => ${stok}`);

  Produk.findById(produkId)
    .then((produk) => {
      if (!produk) {
        const err = new Error("Produk tidak ditemukan");
        err.status = 404;
        err.data = null;
        throw err;
      }

      produk.stok = produk.stok - stok;

      return produk.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update berhasil",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.deleteProduk = (req, res, next) => {
  const produkId = req.params.produkId;

  Produk.findById(produkId)
    .then((produk) => {
      if (!produk) {
        const err = new Error("Produk tidak ditemukan");
        err.status = 404;
        err.data = null;
        throw err;
      }

      removeImage(produk.image);
      return Produk.findByIdAndRemove(produkId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Hapus berhasil",
        data: result,
      });
    })
    .catch((err) => next(err));
};

const removeImage = (filePath) => {
  console.log(filePath);
  filePath = path.join(__dirname, "../..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

exports.getKategori = (req, res, next) => {
  let totalItems;

  const kategori = req.params.kategori;

  Produk.find({ kategori: kategori })
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Produk.find({ kategori: kategori });
    })
    .then((result) => {
      res.status(200).json({
        message: "Data produk berhasil di get",
        data: result,
        totalData: totalItems,
      });
    })
    .catch((err) => next(err));
};

exports.getCari = (req, res, next) => {
  const cari = req.params.cari;
  let totalItems;

  Produk.find({ namaProduk: cari })
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Produk.find({ namaProduk: cari });
    })
    .then((result) => {
      res.status(200).json({
        message: "Data produk berhasil di get",
        data: result,
        totalData: totalItems,
      });
    })
    .catch((err) => next(err));
};
