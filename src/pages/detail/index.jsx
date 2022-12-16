import { Button, Grid, Typography } from "@material-ui/core";
import { DataUsageRounded } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function DetailProduk() {
  const history = useHistory();
  const data = history.location.data;

  const dispatch = useDispatch();
  const { refresh } = useSelector((state) => state);

  useEffect(() => {
    dispatch({ type: "UPDATE_REFRESH", payload: !refresh });
  }, []);
  return (
    <div>
      <Grid container>
        <Grid item md={3} xs={9}>
          <img src={data.image} alt="gambar" width="300" height="300" />
        </Grid>
        <Grid item md={4} sxs={10}>
          <Grid container>
            <Grid item xs={10}>
              <Typography
                variant="h5"
                style={{
                  fontWeight: "bold",
                }}
              >
                {data.namaProduk}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "10px",
              }}
            >
              <Typography variant="h5">{`Rp. ${data.harga}`}.000</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "14px",
              }}
            >
              <Typography variant="h7">Deskripsi Produk: {data.deskripsiProduk}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "10px",
              }}
            >
              <Typography variant="h7">
                Kategori:{" "}
                <span style={{ color: "green" }}>{data.kategori}</span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "10px",
              }}
            >
              <Typography variant="h7">
                Stok: <span style={{ color: "green" }}>{data.stok}/kg</span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "10px",
              }}
            >
              <Typography variant="h7">
                Penjual:{" "}
                <span style={{ color: "green" }}>{data.namaPenjual}</span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "10px",
              }}
            >
              <Typography variant="h7">
                Alamat Penjual:{" "}
                <span style={{ color: "green" }}>{data.alamat}</span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "10px",
              }}
            >
              <Typography variant="h7">
                Nomor Penjual:{" "}
                <span style={{ color: "green" }}>{data.noHp}</span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "10px",
              }}
            >
              <Typography variant="h7">
                Nomor Rekening:{" "}
                <span style={{ color: "green" }}>{data.noRekening}</span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "10px",
              }}
            >
              <Typography variant="h7">
                Nama Bank:{" "}
                <span style={{ color: "green" }}>{data.namaBank}</span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "10px",
              }}
            >
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}