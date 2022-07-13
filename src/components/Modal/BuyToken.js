import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
  Alert,
  Collapse,
  Grid,
  IconButton,
  Paper,
  StepConnector,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { useEffect, useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "drak",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function BuyToken({ each, user, pecuCoins }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [totalToken, setTotalToken] = useState(0)
  const inputData = {
    createdBy: user?.username,
    tokenName: each.tokenName,
    investementAmount: each?.investementAmount,
    pecuCoin: each.pecuCoin,
    tokenPrice: each.tokenPrice,
    status: "Pending",
    tokenSymbol: each?.tokenSymbol,
    fileName: each.logo_src,
    approvedBy: each.approvedBy
  };
  const handleChange = (e) => {
    // setInputData({ ...inputData, [e.target.name]: e.target.value });
    // let changeData = { ...inputData };
    // let name = e.target.name;
    // let value = e.target.value;
    // changeData[name] = value;
    // setInputData(changeData);
    setTotalToken(e.target.value)
  };
  const [alert, setAlert] = useState({
    msg: "",
    type: "",
    loading: false,
  });
  const handleSubmit = (e) => {

    // if ( totalToken > 0 && pecuCoins?.coin >= inputData.pecuCoin) {
      axios
        .post("https://api.pecunovus.net/hootdex/buy-tokens", {
          userName: user.username,
          totalToken: totalToken,
          inputData: inputData,
          bTime: new Date(),
        })
        .then((res) => {
          if (res.data.status === "error") {
            setAlert({
              msg: res.data.msg,
              type: "error",
              show: true,
            });
            setTimeout(() => {
              setAlert({
                msg: res.data.msg,
                type: "error",
                show: false,
              });
            }, 4000);
          }
          if (res.data.affectedRows > 0) {
            window.scrollTo(0, 0);
            setAlert({
              msg: "Token Purchased!",
              type: "success",
              show: true,
            });
            setTimeout(() => {
              setAlert({
                msg: "Token Purchased!",
                type: "success",
                show: false,
              });
            }, 3000);
          }
        })
        .catch((err) => {
          setAlert({
            msg: "There was an error!",
            type: "error",
            show: true,
          });
          setTimeout(() => {
            setAlert({
              msg: "There was an error!",
              type: "error",
              show: false,
            });
          }, 3000);
        });
    // } else {
    //   setAlert({
    //     msg: "You don't have enough Pecu coin!",
    //     type: "error",
    //     show: true,
    //   });
    //   setTimeout(() => {
    //     setAlert({
    //       msg: "You don't have enough Pecu coin!",
    //       type: "error",
    //       show: false,
    //     });
    //   }, 3000);
    // }
  };
  return (
    <>
      <span onClick={handleOpen} className="heading-btn">
        Buy
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          className="border"
          sx={{ ...style, width: 800, backdropFilter: "blur(5px)" }}
        >
          <h2 className="twhite tcenter">Buy Token</h2>
          <StepConnector />
          <Box sx={{ mt: 2, position: "fixed", zIndex: 1000, top: 0 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Collapse in={alert.show} sx={{ maxWidth: 400, position: "fixed" }}>
            <Alert
              variant="outlined"
              severity={alert.type}
              sx={{ mb: 2, backgroundColor: "white", fontSize: "18px" }}
            >
              {alert.msg}
            </Alert>
          </Collapse>
        </div>
      </Box>
          <Grid container spacing={5}>
            <Grid item xs={6} md={4} sx={{ mt: 3 }}>
              <Paper
                style={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
                }}
                className="border tShadow"
              >
                <div
                  style={{
                    color: "white",
                    wordWrap: "break-word",
                  }}
                >
                  <div
                    className="rounded center-width tUpper"
                    style={{ backgroundColor: "#002945" }}
                  >
                    <h3>Name</h3>
                  </div>
                  <p className="fontS22">{each?.tokenName}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} md={4} sx={{ mt: 3 }}>
              <Paper
                style={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
                }}
                className="border tShadow"
              >
                <div
                  style={{
                    color: "white",
                    wordWrap: "break-word",
                  }}
                >
                  <div
                    className="rounded center-width tUpper"
                    style={{ backgroundColor: "#002945" }}
                  >
                    <h3>Available</h3>
                  </div>
                  <p className="fontS22">{each?.totalToken}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} md={4} sx={{ mt: 3 }}>
              <Paper
                style={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
                }}
                className="border tShadow"
              >
                <div
                  style={{
                    color: "white",
                    wordWrap: "break-word",
                  }}
                >
                  <div
                    className="rounded center-width tUpper"
                    style={{ backgroundColor: "#002945" }}
                  >
                    <h3>Price</h3>
                  </div>
                  <p className="fontS22">{each?.tokenPrice}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} md={4} sx={{ mt: 3 }}>
              <Paper
                style={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
                }}
                className="border tShadow"
              >
                <div
                  style={{
                    color: "white",
                    wordWrap: "break-word",
                  }}
                >
                  <div
                    className="rounded center-width tUpper"
                    style={{ backgroundColor: "#002945" }}
                  >
                    <h3>Value (USD)</h3>
                  </div>
                  <p className="fontS22">$ {each?.investementAmount}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} md={4} sx={{ mt: 3 }}>
              <Paper
                style={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
                }}
                className="border tShadow"
              >
                <div
                  style={{
                    color: "white",
                    wordWrap: "break-word",
                  }}
                >
                  <div
                    className="rounded center-width tUpper"
                    style={{ backgroundColor: "#002945" }}
                  >
                    <h3>Select Amount </h3>
                  </div>
                  <p className="fontS22">
                    <input
                      className="tcenter"
                      style={{
                        width: "3rem",
                      }}
                      type="number"
                      onChange={handleChange}
                      name="totalToken"
                    />
                  </p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} md={4} sx={{ mt: 3 }}>
              <Paper
                style={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
                }}
                className="border tShadow"
              >
                <div
                  style={{
                    color: "white",
                    wordWrap: "break-word",
                  }}
                >
                  <div
                    className="rounded center-width tUpper"
                    style={{ backgroundColor: "#002945" }}
                  >
                    <h3>Pecu Coin (EQ)</h3>
                  </div>
                  <p className="fontS22">{each?.pecuCoin}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={handleSubmit}
                  className="border"
                  variant="contained"
                  sx={{ color: "white", backgroundColor: "#00071a" }}
                >
                  Buy
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
