import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Paper } from "@mui/material";
import Coin from "../../assets/images/coin-svgrepo-com.svg";
import XMG from "../../assets/images/xmg-svgrepo-com.svg";
import axios from "axios";
import Piechart from "./PieChart";
import Transactions from "./Transaction";
import AssetChart from "./AssetChart";
import InvAssetChart from "./InvAssetChart";
import WavesIcon from "@mui/icons-material/Waves";
import LineCharts from "./LineChart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TokenIcon from "../../assets/images/tokens-svgrepo-com.svg";
import InvestIcon from "../../assets/images/investment-svgrepo-com.svg";
import FundsIcon from "../../assets/images/funds-svgrepo-com.svg";
import AddIcon from "../../assets/images/add-svgrepo-com.svg";

const drawerWidth = 240;
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent({ user }) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  // const logout = () => {
  //   localStorage.removeItem("UGV_Student_MS_Jwt_AD");
  //   window.location.pathname = "/administrator_dashboard";
  // };
  const userId = user?.tokenUser?.userId;
  const [userData, setUserData] = React.useState({});
  React.useEffect(() => {
    axios
      .get(`http://localhost:7000/administrator/profile/getAdmin/${userId}`)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);
  // const { a_id, name } = userData;
  const [tab, setTab] = React.useState(0);

  return (
    <ThemeProvider theme={mdTheme}>
      <Divider />
      <Box sx={{ display: "flex", backgroundColor: "#091e17" }}>
        <Box sx={{ minHeight: "100vh", backgroundColor: "#002945" }}>
          <Drawer
            variant="permanent"
            open={open}
            sx={{ backgroundColor: "#002945" }}
          >
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                backgroundColor: "#002945",
                textAlign: "center",
              }}
            >
              <div onClick={toggleDrawer} style={{ cursor: "pointer" }}>
                {open === false && <MenuIcon sx={{ width: 40, height: 40 }} />}
                {open && <ChevronLeftIcon sx={{ width: 40, height: 40 }} />}
              </div>
            </Toolbar>
            <List
              sx={{
                backgroundColor: "#002945",
                minWidth: "100%",
                height: "100vh",
                overflowX: "hidden",
              }}
            >
              <ListItemButton
                sx={{
                  color: "white",
                  backgroundColor: "#091e17",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  width: "95%",
                  mb: 1,
                  border: "1px solid #091e17",
                }}
                onClick={() => setTab(0)}
              >
                <ListItemIcon>
                  <DashboardIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton
                sx={{
                  color: "white",
                  backgroundColor: "#091e17",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  width: "95%",
                  mb: 1,
                  border: "1px solid #091e17",
                }}
                onClick={() => setTab(0)}
              >
                <ListItemIcon>
                  <AccountCircleIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItemButton>
            </List>
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            padding: 1,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={3}>
              <Paper
                style={{ textAlign: "center", backgroundColor: "#c9facd" }}
              >
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
              <Paper
                style={{ textAlign: "center", backgroundColor: "#d0f2fe" }}
              >
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
              <Paper
                style={{ textAlign: "center", backgroundColor: "#fff8ce" }}
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
                    <h4>Total Tokens</h4>
                    <Typography variant="h4">4b</Typography>
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper
                style={{ textAlign: "center", backgroundColor: "#ffe8d9" }}
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
                    <img
                      style={{ width: "80px" }}
                      src={TokenIcon}
                      alt="coin logo"
                    />
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
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Tier2Dashboard({ user }) {
  return <DashboardContent user={user} />;
}
