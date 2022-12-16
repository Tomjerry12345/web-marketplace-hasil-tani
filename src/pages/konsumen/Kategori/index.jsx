import { Grid, IconButton } from "@material-ui/core";
import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { TypographyAtoms } from "../../../components/atoms";
import { useHistory } from "react-router-dom";
import apple from "../../../assets/icon/apple.png";
import cabbage from "../../../assets/icon/cabbage.png";
import corn from "../../../assets/icon/corn.png";
import onion from "../../../assets/icon/onion.png";
import peanut from "../../../assets/icon/peanut.png";

const KategoriProduk = ({ title, icon }) => {
  const history = useHistory();

  const onBtnKategori = () => {
    history.push({ pathname: "/tampil-kategori", state: { kategori: title } });
  };

  return (
    <Grid item md={2} sm={2} xs={6}>
      <Grid container direction="column" alignItems="center">
        <Grid item md>
          <img src={icon} alt="" width="60" height="60" onClick={onBtnKategori} />
          {/* <IconButton color="inherit" onClick={onBtnKategori}>
            {icon}
          </IconButton> */}
        </Grid>
        <Grid item md>
          <TypographyAtoms title={title} variant="subtitle" />
        </Grid>
      </Grid>
    </Grid>
  );
};

const KategoriKonsumen = () => {
  return (
    <div>
      <TypographyAtoms title={"Kategori"} variant="h5" style={{ margin: "20px 0 20px 0", fontWeight: 'bold' }} />
      <Grid container justifyContent="flex-start" alignItems="flex-start" spacing={2}>
        <KategoriProduk title={"Sayur-mayur"} icon={cabbage} />
        <KategoriProduk title={"Serelia"} icon={corn} />
        <KategoriProduk title={"Buah-buahan"} icon={apple} />
        <KategoriProduk title={"Kacang-kacangan"} icon={peanut} />
        <KategoriProduk title={"Umbi-umbian"} icon={onion} />
      </Grid>
    </div>
  );
};

export default KategoriKonsumen;
