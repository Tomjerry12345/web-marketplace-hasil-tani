import {
  Grid,
  Checkbox,
  Paper,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ButtonAtoms, TypographyAtoms } from "../../../components/atoms";
import {
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import axios from "axios";
import { useHistory } from "react-router";
import { baseUrl } from "../../../config/constant/Constant";
import { confirmAlert } from "react-confirm-alert";

const useStyles = makeStyles({
  button: {
    backgroundColor: "green",
    color: "#fff",
    "&:hover": {
      backgroundColor: "green",
      color: "#fff",
    },
  },
  disabledButton: {
    backgroundColor: "#cfcfcf",
  },
});

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const Product = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [jumlahBeli, setJumlahBeli] = useState(0);
  const [total, setTotal] = useState(0);
  const [checkBtn, setCheckBtn] = useState(null);
  let jumlah;

  const {
    index,
    key,
    idProduk,
    id,
    image,
    namaProduk,
    deskripsiProduk,
    kategori,
    harga,
    stok,
    usernamePenjual,
    usernamePembeli,
    onTotal,
  } = props;

  useEffect(() => {
    const harga1 = harga * jumlahBeli;
    if (checkBtn != null) {
      onTotal(harga1, index, true, true, namaProduk, harga, jumlahBeli);
    }
  }, [jumlahBeli]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (!checked) {
      onTotal(
        total,
        index,
        true,
        false,
        namaProduk,
        harga,
        null,
        id,
        usernamePembeli,
        usernamePenjual,
        idProduk
      );
    } else {
      setJumlahBeli(0);
      setTotal(0);
      onTotal(0, index, !checked);
    }
  };

  const onClickTambah = () => {
    jumlah = jumlahBeli + 1;
    if (jumlah <= stok) {
      setJumlahBeli(jumlah);
      setCheckBtn(true);
    }
  };

  const onClickKurang = () => {
    jumlah = jumlahBeli - 1;
    if (jumlah <= 1) jumlah = 1;
    setJumlahBeli(jumlah);
    setCheckBtn(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ display: "flex" }}>
        <div>
          <ThemeProvider theme={theme}>
            <Checkbox
              checked={checked}
              defaultChecked
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={handleChange}
            />{" "}
          </ThemeProvider>
        </div>
        <div style={{ marginLeft: 10 }}>
          <img src={image} alt="Test" width="110" />
        </div>
        <div style={{ marginLeft: 20 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TypographyAtoms
                variant="subtitle1"
                style={{ fontWeight: "bold" }}
                title={namaProduk}
              />
            </Grid>
            <Grid item xs={12}>
              <TypographyAtoms
                variant="subtitle2"
                title={`Rp. ${harga}.000`}
                style={{ fontWeight: "bold", color: "green" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TypographyAtoms
                variant="subtitle2"
                title={`Stok tersedia : ${stok}/kg`}
                style={{ fontWeight: "bold", color: "green" }}
              />
            </Grid>
            <Grid item xs={12} style={{ display: "flex" }}>
              <ButtonAtoms
                classes={{
                  root: classes.button,
                  disabled: classes.disabled,
                }}
                title={"-"}
                color="primary"
                variant="contained"
                onClick={onClickKurang}
                disabled={!checked}
              />
              <TypographyAtoms
                title={jumlahBeli}
                style={{ margin: "8px 10px", fontWeight: "bold" }}
              />
              <ButtonAtoms
                classes={{
                  root: classes.button,
                  disabled: classes.disabled,
                }}
                title={"+"}
                color="primary"
                variant="contained"
                onClick={onClickTambah}
                disabled={!checked}
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

const TroliKonsumen = () => {
  const classes = useStyles();
  const history = useHistory();

  const { dataTroli, dataUsers } = useSelector((state) => state);
  const [total, setTotal] = useState(0);
  const [listHarga, setListHarga] = useState([0, 0, 0, 0, 0]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [listPesanan, setListPesanan] = useState([]);
  const [listId, setListId] = useState([]);
  const [listIdProduk, setListIdProduk] = useState([]);
  const [clickConfirm, setClickConfirm] = useState(false);

  const [dataRincianPesanan, setDataRincianPesanan] = useState({
    usernamePembeli: "",
    userNamePenjual: [],
    namaProduk: [],
    jumlah: [],
    harga: [],
    rincian: {},
    statusPengiriman: "Belum Terkirim",
    statusPenerima: "Belum Diterima",
    metodePembayaran: "cod",
    statusPembayaran: "",
    alamatPembeli: dataUsers.alamat,
    noHp: dataUsers.noHp,
  });

  // console.log(`list id produk => ${dataTroli}`);
  // console.log(`list id produk}`);

  useEffect(() => {
    const reducer = (accumulator, curr) => accumulator + curr;
    const totalHarga = listHarga.reduce(reducer);
    setTotal(totalHarga.toFixed(3));
    if (totalHarga > 0) setDisableBtn(false);
    else setDisableBtn(true);

    if (Object.entries(dataRincianPesanan.rincian).length !== 0) {
      console.log(`tidak kosong :`);
      console.log(dataRincianPesanan);

      axios
        .post(`${baseUrl}/rincian-pesanan/add`, {
          dataRincianPesanan,
        })
        .then((res) => {
          console.log(res);
          listId.map((id) => {
            axios
              .delete(`${baseUrl}/troli/delete/${id}`)
              .then((res) => {
                console.log("res: ", res.data);
                updateStok(dataRincianPesanan.jumlah);
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
    }
  }, [listHarga, clickConfirm]);

  const onTotal = (
    total,
    index,
    checked,
    isBtnClick,
    namaProduk,
    harga,
    jumlah,
    id,
    usernamePembeli,
    usernamePenjual,
    idProduk
  ) => {
    if (total === 0) {
      const test = [];
      listHarga.map((res, i) => {
        if (index === i) res = 0;
        test.push(res);
      });
      setListHarga(test);
    } else {
      const test = [];
      listHarga.map((res, i) => {
        if (index === i) res = total;
        test.push(res);
      });
      setListHarga(test);
    }

    if (checked) {
      setListPesanan([
        ...listPesanan,
        {
          namaProduk,
          jumlah,
          harga,
          usernamePembeli,
          usernamePenjual,
        },
      ]);

      if (isBtnClick) {
        const list = [];
        listPesanan.map((data) => {
          if (data.namaProduk === namaProduk) {
            data.jumlah = jumlah;
          }
          console.log(`data => ${data}`);
          list.push(data);
        });
        setListPesanan(list);
      } else {
        console.log(`list id produk length => ${listIdProduk.length}`);

        setListIdProduk([...listIdProduk, idProduk]);
      }

      if (id !== undefined) setListId([...listId, id]);
    } else {
      const list = [];
      const listId1 = [];
      const listIdProduk1 = [];

      listPesanan.map((res, i) => {
        if (index !== i) list.push(res);
      });

      listId.map((res, i) => {
        if (index !== i) listId1.push(res);
      });

      listIdProduk.map((res, i) => {
        if (index !== i) listIdProduk1.push(res);
      });

      setListPesanan(list);
      setListId(listId1);
      setListIdProduk(listIdProduk1);
    }
  };

  const onClickPesan = () => {
    console.log(`list pesanan => ${JSON.stringify(listPesanan)}`);
    const listNamaProduk = [];
    const listJumlah = [];
    const listHarga = [];
    const listUsernamePenjual = [];
    let usernamePembeli = "";

    listPesanan.map((data) => {
      listNamaProduk.push(data.namaProduk);
      listJumlah.push(data.jumlah);
      listHarga.push(data.harga);
      // console.log(`data list pesanan => ${data}`);
      listUsernamePenjual.push(data.usernamePenjual);
      usernamePembeli = data.usernamePembeli;
    });

    if (dataRincianPesanan.metodePembayaran === "cod") {
      setDataRincianPesanan({
        ...dataRincianPesanan,
        usernamePembeli: usernamePembeli,
        userNamePenjual: listUsernamePenjual,
        namaProduk: listNamaProduk,
        jumlah: listJumlah,
        harga: listHarga,
        statusPembayaran: "-",
        rincian: {
          gross_amount: total,
          transaction_status: "-",
        },
      });
      statusAlert("Pemesanan Berhasil");
    } else {
      paymentGateway(
        listNamaProduk,
        listJumlah,
        listHarga,
        listUsernamePenjual,
        usernamePembeli
      );
    }
  };

  const paymentGateway = (
    listNamaProduk,
    listJumlah,
    listHarga,
    listUsernamePenjual,
    usernamePembeli
  ) => {
    const myTotal = total.replace(".", "");
    console.log(`myTotal => ${myTotal}`);
    axios
      .post(`${baseUrl}/pembayaran/transaction`, {
        total: myTotal,
      })
      .then((res) => {
        const transactionToken = res.data.transactionToken;

        window.snap.pay(transactionToken, {
          onSuccess: function (result) {
            alert("payment success!");
            console.log(result);
          },
          onPending: function (result) {
            setDataRincianPesanan({
              ...dataRincianPesanan,
              usernamePembeli: usernamePembeli,
              userNamePenjual: listUsernamePenjual,
              namaProduk: listNamaProduk,
              jumlah: listJumlah,
              harga: listHarga,
              rincian: result,
              statusPembayaran: result.transaction_status,
            });

            statusAlert("Pemesanan Berhasil");
            console.log(result);
          },
          onError: function (result) {
            statusAlert("Pemesanan Gagal");
            console.log(result);
          },
          onClose: function () {
            statusAlert("Pemesanan Gagal");
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateStok = (jumlah) => {
    console.log(`list id produk => ${listIdProduk},  listJumlah => ${jumlah}`);
    listIdProduk.map((id, index) => {
      axios
        .put(`${baseUrl}/produk/updateStok/${id}`, { stok: jumlah[index] })
        .then((res) => {
          console.log();
        })
        .catch((err) => console.log(err));
    });
    history.push("/");
  };

  const handleChange = (event) => {
    setDataRincianPesanan({
      ...dataRincianPesanan,
      metodePembayaran: event.target.value,
    });
  };

  const handleChangeAlamat = (e) => {
    setDataRincianPesanan({
      ...dataRincianPesanan,
      alamatPembeli: e.target.value,
    });
  };

  const handleChangeNama = (e) => {
    setDataRincianPesanan({
      ...dataRincianPesanan,
      namaPenerima: e.target.value,
    });
  };

  const statusAlert = (msg) => {
    confirmAlert({
      // title: "Delete produk",
      message: msg,
      buttons: [
        {
          label: "Ok",
          onClick: () => {
            if (msg === "Pemesanan Berhasil") setClickConfirm(!clickConfirm);
          },
        },
      ],
    });
  };

  return (
    <div>
      <TypographyAtoms
        style={{ marginTop: 5, marginBottom: 20, fontWeight: "bold" }}
        title={"Troli Saya"}
        variant="h5"
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          {dataTroli
            ? dataTroli.map((res, index) => (
                <Product
                  index={index}
                  key={index}
                  id={res._id}
                  idProduk={res.idProduk}
                  image={res.image}
                  namaProduk={res.namaProduk}
                  harga={res.harga}
                  stok={res.stok}
                  usernamePembeli={res.usernamePembeli}
                  usernamePenjual={res.usernamePenjual}
                  onTotal={onTotal}
                />
              ))
            : []}
        </Grid>
        <Grid item style={{ marginBottom: "8px" }}>
          <TypographyAtoms
            style={{ marginTop: 0, marginBottom: 0, fontWeight: "" }}
            title={"Metode Pembayaran"}
            variant="h6"
          />
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="payment"
              name="payment"
              value={dataRincianPesanan.metodePembayaran}
              onChange={handleChange}
            >
              <FormControlLabel
                value="cod"
                control={<Radio />}
                label="COD (Bayar di tempat)"
              />
              <FormControlLabel
                value="digital"
                control={<Radio />}
                label="Pembayaran Digital"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TypographyAtoms
            style={{ marginTop: 0, marginBottom: 0, fontWeight: "" }}
            title={"Alamat"}
            variant="h6"
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            value={dataRincianPesanan.alamatPembeli}
            name="alamat"
            onChange={handleChangeAlamat}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper elevation={3} style={{ padding: "10px" }}>
            <TypographyAtoms
              variant="subtitle1"
              title={`Total Harga: Rp. ${total}`}
            />
            <ButtonAtoms
              classes={{
                root: classes.button,
                disabled: classes.disabled,
              }}
              variant="contained"
              color="primary"
              title={"Pesan"}
              style={{ marginTop: "20px" }}
              disabled={disableBtn}
              onClick={onClickPesan}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default TroliKonsumen;
