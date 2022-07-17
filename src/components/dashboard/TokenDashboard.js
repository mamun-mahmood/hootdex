import React from 'react';
import { Box, } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import TokenList from '../Modal/TokenList';

const TokenDashboard = ({user, pecuCoins}) => {
    const navigate = useNavigate();
  const [tokenCreated, setTokenCreated] = React.useState([]);
  const [pendingToken, setPendingTokens] = React.useState([]);
  const [totalCoins, setTotalCoins] = React.useState("");
  const [totalValue, setTotalValue] = React.useState("");
  const [nftCount, setNftCount] = React.useState("");
  const [totalCoinsVault, setTotalCoinsVault] = React.useState("");
  const username = user.username;
  const wallet = JSON.parse(
    localStorage.getItem("hootdex_secretcookie_wallet")
  );
  const [modal, setModal] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    setOpen(true);
    setModal(e);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getMyCoins = (id) => {
    if (id) {
      axios
        .post(`${"https://api.pecunovus.net"}/wallet/getMycoins`, {
          user_id: id,
        })
        .then((res) => {
          const { total_coins, value } = res.data;
          setTotalCoins(total_coins);
          setTotalValue(value);
        });
    }
  };

  const getMyCoinsVault = (id) => {
    if (id) {
      axios
        .post(`${"https://api.pecunovus.net"}/vault/getCoins`, {
          uid: id,
        })
        .then((res) => {
          const { coin } = res.data;
          setTotalCoinsVault(coin);
        });
    }
  };

  const getNftCount = (email) => {
    if (email) {
      axios
        .post(`https://api.pecunovus.net/vault/getNftCount`, {
          email: email,
        })
        .then((res) => {
          const { nft } = res.data;
          setNftCount(nft);
        });
    }
  };
  useEffect(() => {
    if (username) {
      axios
        .get(`https://api.pecunovus.net/hootdex/token/${username}`)
        .then((res) => {
          setTokenCreated(res.data.reverse());
        });
      console.log(username);
      axios
        .get(
          `https://api.pecunovus.net/hootdex/token-buying-request/${username}`
        )
        .then((res) => {
          setPendingTokens(res.data);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (wallet && wallet.uid) {
      getMyCoins(wallet.uid);
    }
  }, [wallet]);

  useEffect(() => {
    let data = localStorage.getItem("hootdex_secretcookie");
    data = JSON.parse(data);
    if (data && data.user_id) {
      getMyCoinsVault(data.user_id);
      getNftCount(data.email);
    }
  });
  const [openD, setOpenD] = React.useState(false);
  const [tier, setTier] = React.useState(user.tier || 2);
  const toggleDrawer = () => {
    setOpenD(!openD);
  };
  const [tab, setTab] = React.useState(0);
    return (
        <Box
        className="rounded shadow"
        sx={{
          padding: 1,
          width: "95%",
          ml: "2.5%",
          mt: 3,
          mb: 1,
        }}
      >
        {" "}
        <h2
          style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}
        >
          Token Dashboard
        </h2>
        <Grid container spacing={5} sx={{ p: 1 }}>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              style={{
                textAlign: "center",
                backgroundColor: "grey",
                cursor: "pointer",
              }}
              onClick={() => handleOpen(2)}
              className="border"
            >
              <div
                style={{
                  color: "white",
                  wordWrap: "break-word",
                }}
              >
                <div
                  className="rounded center-width tUpper"
                  style={{ backgroundColor: "#01402b" }}
                >
                  <h3>Token Created</h3>
                </div>
                <p className="fontS22">{tokenCreated.length}</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              style={{
                textAlign: "center",
                backgroundColor: "grey",
                cursor: "pointer",
              }}
              className="border"
              onClick={() => wallet?.uid && navigate("/create-token")}
            >
              <div
                style={{
                  color: "white",
                  wordWrap: "break-word",
                }}
              >
                <div
                  className="rounded center-width tUpper"
                  style={{ backgroundColor: "#01402b" }}
                >
                  <h3>Create New Token</h3>
                </div>
                <p className="fontS22 tlower">
                  {!wallet?.uid ? "Wallet Disconnected" : "Token"}
                </p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              style={{
                textAlign: "center",
                backgroundColor: "grey",
                cursor: "pointer",
              }}
              onClick={() => handleOpen(1)}
              className="border"
            >
              <div
                style={{
                  color: "white",
                  wordWrap: "break-word",
                }}
              >
                <div
                  className="rounded center-width tUpper"
                  style={{ backgroundColor: "#01402b" }}
                >
                  <h3>Token Buying Request</h3>
                </div>
                <p className="fontS22">{pendingToken.length}</p>
              </div>
            </Paper>
          </Grid>
        </Grid>
        {modal === 1 && (
            <TokenList
              modal={1}
              tokens={pendingToken}
              handleClose={handleClose}
              open={open}
            />
          )}
          {modal === 2 && (
            <TokenList
              modal={2}
              tokens={tokenCreated}
              handleClose={handleClose}
              open={open}
            />
          )}
      </Box>
    );
};

export default TokenDashboard;