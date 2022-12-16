import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles, ThemeProvider, createTheme, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { TypographyAtoms, ButtonAtoms, LinkAtoms } from "../../components/atoms";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Box, Snackbar, useMediaQuery } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { green } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FlashOnTwoTone } from "@material-ui/icons";
import { baseUrl } from "../../config/constant/Constant";
import Logo from "../../assets/icon/logo.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  typography: {
    marginTop: theme.spacing(1),
  },
}));

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const url = matches ? "192.168.43.184" : "localhost";

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const btnLogin = () => {
    setLoading(true);
    if (state.username === "adminku" && state.password === "adminku") history.push("/admin");
    const data = new FormData();
    data.append("username", state.username);
    data.append("password", state.password);

    console.log("data : ", data);

    axios
      .post(`${baseUrl}/auth/login`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("dataLogin: ", res);
        console.log("post succes : ", res.data.message);
        dispatch({ type: "UPDATE_USERS", payload: res.data.data });
        history.push("/");
        setLoading(false);
      })
      .catch((err) => {
        const message = err.response.data.message;
        setResponse(message);
        setOpen(true);
        setLoading(false);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={Logo} height="80" width="90" />
        <TypographyAtoms variant="h6" title={"Login e-Tani Takalar"} />
        <TypographyAtoms align ="center" variant="subtitle1" title={`Produk yang berkualitas berasal dari petani terpercaya`} />
        {loading && (
          <Box display="flex" className={classes.progress} style={{ margin: 8 }}>
            <CircularProgress />
          </Box>
        )}
        <form className={classes.form} noValidate>
          <ThemeProvider theme={theme}>
            <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus value={state.namaLengkap} onChange={handleChange} />
            <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={state.namaLengkap} onChange={handleChange} />
          </ThemeProvider>

          <ButtonAtoms fullWidth variant="contained" color="primary" title={"Masuk"} className={classes.submit} onClick={btnLogin} style={{ background: "green" }} />
          <Grid container justifyContent="center" direction="column" alignItems="center">
            <Grid item className={classes.typography}>
              <LinkAtoms to="/lupa-password" variant="body2" title={"Lupa password?"} style={{ color: "green" }} />
            </Grid>
            <Grid item className={classes.typography}>
              <LinkAtoms to="/register" variant="body2" title={"Belum punya akun? Daftar"} style={{ color: "green" }} />
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {response}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
