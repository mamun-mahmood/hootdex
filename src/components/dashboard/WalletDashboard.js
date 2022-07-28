import React from 'react';
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import url from '../../serverUrl';
const WalletDashboard = ({ user, pecuCoins }) => {
  const [totalCoins, setTotalCoins] = React.useState('');
  const [totalValue, setTotalValue] = React.useState('');
  // const username = user.username;
  const wallet = JSON.parse(
    localStorage.getItem('hootdex_secretcookie_wallet')
  );

  const getMyCoins = (id) => {
    if (id) {
      axios
        .post(`${url}/wallet/getMycoins`, {
          user_id: id
        })
        .then((res) => {
          const { total_coins, value } = res.data;
          setTotalCoins(total_coins);
          setTotalValue(value);
        });
    }
  };

  useEffect(() => {
    if (wallet && wallet.uid) {
      getMyCoins(wallet.uid);
    }
  }, [wallet]);

  return (
    <Box
      className="rounded shadow"
      sx={{
        width: '95%',
        ml: '2.5%',
        mt: 3,
        mb: 1,
        height: '100vh'
      }}
    >
      <h2 style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
        Wallet Dashboard
      </h2>
      <Grid container spacing={3} sx={{ textTransform: 'uppercase' }}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            style={{
              textAlign: 'center',
              backgroundColor: 'grey'
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
                style={{ backgroundColor: '#01402b' }}
              >
                <h3>Connected Wallet</h3>
              </div>
              <>
                {wallet?.uid ? (
                  <>
                    {' '}
                    <img
                      src={
                        'https://pecunovus.net/static/media/icon.25c8ec299d961b9dd524.ico'
                      }
                      alt="pecu wallet"
                    />
                    <p>PECU WALLET</p>
                  </>
                ) : (
                  'Wallet Disconnected'
                )}
              </>
            </div>
          </Paper>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
            <Paper
              style={{
                textAlign: "center",
                backgroundColor: "grey",
              }}
              className="border"
            >
              <div
                style={{
                  color: "white",
                  wordWrap: "break-word",
                }}
              >
                <div
                  className="rounded center-width tUpper"
                  style={{ backgroundColor: "#01402b" }}
                >
                  <h3>Connected Wallet</h3>
                </div>
                <p className="fontS22">0</p>
              </div>
            </Paper>
          </Grid> */}
        {/* <Grid item xs={12} md={6} lg={4}>
            <Paper
              style={{
                textAlign: "center",
                backgroundColor: "grey",
                cursor: "pointer",
              }}
              // onClick={() => handleOpen(1)}
              className="border"
            >
              <div
                style={{
                  color: "white",
                  wordWrap: "break-word",
                }}
              >
                <div
                  className="rounded center-width tUpper"
                  style={{ backgroundColor: "#01402b" }}
                >
                  <h3>Current Holdings</h3>
                </div>
                <p className="fontS22">0</p>
              </div>
            </Paper>
          </Grid> */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            style={{
              textAlign: 'center',
              backgroundColor: 'grey',
              cursor: 'pointer'
            }}
            // onClick={() => handleOpen(2)}
            className="border"
          >
            <div
              style={{
                color: 'white',
                wordWrap: 'break-word'
              }}
            >
              <div
                className="rounded center-width tUpper"
                style={{ backgroundColor: '#01402b' }}
              >
                <h3>Current Holdings</h3>
              </div>
              {wallet && wallet.uid ? (
                <>
                  <p>Pecu Coins: {totalCoins}</p>
                  <br></br>
                  <p>
                    Total Value: ${' '}
                    {parseFloat(totalValue).toLocaleString('en-US')}
                  </p>
                </>
              ) : (
                'Wallet Disconnected'
              )}
            </div>
          </Paper>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
            <Paper
              style={{
                textAlign: "center",
                backgroundColor: "grey",
                cursor: "pointer",
              }}
              className="border"
              // onClick={() => wallet?.uid && navigate("/create-token")}
            >
              <div
                style={{
                  color: "white",
                  wordWrap: "break-word",
                }}
              >
                <div
                  className="rounded center-width tUpper"
                  style={{ backgroundColor: "#01402b" }}
                >
                  <h3>Buy New</h3>
                </div>
                <p className="fontS22 tlower">Token</p>
              </div>
            </Paper>
          </Grid> */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            style={{
              textAlign: 'center',
              backgroundColor: 'grey'
            }}
            className="border"
          >
            <div
              style={{
                color: 'white',
                wordWrap: 'break-word'
              }}
            >
              <div
                className="rounded center-width tUpper"
                style={{ backgroundColor: '#01402b' }}
              >
                <h3>Token Swap</h3>
              </div>
              {wallet && wallet.uid ? (
                <Button
                  variant="outlined"
                  sx={{
                    color: 'white',
                    textTransform: 'capitalize',
                    m: 1
                  }}
                >
                  SWAP
                </Button>
              ) : (
                'Wallet Disconnected'
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WalletDashboard;
