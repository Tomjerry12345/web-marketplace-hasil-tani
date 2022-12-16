import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { HeaderPetani, HeaderKonsumen } from "../../components/molecules";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DashboardPetani, Produk, RincianPesananPetani, TambahDanEditProduk } from "../petani";
import { DashboardKonsumen, KategoriKonsumen, RincianPesananKonsumen, TroliKonsumen } from "../konsumen";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import TampilKategori from "../konsumen/Kategori/TampilKategori";
import TampilCari from "../konsumen/cari";
import { AkunPage } from "../Akun";
import EditAkun from "../Akun/EditAkun";
import DetailProduk from "../detail";
import { baseUrl } from "../../config/constant/Constant";
import BottomKonsumen from "../../components/molecules/Bottom/Konsumen";
import BottomPetani from "../../components/molecules/Bottom/Petani";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "93vh",
    overflow: "scroll",
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const { dataUsers, statusLogin } = useSelector((state) => state);
  const dispatch = useDispatch();

  let header;
  let routerx;

  useEffect(() => {
    console.log("statusLogin");
    Axios.get(`${baseUrl}/users/getAllUsers`)
      .then((result) => {
        const data = result.data.data;
        if (data.length === 0) {
          history.push("/login");
        } else {
          history.push("/");
          data.map((res) => dispatch({ type: "UPDATE_USERS", payload: res }));
        }
      })
      .catch((err) => console.log(err));
  }, [statusLogin]);

  if (dataUsers.kategori === "Petani") {
    header = <HeaderPetani />;
    routerx = <Route exact path="/" component={DashboardPetani} />;
  } else {
    header = <HeaderKonsumen />;
    routerx = (
      <Route exact path="/">
        <DashboardKonsumen userKategori={"Konsumen"} />
      </Route>
    );
  }

  return (
    <div className={!matches ? classes.root : null}>
      <Router>
        <CssBaseline />
        {/* AppBar */}
        {header}

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div className={classes.container}>
            <Switch>
              {routerx}
              <Route path="/produk" component={Produk} />
              <Route path="/detail-produk" component={DetailProduk} />
              <Route path="/tambahProduk" component={TambahDanEditProduk} />
              <Route path="/edit-produk" component={TambahDanEditProduk} />
              <Route path="/kategori" component={KategoriKonsumen} />
              <Route path="/tampil-kategori" component={TampilKategori} />
              <Route path="/cari" component={TampilCari} />
              <Route path="/troli" component={TroliKonsumen} />
              <Route path="/akun" component={AkunPage} />
              <Route path="/edit-akun" component={EditAkun} />
              <Route path="/konsumen/rincian-pesanan" component={RincianPesananKonsumen} />
              <Route path="/petani/rincian-pesanan" component={RincianPesananPetani} />
            </Switch>
          </div>
        </main>
        {matches ? dataUsers.kategori === "Petani" ? <BottomPetani /> : <BottomKonsumen /> : null}
      </Router>
    </div>
  );
};

export default Home;
