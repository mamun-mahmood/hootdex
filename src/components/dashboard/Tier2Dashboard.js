import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import Coin from "../../assets/images/coin-svgrepo-com.svg";
import Transactions from "./Transaction";
import AssetChart from "./AssetChart";
import InvAssetChart from "./InvAssetChart";
import WavesIcon from "@mui/icons-material/Waves";
import LineCharts from "./LineChart";
import TokenIcon from "../../assets/images/tokens-svgrepo-com.svg";
import InvestIcon from "../../assets/images/investment-svgrepo-com.svg";
import FundsIcon from "../../assets/images/funds-svgrepo-com.svg";
import AddIcon from "../../assets/images/add-svgrepo-com.svg";

function DashboardContent({ user }) {
  return (
    <Box
      component="main"
      sx={{
        padding: 1,
      }}
    >
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
        <Grid item xs={4}>
          <Paper
            sx={{
              backgroundColor: "#18214c",
            }}
          >
            <Typography
              style={{ textAlign: "center", color: "white" }}
              component="p"
              variant="h5"
            >
              Available Tokens
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <InvAssetChart user={user} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={8}>
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
        <Grid item xs={4}>
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
        <Grid item xs={8}>
          <Paper sx={{ backgroundColor: "#18214c" }}>
            <p style={{ textAlign: "center", color: "white" }}>
              Current Assets
            </p>
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
        <Grid item xs={4}>
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
                <img
                  style={{ width: "80px" }}
                  src={FundsIcon}
                  alt="coin logo"
                />
              </div>
              <div>
                <h4>Total Assets</h4>
                <Typography variant="h4">400k</Typography>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
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
                <img
                  style={{ width: "80px" }}
                  src={InvestIcon}
                  alt="coin logo"
                />
              </div>
              <div>
                <h4>Make New Investment</h4>
                <Typography variant="h4">400k</Typography>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
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
                <img
                  style={{ width: "80px" }}
                  src={TokenIcon}
                  alt="coin logo"
                />
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
    </Box>
  );
}

export default function Tier2Dashboard({ user }) {
  return <DashboardContent user={user} />;
}
