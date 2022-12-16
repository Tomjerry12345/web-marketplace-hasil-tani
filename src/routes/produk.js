const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const produkControllers = require("../controllers/produk");

router.post(
  "/createProduk",
  [
    body("namaProduk").isLength({ min: 1 }).withMessage("nama produk tidak boleh kosong"),
    body("deskripsiProduk").isLength({ min: 1 }).withMessage("deskripsi tidak boleh kosong"),
    body("kategori").isLength({ min: 1 }).withMessage("kategori tidak boleh kosong"),
    body("harga").isLength({ min: 1 }).withMessage("harga tidak boleh kosong"),
    body("stok").isLength({ min: 1 }).withMessage("stok tidak boleh kosong"),
    body("userNamePenjual").isLength({ min: 1 }).withMessage("username tidak boleh kosong"),
    body("namaPenjual").isLength({ min: 1 }).withMessage("nama penjual tidak boleh kosong"),
  ],
  produkControllers.createProduk
);

router.get("/getAllProduk", produkControllers.getAllProduk);

router.get("/getProduk/:username", produkControllers.getProdukByName);

router.put(
  "/:produkId",
  [
    body("namaProduk").isLength({ min: 1 }).withMessage("nama produk tidak boleh kosong"),
    body("deskripsiProduk").isLength({ min: 1 }).withMessage("deskripsi tidak boleh kosong"),
    body("kategori").isLength({ min: 1 }).withMessage("kategori tidak boleh kosong"),
    body("harga").isLength({ min: 1 }).withMessage("harga tidak boleh kosong"),
    body("stok").isLength({ min: 1 }).withMessage("stok tidak boleh kosong"),
  ],
  produkControllers.updateProduk
);

router.put("/updateStok/:produkId", produkControllers.updateStok);

router.delete("/:produkId", produkControllers.deleteProduk);

router.get("/kategori/:kategori", produkControllers.getKategori);

router.get("/cari/:cari", produkControllers.getCari);

module.exports = router;
