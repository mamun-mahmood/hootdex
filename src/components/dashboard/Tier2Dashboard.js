import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box, Paper } from "@mui/material";
import Transactions from "./Transaction";
import AssetChart from "./AssetChart";
import LineCharts from "./LineChart";
import TokenIcon from "../../assets/images/tokens-svgrepo-com.svg";
import InvestIcon from "../../assets/images/investment-svgrepo-com.svg";
import FundsIcon from "../../assets/images/funds-svgrepo-com.svg";
import AddIcon from "../../assets/images/add-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import PendingCoin from "../Modal/PendingCoin";
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
    <Grid container spacing={1}>
      {/* dashboard left 1st road */}
      <Grid item xs={12} md={3} lg={3}>
        <Grid sx={{ mt: 3 }}>
          <Paper
            style={{
              textAlign: "center",
              backgroundColor: "#00071a",
              borderTop: "1px solid #fff",
              borderLeft: "1px solid #fff",
              borderBottom: "3px solid #fff",
              borderRight: "3px solid #fff",
            }}
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
              borderTop: "1px solid #fff",
              borderLeft: "1px solid #fff",
              borderBottom: "3px solid #fff",
              borderRight: "3px solid #fff",
            }}
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
              <p className="fontS22">4b</p>
            </div>
          </Paper>
        </Grid>
        <Grid sx={{ mt: 3 }}>
          <Paper
            style={{
              textAlign: "center",
              backgroundColor: "#00071a",
              borderTop: "1px solid #fff",
              borderLeft: "1px solid #fff",
              borderBottom: "3px solid #fff",
              borderRight: "3px solid #fff",
            }}
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
              <p className="fontS22">$ 45656</p>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            backgroundColor: "#00071a",
            borderTop: "1px solid #fff",
            borderLeft: "1px solid #fff",
            borderBottom: "3px solid #fff",
            borderRight: "3px solid #fff",
          }}
        >
          <Typography
            style={{ textAlign: "center", color: "white" }}
            component="p"
            variant="h5"
          >
            Current Token Price
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
      {/* first row right */}
      <Grid item xs={12} md={3} lg={3}>
        <Grid sx={{ mt: 3 }}>
          <Paper
            style={{
              textAlign: "center",
              backgroundColor: "#00071a",
              borderTop: "1px solid #fff",
              borderLeft: "1px solid #fff",
              borderBottom: "3px solid #fff",
              borderRight: "3px solid #fff",
            }}
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
              <p className="fontS22">
                {!pendingToken.length && "No Pending Token"}
              </p>
            </div>
          </Paper>
        </Grid>
        <Grid sx={{ mt: 3 }}>
          <Paper
            style={{
              textAlign: "center",
              backgroundColor: "#00071a",
              borderTop: "1px solid #fff",
              borderLeft: "1px solid #fff",
              borderBottom: "3px solid #fff",
              borderRight: "3px solid #fff",
            }}
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
              <p
                className="fontS22"
                onClick={(e) => {
                  navigate("/create-token");
                }}
              >
                Tokens
              </p>
            </div>
          </Paper>
        </Grid>
        <Grid sx={{ mt: 3 }}>
          <Paper
            style={{
              textAlign: "center",
              backgroundColor: "#00071a",
              borderTop: "1px solid #fff",
              borderLeft: "1px solid #fff",
              borderBottom: "3px solid #fff",
              borderRight: "3px solid #fff",
            }}
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
                <h4>Incoming Funds</h4>
              </div>
              <p className="fontS22">$ 524574</p>
            </div>
          </Paper>
        </Grid>
      </Grid>
      {/* third row */}
      <Box
        className="rounded"
        sx={{
          width: "97%",
          marginLeft: "1.2%",
          backgroundColor: "#091e17",
          mt: 4,
          p: 1,
        }}
      >
        <Grid container spacing={1}>
          <Grid item sx={6} md={2}>
            <Paper
              style={{
                textAlign: "center",
                backgroundColor: "#00071a",
                borderTop: "1px solid #fff",
                borderLeft: "1px solid #fff",
                borderBottom: "3px solid #fff",
                borderRight: "3px solid #fff",
              }}
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
                  <h4>Incoming Funds</h4>
                </div>
                <p className="fontS22">$ 524574</p>
              </div>
            </Paper>
          </Grid>
          <Grid item sx={6} md={2}>
            <Paper
              style={{
                textAlign: "center",
                backgroundColor: "#00071a",
                borderTop: "1px solid #fff",
                borderLeft: "1px solid #fff",
                borderBottom: "3px solid #fff",
                borderRight: "3px solid #fff",
              }}
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
                  <h4>Incoming Funds</h4>
                </div>
                <p className="fontS22">$ 524574</p>
              </div>
            </Paper>
          </Grid>
          <Grid item sx={6} md={2}>
            <Paper
              style={{
                textAlign: "center",
                backgroundColor: "#00071a",
                borderTop: "1px solid #fff",
                borderLeft: "1px solid #fff",
                borderBottom: "3px solid #fff",
                borderRight: "3px solid #fff",
              }}
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
                  <h4>Transactions</h4>
                </div>
                <p className="fontS22">View all</p>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Grid item xs={12}>
        <Paper sx={{ width: "100%", backgroundColor: "#3f4c66" }}>
          <Transactions />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default function Tier2Dashboard({ user }) {
  return <DashboardContent user={user} />;
}
