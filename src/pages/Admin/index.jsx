import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Grid } from "@material-ui/core";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import HeaderAdmin from "../../components/molecules/Header/Admin";
import { ButtonAtoms, CardAtoms, TypographyAtoms } from "../../components/atoms";
import { baseUrl } from "../../config/constant/Constant";

const Admin = () => {
  const history = useHistory();
  const [produk, setProduk] = useState([]);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [severity, setSeverity] = useState("");
  const { statusProduk, dataUsers } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Produk");
    Axios.get(`${baseUrl}/produk/getAllProduk`)
      .then((result) => {
        const data = result.data.data;
        console.log(data);
        setProduk(data);
      })
      .catch((err) => console.log(err));
  }, [statusProduk]);

  const onConfirmDelete = (id) => {
    confirmAlert({
      title: "Delete produk",
      message: "Apakah anda yakin ingin menghapus data ini ?",
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
                dispatch({ type: "UPDATE_STATUS_PRODUK", payload: !statusProduk });
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
      <HeaderAdmin />
      <TypographyAtoms title={"Katalog Produk"} variant="h5" style={{ fontWeight: "bold", marginTop: 10, marginLeft: 25 }} />
      <Grid container direction="column" style={{ margin: 0 }} spacing={1}>
        <Grid item>
          <Grid container direction="row" spacing={1}>
            {produk
              ? produk.map((result) => {
                  return (
                    <Grid item lg= {3} md={3} sm={6} xs={12}>
                      <CardAtoms
                        key={result._id}
                        id={result._id}
                        image={`${baseUrl}/${result.image}`}
                        namaProduk={result.namaProduk}
                        deskripsiProduk={result.deskripsiProduk}
                        kategori={result.kategori}
                        namapenjual={result.namaPenjual}
                        harga={result.harga}
                        stok={result.stok}
                        userNamePenjual={result.userNamePenjual}
                        onDelete={onConfirmDelete}
                        userKategori={"Admin"}
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

export default Admin;
