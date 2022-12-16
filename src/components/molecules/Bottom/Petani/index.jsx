import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CategoryIcon from "@material-ui/icons/Category";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector } from "react-redux";
import { Badge } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: 50,
  },
  icon: {
    color: "black",
    "&$selected": {
      color: "green",
    },
  },
});

const BottomPetani = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const { dataTroli } = useSelector((state) => state);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    let sumData = 0;
    dataTroli.map(() => (sumData = sumData + 1));
    setTotalData(sumData);
  }, [dataTroli]);

  const handleClose = (event) => {
    console.log(`click menu ${event}`);
    if (event === "pesananSaya") history.push("/konsumen/rincian-pesanan");
    else if (event === "informasiAkun") history.push("/akun");

    setAnchorEl(null);
  };

  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          style={{
            color: "green",
          }}
          label="Beranda"
          icon={<DashboardIcon />}
          onClick={() => history.push("/")}
        />
        <BottomNavigationAction
          style={{
            color: "green",
          }}
          label="Produk"
          icon={<CategoryIcon />}
          onClick={() => history.push("/produk")}
        />
        <BottomNavigationAction
          style={{
            color: "green",
          }}
          label="Pesanan"
          icon={
            <Badge badgeContent={totalData} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          }
          onClick={() => history.push("/petani/rincian-pesanan")}
        />
        <BottomNavigationAction
          style={{
            color: "green",
          }}
          label="Akun"
          icon={<AccountCircleIcon />}
          onClick={() => history.push("/akun")}
        />
        {/* <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
      </BottomNavigation>
    </div>
  );
};

export default withStyles(useStyles)(BottomPetani);
