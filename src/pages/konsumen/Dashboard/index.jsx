import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { CardAtoms, TypographyAtoms } from "../../../components/atoms";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { baseUrl } from "../../../config/constant/Constant";

const DashboardKonsumen = ({ userKategori }) => {
  const [produk, setProduk] = useState([]);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [severity, setSeverity] = useState("");
  const idTroli = [];
  const idProduk = [];
  const listDisableBtn = [];
  const [disableBtn, setDisableBtn] = useState([]);
  let i = 0;

  const { dataUsers, dataTroli, statusProduk } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const online = window.navigator.onLine;

    if (!online) {
      const local = localStorage.getItem("produk");
      setProduk(JSON.parse(local));
    }
    // if (online) {
    const request = new FormData();
    request.append("username", dataUsers.username);
    axios
      .get(`${baseUrl}/produk/getAllProduk`)
      .then((result) => {
        const data = result.data.data;

        if (online) {
          localStorage.setItem("produk", JSON.stringify(data));
          setProduk(data);
        }

        data.map((produk) => idProduk.push(produk._id));

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

    // } else {

    // }
  }, [produk]);

  const onAddToTroli = (
    id,
    image,
    namaProduk,
    namaKondisi,
    deskripsiProduk,
    kategori,
    harga,
    stok,
    usernamePenjual
  ) => {
    const data = new FormData();
    data.append("idProduk", id);
    data.append("namaProduk", namaProduk);
    data.append("deskripsiProduk", deskripsiProduk);
    data.append("kategori", kategori);
    data.append("harga", harga);
    data.append("stok", stok);
    data.append("image", image);
    data.append("usernamePembeli", dataUsers.username);
    data.append("usernamePenjual", usernamePenjual);

    console.log("harga => ", harga);

    axios
      .post(`${baseUrl}/troli/createTroli`, data, {
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
        // const message = err.response.data.message;
        console.log("error => ", err);
        // setSeverity("error");
        // setResponse(err);
        // setOpen(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // console.log("produk => ", produk);

  return (
    <div>
      <TypographyAtoms
        title={"Produk"}
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
          <Grid container direction="row" spacing={2}>
            {produk !== undefined
              ? produk.map((dataProduk) => {
                  return (
                    <Grid
                      item
                      lg={3}
                      md={3}
                      sm={6}
                      xs={12}
                      key={dataProduk._id}
                    >
                      <CardAtoms
                        id={dataProduk._id}
                        image={`${baseUrl}/${dataProduk.image}`}
                        namaProduk={dataProduk.namaProduk}
                        namaKondisi={dataProduk.namaKondisi}
                        deskripsiProduk={dataProduk.deskripsiProduk}
                        kategori={dataProduk.kategori}
                        harga={dataProduk.harga}
                        stok={dataProduk.stok}
                        userNamePenjual={dataProduk.userNamePenjual}
                        namaPenjual={dataProduk.namaPenjual}
                        alamat={dataProduk.alamat}
                        noHp={dataProduk.noHp}
                        noRekening={dataProduk.noRekening}
                        namaBank={dataProduk.namaBank}
                        userKategori={userKategori}
                        onAddToTroli={onAddToTroli}
                        disableBtn={disableBtn[i++]}
                        isDisabledBtnByStok={dataProduk.stok === 0}
                      />
                    </Grid>
                  );
                })
              : null}
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

export default DashboardKonsumen;
