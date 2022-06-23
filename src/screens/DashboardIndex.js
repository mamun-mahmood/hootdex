import { Box, ListItemIcon } from "@mui/material";
import Tier0Dashboard from "../components/dashboard/Tier0Dashboard";
import Tier1Dashboard from "../components/dashboard/Tier1Dashboard";
import Tier2Dashboard from "../components/dashboard/Tier2Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import MyProfile from "../components/dashboard/MyProfile";
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
const DashboardIndex = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  // const logout = () => {
  //   localStorage.removeItem("UGV_Student_MS_Jwt_AD");
  //   window.location.pathname = "/administrator_dashboard";
  // };
  const [tab, setTab] = React.useState(0);
  let tier = 1;
  return (
    <div style={{ backgroundColor: "#002945", height: '100vh' }}>
      <Divider/>
        {/* Sidebar */}
        {/* <Box sx={{ minHeight: "100vh", backgroundColor: "#002945" }}>
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
                  {open === false && (
                    <MenuIcon sx={{ width: 40, height: 40 }} />
                  )}
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
                    backgroundColor: "#00071a",
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
                    backgroundColor: "#00071a",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                    width: "95%",
                    mb: 1,
                    border: "1px solid #091e17",
                  }}
                  onClick={() => setTab(1)}
                >
                  <ListItemIcon>
                    <AccountCircleIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="My Profile" />
                </ListItemButton>
              </List>
            </Drawer>
          </Box> */}
        {/* showing dashboard based on user tier level */}
        <Box
          className="rounded shadow"
          sx={{
            padding: 1,
            width: "95%",
            ml: "2.5%",
            mt: 1,
            backgroundColor: 'black',
            pb: 2,
          }}
        >
          {tier === 0 && tab === 0 && <Tier0Dashboard user={user} />}
          {tier === 1 && tab === 0 && <Tier1Dashboard user={user} />}
          {tier === 2 && tab === 0 && <Tier2Dashboard user={user} />}
          {tab === 1 && <MyProfile user={user} />}
        </Box>
    </div>
  );
};

export default DashboardIndex;
