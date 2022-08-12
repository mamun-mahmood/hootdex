import React from 'react';
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import url from '../../serverUrl';

const VaultDashboard = ({ user, pecuCoins }) => {
  const navigate = useNavigate();
  const [tokenCreated, setTokenCreated] = React.useState([]);
  const [pendingToken, setPendingTokens] = React.useState([]);
  const [totalCoins, setTotalCoins] = React.useState('');
  const [totalValue, setTotalValue] = React.useState('');
  const [nftCount, setNftCount] = React.useState('');
  const [totalCoinsVault, setTotalCoinsVault] = React.useState('');
  const username = user.username;
  const wallet = JSON.parse(
    localStorage.getItem('hootdex_secretcookie_wallet')
  );
  const [modal, setModal] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    setOpen(true);
    setModal(e);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  const getMyCoinsVault = (id) => {
    if (id) {
      axios
        .post(`${url}/vault/getCoins`, {
          uid: id
        })
        .then((res) => {
          const { coin } = res.data;
          setTotalCoinsVault(coin);
        });
    }
  };

  const getNftCount = (email) => {
    if (email) {
      axios
        .post(`${url}/vault/getNftCount`, {
          email: email
        })
        .then((res) => {
          const { nft } = res.data;
          setNftCount(nft);
        });
    }
  };
  useEffect(() => {
    if (username) {
      axios.get(`${url}/hootdex/token/${username}`).then((res) => {
        setTokenCreated(res.data.reverse());
      });
      console.log(username);
      axios
        .get(`${url}/hootdex/token-buying-request/${username}`)
        .then((res) => {
          setPendingTokens(res.data);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (wallet && wallet.uid) {
      getMyCoins(wallet.uid);
    }
  }, [wallet]);

  useEffect(() => {
    let data = localStorage.getItem('hootdex_secretcookie');
    data = JSON.parse(data);
    if (data && data.user_id) {
      getMyCoinsVault(data.user_id);
      getNftCount(data.email);
    }
  });
  const [openD, setOpenD] = React.useState(false);
  const [tier, setTier] = React.useState(user.tier || 2);
  const toggleDrawer = () => {
    setOpenD(!openD);
  };
  const [tab, setTab] = React.useState(0);
  return (
    <Box
      className="rounded shadow-light"
      sx={{
        width: '95%',
        ml: '2.5%',
        mt: 3,
        mb: 1,
        height: '100vh',
        p: 1
      }}
    >
      <h2 style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
        Vault Dashboard
      </h2>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            className="border dashboard-card"
            onClick={() => handleOpen(2)}
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
                <h3>MVAULT </h3>
              </div>
              <p className="fontS22">
                <img
                  width={65}
                  src={
                    'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/ijkewxwcvdvucass0oyw'
                  }
                  alt="MValut"
                />
              </p>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
           className="border dashboard-card"
            onClick={() => wallet?.uid && navigate('/create-token')}
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
                <h3>Coin Holdings</h3>
              </div>
              <>
                <p>PECU COINS: {totalCoinsVault}</p>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'white',
                    textTransform: 'capitalize',
                    m: 1
                  }}
                >
                  Add/Transfer
                </Button>

                {/* <p>Total Value: $ {parseFloat(totalValue).toLocaleString('en-US')}</p> */}
              </>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            // onClick={() => handleOpen(1)}
            className="border dashboard-card"
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
                <h3>NFT Holdings</h3>
              </div>
              <p >Total NFT: {nftCount}</p>
              <Button
                variant="outlined"
                sx={{
                  color: 'white',
                  textTransform: 'capitalize',
                  m: 1
                }}
              >
                View
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VaultDashboard;
