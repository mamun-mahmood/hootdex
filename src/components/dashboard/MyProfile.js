import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
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
  return (
    <>
      <Grid container sx={{ backgroundColor: "#384b4", p: 1 }} spacing={1}>
        <Grid item xs={12}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <Avatar sx={{ width: 150, height: 150 }} />
              <h4
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                {user.username}
                <br />
                <small>
                  Status: <span style={{ color: "green" }}>Active</span>
                </small>
                <br />
                <Button
                  onClick={logout}
                  variant="outlined"
                  sx={{ color: "white", textTransform: "capitalize" }}
                >
                  Logout
                </Button>
              </h4>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div style={{ backgroundColor: "#384b45", padding: "10px" }}>
            <TextField
              fullWidth
              name="firstname"
              id="firstname"
              label="First Name"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              variant="standard"
              InputProps={{ inputProps: { style: { color: "#fff" } } }}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div style={{ backgroundColor: "#384b45", padding: "10px" }}>
            <TextField
              fullWidth
              name="lastname"
              id="lastname"
              label="Last Name"
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
          <div style={{ backgroundColor: "#384b45", padding: "10px" }}>
            <TextField
              fullWidth
              name="phone"
              id="phone"
              label="Phone"
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
          <div style={{ backgroundColor: "#384b45", padding: "10px" }}>
            <TextField
              fullWidth
              name="email"
              id="emial"
              label="Email"
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
        </Grid>
      </Grid>
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
    </>
  );
};

export default MyProfile;
