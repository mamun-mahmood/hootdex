import { AccountCircle } from "@mui/icons-material";
import {
  Avatar,
  Box,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  styled,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const MyProfile = ({ user }) => {
  const [formData, setFormData] = useState({});
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <Box
      component="main"
      sx={{
        padding: 2,
      }}
    >
      <Grid container sx={{ backgroundColor: "#384b4", p: 1 }} spacing={1}>
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
              label="Pohne"
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
          <div style={{ backgroundColor: "#384b45", padding: "10px" }}>
            <TextField
              fullWidth
              name="password"
              id="password"
              label="Password"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ inputProps: { style: { color: "#fff" } } }}
              onChange={handleChange}
              variant="standard"
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyProfile;
