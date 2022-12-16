// @flow
import { Box, Grid, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/constant/Constant";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  root: {
    width: "80vw",
    // maxWidth: "600px"
  },
  height: {
    height: "87vh",
  },
  media: {
    height: 250,
    borderRadius: "250px",
    width: 250,
    margin: "auto",
  },
  button: {
    marginTop: theme.spacing(8),
    background: "green",
    color: "white",
    margin: "8px",
  },
  items: {
    width: "100vw",
  },
}));

export const AkunPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { dataUsers, statusLogin } = useSelector((state) => state);
  const dispatch = useDispatch();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const btnLogout = () => {
    axios
      .put(`${baseUrl}/auth/logout`)
      .then((result) => {
        console.log(result);
        dispatch({ type: "UPDATE_STATUS_LOGIN", payload: !statusLogin });
        dispatch({ type: "UPDATE_PRODUK", payload: {} });
        dispatch({ type: "UPDATE_TROLI", payload: [] });
        dispatch({ type: "UPDATE_USERS", payload: {} });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.container}>
      <Card className={matches ? classes.root && classes.height : classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={`${baseUrl}/${dataUsers.image}`} title="Contemplative Reptile" />
          <CardContent>
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Grid item>
                <Typography variant="h5" component="h2">
                  {dataUsers.namaLengkap}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" component="h2">
                  {dataUsers.username}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {dataUsers.jenisAkun}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary" component="p">
                  {dataUsers.jenisKelamin}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{
                    textAlign: "center",
                  }}
                >
                  {`${dataUsers.alamat} kec. ${dataUsers.kecamatan} Kab. ${dataUsers.kabupaten}`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary" component="p">
                  {dataUsers.noHp}
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ width: "100vw" }}>
                <Box display="flex" style={{ padding: 4 }}>
                  <Button fullWidth variant="contained" className={classes.button} onClick={() => history.push("/edit-akun")}>
                    Edit Profil
                  </Button>
                  {/* {dataUsers.kategori === "Petani" ? null : ( */}
                  <Button fullWidth className={classes.button} variant="contained" onClick={btnLogout}>
                    Logout
                  </Button>
                  {/* )} */}
                </Box>
              </Grid>
              {/* {dataUsers.kategori === "Petani" ? null : (
                <Grid item xs={12} md={6} style={{ width: "100vw" }}>
                  <Button fullWidth className={classes.button} variant="contained" onClick={btnLogout}>
                    Logout
                  </Button>
                </Grid>
              )}
              <Grid item xs={12} md={6} className={classes.button}>
                <Button fullWidth variant="contained" onClick={btnLogout}>
                  Logout
                </Button>
              </Grid> */}
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
