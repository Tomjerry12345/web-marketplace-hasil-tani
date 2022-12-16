const Users = require("../models/users");
const path = require("path");
const fs = require("fs");

exports.getAllUser = (req, res, next) => {
  Users.find({ statusLogin: true })
    .then((result) => {
      res.status(200).json({
        message: "All user data succes",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.updateUsers = (req, res, next) => {
  console.log(`body => ${JSON.stringify(req.body)}`);

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

  const namaLengkap = req.body.namaLengkap;
  const jenisKelamin = req.body.jenisKelamin;
  const alamat = req.body.alamat;
  const noHp = req.body.noHp;
  const kabupaten = req.body.kabupaten;
  const kecamatan = req.body.kecamatan;

  const userId = req.params.userId;

  console.log(`image => ${image}`);
  console.log(`userId => ${userId}`);

  Users.findById(userId)
    .then((user) => {
      if (!user) {
        const err = new Error("User tidak ditemukan");
        err.status = 404;
        err.data = null;
        throw err;
      }

      removeImage(user.image);

      user.namaLengkap = namaLengkap;
      user.jenisKelamin = jenisKelamin;
      user.alamat = alamat;
      user.noHp = noHp;
      user.kabupaten = kabupaten;
      user.kecamatan = kecamatan;

      user.image = image;

      return user.save();
    })
    .then((result) => {
      console.log(`result => ${result}`);
      res.status(200).json({
        message: "Update berhasil",
        data: result,
      });
    })
    .catch((err) => next(err));
};

const removeImage = (filePath) => {
  console.log(filePath);
  console.log(`dirname ${path.join(__dirname, "../../", filePath)}`);
  filePath = path.join(__dirname, "../../", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
