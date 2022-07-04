import { Modal, Paper, StepConnector, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
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
const TokenList = ({open, handleClose, tokens, modal}) => {
    return (
        <div>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          className="border hide-scrollbar"
          sx={{
            ...style,
            width: 800,
            maxHeight: 300,
            backdropFilter: "blur(5px)",
            overflowY: "scroll",
          }}
        >
          <p className="twhite tcenter fontS22">Your {modal === 2 ? "All" : "Pending"} Tokens</p>
          <StepConnector sx={{ mt: 1 }} />
          <Paper
            sx={{
              textAlign: "center",
              backgroundColor: "#00071a",
              m: 1,
              mt: 2,
            }}
            className="center-width border"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                color: "white",
              }}
            >
              <p>Name</p>
              <p>Amount</p>
              <p>Status</p>
            </div>
          </Paper>
          {tokens.length &&
            tokens?.map((each, index) => (
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
                      {each?.tokenName}
                    </Typography>
                  </div>
                  <h4>{each?.totalToken}</h4>
                  <p>{each?.status}</p>
                </div>
              </Paper>
            ))}
        </Box>
      </Modal>
        </div>
    );
};

export default TokenList;