import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box, Paper } from "@mui/material";
import AssetChart from "./AssetChart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import TokenList from "../Modal/TokenList";

function DashboardContent({ user, pecuCoins }) {
  const navigate = useNavigate();
  const [tokenCreated, setTokenCreated] = React.useState([]);
  const [pendingToken, setPendingTokens] = React.useState([]);
  const username = user.username;
  const wallet = JSON.parse(
    localStorage.getItem("hootdex_secretcookie_wallet")
  );
  const [modal, setModal] = React.useState(0)
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    setOpen(true);
    setModal(e)
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (username) {
      axios
        .get(`https://api.pecunovus.net/hootdex/token/${username}`)
        .then((res) => {
          setTokenCreated(res.data.reverse());
          setPendingTokens(res.data.filter(e => e.status === "Pending"))
          console.log(res.data);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);
  return (
    <>
      <Box
        className="rounded shadow"
        sx={{
          padding: 1,
          width: "95%",
          ml: "2.5%",
          mt: 1,
          backgroundColor: "black",
          pb: 2,
        }}
      >
        <Grid container spacing={5} sx={{ textTransform: "uppercase", p: 10 }}>
            <Grid item xs={12} md={6} lg={4}>
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
                    <h3>Pecu Coins</h3>
                  </div>
                  <p className="fontS22 tlower">
                    {wallet?.userFound
                      ? pecuCoins?.coin
                      : "Wallet Disconnected"}
                  </p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper
                style={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
                }}
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
                    style={{ backgroundColor: "#002945" }}
                  >
                    <h3>Token Purchased</h3>
                  </div>
                  <p className="fontS22">0</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper
                style={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
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
                    style={{ backgroundColor: "#002945" }}
                  >
                    <h3>Token Pending</h3>
                  </div>
                  <p className="fontS22">{pendingToken.length}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper
                style={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
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
                    style={{ backgroundColor: "#002945" }}
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
                  backgroundColor: "#00071a",
                  cursor: "pointer",
                }}
                className="border"
                onClick={() => wallet?.userFound && navigate("/create-token")}
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
                    <h3>Create New</h3>
                  </div>
                  <p className="fontS22 tlower">{!wallet?.userFound ? "Wallet Disconnected" : "Token"}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper
                style={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
                }}
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
                    style={{ backgroundColor: "#002945" }}
                  >
                    <h3>Buy Tokens</h3>
                  </div>
                  <p className="fontS22">{"< >"} </p>
                </div>
              </Paper>
            </Grid>
        </Grid>
      </Box>
      {/* second row */}
      <Box
        className="rounded shadow"
        sx={{
          padding: 1,
          width: "95%",
          ml: "2.5%",
          mt: 3,
          backgroundColor: "black",
          mb: 1,
        }}
      >
        <Grid container spacing={5} sx={{ p: 1 }}>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <Paper
              style={{
                textAlign: "center",
                backgroundColor: "#00071a",
              }}
              className="border "
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
                  <h3>Current Balance</h3>
                </div>
                <p className="fontS22">$ 4546</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <Paper
              style={{
                textAlign: "center",
                backgroundColor: "#00071a",
              }}
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
                  style={{ backgroundColor: "#002945" }}
                >
                  <h3>Current Balance</h3>
                </div>
                <p className="fontS22">$ 4546</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <Paper
              style={{
                textAlign: "center",
                backgroundColor: "#00071a",
              }}
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
                  style={{ backgroundColor: "#002945" }}
                >
                  <h3>Current Balance</h3>
                </div>
                <p className="fontS22">$ 4546</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <Paper
              style={{
                textAlign: "center",
                backgroundColor: "#00071a",
              }}
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
                  style={{ backgroundColor: "#002945" }}
                >
                  <h3>Current Balance</h3>
                </div>
                <p className="fontS22">$ 4546</p>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      {modal === 1 && <TokenList modal={1} tokens={pendingToken} handleClose={handleClose} open={open} />}
      {modal === 2 && <TokenList modal={2} tokens={tokenCreated} handleClose={handleClose} open={open} />}
    </>
  );
}

export default function Tier2Dashboard({ user, pecuCoins }) {
  return <DashboardContent user={user} pecuCoins={pecuCoins} />;
}
