import React, { useEffect, useState } from "react";
import { makeStyles, createTheme, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Button,
  Grid,
  IconButton,
  TextField,
  useMediaQuery,
} from "@material-ui/core";
import { TypographyAtoms } from "../../../components/atoms";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { Fragment } from "react";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { baseUrl } from "../../../config/constant/Constant";

const useStyles = makeStyles((theme) => ({
  table: {
    // minWidth: 650,
    // width: "100vw",
    "& > *": {
      borderBottom: "unset",
    },
  },
  errorBtn: {
    backgroundColor: theme.palette.error.light,
    color: "white",
    fontSize: "10px",
  },
  succesBtn: {
    backgroundColor: theme.palette.success.light,
    color: "white",
    fontSize: "10px",
  },
}));

export default function RincianPesanan(props) {
  const classes = useStyles();
  const { dataUsers } = useSelector((state) => state);
  const [data, setData] = useState([]);
  const [transactionStatus, setTransactionStatus] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState([]);
  // const [statusPengiriman, setStatusPengiriman] = useState();

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
        setTransactionStatus([]);
        const data1 = result.data.data;
        console.log(`response => ${JSON.stringify(data1)}`);

        data1.map(async (res) => {
          if (res.metodePembayaran === "digital") {
            const res1 = await getStatusPembayaran(res.rincian);
            console.log(`res1=> ${JSON.stringify(res1.data.status)}`);
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

  const handledChange = (e, id, message) => {
    // setStatusPengiriman(e.target.value);
    console.log(`id ${id}`);
    const status =
      message === "Sudah Diterima" ? "Belum Diterima" : "Sudah Diterima";
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
    // <TableTesting />
    <TableContainer component={Paper} style={{ width: "97vw" }}>
      <Table className={classes.table} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="left">Nama Produk</TableCell>
            <TableCell align="left">Harga</TableCell>
            <TableCell align="left">Jumlah</TableCell>
            <TableCell align="left">Metode Pembayaran</TableCell>
            <Fragment>
              <TableCell align="left">Status Pembayaran</TableCell>
              <TableCell align="left">Status Pengiriman</TableCell>
              <TableCell align="left">Status Penerima</TableCell>
              <TableCell align="left">Alamat Pembeli</TableCell>
            </Fragment>
            <Fragment>
              <TableCell align="left">Total Harga (Rp.)</TableCell>
              <TableCell align="left" colSpan={3}>
                Status Pesanan
              </TableCell>
            </Fragment>
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

                <TableCell component="th">
                  {/* {row.namaProduk.map((res, index) => `[${index + 1}] ${res} `)} */}
                  {`${row.namaProduk[0]}`}
                  {row.namaProduk.length > 1 ? <p>...</p> : null}
                </TableCell>
                <TableCell component="th">
                  {`${row.harga[0]}`}00
                  {row.namaProduk.length > 1 ? <p>...</p> : null}
                  {/* {row.harga.map((res, index) => `[${index + 1}] ${res} `)} */}
                </TableCell>
                <TableCell align="left">
                  {`${row.jumlah[0]}`}
                  {row.namaProduk.length > 1 ? <p>...</p> : null}
                  {/* {row.jumlah.map((res, index) => `[${index + 1}] ${res} `)} */}
                </TableCell>
                <TableCell align="left">{row.metodePembayaran}</TableCell>
                <Fragment>
                  <TableCell align="left">{transactionStatus[index]}</TableCell>
                  <TableCell align="left">{row.statusPengiriman}</TableCell>
                  <TableCell align="left">{row.statusPenerima}</TableCell>
                  <TableCell align="left">{row.alamatPembeli}</TableCell>
                </Fragment>
                <Fragment>
                  <TableCell align="left">{row.rincian.gross_amount}</TableCell>
                  <TableCell align="left">
                    <TextField
                      id="filled-select-currency-native"
                      className={
                        row.statusPenerima === "Sudah Diterima"
                          ? classes.succesBtn
                          : classes.errorBtn
                      }
                      select
                      label="Status Penerima"
                      value={row.statusPenerima}
                      // defaultValue={row.statusPenerima === "Sudah Diterima" ? "Belum Diterima" : "Sudah Diterima"}
                      onChange={(e) =>
                        handledChange(e, row._id, row.statusPenerima)
                      }
                      SelectProps={{
                        native: true,
                      }}
                      variant="filled"
                      style={{
                        width: "160px",
                      }}
                      disabled={
                        row.statusPengiriman === "Sudah Terkirim" ? false : true
                      }
                    >
                      <option value={"Sudah Diterima"}>Sudah Diterima</option>
                      <option value={"Belum Diterima"}>Belum Diterima</option>
                    </TextField>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      style={{
                        margin: "8px",
                        background: "gray",
                        color: "white",
                        fontSize: "10px",
                      }}
                      onClick={() => deletePesanan(row._id)}
                    >
                      Batalkan Pesanan
                    </Button>
                  </TableCell>
                </Fragment>
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
                                  <TableCell>{row.harga[index]}.000</TableCell>
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
