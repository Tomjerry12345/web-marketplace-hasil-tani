const express = require("express");

const router = express.Router();

const usersControllers = require("../controllers/users");

router.get("/getAllUsers", usersControllers.getAllUser);

router.put(
  "/update/:userId",
  // [
  //   body("namaProduk").isLength({ min: 1 }).withMessage("nama produk tidak boleh kosong"),
  //   body("deskripsiProduk").isLength({ min: 1 }).withMessage("deskripsi tidak boleh kosong"),
  //   body("kategori").isLength({ min: 1 }).withMessage("kategori tidak boleh kosong"),
  //   body("harga").isLength({ min: 1 }).withMessage("harga tidak boleh kosong"),
  //   body("stok").isLength({ min: 1 }).withMessage("stok tidak boleh kosong"),
  // ],
  usersControllers.updateUsers
);

// router.put('/:idUser', usersControllers.updateStatusLogin);

module.exports = router;
