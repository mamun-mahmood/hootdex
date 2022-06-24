import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  StepConnector,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import React, { useState } from "react";

const MyProfile = ({ user }) => {
  const [formData, setFormData] = useState({});
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const logout = () => {
    localStorage.removeItem("hootdex_secretcookie");
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };
  console.log(user);

//   First Name
// Last Name
// Street address
// City
// State
// Zip code
// Phone number
// Email address
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
          mb:2
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <StepConnector />
          <Typography sx={{ color: "white" }} variant="h5">
            Personal Info
          </Typography>
          <StepConnector />
        </div>
        <Grid
          container
          sx={{ backgroundColor: "#384b4", p: 1, maxWidth: "100%" }}
          spacing={5}
        >
          <Grid item xs={12} md={4} mt={5}>
            <Paper
              style={{
                textAlign: "center",
                backgroundColor: "black",
              }}
              className="border rounded20"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Avatar sx={{ width: 100, height: 100 }} />
              </div>
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
                  <h3>{user.username}</h3>
                </div>
                <p className="fontS22">User ID: {user?.user_id}</p>
                <p className="">Tier Level: 0</p>
              </div>
              {/* <Button
                    onClick={logout}
                    variant="outlined"
                    sx={{ color: "white", textTransform: "capitalize" }}
                  >
                    Logout
                  </Button> */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <div style={{ backgroundColor: "black", padding: "10px" }}>
              <p style={{ color: "white", marginLeft: "15px" }}>First Name</p>
              <input
                className="border"
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: "24px",
                  padding: "15px",
                }}
                type="text"
                name="firstname"
              />
            </div>
            <div style={{ backgroundColor: "black", padding: "10px" }}>
              <p style={{ color: "white", marginLeft: "15px" }}>Last Name</p>
              <input
                className="border"
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: "24px",
                  padding: "15px",
                }}
                type="text"
                name="lastname"
              />
            </div>
            <div style={{ backgroundColor: "black", padding: "10px" }}>
              <p style={{ color: "white", marginLeft: "15px" }}>Username</p>
              <input
                className="border"
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: "24px",
                  padding: "15px",
                }}
                type="text"
                name="lastname"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div style={{ backgroundColor: "black", padding: "10px" }}>
              <p style={{ color: "white", marginLeft: "15px" }}>Phone</p>
              <input
                className="border"
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: "24px",
                  padding: "15px",
                }}
                type="text"
                name="phone"
              />
            </div>
            <div style={{ backgroundColor: "black", padding: "10px" }}>
              <p style={{ color: "white", marginLeft: "15px" }}>Email</p>
              <input
                className="border"
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: "24px",
                  padding: "15px",
                }}
                type="text"
                name="email"
              />
            </div>
            <div style={{ backgroundColor: "black", padding: "10px" }}>
              <p style={{ color: "white", marginLeft: "15px" }}>Country</p>
              <input
                className="border"
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: "24px",
                  padding: "15px",
                }}
                type="text"
                name="company"
              />
            </div>
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <div style={{ backgroundColor: "#384b45", padding: "10px" }}>
              <TextField
                fullWidth
                name="location"
                id="location"
                label="Location"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ inputProps: { style: { color: "#fff" } } }}
                onChange={handleChange}
                variant="standard"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div
              style={{
                backgroundColor: "#384b45",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button sx={{ color: "white" }} onClick={handleClickOpen}>
                Change Password
              </Button>
            </div>
          </Grid> */}
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <StepConnector />
          <Typography sx={{ color: "white" }} variant="h5">
            Address Info
          </Typography>
          <StepConnector />
        </div>
        {/* billing info */}
        <Grid container sx={{ maxWidth: "100%" }} spacing={5}>
       
          <Grid item xs={12} md={4}>
            <div style={{ backgroundColor: "black", padding: "10px" }}>
<<<<<<< HEAD
              <p style={{ color: "white", marginLeft: "15px" }}>First Name</p>
              <input
                className="border"
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: "24px",
                  padding: "15px",
                }}
                type="text"
                name="firstname"
                value={user.username}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div style={{ backgroundColor: "black", padding: "10px" }}>
              <p style={{ color: "white", marginLeft: "15px" }}>Last Name</p>
              <input
                className="border"
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: "24px",
                  padding: "15px",
                }}
                type="text"
                name="lastname"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div style={{ backgroundColor: "black", padding: "10px" }}>
              <p style={{ color: "white", marginLeft: "15px" }}>Address 1</p>
=======
              <p style={{ color: "white", marginLeft: "15px" }}>City</p>
>>>>>>> 978f9d4e9cf14b23183e80a9d2adf8e854f31717
              <input
                className="border"
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: "24px",
                  padding: "15px",
                }}
                type="text"
                name="addres1"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div style={{ backgroundColor: "black", padding: "10px" }}>
              <p style={{ color: "white", marginLeft: "15px" }}>State</p>
              <input
                className="border"
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: "24px",
                  padding: "15px",
                }}
                type="text"
                name="addres2"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div style={{ backgroundColor: "black", padding: "10px" }}>
              <p style={{ color: "white", marginLeft: "15px" }}>Street</p>
              <input
                className="border"
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: "24px",
                  padding: "15px",
                }}
                type="text"
                name="phone"
              />
            </div>
          </Grid>
        </Grid>
        {/* settings */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <StepConnector />
          <Typography sx={{ color: "white" }} variant="h5">
            Settings
          </Typography>
          <StepConnector />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="outlined" sx={{ color: "red" }}>
            Save Changes
          </Button>
        </div>
        {/* Password change Modal */}
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Change Password..."}
            </DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                name="oldPassword"
                id="oldPassword"
                label="Enter Old Password"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                variant="standard"
              />
              <TextField
                fullWidth
                name="newPassword"
                id="newPassword"
                label="Enter New Password"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                variant="standard"
                sx={{ mt: 1 }}
              />
              <TextField
                fullWidth
                name="confirmNewPassword"
                id="confirmNewPassword"
                label="Confirm New Password"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                variant="standard"
                sx={{ mt: 1 }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                sx={{ backgroundColor: "black" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "green" }}
                onClick={handleClose}
                autoFocus
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </>
  );
};

export default MyProfile;
