import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import {
  Alert,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import ConnectWallet from "../Modal/ConnectWallet";
export default function Nav({fetchWallet, wallet}) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
            }, 2000);
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
                    fetchWallet();
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
      <ConnectWallet setOpen={setOpen} open={open} fetchWallet={fetchWallet} wallet={wallet} />
    </>
  );
}
