import * as React from 'react';
import { Box, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TokenIcon from '@mui/icons-material/Token';
import WalletDashboard from './WalletDashboard';
import TokenDashboard from './TokenDashboard';
import VaultDashboard from './VaultDashboard';
import MyProfile from './MyProfile';
import url from '../../serverUrl';
import DashboardIcon from '@mui/icons-material/Dashboard';
function DashboardContent({ user, pecuCoins }) {
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
  const [tab, setTab] = React.useState('Vault');
  return (
    <>
      {' '}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          mt: 1,
          width: '95%',
          ml: '2.5%',

          mb: 1
        }}
      >
        <ListItemButton
          className={`${tab === 'Vault' && 'shadow'}`}
          sx={{
            ':hover': {
              bgcolor: '#1a1b1f', // theme.palette.primary.main
              color: 'white'
            },
            color: 'white',
            backgroundColor: '#00071a',
            borderRadius: '20px',
            m: 1,
            border: '1px solid #091e17'
          }}
          onClick={() => setTab('Vault')}

          // className={`${tab === 'Vault' && "button-hover"}`}
        >
          <ListItemIcon>
            <DashboardIcon sx={{color: 'white'}} />
          </ListItemIcon>
          <ListItemText
            sx={{ display: { xs: 'none', sm: 'block' } }}
            primary="Vault"
          />
        </ListItemButton>
        <ListItemButton
          className={`${tab === 'Wallet' && 'shadow'}`}
          sx={{
            ':hover': {
              bgcolor: '#1a1b1f', // theme.palette.primary.main
              color: 'white'
            },
            color: 'white',
            backgroundColor: '#00071a',
            borderRadius: '20px',
            m: 1,
            border: '1px solid #091e17'
          }}
          onClick={() => setTab('Wallet')}
        >
          <ListItemIcon>
            <AccountBalanceWalletIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            sx={{ display: { xs: 'none', sm: 'block' } }}
            primary="Wallet"
          />
        </ListItemButton>
        <ListItemButton
          className={`${tab === 'Token' && 'shadow'}`}
          sx={{
            ':hover': {
              bgcolor: '#1a1b1f', // theme.palette.primary.main
              color: 'white'
            },
            color: 'white',
            backgroundColor: '#00071a',
            borderRadius: '20px',
            m: 1,
            border: '1px solid #091e17'
          }}
          onClick={() => setTab('Token')}
        >
          <ListItemIcon>
            <TokenIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            sx={{ display: { xs: 'none', sm: 'block' } }}
            primary="Tokens"
          />
        </ListItemButton>
        <ListItemButton
          className={`${tab === 'Profile' && 'shadow'}`}
          sx={{
            ':hover': {
              bgcolor: '#1a1b1f', // theme.palette.primary.main
              color: 'white'
            },
            color: 'white',
            backgroundColor: '#00071a',
            borderRadius: '20px',
            m: 1,
            border: '1px solid #091e17'
          }}
          onClick={() => setTab('Profile')}
        >
          <ListItemIcon>
            <AccountCircleIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            sx={{ display: { xs: 'none', sm: 'block' } }}
            primary="My Profile"
          />
        </ListItemButton>
      </Box>
      {/* showing dashboard based on user tier level */}
      <Box sx={{ flex: 1, mt: 1 }}>
        {/* wallet dashboard */}
        {tab === 'Wallet' && (
          <WalletDashboard user={user} pecuCoins={pecuCoins} />
        )}
        {/* Token Dashboard  */}
        {tab === 'Token' && (
          <TokenDashboard user={user} pecuCoins={pecuCoins} />
        )}
        {/* Vault dashboard */}
        {tab === 'Vault' && (
          <VaultDashboard user={user} pecuCoins={pecuCoins} />
        )}
        {tab === 'Profile' && <MyProfile user={user} />}
      </Box>
    </>
  );
}

export default function Tier2Dashboard({ user, pecuCoins }) {
  return <DashboardContent user={user} pecuCoins={pecuCoins} />;
}
