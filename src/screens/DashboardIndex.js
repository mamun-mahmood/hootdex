import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { Paper } from "@mui/material";
// import ProfileCard from "./ProfileCard";
// import PieChart from "./PieChart";
import axios from "axios";
import Piechart from "../components/dashboard/PieChart";

// import TeacherSignUp from "../../../components/SignUp/TeacherSignUp";
// import AllStudents from "./AllStudents";
// import Depertments from "./Depertments";
// import AdmissionSignUp from "../../../components/SignUp/AdmissionSignUp";
// import AllTeacher from "./AllTeacher";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Developed By "}
      <Link
        color="inherit"
        href="https://github.com/mamamun009/"
        target="blank"
      >
        Mamoon Mahmood
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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
                px: [1],
                backgroundColor: "#002945",
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <List
              sx={{
                backgroundColor: "#002945",
                minWidth: "100%",
                height: "100vh",
                overflowX: "hidden",
              }}
            >
              <ListItemButton onClick={() => setTab(0)}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItemButton>
              <Divider />
              <ListItemButton onClick={() => setTab(0)}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItemButton>
              <Divider />
              <ListItemButton onClick={() => setTab(0)}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItemButton>
            </List>
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            padding: 1
            // overflow: "auto",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <Paper style={{textAlign: 'center'}}>
                <h4 >Welcome:</h4>
                <Typography component="p" variant="h4">
                {user.username}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper style={{textAlign: 'center'}}>
                <h4 >Pool Level</h4>
                <Typography component="p" variant="h4">
                Tier 0
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper style={{textAlign: 'center'}}>
                <h4 >Total Coins</h4>
                <Typography component="p" variant="h4">
                4b
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper style={{textAlign: 'center'}}>
                <h4 >Total XMG</h4>
                <Typography component="p" variant="h4">
                4b
                </Typography>
              </Paper>
            </Grid>
          <Piechart user={user} />
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function DashboardIndex({ user }) {
  return <DashboardContent user={user} />;
}
