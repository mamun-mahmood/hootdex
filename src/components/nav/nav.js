import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import ConnectWallet from "../Modal/ConnectWallet";
import { Button, div } from "@mui/material";
export default function Nav({ fetchWallet, wallet }) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const findUser = async () => {
    let data = localStorage.getItem("hootdex_secretcookie");
    if (data) {
      setUser(JSON.parse(data));
    }
  };
  const location = useLocation();
  useEffect(() => {
    setUser(null);
    findUser();
  }, [location]);

  useEffect(() => {
    findUser();
  }, []);
  const [searchKey, setSearchKey] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (searchKey) {
    //   fetchToken(searchKey);
    // } else fetchToken("all");
  };
  return (
    <>
      <div container spacing={1} className="nav">
        <div item sm={6} md={6} lg={2} className="">
          <Link to="/" className="logo__header">
            <img src={logo} alt="nav_logo" width={200} />
          </Link>
        </div>
        <div item sm={6} md={6} lg={2} sx={{ textAlign: "end" }}>
          <Link to="/wallet">
            {" "}
            <Button
              variant="outlined"
              sx={{
                color: "white",
                textTransform: "capitalize",
                m: 1,
              }}
            >
              Ecosystem
            </Button>
          </Link>
          <Link to="/Community">
            {" "}
            <Button
              variant="outlined"
              sx={{
                color: "white",
                textTransform: "capitalize",
                m: 1,
              }}
            >
              Community
            </Button>
          </Link>
        </div>
        <div item xs={12} md={6} lg={4}>
          <form
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
            className="form-control"
            onSubmit={handleSubmit}
          >
            <input
              style={{
                width: "100%",
                height: "0.8rem",
              }}
              className="border inputField"
              type="text"
              placeholder="Search for token..."
              name="searchKey"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </form>
        </div>
        <div item xs={6} md={6} lg={2}>
          {true ? (
            <>
              {JSON.parse(
                localStorage.getItem("hootdex_secretcookie_wallet")
              ) ? (
                <Link to="">
                  <Button
                    variant="outlined"
                    sx={{
                      color: "white",
                      textTransform: "capitalize",
                    }}
                    onClick={() => {
                      localStorage.removeItem("hootdex_secretcookie_wallet");
                      fetchWallet();
                    }}
                  >
                    Disconnect Wallet
                  </Button>
                </Link>
              ) : (
                <Link to="">
                  <Button
                    variant="outlined"
                    sx={{
                      color: "white",
                      textTransform: "capitalize",
                    }}
                    onClick={handleOpen}
                  >
                    Connect Wallet
                  </Button>
                </Link>
              )}
              <Link to="/">
                {" "}
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    textTransform: "capitalize",
                    m: 1,
                  }}
                >
                  Tokens
                </Button>
              </Link>
              <Link to="/dashboard">
                {" "}
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    textTransform: "capitalize",
                    m: 1,
                  }}
                >
                  MVault
                </Button>
              </Link>
              <Link to="/Developers">
                {" "}
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    textTransform: "capitalize",
                    m: 1,
                  }}
                >
                  Developers
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/login">
              {" "}
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  textTransform: "capitalize",
                  m: 1,
                }}
              >
                Login
              </Button>
            </Link>
          )}
        </div>
        {/* < className="">
        <Link to="/wallet">
            {" "}
            <Button
              variant="outlined"
              sx={{
                color: "white",
                textTransform: "capitalize",
                m: 1,
              }}
            >
              Ecosystem
            </Button>
          </Link>
          <Link to="/Community">
            {" "}
            <Button
              variant="outlined"
              sx={{
                color: "white",
                textTransform: "capitalize",
                m: 1,
              }}
            >
              Community
            </Button>
          </Link>
          <Link to="/">
            {" "}
            <Button
              variant="outlined"
              sx={{
                color: "white",
                textTransform: "capitalize",
                m: 1,
              }}
            >
              Tokens
            </Button>
          </Link>
          <Link to="/Developers">
            {" "}
            <Button
              variant="outlined"
              sx={{
                color: "white",
                textTransform: "capitalize",
                m: 1,
              }}
            >
              Developers
            </Button>
          </Link>
          <Link to="/Blog">
            {" "}
            <Button
              variant="outlined"
              sx={{
                color: "white",
                textTransform: "capitalize",
                m: 1,
              }}
            >
              Blog
            </Button>
          </Link>
          <Link to="/Faq">
            {" "}
            <Button
              variant="outlined"
              sx={{
                color: "white",
                textTransform: "capitalize",
                m: 1,
              }}
            >
              FAQ
            </Button>
          </Link>
         
        </div> */}
      </div>
      <ConnectWallet
        setOpen={setOpen}
        open={open}
        fetchWallet={fetchWallet}
        wallet={wallet}
      />
    </>
  );
}
