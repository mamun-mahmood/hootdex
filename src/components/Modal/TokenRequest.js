import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Grid, Paper, StepConnector, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";

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

export default function TokenRequest({ each, index, user, fetchTokens }) {
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
  const handleSubmit = () => {
    if (user.username) {
      axios
        .post(`https://api.pecunovus.net/hootdex/approve-token`, {
          approvedBy: user?.username,
          tokenName: each.tokenName,
          aTime: new Date(),
        })
        .then((res) => {
          if(res.data.affectedRows > 0) {
            fetchTokens()
            handleClose()
          }
        });
    }
  }
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
            m: 1,
          }}
          className="hover-grey center-width border"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              color: "white",
            }}
          >
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
          sx={{ ...style, width: 800, backdropFilter: "blur(5px)" }}
        >
          <h2 className="twhite tcenter">Token details</h2>
          <StepConnector/>
          <Grid container spacing={5}>
            <Grid item xs={6} md={4} sx={{ mt: 3 }}>
              <Paper
                style={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
                }}
                className="border tShadow"
              >
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
                    <h3>Name</h3>
                  </div>
                  <p className="fontS22">{each?.tokenName}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} md={4} sx={{ mt: 3 }}>
              <Paper
                style={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
                }}
                className="border tShadow"
              >
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
                    <h3>Amount</h3>
                  </div>
                  <p className="fontS22">{each?.totalToken}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} md={4} sx={{ mt: 3 }}>
              <Paper
                style={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
                }}
                className="border tShadow"
              >
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
                    <h3>Price</h3>
                  </div>
                  <p className="fontS22">{each?.tokenPrice}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} md={4} sx={{ mt: 3 }}>
              <Paper
                style={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
                }}
                className="border tShadow"
              >
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
                    <h3>Value (USD)</h3>
                  </div>
                  <p className="fontS22">$ {each?.investementAmount}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} md={4} sx={{ mt: 3 }}>
              <Paper
                style={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
                }}
                className="border tShadow"
              >
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
                    <h3>Pecu Coin (EQ)</h3>
                  </div>
                  <p className="fontS22">{each?.pecuCoin}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} md={4} sx={{ mt: 3 }}>
              <Paper
                style={{
                  textAlign: "center",
                  backgroundColor: "#00071a",
                }}
                className="border tShadow"
              >
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
                    <h3>Created By</h3>
                  </div>
                  <p className="fontS22">{each?.createdBy}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <div style={{textAlign: 'center'}}>
                <Button onClick={handleSubmit} className="border" variant="contained" sx={{ color: "white", backgroundColor: "#00071a" }}>
                  Approve
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
