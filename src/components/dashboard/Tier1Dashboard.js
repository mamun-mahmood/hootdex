import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import AssetChart from "./AssetChart";
import { Box } from "@mui/system";
import TokenRequest from "../Modal/TokenRequest";
import axios from "axios";

function DashboardContent({ user }) {
  const [pendingToken, setPendingToken] = React.useState([]);
  const username = user.username;
  React.useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:5000/pending-token/${username}`)
        .then((res) => {
          setPendingToken(res.data.reverse());
          console.log(res.data);
        });
    }
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
        <Grid container spacing={5} sx={{ textTransform: "uppercase", p: 5 }}>
          <Grid item xs={12} md={6} lg={3} mt={5}>
            {/* dashboard left */}
            <Grid sx={{ mt: 3 }}>
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
                    <h3>Total Tokens</h3>
                  </div>
                  <p className="fontS22">54546</p>
                </div>
              </Paper>
            </Grid>
            <Grid sx={{ mt: 3 }}>
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
                    <h3>Total Value</h3>
                  </div>
                  <p className="fontS22">54546</p>
                </div>
              </Paper>
            </Grid>
            <Grid sx={{ mt: 3 }}>
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
                    <h3>Total Coin</h3>
                  </div>
                  <p className="fontS22">54546</p>
                </div>
              </Paper>
            </Grid>
          </Grid>
          {/* dashboard middle */}
          <Grid item xs={12} md={8} lg={6}>
            <Paper
              sx={{
                backgroundColor: "#00071a",
              }}
              className="border"
            >
              <Typography
                sx={{ textAlign: "center", color: "white", mt: 1 }}
                component="p"
                variant="h5"
              >
                My Total Asset
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <AssetChart user={user} />
              </div>
            </Paper>
          </Grid>
          {/* dashboard right */}
          <Grid item xs={12} md={8} lg={3} mt={5}>
            <Grid sx={{ mt: 3 }}>
              <Paper
                sx={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
                  maxHeight: '50vh',
                  overflowY: 'scroll'
                }}
                className="border hide-scrollbar"
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
                    <h3>Token Request</h3>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  <small>Name</small>
                  <small>Amount</small>
                  <small>Status</small>
                </div>
                {pendingToken.map((each, index) => (
                  <TokenRequest each={each} index={index} key={index} />
                ))}
              </Paper>
            </Grid>
            <Grid sx={{ mt: 3 }}></Grid>
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
                  <h3>Total XMG</h3>
                </div>
                <p className="fontS22">54546</p>
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
                  <h3>Total Pecu Coin</h3>
                </div>
                <p className="fontS22">65746554546</p>
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
    </>
  );
}

export default function Tier1Dashboard({ user }) {
  return <DashboardContent user={user} />;
}
