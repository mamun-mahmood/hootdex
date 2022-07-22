import {
  Alert,
  Button,
  Collapse,
  Modal,
  Paper,
  StepConnector,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import url from '../../serverUrl';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'drak',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};
const TokenList = ({
  open,
  handleClose,
  tokens,
  modal,
  fetchTokenBuyingRequest
}) => {
  const [alert, setAlert] = useState({
    msg: '',
    type: '',
    show: false
  });
  //fetch pecuPrice
  const [currentValue, setCurrentValue] = useState(null);
  useEffect(() => {
    axios
      .get(`${url}/wallet/get_current_index_coin`)
      .then((res) => {
        setCurrentValue(res.data[0].value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = (data) => {
    if (currentValue) {
      axios
        .post(`${url}/hootdex/sell-token`, {
          data: data,
          timestamp: new Date(),
          pecuPrice: currentValue
        })
        .then((res) => {
          handleClose();
          fetchTokenBuyingRequest();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAlert({
        msg: 'Unable to fecth Pecu price',
        type: 'error',
        show: true
      });
      setTimeout(() => {
        setAlert({
          msg: 'Unable to fecth Pecu price',
          type: 'error',
          show: false
        });
      }, 4000);
    }
  };
  // console.log(tokens);
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
            backdropFilter: 'blur(5px)',
            overflowY: 'scroll'
          }}
        >
          <Box>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Collapse
                in={alert.show}
                sx={{ maxWidth: 400, position: 'fixed' }}
              >
                <Alert
                  variant="outlined"
                  severity={alert.type}
                  sx={{ mb: 2, backgroundColor: 'white', fontSize: '18px' }}
                >
                  {alert.msg}
                </Alert>
              </Collapse>
            </div>
          </Box>
          <p className="twhite tcenter fontS22">
            {modal === 2 ? 'Your all tokens' : 'Token Buying Request'}
          </p>
          <StepConnector sx={{ mt: 1 }} />
          <Paper
            sx={{
              textAlign: 'center',
              backgroundColor: '#00071a',
              m: 1,
              mt: 2
            }}
            className="center-width border"
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                color: 'white'
              }}
            >
              <p>Name</p>
              <p>Amount</p>
              <p>Status</p>

              {modal === 1 && (
                <>
                  <p>By</p> <p>Action</p>
                </>
              )}
            </div>
          </Paper>
          {tokens.length &&
            tokens?.map((each, index) => (
              <Paper
                key={index}
                sx={{
                  textAlign: 'center',
                  backgroundColor: '#00071a',
                  m: 1
                }}
                className="hover-grey center-width border"
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    color: 'white'
                  }}
                >
                  <div>
                    <Typography component="p" variant="h5">
                      {each?.tokenName}
                    </Typography>
                  </div>
                  {modal === 2 ? (
                    <h4>{each?.totalToken}</h4>
                  ) : (
                    <h4>{each?.tokenAmount}</h4>
                  )}
                  <p>{each?.status}</p>
                  {modal === 1 && (
                    <>
                      <p>{each?.owner}</p>{' '}
                      <Button
                        variant="outline"
                        onClick={() => handleSubmit(each)}
                      >
                        Approve
                      </Button>
                    </>
                  )}
                </div>
              </Paper>
            ))}
        </Box>
      </Modal>
    </div>
  );
};

export default TokenList;
