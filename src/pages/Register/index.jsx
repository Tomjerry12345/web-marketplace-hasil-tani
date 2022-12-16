import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles, ThemeProvider, createTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ButtonAtoms, LinkAtoms, TypographyAtoms } from "../../components/atoms";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import { RadioMolecules } from "../../components/molecules";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { green } from "@material-ui/core/colors";
import { IconButton, Box } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CircularProgress from "@material-ui/core/CircularProgress";
import { baseUrl } from "../../config/constant/Constant";
import Logo from "../../assets/icon/logo.png"

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const Register = () => {
  const classes = useStyles();
  const history = useHistory();

  const dataKecamatan = {
    takalar: ["Manggarabombang", "Mappakasunggu", "Polombangkeng Selatan", "Polombangkeng Utara", "Galesong Selatan", "Galesong Utara", "Pattalassang", "Galesong"],
    gowa: [
      "Parangloe",
      "Manuju",
      "Tinggimoncong",
      "Tombolo Pao",
      "Parigi",
      "Bungaya",
      "Bontolempangan",
      "Tompobulu",
      "Biringbulu",
      "Somba Opu",
      "Bontomarannu",
      "Pattallassang",
      "Pallangga",
      "Barombong",
      "Bajeng",
      "Bajeng Barat",
      "Bontonompo",
      "Bontonompo Selatan",
      "Parangloe",
      "Tinggimoncong",
      "Bungaya",
      "Bontolempangan",
      "Tompobulu",
    ],

  };

  const [state, setState] = React.useState({
    namaLengkap: "",
    username: "",
    password: "",
    jenisKelamin: "",
    alamat: "",
    kabupaten: "",
    kecamatan: "",
    noRekening:"",
    namaBank: "",
    kategori: "",
    image: "",
  });

  const [preview, setPreview] = useState(null);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    console.log(`name => ${name} === value => ${value}`);
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const clickBtnRegister = () => {
    setLoading(true);
    const data = new FormData();
    data.append("namaLengkap", state.namaLengkap);
    data.append("username", state.username);
    data.append("password", state.password);
    data.append("jenisKelamin", state.jenisKelamin);
    data.append("alamat", state.alamat);
    data.append("noHp", state.noHp);
    data.append("kabupaten", state.kabupaten);
    data.append("kecamatan", state.kecamatan);
    data.append("noRekening", state.noRekening);
    data.append("namaBank", state.namaBank);
    data.append("kategori", state.kategori);
    data.append("statusLogin", true);
    data.append("image", state.image);

    console.log("data : ", state);

    Axios.post(`${baseUrl}/auth/register`, data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log("post succes : ", res.data.message);
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

  const onSetImage = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setState({
      ...state,
      image: file,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  let colorText, styleImage;
  if (preview === null) {
    colorText = "black";
    styleImage = {
      background: "#0222",
      height: "200px",
    };
  } else {
    styleImage = {
      background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${preview})`,
      height: "200px",
      backgroundPosition: "center",
      backgroundSize: "cover",
    };
    colorText = "white";
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={Logo} height="80" width="100"/>
        <TypographyAtoms component="h1" variant="h5" title={"Daftar"} />
        {loading && (
          <Box display="flex" className={classes.progress} style={{ margin: 8 }}>
            <CircularProgress />
          </Box>
        )}
        <form className={classes.form}>
          <ThemeProvider theme={theme}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                style={{
                  height: "50%",
                }}
              >
                <Grid container direction="column" alignItems="center" style={styleImage} justifyContent="center">
                  <Grid item>
                    <input accept="image/*" id="icon-button-file" type="file" hidden onChange={(e) => onSetImage(e)} />
                    <label htmlFor="icon-button-file">
                      <IconButton component="span">
                        <AddPhotoAlternateIcon fontSize="large" style={{ color: `${colorText}` }} />
                      </IconButton>
                    </label>
                  </Grid>
                  <Grid item>
                    <TypographyAtoms title={"Tambah Foto"} variant="subtitle" style={{ color: `${colorText}` }} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="namaLengkap" name="namaLengkap" variant="outlined" value={state.namaLengkap} required fullWidth id="namaLengkap" label="Nama Lengkap" autoFocus onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="username" name="username" variant="outlined" value={state.username} required fullWidth id="username" label="Username" onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" required fullWidth name="password" value={state.password} label="Password" type="password" id="password" autoComplete="current-password" onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                {/* Select molecules */}
                <RadioMolecules title={"Jenis Kelamin"} aria-label="jenisKelamin" name="jenisKelamin" value={state.jenisKelamin} onChange={handleChange} mValue={"Perempuan"} mValue1={"Laki-Laki"} />
              </Grid>

              <Grid item xs={12}>
                <TextField variant="outlined" required fullWidth name="noHp" value={state.noHp} onChange={handleChange} label="No Hp" type="text" id="noHp" />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" required fullWidth name="alamat" value={state.alamat} onChange={handleChange} label="Alamat" type="alamat" id="alamat" />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="kabupaten">Kabupaten</InputLabel>
                  <Select
                    native
                    value={state.kabupaten}
                    onChange={handleChange}
                    label="Kabupaten"
                    inputProps={{
                      name: "kabupaten",
                      id: "kabupaten",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"Takalar"}>Takalar</option>
                    <option value={"Gowa"}>Gowa</option>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="kecamatan">Kecamatan</InputLabel>
                  <Select
                    native
                    disabled={state.kabupaten === "" ? true : false}
                    value={state.kecamatan}
                    onChange={handleChange}
                    label="kecamatan"
                    inputProps={{
                      name: "kecamatan",
                      id: "kecamatan",
                    }}
                  >
                    {/* {state.kabupaten === "" ? <option aria-label="None" value="" /> : null} */}

                    {state.kabupaten === "Takalar" ? dataKecamatan.takalar.map((kecamatan) => <option value={kecamatan}>{kecamatan}</option>) : dataKecamatan.gowa.map((kecamatan) => <option value={kecamatan}>{kecamatan}</option>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth name="noRekening" value={state.noRekening} onChange={handleChange} label="No. Rekening" type="number" id="noRekening" />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="namaBank">Nama Bank</InputLabel>
                  <Select
                    native
                    value={state.namaBank}
                    onChange={handleChange}
                    label="namaBank"
                    inputProps={{
                      name: "namaBank",
                      id: "namaBank",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"BNI"}>BNI</option>
                    <option value={"BNI"}>BRI</option>
                    <option value={"BCA"}>BCA</option>
                    <option value={"Mandiri"}>Mandiri</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {/* Select molecules */}
                <RadioMolecules title={"Kategori"} aria-label="kategori1" name="kategori" value={state.kategori} onChange={handleChange} mValue={"Petani"} mValue1={"Konsumen"} />
              </Grid>

              {/* Batas grid */}
            </Grid>
          </ThemeProvider>

          <ButtonAtoms fullWidth variant="contained" color="primary" className={classes.submit} title={"Daftar"} onClick={clickBtnRegister} style={{ background: "green" }} />
          <Grid container justifyContent="center">
            <Grid item className={classes.typography}>
              <LinkAtoms to="/login" variant="body2" title={"Sudah punya akun? Login"} style={{ color: "green" }} />
            </Grid>
          </Grid>
        </form>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {response}
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
};

export default Register;
