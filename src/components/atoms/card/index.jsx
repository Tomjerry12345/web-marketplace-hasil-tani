import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import ButtonAtoms from "../Button";
import { Box } from "@material-ui/core";
import { baseUrl } from "../../../config/constant/Constant";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 400,
  },
  media: {
    height: 140,
  },
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

const CardAtoms = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [disableBtn1, setDisableBtn] = useState(false);

  const {
    id,
    image,
    namaProduk,
    namaKondisi,
    deskripsiProduk,
    kategori,
    namapenjual,
    harga,
    stok,
    userNamePenjual,
    namaPenjual,
    alamat,
    noHp,
    noRekening,
    namaBank,
    onDelete,
    userKategori,
    onAddToTroli,
    disableBtn,
    isDisabledBtnByStok,
  } = props;

  const data = {
    image,
    namaProduk,
    namaKondisi,
    deskripsiProduk,
    kategori,
    harga,
    stok,
    userNamePenjual,
    namaPenjual,
    alamat,
    noHp,
    noRekening,
    namaBank,
  };

  let button;
  if (userKategori === "Petani") {
    button = (
      <Fragment>
        <ButtonAtoms
          size="small"
          color="primary"
          onClick={() =>
            history.push({
              pathname: "/edit-produk",
              id: id,
              title: "Edit Produk",
              btnTitle: "Edit",
              data: data,
            })
          }
          title={"Ubah"}
          style={{ color: "green" }}
        />
        <ButtonAtoms
          size="small"
          color="primary"
          onClick={() => onDelete(id)}
          title={"Hapus"}
          style={{ color: "green" }}
        />
      </Fragment>
    );
  } else if (userKategori === "Admin") {
    button = (
      <ButtonAtoms
        size="large"
        color="primary"
        fullWidth
        variant="contained"
        onClick={() => onDelete(id)}
        title={"Hapus"}
        style={{ color: "#fff", backgroundColor: "green" }}
      />
    );
  } else {
    button = (
      <Button
        classes={{
          root: classes.button,
          disabled: classes.disabled,
        }}
        variant="contained"
        size="large"
        color="primary"
        fullWidth
        disabled={
          isDisabledBtnByStok
            ? isDisabledBtnByStok
            : disableBtn
            ? disableBtn
            : disableBtn1
        }
        // disabled={isDisabledBtnByStok}
        onClick={() => {
          setDisableBtn(true);
          onAddToTroli(
            id,
            image,
            namaProduk,
            namaKondisi,
            deskripsiProduk,
            kategori,
            harga,
            stok,
            userNamePenjual
          );
        }}
      >
        Tambah ke troli
      </Button>
    );
  }

  const clickCard = () => {
    history.push({ pathname: "/detail-produk", data });
  };

  return (
    <Card className={classes.root} style={{ position: "relative" }}>
      <CardActionArea onClick={clickCard}>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          {stok === 0 ? (
            <Box
              style={{
                border: "1px solid red",
                marginTop: 8,
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                style={{ padding: 2, color: "red", fontWeight: "bold" }}
              >
                Stok habis
              </Typography>
            </Box>
          ) : null}

          <Typography
            variant="body1"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            {namaProduk}
          </Typography>
          <Typography
            variant="body2"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            Rp.{harga}00/kg
          </Typography>
          <Typography
            variant="body2"
            style={{ fontWeight: "", fontSize: "14px" }}
          >
            Kategori : {kategori}
          </Typography>
          <Typography
            variant="body1"
            style={{ fontWeight: "", fontSize: "14px" }}
          >
            Kondisi Produk : {namaKondisi}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box style={{ height: 60, position: "absolute", bottom: "0px" }}>
        <CardActions
          style={{ position: "absolute", bottom: "0px", width: 315 }}
        >
          {button}
        </CardActions>
      </Box>
    </Card>
  );
};

export default CardAtoms;
