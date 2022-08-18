import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {
  Alert,
  Collapse,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  StepConnector,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../../serverUrl';

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'drak',
  border: '2px solid #000',
  boxShadow: 24,
  maxHeight: '100%'
  // p: 2
};

export default function BuyToken({ each, user, pecuCoins }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [totalToken, setTotalToken] = useState(0);
  const handleChange = (e) => {
    // setInputData({ ...inputData, [e.target.name]: e.target.value });
    // let changeData = { ...inputData };
    // let name = e.target.name;
    // let value = e.target.value;
    // changeData[name] = value;
    // setInputData(changeData);
    setTotalToken(e.target.value);
  };
  const [alert, setAlert] = useState({
    msg: '',
    type: '',
    loading: false
  });
  const handleSubmit = (e) => {
    // if ( totalToken > 0 && pecuCoins?.coin >= inputData.pecuCoin) {
    axios
      .post(`${url}/hootdex/buy-tokens`, {
        userName: user.username,
        tokenAmount: totalToken,
        token: each,
        reqId: Math.floor(Math.random() * 1000000 + 1),
        bTime: new Date()
      })
      .then((res) => {
        if (res.data.status === 'error') {
          setAlert({
            msg: res.data.msg,
            type: 'error',
            show: true
          });
          setTimeout(() => {
            setAlert({
              msg: res.data.msg,
              type: 'error',
              show: false
            });
          }, 4000);
        }
        if (res.data.affectedRows > 0) {
          window.scrollTo(0, 0);
          setAlert({
            msg: 'Token Purchased!',
            type: 'success',
            show: true
          });
          setTimeout(() => {
            setAlert({
              msg: 'Token Purchased!',
              type: 'success',
              show: false
            });
          }, 3000);
        }
      })
      .catch((err) => {
        setAlert({
          msg: 'There was an error!',
          type: 'error',
          show: true
        });
        setTimeout(() => {
          setAlert({
            msg: 'There was an error!',
            type: 'error',
            show: false
          });
        }, 3000);
      });
    // } else {
    //   setAlert({
    //     msg: "You don't have enough Pecu coin!",
    //     type: "error",
    //     show: true,
    //   });
    //   setTimeout(() => {
    //     setAlert({
    //       msg: "You don't have enough Pecu coin!",
    //       type: "error",
    //       show: false,
    //     });
    //   }, 3000);
    // }
  };
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <IconButton
        sx={{
          backgroundColor: '#091e17',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '12px',
          cursor: 'pointer',
          maxHeight: '40px',
          fontSize: '14px'
        }}
        className="shadow"
        onClick={handleOpen}
      >
        <p>Swap</p>
      </IconButton>
      <Dialog
        fullWidth={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none'
          }
        }}
        sx={{ zIndex: 2002 }}
        disableScrollLock={true}
      >
        <Box className="border" sx={{ backdropFilter: 'blur(5px)', p: 3 }}>
          {/* <StepConnector /> */}
          <Box sx={{ mt: 2, position: 'fixed', zIndex: 1000, top: 0 }}>
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
          <Grid container spacing={{ xs: 1, md: 2 }}>
            <Grid item xs={12} md={4}>
              <Paper
                style={{
                  textAlign: 'center',
                  backgroundColor: '#00071a'
                }}
                className="border tShadow"
              >
                <div
                  style={{
                    color: 'white',
                    wordWrap: 'break-word'
                  }}
                >
                  <div
                    className="rounded center-width tUpper"
                    style={{ backgroundColor: '#002945' }}
                  >
                    <h3>Name</h3>
                  </div>
                  <p className="fontS22">{each?.tokenName}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                style={{
                  textAlign: 'center',
                  backgroundColor: '#00071a'
                }}
                className="border tShadow"
              >
                <div
                  style={{
                    color: 'white',
                    wordWrap: 'break-word'
                  }}
                >
                  <div
                    className="rounded center-width tUpper"
                    style={{ backgroundColor: '#002945' }}
                  >
                    <h3>Total Tokens</h3>
                  </div>
                  <p className="fontS22">{each?.totalToken}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                style={{
                  textAlign: 'center',
                  backgroundColor: '#00071a'
                }}
                className="border tShadow"
              >
                <div
                  style={{
                    color: 'white',
                    wordWrap: 'break-word'
                  }}
                >
                  <div
                    className="rounded center-width tUpper"
                    style={{ backgroundColor: '#002945' }}
                  >
                    <h3>Price</h3>
                  </div>
                  <p className="fontS22">{each?.tokenPrice}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                style={{
                  textAlign: 'center',
                  backgroundColor: '#00071a'
                }}
                className="border tShadow"
              >
                <div
                  style={{
                    color: 'white',
                    wordWrap: 'break-word'
                  }}
                >
                  <div
                    className="rounded center-width tUpper"
                    style={{ backgroundColor: '#002945' }}
                  >
                    <h3>Value (USD)</h3>
                  </div>
                  <p className="fontS22">$ {each?.investementAmount}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                style={{
                  textAlign: 'center',
                  backgroundColor: '#00071a'
                }}
                className="border tShadow"
              >
                <div
                  style={{
                    color: 'white',
                    wordWrap: 'break-word'
                  }}
                >
                  <div
                    className="rounded center-width tUpper"
                    style={{ backgroundColor: '#002945' }}
                  >
                    <h3>Select Amount </h3>
                  </div>
                  <p className="fontS22">
                    <input
                      className="tcenter"
                      style={{
                        width: '3rem'
                      }}
                      type="number"
                      onChange={handleChange}
                      name="totalToken"
                    />
                  </p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                style={{
                  textAlign: 'center',
                  backgroundColor: '#00071a'
                }}
                className="border tShadow"
              >
                <div
                  style={{
                    color: 'white',
                    wordWrap: 'break-word'
                  }}
                >
                  <div
                    className="rounded center-width tUpper"
                    style={{ backgroundColor: '#002945' }}
                  >
                    <h3>Pecu Coin (EQ)</h3>
                  </div>
                  <p className="fontS22">{each?.pecuCoin}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <div style={{ textAlign: 'center' }}>
                <Button
                  onClick={handleSubmit}
                  className="border"
                  variant="contained"
                  sx={{ color: 'white', backgroundColor: '#00071a' }}
                >
                  Swap
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
}
