import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import Piechart from "./PieChart";
import Transactions from "./Transaction";
import AssetChart from "./AssetChart";
import LineCharts from "./LineChart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TokenIcon from "../../assets/images/tokens-svgrepo-com.svg";
import InvestIcon from "../../assets/images/investment-svgrepo-com.svg";
import FundsIcon from "../../assets/images/funds-svgrepo-com.svg";

function DashboardContent({ user }) {
  return (
    <Grid container spacing={1} sx={{ textTransform: "uppercase" }}>
      <Grid item xs={12} md={6} lg={3}>
        {/* dashboard left */}
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
                wordWrap: "break-word"
              }}
            >
              <div
                className="rounded center-width"
                style={{ backgroundColor: "#002945" }}
              >
                <h4>Total Tokens</h4>
              </div>
              <Typography variant="h4">15425</Typography>
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
                wordWrap: "break-word"
              }}
            >
              <div
                className="rounded center-width"
                style={{ backgroundColor: "#002945" }}
              >
                <h4>Total Value</h4>
              </div>
              <Typography variant="h4">$ 15425</Typography>
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
                wordWrap: "break-word"
              }}
            >
              <div
                className="rounded center-width"
                style={{ backgroundColor: "#002945" }}
              >
                <h4>Total Coin</h4>
              </div>
              <Typography variant="h4">65415425</Typography>
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
            My Total Assets
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
      <Grid item xs={12} md={8} lg={3}>
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
                wordWrap: "break-word"
              }}
            >
              <div
                className="rounded center-width"
                style={{ backgroundColor: "#002945" }}
              >
                <h4>Total XMG</h4>
              </div>
              <Typography variant="h4">15425</Typography>
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
                wordWrap: "break-word"
              }}
            >
              <div
                className="rounded center-width"
                style={{ backgroundColor: "#002945" }}
              >
                <h4>Token Created</h4>
              </div>
              <Typography variant="h4">None</Typography>
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
                wordWrap: "break-word"
              }}
            >
              <div
                className="rounded center-width"
                style={{ backgroundColor: "#002945" }}
              >
                <h4>Total Pecu Coins</h4>
              </div>
              <Typography variant="h4">4054984654</Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
      {/* second row */}
      <Grid item xs={12} xl={6}>
        <Piechart user={user} />
      </Grid>
      <Grid item xs={12} xl={6} sx={{mt:3}}>
        <Paper sx={{ backgroundColor: "#18214c" }}>
          <p style={{ textAlign: "center", color: "white" }}>Pecu Price</p>
          <LineCharts user={user} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={3}>
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
              {/* <PeopleAltIcon style={{ width: "80px", height: "80px" }} /> */}
              <img style={{ width: "80px" }} src={FundsIcon} alt="coin logo" />
            </div>
            <div>
              <h4>Current Funds</h4>
              <Typography variant="h4">400k</Typography>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={3}>
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
      <Grid item xs={12} md={6} lg={4} xl={3}>
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
              {/* <PeopleAltIcon style={{ width: "80px", height: "80px" }} /> */}
              <img style={{ width: "80px" }} src={InvestIcon} alt="coin logo" />
            </div>
            <div>
              {/* some random text here */}
              <h4>Make New Investment</h4>
              <Typography variant="h4">400k</Typography>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={3}>
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
              {/* <PeopleAltIcon style={{ width: "80px", height: "80px" }} /> */}
              <img style={{ width: "80px" }} src={TokenIcon} alt="coin logo" />
            </div>
            <div>
              <h4>Total Invested Tokens</h4>
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

export default function Tier1Dashboard({ user }) {
  return <DashboardContent user={user} />;
}
