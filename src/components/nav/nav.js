import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";

import {
  Alert,
  AppBar,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  LinearProgress,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "drak",
  border: "2px solid #000",
  boxShadow: 24,
  // pt: 2,
  // px: 4,
  // pb: 3,
  m: 0,
};
export default function Nav() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wallet = JSON.parse(
    localStorage.getItem("hootdex_secretcookie_wallet")
  );
  const [alert, setAlert] = useState({
    msg: "",
    type: "",
    loading: false,
  });
  const [email, setEmail] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const findUser = async () => {
    let data = localStorage.getItem("hootdex_secretcookie");
    if (data) {
      setUser(JSON.parse(data));
    }
  };
  useEffect(() => {
    findUser();
  }, []);
  const handleSubmit = () => {
    if (email) {
      setLoading(true);
      axios
        .get(`http://localhost:3001/hootdex/checkUser/${email}`)
        .then((res) => {
          setLoading(false);
          if (res.data.userFound) {
            localStorage.setItem(
              "hootdex_secretcookie_wallet",
              JSON.stringify(res.data)
            );
            setAlert({
              msg: "Wallet Connected!",
              type: "success",
              show: true,
            });
            setTimeout(() => {
              handleClose();
            }, 3000);
          } else {
            setAlert({
              msg: "No user found with this email!",
              type: "error",
              show: true,
            });
            setTimeout(() => {
              setAlert({
                msg: "No user found with this email!",
                type: "error",
                show: false,
              });
            }, 3000);
          }
        })
        .catch((err) => {
          setLoading(false);
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
    } else {
      setAlert({
        msg: "Enter your email!",
        type: "error",
        show: true,
      });
      setTimeout(() => {
        setAlert({
          msg: "Enter your email!",
          type: "error",
          show: false,
        });
      }, 3000);
    }
  };
  return (
    <>
      <div className="nav">
        <div className="left__nav">
          <Link to="/" className="logo__header">
            <img src={logo} alt="nav_logo" width={200} />
          </Link>
        </div>
        <div className="right__nav">
          <Link to="/wallet">
            {" "}
            <button className="button header-link">Ecosystem</button>
          </Link>
          <Link to="/Community">
            {" "}
            <button className="button header-link">Community</button>
          </Link>
          <Link to="/">
            {" "}
            <button className="button header-link">Tokens</button>
          </Link>
          <Link to="/Developers">
            {" "}
            <button className="button header-link">Developers</button>
          </Link>
          <Link to="/Blog">
            {" "}
            <button className="button header-link">Blog</button>
          </Link>
          <Link to="/Faq">
            {" "}
            <button className="button header-link">FAQ</button>
          </Link>
          {user && user.loggedIn ? (
            <>
              {JSON.parse(
                localStorage.getItem("hootdex_secretcookie_wallet")
              ) ? (
                <button
                  className="button"
                  onClick={() => {
                    localStorage.removeItem("hootdex_secretcookie_wallet");
                    // eslint-disable-next-line no-restricted-globals
                    location.reload();
                  }}
                >
                  Disconnect Wallet
                </button>
              ) : (
                <button className="button " onClick={handleOpen}>
                  Connect Wallet
                </button>
              )}
              <Link to="/dashboard">
                {" "}
                <button className="button ">Dashboard</button>
              </Link>
            </>
          ) : (
            <Link to="/login">
              {" "}
              <button className="button">Login</button>
            </Link>
          )}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {" "}
        <div style={{ backgroundColor: "black" }} className="border">
          <DialogTitle
            className="twhite tcenter fontS22"
            id="alert-dialog-title"
          >
            Connect your wallet
          </DialogTitle>
          <Divider sx={{ backgroundColor: "#091e17", height: "2px" }} />
          {loading && <LinearProgress />}
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
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <p style={{ color: "white", marginLeft: "15px" }}>Wallet Name</p>
              <input
                className="border inputfWW"
                type="text"
                name="walletName"
              />
            </DialogContentText>
            <DialogContentText id="alert-dialog-description" sx={{ mt: 1 }}>
              <p style={{ color: "white", marginLeft: "15px" }}>Email</p>
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
        </div>
      </Dialog>
    </>
  );
}
