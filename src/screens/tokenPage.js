import {
  Alert,
  Collapse,
  Divider,
  IconButton,
  LinearProgress
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Chart from './chart';

export default function TokenPage(props) {
  const tokenName = useParams().tokenName;
  const [token, setToken] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    msg: '',
    type: '',
    show: false
  });
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.pecunovus.net/hootdex/getToken/${tokenName}`)
      .then((res) => {
        setToken(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setAlert({
          msg: 'There was an error',
          type: 'error',
          show: true
        });
        setTimeout(() => {
          setAlert({
            msg: 'There was an error',
            type: 'error',
            show: false
          });
        }, 3000);
        console.log(err);
      });
  }, [tokenName]);

  return (
    <div className="" style={{ backgroundColor: '#091e17' }}>
      {loading && <LinearProgress />}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Collapse in={alert.show} sx={{ maxWidth: 400, position: 'fixed' }}>
          <Alert
            variant="outlined"
            severity={alert.type}
            sx={{ mb: 2, backgroundColor: 'white', fontSize: '18px' }}
          >
            {alert.msg}
          </Alert>
        </Collapse>
      </div>
      <div className="" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="banner-left">
          <img
            className="rounded"
            src={
              'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/qfavylwan5f8hiu78fsq'
            }
            alt="megahoot logo"
          />
          {/* <p className="tcenter">{token?.tokenName}</p> */}
        </div>
        <div className="banner-right">
          <div className="banner-right-h">
            <span className="heading-btn">Summary</span>
            <span className="heading-btn">Finances</span>
            <span className="heading-btn">Technology</span>
            <span className="heading-btn">People</span>
            <span className="heading-btn">Stats</span>
          </div>
        </div>
      </div>
      <h1 className="label tcenter tUpper" style={{ marginTop: '1rem' }}>
        Token Details
      </h1>
      <Divider sx={{ backgroundColor: 'white' }} />
      <div className="content-body">
        <div className="card">
          <p className="label-semi">Name:</p>
          <Divider sx={{ backgroundColor: 'white' }} />
          <p className="label-semi">{token?.tokenName}</p>
        </div>
        <div className="card">
          <p className="label-semi">Symbol:</p>
          <Divider sx={{ backgroundColor: 'white' }} />
          <p className="label-semi">{token?.tokenSymbol}</p>
        </div>
        <div className="card">
          <p className="label-semi">Available:</p>
          <Divider sx={{ backgroundColor: 'white' }} />
          <p className="label-semi">{token?.totalToken}</p>
        </div>
        <div className="card">
          <p className="label-semi">Pecu Coins:</p>
          <Divider sx={{ backgroundColor: 'white' }} />
          <p className="label-semi">{token?.pecuCoin}</p>
        </div>
        <Box
          className="rounded shadow"
          sx={{
            padding: 1,
            width: '95%',
            ml: '2.5%',
            m: 2,
            backgroundColor: 'black',
            pb: 2
          }}
        >
          <h1 className="label tcenter tUpper">Token Performance</h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Chart />
          </div>
        </Box>
      </div>
    </div>
  );
}
