const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT || 4000;

// const dbUrl = 'mongodb://admin:admin@dbhasiltani-shard-00-00.r5lx4.mongodb.net:27017,dbhasiltani-shard-00-01.r5lx4.mongodb.net:27017,dbhasiltani-shard-00-02.r5lx4.mongodb.net:27017/dbHasilTani?ssl=true&replicaSet=atlas-3o0w7g-shard-0&authSource=admin&retryWrites=true&w=majority'
const dbUrl =
  "mongodb://kiki:kiki12345@dbtani-shard-00-00.n3snp.mongodb.net:27017,dbtani-shard-00-01.n3snp.mongodb.net:27017,dbtani-shard-00-02.n3snp.mongodb.net:27017/db_tani?ssl=true&replicaSet=atlas-ns9o97-shard-0&authSource=admin&retryWrites=true&w=majority";

const app = express();

const authRoutes = require("./src/routes/auth");
const produkRoutes = require("./src/routes/produk");
const usersRoutes = require("./src/routes/users");
const troliRoutes = require("./src/routes/troli");
const pembayaranRoutes = require("./src/routes/pembayaran");
const rincianPesananRoutes = require("./src/routes/rincianPesanan");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"));

app.use("/auth", authRoutes);
app.use("/produk", produkRoutes);
app.use("/users", usersRoutes);
app.use("/troli", troliRoutes);
app.use("/pembayaran", pembayaranRoutes);
app.use("/rincian-pesanan", rincianPesananRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;

  // res.status(status).json({message: message, data: data});
  res.status(status).send({ message: message });
});

mongoose
  .connect(dbUrl)
  .then(() => {
    app.listen(port, () => console.log(`Connection Succes ${port}`));
  })
  .catch((err) => console.log(err));
