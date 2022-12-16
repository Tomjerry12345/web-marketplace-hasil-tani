import { Grid, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { TypographyAtoms } from "../../../components/atoms";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AssignmentIcon from '@material-ui/icons/Assignment';
//import StorefrontIcon from "@material-ui/icons/Storefront";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../../config/constant/Constant";
import { useHistory } from "react-router-dom";

function DashboardPetani() {
  const [totalProduk, setTotalProduk] = useState(0);
  const [totalPesanan, setTotalPesanan] = useState(0);
  const { dataProduk, refresh, dataUsers } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "UPDATE_REFRESH", payload: !refresh });
    Axios.get(`${baseUrl}/produk/getProduk/${dataUsers.username}`)
      .then((result) => {
        const data = result.data;
        setTotalProduk(data.data.length);
        dispatch({ type: "UPDATE_PRODUK", payload: data });
      })
      .catch((err) => console.log(err));
    return () => {
      setTotalProduk(0);
    };
  }, []);

  useEffect(() => {

    const request = new FormData();

    request.append("username", dataUsers.username);
    request.append("jenisAkun", dataUsers.kategori);
    Axios.post(`${baseUrl}/rincian-pesanan/get/byName`, request, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((result) => {
        const data1 = result.data.data;
        console.log(`response => ${JSON.stringify(data1)}`);
        setTotalPesanan(data1.length);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <TypographyAtoms title={"Dashboard"} variant="h5" style={{ fontWeight: "bold", marginBottom: 30 }} />
      <Grid container justifyContent="flex-start" alignItems="flex-start" spacing={2}>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <IconButton color="inherit" onClick={() => history.push('/produk')}>
                <ShoppingCartIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <TypographyAtoms title={"Jumlah Produk: " + totalProduk} variant="subtitle1" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <IconButton color="inherit" onClick={() => history.push('/petani/rincian-pesanan')}>
                <AssignmentIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <TypographyAtoms title={`Jumlah Pesanan: ${totalPesanan}`} variant="subtitle1" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default DashboardPetani;
