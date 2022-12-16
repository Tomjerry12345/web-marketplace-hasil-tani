import React, { useEffect, useState } from "react";
import {
  ButtonAtoms,
  CardAtoms,
  TypographyAtoms,
} from "../../../components/atoms";
import AddIcon from "@material-ui/icons/Add";
import { Grid } from "@material-ui/core";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../../config/constant/Constant";

const Produk = () => {
  const history = useHistory();
  const [produk, setProduk] = useState([]);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [severity, setSeverity] = useState("");
  const { statusProduk, dataUsers } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Produk");
    Axios.get(`${baseUrl}/produk/getProduk/${dataUsers.username}`)
      .then((result) => {
        const data = result.data.data;
        console.log(data);
        setProduk(data);
      })
      .catch((err) => console.log(err));
  }, [statusProduk]);

  const onConfirmDelete = (id) => {
    confirmAlert({
      title: "Hapus produk",
      message: "Apakah anda yakin ingin menghapus produk ini ?",
      buttons: [
        {
          label: "Ya",
          onClick: () => {
            console.log("id", id);
            Axios.delete(`${baseUrl}/produk/${id}`)
              .then((result) => {
                const message = result.data.message;
                console.log("delete succes", message);
                setSeverity("success");
                setResponse(message);
                setOpen(true);
                dispatch({
                  type: "UPDATE_STATUS_PRODUK",
                  payload: !statusProduk,
                });
              })
              .catch((err) => {
                const message = err.response.data.message;
                setSeverity("error");
                setResponse(message);
                setOpen(true);
              });
          },
        },
        {
          label: "Tidak",
        },
      ],
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <TypographyAtoms
        title={"Katalog Produk"}
        variant="h5"
        style={{ fontWeight: "bold" }}
      />
      <Grid
        container
        direction="column"
        style={{ marginTop: "10px" }}
        spacing={2}
      >
        <Grid item>
          <ButtonAtoms
            title={"Tambah Produk"}
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            onClick={() => {
              history.push({
                pathname: "/tambahProduk",
                title: "Tambah Produk",
                btnTitle: "Simpan",
              });
            }}
            style={{ backgroundColor: "green" }}
          />
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            {produk
              ? produk.map((result) => {
                  return (
                    <Grid item md={3} sm={6} xs={12}>
                      <CardAtoms
                        key={result._id}
                        id={result._id}
                        image={`${baseUrl}/${result.image}`}
                        namaProduk={result.namaProduk}
                        namaKondisi={result.namaKondisi}
                        deskripsiProduk={result.deskripsiProduk}
                        kategori={result.kategori}
                        harga={result.harga}
                        stok={result.stok}
                        userNamePenjual={result.userNamePenjual}
                        namaPenjual={result.namaPenjual}
                        alamat={result.alamat}
                        noHp={result.noHp}
                        noRekening={result.noRekening}
                        namaBank={result.namaBank}
                        onDelete={onConfirmDelete}
                        userKategori={dataUsers.kategori}
                      />
                    </Grid>
                  );
                })
              : []}
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {response}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Produk;
