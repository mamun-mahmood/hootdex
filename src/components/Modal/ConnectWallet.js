import React, { useState } from "react";

import {
  Box,
  Dialog,
  Alert,
  Button,
  Collapse,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
const ConnectWallet = ({ fetchWallet, wallet, setOpen, open }) => {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState({
    msg: "",
    type: "",
    loading: false,
  });
  const [email, setEmail] = useState("");
  const handleClose = () => {
    setOpen(false);
    setShowForm(false);
  };
  const availableWallet = [
    {
      name: "PecuNovus",
      icon: "https://pecunovus.net/static/media/icon.25c8ec299d961b9dd524.ico",
    },
    {
      name: "MetaMask",
      icon:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png",
    },
    {
      name: "Coinbase Wallet",
      icon:
        "https://www.yadawallets.com/wp-content/uploads/2020/11/Coinbase-dapp-wallet-logo.png",
    },
    {
      name: "WalletConnect",
      icon:
        "https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png",
    },
    {
      name: "Fortmatic",
      icon:
        "https://media.glassdoor.com/sqll/3204214/fortmatic-squarelogo-1582267622143.png",
    },
  ];
  const handleSubmit = () => {
    if (email) {
      setLoading(true);
      axios
        .post(`http://localhost:3001/hootdex/connect-wallet`, {
          private_key: email,
        })
        .then((res) => {
          setLoading(false);
          if (res.data) {
            localStorage.setItem(
              "hootdex_secretcookie_wallet",
              JSON.stringify(res.data)
            );
            fetchWallet();
            setAlert({
              msg: "Wallet Connected!",
              type: "success",
              show: true,
            });
            setTimeout(() => {
              handleClose();
              setAlert({
                msg: "Wallet Connected!",
                type: "success",
                show: false,
              });
            }, 1000);
          } else {
            setAlert({
              msg: "No account found with this key!",
              type: "error",
              show: true,
            });
            setTimeout(() => {
              setAlert({
                msg: "No account found with this key!",
                type: "error",
                show: false,
              });
            }, 3000);
          }
        })
        .catch((err) => {
          setLoading(false);
          setAlert({
            msg: "No account found with this key!",
            type: "error",
            show: true,
          });
          setTimeout(() => {
            setAlert({
              msg: "No account found with this key!",
              type: "error",
              show: false,
            });
          }, 3000);
        });
    } else {
      setAlert({
        msg: "Enter your private key!",
        type: "error",
        show: true,
      });
      setTimeout(() => {
        setAlert({
          msg: "Enter your private key!",
          type: "error",
          show: false,
        });
      }, 3000);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <Box
          sx={{
            width: 400,
            p: 2,
            borderRadius: "1rem",
            backgroundColor: "#091e17",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p style={{ fontWeight: "600", color: "white", fontSize: "18px" }}>
              Connect a wallet
            </p>
            <p>
              <CloseIcon
                sx={{ color: "white", cursor: "pointer" }}
                onClick={handleClose}
              />
            </p>
          </div>
          <div>
            <Dialog
              open={showForm}
              PaperProps={{
                style: {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
              }}
              className="border"
              onClose={() => setShowForm(false)}
            >
              <Box
                sx={{
                  width: 400,
                  p: 2,
                  borderRadius: "1rem",
                  backgroundColor: "#040b1e",
                }}
              >
                <div
                  className="twhite tcenter fontS22"
                  id="alert-dialog-title"
                  style={{display: "flex", justifyContent: "center", margin: '2px'}}
                >
                  PecuNovus
                  <img style={{width: "30px", marginLeft: "1rem"}} src="https://pecunovus.net/static/media/icon.25c8ec299d961b9dd524.ico" alt="" />
                </div>
                <Divider sx={{ backgroundColor: "#091e17", height: "2px" }} />
                {loading && <LinearProgress />}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Collapse
                    in={alert.show}
                    sx={{ maxWidth: 400, position: "fixed" }}
                  >
                    <Alert
                      variant="outlined"
                      severity={alert.type}
                      sx={{
                        mb: 2,
                        backgroundColor: "white",
                        fontSize: "18px",
                      }}
                    >
                      {alert.msg}
                    </Alert>
                  </Collapse>
                </div>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <p style={{ color: "white", marginLeft: "15px" }}>
                      Wallet Name
                    </p>
                    <input
                      className="border inputfWW"
                      type="text"
                      name="walletName"
                    />
                  </DialogContentText>
                  <DialogContentText
                    id="alert-dialog-description"
                    sx={{ mt: 1 }}
                  >
                    <p style={{ color: "white", marginLeft: "15px" }}>
                      Private Key
                    </p>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      className="border inputfWW"
                      type="text"
                      name="email"
                      required
                    />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    className="border"
                    sx={{ color: "white" }}
                    onClick={handleSubmit}
                    autoFocus
                  >
                    Connect
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>
            {availableWallet.map((e) => (
              <div
                className="wallet"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#edeef2",
                  padding: "1rem",
                  margin: "0.7rem",
                  borderRadius: "1rem",
                  border: "1px solid grey",
                  cursor: "pointer",
                  opacity: "0.8"
                }}
                onClick={() => {
                  if (e.name === "PecuNovus") {
                    setShowForm(true);
                  }
                }}
              >
                <p style={{ fontWeight: "600" }}>{e.name}</p>
                <img
                  style={{ width: "30px" }}
                  src={`${e.icon}`}
                  alt="wallet icon"
                />
              </div>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#edeef2",
                padding: "1rem",
                margin: "0.7rem",
                borderRadius: "1rem",
                cursor: "pointer",
                opacity: "0.6"
              }}
            >
              <p style={{ fontSize: "10px", fontWeight: "600" }}>
                By connecting a wallet, you agree to MegaHoot’{" "}
                <span
                  style={{
                    textDecoration: "underline",
                    color: "#002945",
                    fontWeight: "700",
                  }}
                >
                  Terms of Service
                </span>{" "}
                and acknowledge that you have read and understand the Hootdex{" "}
                <span
                  style={{
                    textDecoration: "underline",
                    color: "#002945",
                    fontWeight: "700",
                  }}
                >
                  Legal Disclaimer
                </span>
                .
              </p>
            </div>
          </div>
        </Box>
      </Dialog>
    </>
  );
};

export default ConnectWallet;
