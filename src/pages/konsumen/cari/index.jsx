// @flow
import React, { useState } from "react";
import { CardAtoms, TypographyAtoms } from "../../../components/atoms";
import { Box, Grid, Paper } from "@material-ui/core";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../../config/constant/Constant";

const TampilCari = () => {
  const [produk, setProduk] = useState([]);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [severity, setSeverity] = useState("");
  const idTroli = [];
  const idProduk = [];
  const listDisableBtn = [];
  const [disableBtn, setDisableBtn] = useState([]);
  let i = 0;
  const { dataUsers, statusProduk } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(location.state.cari);
    const request = new FormData();
    request.append("username", dataUsers.username);
    axios
      .get(`${baseUrl}/produk/cari/${location.state.cari}`)
      .then((result) => {
        const data = result.data.data;
        data.map((produk) => idProduk.push(produk._id));
        setProduk(data);
        return axios.post(`${baseUrl}/troli/getTroli`, request, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
      })
      .then((result) => {
        const troli = result.data.data;
        troli.map((troli) => idTroli.push(troli.idProduk));

        idProduk.map((res) => listDisableBtn.push(idTroli.includes(res)));

        setDisableBtn(listDisableBtn);
        dispatch({ type: "UPDATE_TROLI", payload: troli });
      })
      .catch((err) => console.log(err));
  }, []);

  const onAddToTroli = (id, image, namaProduk, deskripsiProduk, kategori, harga, stok) => {
    const data = new FormData();
    data.append("idProduk", id);
    data.append("namaProduk", namaProduk);
    data.append("deskripsiProduk", deskripsiProduk);
    data.append("kategori", kategori);
    data.append("harga", harga);
    data.append("stok", stok);
    data.append("image", image);
    data.append("username", dataUsers.username);

    axios
      .post("http://localhost:4000/troli/createTroli", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const message = res.data.message;
        console.log("post succes : ", message);
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

    console.log("dataUsers: ", dataUsers);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <TypographyAtoms title={"Produk"} variant="h6" />
      <Grid container direction="column" style={{ marginTop: "10px" }} spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            {produk.length > 0 ? (
              produk.map((dataProduk) => {
                return (
                  <Grid item md={4} sm={6} xs={12} key={dataProduk._id}>
                    <CardAtoms
                      id={dataProduk._id}
                      image={`http://localhost:4000/${dataProduk.image}`}
                      namaProduk={dataProduk.namaProduk}
                      deskripsiProduk={dataProduk.deskripsiProduk}
                      kategori={dataProduk.kategori}
                      harga={dataProduk.harga}
                      stok={dataProduk.stok}
                      onAddToTroli={onAddToTroli}
                      disableBtn={disableBtn[i++]}
                    />
                  </Grid>
                );
              })
            ) : (
              <Box component={Paper} style={{ width: "96vw", height: "50vh" }} justifyContent="center" display="flex" alignItems="center">
                <TypographyAtoms title={"Produk tidak ditemukan"} variant="h6" />
              </Box>
            )}
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

export default TampilCari;
