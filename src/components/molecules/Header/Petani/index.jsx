import React, { Fragment, useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Logo from "../../../../assets/icon/logoini.png";
import { Box, useMediaQuery } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { baseUrl } from "../../../../config/constant/Constant";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },

  appBar: {
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
  title: {
    flexGrow: 1,
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

  icon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const HeaderPetani = () => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { statusLogin, refresh } = useSelector((state) => state);
  const dispatch = useDispatch();
  const path = history.location.pathname;
  const [hideArrow, setHideArrow] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    console.log(`path: ${path}`);
    console.log(`refresh: ${refresh}`);
    path !== "/" && path !== "/produk" && path !== "/petani/rincian-pesanan" ? setHideArrow(true) : setHideArrow(false);
  }, [refresh]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClose = (event) => {
    console.log(`click menu ${event}`);
    if (event === "informasiAkun") history.push("/akun");
    else if (event === "keluar") btnLogout();
    setAnchorEl(null);
  };

  const btnLogout = () => {
    axios
      .put(`${baseUrl}/auth/logout`)
      .then((result) => {
        console.log(result);
        dispatch({ type: "UPDATE_STATUS_LOGIN", payload: !statusLogin });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)} style={{ background: "green" }}>
        <Toolbar className={classes.toolbar}>
          {!matches ? (
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
              <MenuIcon />
            </IconButton>
          ) : null}

          {!hideArrow || matches ? null : (
            <IconButton color="inherit" onClick={() => history.push("/")}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Box style={{ marginRight: "10px" }}>
            <img src={Logo} alt="logo" width="48" />
          </Box>
          {!matches ? (
            <Typography className={classes.title} component="h1" variant="h6" color="inherit" noWrap>
              e-Tani Takalar
            </Typography>
          ) : (
            <Typography className={classes.title} component="h1" variant="h6" color="inherit" noWrap></Typography>
          )}

          {!matches ? (
            <Fragment style={{ marginRight: "10px" }}>
              <IconButton
                color="inherit"
                onClick={() => {
                  dispatch({ type: "UPDATE_REFRESH", payload: !refresh });
                  history.push("/akun");
                }}
              >
                <AccountCircleIcon />
              </IconButton>
              <IconButton color="inherit" onClick={btnLogout}>
                <ExitToAppIcon />
              </IconButton>
            </Fragment>
          ) : null}
        </Toolbar>
      </AppBar>
      {!matches ? (
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
          style={{ marginTop: "8px" }}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => {
                dispatch({ type: "UPDATE_REFRESH", payload: !refresh });
                history.push("/");
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                dispatch({ type: "UPDATE_REFRESH", payload: !refresh });
                history.push("/produk");
              }}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Katalog Produk" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                dispatch({ type: "UPDATE_REFRESH", payload: !refresh });
                history.push("/petani/rincian-pesanan");
              }}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Pesanan Masuk" />
            </ListItem>
          </List>
        </Drawer>
      ) : null}
    </Fragment>
  );
};

export default HeaderPetani;
