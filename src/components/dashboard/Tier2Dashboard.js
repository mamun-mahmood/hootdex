import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
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
    <Grid container spacing={1} sx={{ textTransform: "uppercase" }}>
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
                <h4>Token Sold</h4>
              </div>
              <Typography variant="h4">4b</Typography>
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
                <h4>Total Asset</h4>
              </div>
              <Typography variant="h4">$ 102548</Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Paper sx={{ backgroundColor: "#00071a", borderTop: "1px solid #fff",
              borderLeft: "1px solid #fff",
              borderBottom: "3px solid #fff",
              borderRight: "3px solid #fff", }}>
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
                wordWrap: "break-word"
              }}
            >
              <div
                className="rounded center-width"
                style={{ backgroundColor: "#002945" }}
              >
                <h4>Pending Tokens</h4>
              </div>
              <Typography variant="h4">{!pendingToken.length && "No Pending Token" }</Typography>
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
                <h4>Create New</h4>
              </div>
              <Typography sx={{cursor: "pointer"}}  onClick={(e) => {
                  navigate("/create-token");
                }} variant="h4">Tokens</Typography>
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
                <h4>Incoming Funds</h4>
              </div>
              <Typography variant="h4">$ 2548</Typography>
            </div>
          </Paper>
        </Grid>
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
