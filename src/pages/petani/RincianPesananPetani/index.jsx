import React, { Fragment, useEffect, useState } from "react";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import axios from "axios";
import Box from "@material-ui/core/Box";
import {
  Button,
  Collapse,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { baseUrl } from "../../../config/constant/Constant";
import { TypographyAtoms } from "../../../components/atoms";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles((theme) => ({
  table: {
    // minWidth: 400,
    // width: "100vw",
    "& > *": {
      borderBottom: "unset",
    },
  },
  errorBtn: {
    backgroundColor: "red",
    color: "white",
    fontSize: "10px",
  },
  succesBtn: {
    backgroundColor: theme.palette.success.light,
    color: "white",
    fontSize: "10px",
  },
}));

export default function RincianPesanan() {
  const classes = useStyles();
  const { dataUsers } = useSelector((state) => state);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState([]);
  const [isBtnClick, setIsBtnClick] = useState(false);

  const [transactionStatus, setTransactionStatus] = useState([]);

  const theme = createTheme();

  const md = useMediaQuery(theme.breakpoints.up("md"));

  // console.log(`md => ${md}`);

  console.log("datausers => ", dataUsers.namaLengkap);
  useEffect(() => {
    const request = new FormData();
    request.append("username", dataUsers.username);
    request.append("jenisAkun", dataUsers.kategori);
    axios
      .post(`${baseUrl}/rincian-pesanan/get/byName`, request, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((result) => {
        const data1 = result.data.data;
        // console.log(`response => ${JSON.stringify(data1)}`);
        data1.map(async (res) => {
          if (res.metodePembayaran === "digital") {
            const res1 = await getStatusPembayaran(res.rincian);
            // console.log(`res1=> ${JSON.stringify(res1.data.status)}`);
            setTransactionStatus((currentArray) => [
              ...currentArray,
              res1.data.status,
            ]);
          } else {
            setTransactionStatus((currentArray) => [...currentArray, "-"]);
          }
        });
        setData(data1);
        setOpen([...Array(data1.length)].map((val) => false));
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const getStatusPembayaran = (rincian) =>
    axios.post(`${baseUrl}/pembayaran/getStatus/`, {
      rincian,
    });

  const btnTerima = (id, message) => {
    console.log(`id ${id}`);
    // const request = new FormData();
    // request.append("message", message);
    // request.append("jenisAkun", dataUsers.kategori);
    const status =
      message === "Sudah Terkirim" ? "Belum Terkirim" : "Sudah Terkirim";
    const data = {
      message: status,
      jenisAkun: dataUsers.kategori,
    };

    axios
      .put(`${baseUrl}/rincian-pesanan/update/${id}`, {
        data,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(`response => ${result}`);
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));
  };

  const deletePesanan = (id) => {
    const data = {
      message: "Pesanan di batalkan",
      jenisAkun: dataUsers.kategori,
    };

    axios
      .put(`${baseUrl}/rincian-pesanan/update/${id}`, {
        data,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(`response => ${result}`);
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));

    // axios
    //   .delete(`${baseUrl}/rincian-pesanan/delete/${id}`)
    //   .then((result) => {
    //     console.log(`response => ${result}`);
    //     setRefresh(!refresh);
    //   })
    //   .catch((err) => console.log(err));
  };

  const handleClick = (index) => {
    setOpen(
      open.map((boolean_value, i) => {
        if (index === i) {
          // once we retrieve the collapse index, we negate it
          return !boolean_value;
        } else {
          // all other collapse will be closed
          return false;
        }
      })
    );
  };

  const handleChange = (e, id, message) => {
    console.log(`id ${id}`);
    // const request = new FormData();
    // request.append("message", message);
    // request.append("jenisAkun", dataUsers.kategori);
    const status =
      message === "Sudah Terkirim" ? "Belum Terkirim" : "Sudah Terkirim";
    const data = {
      message: status,
      jenisAkun: dataUsers.kategori,
    };

    axios
      .put(`${baseUrl}/rincian-pesanan/update/${id}`, {
        data,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(`response => ${result}`);
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));
  };

  return (
    <TableContainer component={Paper} style={{ width: "92vw" }}>
      <Table className={classes.table} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell>Nama Produk</TableCell>
            <TableCell align="left">Harga</TableCell>
            <TableCell align="left">Jumlah</TableCell>
            <TableCell align="left">Metode Pembayaran</TableCell>
            <TableCell align="left">Status Pembayaran</TableCell>
            <TableCell align="left">Status Pengiriman</TableCell>
            <TableCell align="left">Status Penerima</TableCell>
            <TableCell align="left">Alamat Pembeli</TableCell>
            <TableCell align="left">Total Harga (Rp.)</TableCell>
            <TableCell align="left" colSpan={3}>
              Status Pesanan
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <Fragment>
              <TableRow key={index}>
                {row.namaProduk.length > 1 ? (
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleClick(index)}
                    >
                      {open[index] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                ) : (
                  <TableCell></TableCell>
                )}
                <TableCell component="th" scope="row">
                  {`${row.namaProduk[0]}`}
                  {row.namaProduk.length > 1 ? <p>...</p> : null}
                </TableCell>
                <TableCell align="left">
                  {`${row.harga[0]}`}00
                  {row.namaProduk.length > 1 ? <p>...</p> : null}
                </TableCell>
                <TableCell align="left">
                  {`${row.jumlah[0]}`}
                  {row.namaProduk.length > 1 ? <p>...</p> : null}
                </TableCell>
                <TableCell align="left">{row.metodePembayaran}</TableCell>
                <TableCell align="left">{transactionStatus[index]}</TableCell>
                <TableCell align="left">{row.statusPengiriman}</TableCell>
                <TableCell align="left">{row.statusPenerima}</TableCell>
                <TableCell align="left">{row.alamatPembeli}</TableCell>
                <TableCell align="left">{row.rincian.gross_amount}</TableCell>
                <TableCell align="left">
                  <TextField
                    id="filled-select-currency-native"
                    className={
                      row.statusPengiriman === "Sudah Terkirim"
                        ? classes.succesBtn
                        : classes.errorBtn
                    }
                    select
                    label="Status Penerima"
                    value={row.statusPengiriman}
                    onChange={(e) =>
                      handleChange(e, row._id, row.statusPengiriman)
                    }
                    SelectProps={{
                      native: true,
                    }}
                    variant="filled"
                    style={{
                      width: "160px",
                    }}
                  >
                    <option value={"Sudah Terkirim"}>Sudah Terkirim</option>
                    <option value={"Belum Terkirim"}>Belum Terkirim</option>
                  </TextField>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    style={{
                      margin: "8px",
                      background: "Gray",
                      color: "white",
                      fontSize: "10px",
                    }}
                    onClick={() => deletePesanan(row._id)}
                  >
                    Batalkan Pesanan
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                {row.namaProduk.length > 1 ? (
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse in={open[index]} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                          Data lainnya
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <TypographyAtoms
                                  variant="h6"
                                  title={"Nama Produk"}
                                />
                              </TableCell>
                              <TableCell>
                                <TypographyAtoms variant="h6" title={"Harga"} />
                              </TableCell>
                              <TableCell align="right">
                                <TypographyAtoms
                                  variant="h6"
                                  title={"Jumlah"}
                                />
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.namaProduk.map((data, index) =>
                              index > 0 ? (
                                <TableRow key={index}>
                                  <TableCell component="th" scope="row">
                                    {data}
                                  </TableCell>
                                  <TableCell>{row.harga[index]}00</TableCell>
                                  <TableCell align="right">
                                    {row.jumlah[index]}
                                  </TableCell>
                                </TableRow>
                              ) : null
                            )}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                ) : null}
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
