import { useEffect, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import { makeStyles, alpha, useTheme } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import clsx from "clsx";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import Logo from "../../../../assets/icon/logoini.png";
import { Box, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CategoryIcon from "@material-ui/icons/Category";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Fragment } from "react";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    background: "green",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  box: {
    display: "flex",
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    padding: 16,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(3),
      width: "200px",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const HeaderKonsumen = () => {
  const classes = useStyles();
  const history = useHistory();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const path = history.location.pathname;

  const [anchorEl, setAnchorEl] = useState(null);
  const { dataTroli } = useSelector((state) => state);
  const [totalData, setTotalData] = useState(0);
  const [cari, setCari] = useState("");
  const [hideArrow, setHideArrow] = useState(false);

  useEffect(() => {
    path !== "/" ? setHideArrow(true) : setHideArrow(false);
    let sumData = 0;
    dataTroli.map(() => (sumData = sumData + 1));
    setTotalData(sumData);
  }, [dataTroli]);

  const onChange = (e) => {
    setCari(e.target.value);
  };

  const handleChange = (event) => {
    if (event.keyCode === 13) {
      history.push({ pathname: "/cari", state: { cari: event.target.value } });
      console.log("value", event.target.value);
      setCari("");
      // put the login here
    }
    // setCari(event.target.value);
  };

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = (event) => {
    console.log(`click menu ${event}`);
    if (event === "pesananSaya") history.push("/konsumen/rincian-pesanan");
    else if (event === "informasiAkun") history.push("/akun");
    else if (event === "kategori") history.push("/kategori");
    else if (event === "troli") history.push("/troli");

    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {!hideArrow || matches ? null : (
            <IconButton color="inherit" onClick={() => history.push("/")}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Box>
            <img
              src={Logo}
              alt="logo"
              width={matches ? "60" : "60"}
              height={matches ? "50" : "50"}
            />
          </Box>
          {!matches ? (
            <Typography
              className={classes.title}
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
            >
              e-Tani Takalar
            </Typography>
          ) : null}

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Cari Produk..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onKeyDown={handleChange}
              value={cari}
              onChange={onChange}
            />
          </div>
          {!matches ? (
            <Fragment>
              <IconButton
                color="inherit"
                onClick={() => history.push("/kategori")}
              >
                <CategoryIcon />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => history.push("/troli")}
              >
                <Badge badgeContent={totalData} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                color="inherit"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleClose("pesananSaya")}>
                  Pesanan saya
                </MenuItem>
                <MenuItem onClick={() => handleClose("informasiAkun")}>
                  Informasi Akun
                </MenuItem>
              </Menu>
            </Fragment>
          ) : null}
          {/* (
            <Fragment>
              <IconButton color="inherit" aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={(event) => setAnchorEl(event.currentTarget)}>
                <MoreVertIcon />
              </IconButton>

              <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => handleClose("kategori")}>Kategori</MenuItem>
                <MenuItem onClick={() => handleClose("troli")}>
                  <pre>
                    Troli{"  "}{" "}
                    <Badge badgeContent={totalData} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </pre>
                </MenuItem>
                <MenuItem onClick={() => handleClose("pesananSaya")}>Pesanan Saya</MenuItem>
                <MenuItem onClick={() => handleClose("informasiAkun")}>Informasi Akun</MenuItem>
              </Menu>
            </Fragment>
          ) */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderKonsumen;
