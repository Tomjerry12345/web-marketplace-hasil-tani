import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import ButtonAtoms from "../Button";

const useStyles = makeStyles({
  root: {
    maxWidth: "70%",
  },
  media: {
    height: 140,
  },
});

const CardStyle1 = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const { id, image, namaProduk, deskripsiProduk, kategori, harga, stok } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title="Contemplative Reptile" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {namaProduk}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {"Rp. " + harga}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonAtoms
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          onClick={() => {
            // setDisableBtn(true);
          }}
          title={"Tambah ke troli"}
        />
      </CardActions>
    </Card>
  );
};

export default CardStyle1;
