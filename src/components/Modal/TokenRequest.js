import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Grid, Paper, TextField, Typography } from "@mui/material";
import PendingIcon from "@mui/icons-material/Pending";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "drak",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function TokenRequest({ each, index }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [formData, setFormData] = useState({});
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div
        onClick={handleOpen}
        style={{
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Paper
          sx={{
            textAlign: "center",
            backgroundColor: "#00071a",
            m:1
          }}
          className="hover-grey center-width border"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              color: "white"
            }}
          >
            {/* <div>
              <PendingIcon
                sx={{ width: "60px", height: "60px", cursor: "pointer" }}
              />
            </div> */}
            <div>
              <Typography component="p" variant="h5">
                {each.tokenName}
              </Typography>
            </div>
            <h4>{each.totalToken}</h4>
            <p>{each.status}</p>
          </div>
        </Paper>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          className="border"
          sx={{ ...style, width: 600, backdropFilter: "blur(5px)" }}
        >
          <h2 className="twhite tcenter">Token details</h2>
          <Grid container>
            <Grid item xs={12} md={4}>
              <div style={{ padding: "10px" }}>
                <TextField
                  fullWidth
                  name="tokenName"
                  id="firstname"
                  label="Token Name"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "#fff" },
                  }}
                  onChange={handleChange}
                  variant="filled"
                  color="warning"
                  InputProps={{
                    inputProps: {
                      style: { color: "#fff", borderColor: "#fff" },
                    },
                  }}
                  defaultValue={each?.tokenName}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div style={{ padding: "10px" }}>
                <TextField
                  fullWidth
                  name="totalToken"
                  id="firstname"
                  label="Total Token"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "#fff" },
                  }}
                  onChange={handleChange}
                  variant="filled"
                  color="warning"
                  InputProps={{
                    inputProps: {
                      style: { color: "#fff", borderColor: "#fff" },
                    },
                  }}
                  defaultValue={each?.totalToken}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div style={{ padding: "10px" }}>
                <TextField
                  fullWidth
                  name="investementAmount"
                  id="firstname"
                  label="Value Investement (USD)"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "#fff" },
                  }}
                  onChange={handleChange}
                  variant="filled"
                  color="warning"
                  InputProps={{
                    inputProps: {
                      style: { color: "#fff", borderColor: "#fff" },
                    },
                  }}
                  defaultValue={each?.investementAmount}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <Button variant="outlined" sx={{ color: "white" }}>
                  Save
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
