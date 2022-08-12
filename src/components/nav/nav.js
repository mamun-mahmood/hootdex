import React, { useEffect, useState } from 'react';
import './style.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

import ConnectWallet from '../Modal/ConnectWallet';
import {
  Avatar,
  Button,
  ClickAwayListener,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/system';
import url from '../../serverUrl';
import { Grid3x3Outlined } from '@mui/icons-material';
export default function Nav({ fetchWallet, wallet }) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [showSugesstion, setShowSugesstion] = useState(false);
  const [currentValue, setCurrentValue] = useState(null);
  const findUser = async () => {
    let data = localStorage.getItem('hootdex_secretcookie');
    if (data) {
      setUser(JSON.parse(data));
    }
  };
  const get_current_index_coin = () => {
    axios
      .get(`${url}/wallet/get_current_index_coin`)
      .then((res) => {
        setCurrentValue(res.data[0].value);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const location = useLocation();
  useEffect(() => {
    setUser(null);
    findUser();
    get_current_index_coin();
  }, [location]);

  useEffect(() => {
    findUser();
  }, []);
  const [searchKey, setSearchKey] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (searchKey) {
    //   fetchToken(searchKey);
    // } else fetchToken("all");
  };
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [block, setBlock] = useState('');
  const fetchToken = (target) => {
    if (target === 'all') {
      setLoading(true);
      axios
        .get(`${url}/hootdex/available-tokens`)
        .then((res) => {
          setTokens(res.data);
          setBlock(Math.ceil(Math.random() * 5 * 1000000));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      setTokens(tokens.filter((each) => each.symbol === target));
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchToken('all');
  }, []);
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <Grid container className="nav">
        <Grid item xs={6}  md={3} className="">
          <Link to="/" className="logo__header">
            <Box sx={{ width: { xs: 100, sm: 150, md: 180 } }}>
              <img src={logo} alt="nav_logo" width={'100%'} />
            </Box>
          </Link>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                padding: '2px',
                borderRadius: '5px',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600',
                opacity: '60%',
                margin: '0 5px 0 3px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <p>Latest synced block: {block}</p>
              <div
                style={{
                  backgroundColor: 'yellow',
                  width: '10px',
                  height: '10px',
                  borderRadius: '10px',
                  margin: '0 4px 0 4px'
                }}
              ></div>
            </div>
            <small
              style={{
                color: 'white',
                fontSize: '11px',
                fontWeight: 'bold',
                opacity: '60%',
                margin: '0 5px 0 3px'
              }}
            >
              PECU PRICE : {currentValue} USD
            </small>
          </div>
        </Grid>
        <Grid item xs={6}  md={3} sx={{ textAlign: { xs: 'end', md: 'start' } }}>
          {true ? (
            <>
              {JSON.parse(
                localStorage.getItem('hootdex_secretcookie_wallet')
              ) ? (
                <Link to="">
                  <Button
                    sx={{
                      display: { xs: 'none', md: 'inline-block' },
                      color: 'white',
                      textTransform: 'capitalize'
                    }}
                    onClick={() => {
                      localStorage.removeItem('hootdex_secretcookie_wallet');
                      fetchWallet();
                    }}
                  >
                    Disconnect Wallet
                  </Button>
                </Link>
              ) : (
                <Button
                  sx={{
                    display: { xs: 'none', sm: 'inline-block' },
                    color: 'white',
                    textTransform: 'capitalize',
                    mb: 1
                  }}
                  onClick={handleOpen}
                >
                  Connect Wallet
                </Button>
              )}
              <Link to="/dashboard">
                {' '}
                <Button
                  sx={{
                    // display: { xs: 'none', md: 'inline-block' },
                    color: 'white',
                    textTransform: 'capitalize'
                    // m: 1,
                  }}
                >
                  MVault
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/login">
              {' '}
              <Button
                sx={{
                  color: 'white',
                  textTransform: 'capitalize'
                  // m: 1,
                }}
              >
                Login
              </Button>
            </Link>
          )}
          <Link to="/wallet">
            {' '}
            <Button
              sx={{
                color: 'white',
                textTransform: 'capitalize'
                // m: 1,
              }}
            >
              More
            </Button>
          </Link>
        </Grid>
        <Grid item xs={10}  md={6} >
          <Box
            sx={{
              // width: { xs: '100%', md: '80%', lg: '55%' },
              position: 'relative',
              marginTop: { xs: 1 }
            }}
          >
            <form
              style={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center'
              }}
              onSubmit={handleSubmit}
            >
              <ClickAwayListener onClickAway={() => setShowSugesstion(false)}>
                <input
                  style={{
                    height: '0.8rem'
                    // width: '80%'
                  }}
                  onClick={() => setShowSugesstion(true)}
                  className={`${showSugesstion && ''} "border searchField "`}
                  type="text"
                  placeholder="Search for token..."
                  name="searchKey"
                  value={searchKey}
                  autocomplete="off"
                  onChange={(e) => setSearchKey(e.target.value)}
                />
              </ClickAwayListener>
            </form>
            {/* <div className="search-sugesstion-container"> */}
            {showSugesstion && (
              <TableContainer
                sx={{
                  backgroundColor: '#1a1b1f',
                  // mt: "70px",
                  borderBottomLeftRadius: '1rem',
                  borderBottomRightRadius: '1rem',
                  position: 'absolute',
                  // left: 0,
                  width: '100%',
                  animation: 'fadeIn 0.4s ease-in-out',
                  top: {xs: 50, lg: 65},
                  border: '2px solid #01402b',
                  borderTop: 'none'
                }}
                className="borderGrey hide-scrollbar shadow"
                component={Paper}
              >
                {tokens.length ? (
                  <Table
                    sx={{
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: ' 1px solid #1e2128'
                      },
                      width: '100%'
                    }}
                  >
                    <TableHead className="">
                      <TableRow className="">
                        {/* {poolTableAttributes.map((e, index) => ( */}
                        {/* <TableCell className="twhite" component="th" scope="row">
                    #
                  </TableCell> */}
                        <TableCell className="twhite">Name</TableCell>
                        {/* <TableCell className="twhite" align="center">
                        Price
                      </TableCell>
                      <TableCell className="twhite" align="center">
                        Available Tokens
                      </TableCell>
                      <TableCell className="twhite" align="center">
                        Volume
                      </TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tokens.length &&
                        tokens.map((each, index) => (
                          <TableRow key={each.id}>
                            {/* <TableCell className="twhite" component="th" scope="row">
                    {each.id}
                  </TableCell> */}
                            <TableCell className="twhite" align="left">
                              <Link to={`/pools/${each.tokenSymbol}`}>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}
                                >
                                  <Avatar
                                    className="rounded"
                                    src={`${url}/hootdex/images/${each?.logo_src}`}
                                    alt="token logo"
                                    style={{ width: '20px', height: '20px' }}
                                  />
                                  <Avatar
                                    className="rounded"
                                    src={`https://pecunovus.net/static/media/icon.25c8ec299d961b9dd524.ico`}
                                    alt="token logo"
                                    style={{ width: '20px', height: '20px' }}
                                  />
                                  <span
                                    style={{
                                      marginLeft: '1rem',
                                      fontSize: '20px'
                                    }}
                                  >
                                    {each.tokenName}{' '}
                                    <small style={{ color: '#696c75' }}>
                                      ({`${each.tokenSymbol}/PECU`})
                                    </small>
                                  </span>
                                </div>
                              </Link>
                            </TableCell>
                            {/* <TableCell className="twhite green" align="left">
                            {each.tokenPrice}
                          </TableCell>
                          <TableCell className="twhite yellow" align="left">
                            {each.totalToken}
                          </TableCell>
                          <TableCell className="twhite pink" align="left">
                            {each.investementAmount}
                          </TableCell> */}
                          </TableRow>
                        ))}

                      {/* <TablePagination
                sx={{ color: "white" }}
                rowsPerPageOptions={[10, 50]}
                onChange={(e) => setRows(e)}
              /> */}
                    </TableBody>
                  </Table>
                ) : (
                  <p style={{ textAlign: 'center', color: 'white' }}>
                    Nothing to show !
                  </p>
                )}
              </TableContainer>
            )}
          </Box>
        </Grid>
        {/* </div> */}
      </Grid>
      <ConnectWallet
        setOpen={setOpen}
        open={open}
        fetchWallet={fetchWallet}
        wallet={wallet}
      />
    </>
  );
}
