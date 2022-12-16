import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles, ThemeProvider, createTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { TypographyAtoms, ButtonAtoms, LinkAtoms } from "../../../components/atoms";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Snackbar, Box } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { green } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import { baseUrl } from "../../../config/constant/Constant";

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

export default function RecoveryPassword() {
  const classes = useStyles();
  const history = useHistory();
  const username = history.location.state?.username;

  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [state, setState] = useState({
    // passwordLama: "",
    passwordBaru: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const onKonfirmasi = () => {
    setLoading(true);
    console.log(`${JSON.stringify(state)}`);
    axios
      .post(`${baseUrl}/auth/recoveryPassword/${username}`, state)
      .then((res) => {
        console.log("response", res);
        history.push("/login");
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
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <TypographyAtoms component="h1" variant="h5" title={"Ganti Password"} />
        {loading && (
          <Box display="flex" className={classes.progress} style={{ margin: 8 }}>
            <CircularProgress />
          </Box>
        )}
        <form className={classes.form} noValidate>
          <ThemeProvider theme={theme}>
            {/* <TextField variant="outlined" margin="normal" required fullWidth label="Password Lama" name="passwordLama" type="password" onChange={handleChange} /> */}
            <TextField variant="outlined" margin="normal" required fullWidth name="passwordBaru" label="Password Baru" type="password" onChange={handleChange} />
          </ThemeProvider>

          <ButtonAtoms fullWidth variant="contained" color="primary" title={"Kofirmasi"} className={classes.submit} style={{ background: "green" }} onClick={onKonfirmasi} />
          <Grid container justifyContent="center" direction="column" alignItems="center">
            <Grid item className={classes.typography}>
              <LinkAtoms to="/login" variant="body2" title={"Kembali"} style={{ color: "green" }} />
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
}
