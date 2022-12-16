const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

const Troli = require("../models/troli");

exports.createTroli = (req, res, next) => {
  const idProduk = req.body.idProduk;
  const namaProduk = req.body.namaProduk;
  const deskripsiProduk = req.body.deskripsiProduk;
  const kategori = req.body.kategori;
  const harga = req.body.harga;
  const stok = req.body.stok;
  const image = req.body.image;
  const usernamePembeli = req.body.usernamePembeli;
  const usernamePenjual = req.body.usernamePenjual;

  const dataTroli = new Troli({
    idProduk,
    namaProduk,
    deskripsiProduk,
    kategori,
    harga,
    stok,
    image,
    usernamePembeli,
    usernamePenjual,
  });

  dataTroli
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Pesanan masuk ke troli",
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

exports.getTroli = (req, res, next) => {
  let totalItems;
  username = req.body.username;

  //   console.log(`usernamePembeli => ${usernamePembeli}`);

  Troli.find({ usernamePembeli: username })
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Troli.find({ usernamePembeli: username });
    })
    .then((result) => {
      res.status(200).json({
        message: "Data produk berhasil di get",
        data: result,
        totalData: totalItems,
      });
    })
    .catch((err) => {
      console.log("error: ", err);
      next(err);
    });
};

// exports.updateProduk = (req, res, next) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         const errorValue = errors.array()
//         const msg = errorValue[0].msg
//         const err = new Error(msg);
//         err.status = 400;
//         throw err;
//      }

//     if (!req.file) {
//         const err = new Error('Image harus di upload');
//         err.status = 422;
//         throw err;
//     }

//     const namaProduk = req.body.namaProduk;
//     const deskripsiProduk = req.body.deskripsiProduk;
//     const kategori = req.body.kategori;
//     const harga = req.body.harga;
//     const stok = req.body.stok;
//     const image = req.file.path.replace(/\\/g, '/');
//     const troliId = req.params.produkId;

//     Produk.findById(produkId)
//     .then(produk => {
//         if(!produk) {
//             const err = new Error('Produk tidak ditemukan');
//             err.status = 404;
//             err.data = null;
//             throw err;
//         }

//         removeImage(produk.image);

//         produk.namaProduk = namaProduk;
//         produk.deskripsiProduk = deskripsiProduk;
//         produk.kategori = kategori;
//         produk.harga = harga;
//         produk.stok = stok;
//         produk.image = image;

//         return produk.save();
//     })
//     .then(result => {
//         res.status(200).json({
//             message: 'Update berhasil',
//             data: result
//         })
//     })
//     .catch(err => next(err));
// }

exports.deleteTroli = (req, res, next) => {
  const troliId = req.params.troliId;

  Troli.findById(troliId)
    .then((produk) => {
      if (!produk) {
        const err = new Error("Produk tidak ditemukan");
        err.status = 404;
        err.data = null;
        throw err;
      }

      removeImage(produk.image);
      return Troli.findByIdAndRemove(troliId);
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
