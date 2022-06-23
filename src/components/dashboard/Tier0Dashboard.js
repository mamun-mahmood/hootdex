import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import Piechart from "../../components/dashboard/PieChart";
import Transactions from "../../components/dashboard/Transaction";
import AssetChart from "../../components/dashboard/AssetChart";
import InvAssetChart from "../../components/dashboard/InvAssetChart";
import WavesIcon from "@mui/icons-material/Waves";
import LineCharts from "../../components/dashboard/LineChart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

function DashboardContent({ user }) {
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
              <Typography variant="h4">Tier 0</Typography>
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
              {/* <img style={{ width: "80px" }} src={Coin} alt="coin logo" /> */}
            </div>
            <div>
              <h4>Total Coins</h4>
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
              {/* <img style={{ width: "80px" }} src={XMG} alt="coin logo" /> */}
            </div>
            <div>
              <h4>Total XMG</h4>
              <Typography component="p" variant="h4">
                4b
              </Typography>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
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
            Invested Assets
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
            Total Assets
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
              {/* <img style={{ width: "80px" }} src={Coin} alt="coin logo" /> */}
            </div>
            <div>
              <h4>Total Pecu Coins</h4>
              <Typography variant="h4">4b</Typography>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={{ backgroundColor: "#18214c" }}>
          <p style={{ textAlign: "center", color: "white" }}>Pecu Price</p>
          <LineCharts user={user} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Piechart user={user} />
        </div>
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
              <PeopleAltIcon style={{ width: "80px", height: "80px" }} />
              {/* <img style={{ width: "80px" }} src={Coin} alt="coin logo" /> */}
            </div>
            <div>
              <h4>Connected Accounts</h4>
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

export default function Tier0Dashboard({ user }) {
  return <DashboardContent user={user} />;
}
