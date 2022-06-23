import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import Coin from "../../assets/images/coin-svgrepo-com.svg";
import Transactions from "./Transaction";
import AssetChart from "./AssetChart";
import WavesIcon from "@mui/icons-material/Waves";
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
      <Grid item xs={12} md={6} lg={3}>
        <Paper style={{ textAlign: "center", backgroundColor: "#c9facd" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <div><Avatar   alt="coin logo" /></div> */}
            <div>
              <h4>Welcome</h4>
              <Typography variant="h4">{user.username}</Typography>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper style={{ textAlign: "center", backgroundColor: "#d0f2fe" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <WavesIcon sx={{ width: "80px", height: "80px" }} />
              {/* <img style={{ width: "80px" }} src={TierLogo} alt="coin logo" /> */}
            </div>
            <div>
              <h4>Pool Level</h4>
              <Typography variant="h4">Tier 2</Typography>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper style={{ textAlign: "center", backgroundColor: "#fff8ce" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <img style={{ width: "80px" }} src={Coin} alt="coin logo" />
            </div>
            <div>
              <h4>Total Tokens</h4>
              <Typography variant="h4">4b</Typography>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper style={{ textAlign: "center", backgroundColor: "#ffe8d9" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <img
                style={{ width: "80px", cursor: "pointer" }}
                src={AddIcon}
                alt="coin logo"
                onClick={(e) => {
                  navigate("/create-token");
                }}
              />
            </div>
            <div>
              <h4>Create New</h4>
              <Typography component="p" variant="h4">
                Tokens
              </Typography>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3} sx={{ maxHeight: "70vh" }}>
        <Paper
          sx={{
            maxHeight: "100%",
            backgroundColor: "#18214c",
            overflowY: "scroll",
          }}
          className="hide-scrollbar"
        >
          <Typography
            style={{ textAlign: "center", color: "white" }}
            component="p"
            variant="h5"
          >
            Pending Tokens
          </Typography>
          {pendingToken.map((each, index) => (
            <PendingCoin each={each} index={index} key={index} />
          ))}
          {!pendingToken.length && (
            <Paper
              sx={{
                textAlign: "center",
                // backgroundColor: "#ffe8d9",
                mt: 5,
              }}
            >
              <h4>No Pending Token</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <img
                    style={{ width: "40px", cursor: "pointer" }}
                    src={AddIcon}
                    alt="coin logo"
                    onClick={(e) => {
                      navigate("/create-token");
                    }}
                  />
                </div>
                <div>
                  <h4>Create New</h4>
                </div>
              </div>
            </Paper>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={9}>
        <Paper sx={{ backgroundColor: "#18214c" }}>
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
      <Grid item xs={12} md={6} lg={4}>
        <Paper
          style={{
            textAlign: "center",
            backgroundColor: "#d0f2fe",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <img style={{ width: "80px" }} src={Coin} alt="coin logo" />
            </div>
            <div>
              <h4>Token Sold</h4>
              <Typography variant="h4">4b</Typography>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <Paper sx={{ backgroundColor: "#18214c" }}>
          <p style={{ textAlign: "center", color: "white" }}>Current Assets</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LineCharts user={user} />
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper
          style={{
            textAlign: "center",
            backgroundColor: "#ffe8d9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <img style={{ width: "80px" }} src={FundsIcon} alt="coin logo" />
            </div>
            <div>
              <h4>Total Assets</h4>
              <Typography variant="h4">400k</Typography>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper
          style={{
            textAlign: "center",
            backgroundColor: "#fff8ce",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <img style={{ width: "80px" }} src={InvestIcon} alt="coin logo" />
            </div>
            <div>
              <h4>Incoming Funds</h4>
              <Typography variant="h4">400k</Typography>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper
          style={{
            textAlign: "center",
            backgroundColor: "#d0f2fe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              {/* <PeopleAltIcon style={{ width: "80px", height: "80px" }} /> */}
              <img style={{ width: "80px" }} src={TokenIcon} alt="coin logo" />
            </div>
            <div>
              <h4>Total Sold Tokens</h4>
              <Typography variant="h4">400k</Typography>
            </div>
          </div>
        </Paper>
      </Grid>
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
