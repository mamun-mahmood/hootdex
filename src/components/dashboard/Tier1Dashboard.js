import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import { Box } from '@mui/system';
import TokenRequest from '../Modal/TokenRequest';
import axios from 'axios';
import { useEffect, useState } from 'react';
import url from '../../serverUrl';
import LineCharts from '../Graphs/LineChart';
import CreatePool from '../../screens/CreatePool';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MyProfile from './MyProfile';
function DashboardContent({ user }) {
  const [pendingToken, setPendingToken] = useState([]);
  const [totalCoins, setTotalCoins] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [projectTokens, setProjectTokens] = useState([]);
  const [totalToken, setTotalToken] = useState([]);
  const [createPool, setCreatePool] = useState(false);
  const [poolToken, setPoolToken] = useState({});
  const username = user.username;
  const fetchTokens = () => {
    if (username) {
      axios.get(`${url}/hootdex/all-token/Pending`).then((res) => {
        setPendingToken(res.data.reverse());
      });
    }
  };
  const fetchProjectTokens = () => {
    axios.get(`${url}/wallet/get_all_tokens_project`).then((res) => {
      setProjectTokens(res.data.tokens);
      console.log(res.data, 'ptokens');
    });
  };
  const gettotalTokens = () => {
    axios.get(`${url}/hootdex/all-token-reqs`).then((res) => {
      setTotalToken(res.data.reverse());
      console.log(res.data);
    });
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
  useEffect(() => {
    let user_id = user.user_id;
    fetchTokens();
    getMyCoins(user_id);
    gettotalTokens();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);
  useEffect(() => {
    fetchProjectTokens();
  }, []);
  const [tab, setTab] = useState('Dashboard');
  return (
    <>
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
          className={`${tab === 'Dashboard' && 'shadow'}`}
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
          onClick={() => setTab('Dashboard')}
        >
          <ListItemIcon>
            <DashboardIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            sx={{ display: { xs: 'none', sm: 'block' } }}
            primary="Dashboard"
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
      {tab === 'Dashboard' && (
        <>
          <Box
            className="rounded shadow"
            sx={{
              padding: 1,
              width: '95%',
              ml: '2.5%',
              mt: 1,
              pb: 2
            }}
          >
            <Grid
              container
              spacing={5}
              sx={{ textTransform: 'uppercase', p: 5 }}
            >
              <Grid item xs={12} md={6} lg={3} mt={5}>
                {/* dashboard left */}
                <Grid sx={{ mt: 3 }}>
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
                        <h4>Issued Tokens</h4>
                      </div>
                      <p className="fontS22">{totalToken.length}</p>
                    </div>
                  </Paper>
                </Grid>
                <Grid sx={{ mt: 3 }}>
                  <Paper
                    style={{
                      textAlign: 'center',
                      backgroundColor: '#00071a'
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
                        style={{ backgroundColor: '#002945' }}
                      >
                        <h4>Total Value</h4>
                      </div>
                      <p className="fontS22">
                        $
                        {totalToken.reduce(
                          (a, b) => a + b.investementAmount || 0,
                          0
                        )}
                      </p>
                    </div>
                  </Paper>
                </Grid>
                <Grid sx={{ mt: 3 }}>
                  <Paper
                    style={{
                      textAlign: 'center',
                      backgroundColor: '#00071a'
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
                        style={{ backgroundColor: '#002945' }}
                      >
                        <h4>Total Tokens</h4>
                      </div>
                      <p className="fontS18">
                        {totalToken.reduce((a, b) => a + b.totalToken, 0)}
                      </p>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
              {/* dashboard middle */}
              <Grid item xs={12} md={8} lg={6}>
                <Paper
                  sx={{
                    backgroundColor: '#00071a'
                  }}
                  className="border"
                >
                  <Typography
                    sx={{ textAlign: 'center', color: 'white', mt: 1 }}
                    component="p"
                    variant="h5"
                  >
                    My Total Asset
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <LineCharts user={user} />
                  </div>
                </Paper>
              </Grid>
              {/* dashboard right */}
              <Grid item xs={12} md={8} lg={3} mt={5}>
                <Grid sx={{ mt: 3 }}>
                  <Paper
                    sx={{
                      textAlign: 'center',
                      backgroundColor: '#00071a',
                      maxHeight: '50vh',
                      overflowY: 'scroll'
                    }}
                    className="border hide-scrollbar"
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
                        <h4>Project Tokens</h4>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        color: 'white'
                      }}
                    >
                      {/* <small>Name</small> */}
                      {/* <small>Amount</small>
                  <small>Status</small> */}
                    </div>
                    {projectTokens.map((each, index) => (
                      <div
                        style={{
                          border: '0.5px solid green',
                          margin: '5px 0px 5px 0px',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          padding: '1rem',
                          borderRadius: '8px'
                        }}
                      >
                        <p style={{ color: 'orange', fontWeight: 'bold' }}>
                          {each.token_symbol}
                        </p>
                        <button
                          style={{
                            padding: '2px',
                            color: 'green',
                            borderRadius: '5px',
                            outline: 'none',
                            cursor: 'pointer'
                          }}
                          onClick={(e) => {
                            setPoolToken(each);
                            setTab('create-pool');
                          }}
                        >
                          Create Pool
                        </button>
                        {/* <p style={{ color: 'white' }}>{each.token_name}</p>
                    <p style={{ color: 'white' }}>{each.token_name}</p> */}
                      </div>
                    ))}
                  </Paper>
                </Grid>
                <Grid sx={{ mt: 3 }}></Grid>
              </Grid>
              <Grid item xs={12} md={8} lg={3} mt={5}>
                <Grid sx={{ mt: 3 }}>
                  <Paper
                    sx={{
                      textAlign: 'center',
                      backgroundColor: '#00071a',
                      maxHeight: '50vh',
                      overflowY: 'scroll'
                    }}
                    className="border hide-scrollbar"
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
                        <h4>Pool Request</h4>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        color: 'white'
                      }}
                    >
                      <small>Name</small>
                      <small>Amount</small>
                      <small>Status</small>
                    </div>
                    {pendingToken.map((each, index) => (
                      <TokenRequest
                        fetchTokens={fetchTokens}
                        user={user}
                        each={each}
                        index={index}
                        key={index}
                      />
                    ))}
                    {!pendingToken.length && (
                      <div className="bg2 twhite">
                        <small>No Pending Request</small>
                      </div>
                    )}
                  </Paper>
                </Grid>
                <Grid sx={{ mt: 3 }}></Grid>
              </Grid>
            </Grid>
          </Box>
          {/* second row */}
          <Box
            className="rounded shadow"
            sx={{
              padding: 1,
              width: '95%',
              ml: '2.5%',
              mt: 3,
              mb: 1
            }}
          >
            <Grid container spacing={5} sx={{ p: 1 }}>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <Paper
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#00071a'
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
                      style={{ backgroundColor: '#002945' }}
                    >
                      <h4>Total XMG</h4>
                    </div>
                    <p className="fontS22">$ 3,000,000,000</p>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <Paper
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#00071a'
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
                      style={{ backgroundColor: '#002945' }}
                    >
                      <h4>Total Pecu Coin</h4>
                    </div>
                    <p className="fontS22">{totalCoins}</p>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <Paper
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#00071a'
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
                      style={{ backgroundColor: '#002945' }}
                    >
                      <h4>Total PECU Value</h4>
                    </div>
                    <p className="fontS22">$ {totalValue}</p>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <Paper
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#00071a'
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
                      style={{ backgroundColor: '#002945' }}
                    >
                      <h4>Current Balance</h4>
                    </div>
                    <p className="fontS22">
                      ${' '}
                      {parseInt(
                        totalToken.reduce(
                          (a, b) => a + b.investementAmount || 0,
                          0
                        )
                      ) +
                        parseInt(totalValue) +
                        3000000000}
                    </p>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      {tab === 'create-pool' && (
        <CreatePool
          token={poolToken}
          closeMe={() => {
            setTab('Dashboard')
          }}
        />
      )}
      {tab === 'Profile' && <MyProfile user={user} />}
    </>
  );
}

export default function Tier1Dashboard({ user }) {
  return <DashboardContent user={user} />;
}
