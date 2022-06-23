import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box, Paper } from "@mui/material";
import AssetChart from "./AssetChart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function DashboardContent({ user }) {
  const navigate = useNavigate();
  const [pendingToken, setPendingToken] = React.useState([]);
  const username = user.username;
  useEffect(() => {
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
          <Grid item xs={12} md={6} lg={3} sx={{mt: 7}}>
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
                    <h3>Token Sold</h3>
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
                    <h3>Total Asset</h3>
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
                borderTop: "1px solid #fff",
              }}
              className="border"
            >
              <Typography
                sx={{ textAlign: "center", color: "white", mt: 1}}
                component="p"
                variant="h5"
              >
                Token Price
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
          <Grid item xs={12} md={8} lg={3} sx={{mt: 7}}>
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
                    <h3>Pending Tokens</h3>
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
                    <h3>Create New</h3>
                  </div>
                  <p className="fontS22">Token</p>
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
                    <h3>Incoming Funds</h3>
                  </div>
                  <p className="fontS22">$ 546</p>
                </div>
              </Paper>
            </Grid>
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
          mb: 1
        }}
      >
        <Grid container spacing={5} sx={{ p: 1, }}>
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
    </>
  );
}

export default function Tier2Dashboard({ user }) {
  return <DashboardContent user={user} />;
}
