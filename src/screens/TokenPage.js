import {
  Alert,
  Avatar,
  Collapse,
  Grid,
  IconButton,
  LinearProgress
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BuyToken from '../components/Modal/BuyToken';
import GetAppIcon from '@mui/icons-material/GetApp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import url from '../serverUrl';
import Transactions from '../components/Tables/Transactions';
import TokenGraph from '../components/Graphs/TokenGraph.js';
function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'b'
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'm'
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'k'
    : Math.abs(Number(labelValue));
}
const removeDuplicatedToken = (allData) => {
  for (let i = 0; i < allData.length; i++) {
    for (let j = i + 1; j < allData.length; j++) {
      if (allData[i].symbol == allData[j].symbol) {
        allData[i].wrapAmount = allData[j].wrapAmount + allData[i].wrapAmount;
        allData[i].initialFinal =
          allData[j].initialFinal + allData[i].initialFinal;
        allData = allData.filter((e) => e !== allData[j]);
      }
    }
  }

  for (let i = 0; i < allData.length; i++) {
    for (let j = i + 1; j < allData.length; j++) {
      if (allData[i].symbol == allData[j].symbol) {
        return removeDuplicatedToken(allData);
      }
    }
  }

  return allData;
};
export default function TokenPage({ pecuCoins, user }) {
  const [data, setData] = useState({});
  const tokenSymbol = useParams().tokenSymbol;
  const token = {
    tokenName: data?.baseToken,
    timestamp: data?.date_time,
    firstPrice: data?.firstPrice,
    id: data?.id,
    initialFinal: data?.initialFinal,
    pecuInvestement: data?.pecuInvestement,
    pecuValue: data?.pecuValue,
    public_key: data?.public_key,
    tokenSymbol: data?.symbol
  };
  const [loading, setLoading] = useState(false);
  const [cryptoData, setCryptoData] = useState([]);
  const [alert, setAlert] = useState({
    msg: '',
    type: '',
    show: false
  });
  const [currentValue, setCurrentValue] = useState(0);
  const [tokenPrice, setTokenPrice] = useState([
    {
      currentPrice: null,
      previousPrice: null
    }
  ]);
  const get_current_index_coin = () => {
    axios
      .get(`${url}/wallet/get_current_index_coin`)
      .then((res) => {
        setCurrentValue(res.data[0].value);
      })
      .catch((err) => {
        console?.log(err);
      });
  };

  const get_crypto_Data = () => {
    axios.get(`https://mhiservers2.com/crypto/index`).then((res) => {
      const findtoken = res.data?.filter(
        (e) => e.symbol === token.tokenSymbol?.slice(1)
      );
      setCryptoData(findtoken[0]);
      console.log(findtoken[0]);
    });
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}/wallet/get_my_tokens_wrap?symbol=${tokenSymbol}`)
      .then((res) => {
        if (res.data.status) {
          const token = removeDuplicatedToken(res.data.tokens);
          setData(token[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [tokenSymbol]);
  useEffect(() => {
    get_current_index_coin();
    get_crypto_Data();
  }, []);

  const currentPrice = tokenPrice[0]?.currentPrice;
  const previousPrice = tokenPrice[0]?.previousPrice;
  // const [priceUp, setPriceUp] = useState(true);
  // const [priceVarriation, setPriceVarriation] = useState(0);
  let priceUp = true;
  let priceVarriation = false;
  if (currentPrice && previousPrice && currentPrice > previousPrice) {
    priceVarriation = currentPrice - previousPrice;
    priceUp = true;
  }
  if (currentPrice && previousPrice && currentPrice < previousPrice) {
    priceVarriation = previousPrice - currentPrice;
    priceUp = false;
  }
  const tokenPriceIncreasePercentage = (priceVarriation / previousPrice) * 100;

  return (
    <>
      {loading && (
        <div>
          <LinearProgress sx={{ backgroundColor: 'grey' }} />
        </div>
      )}
      {
        <Box sx={{ padding: { xs: 1, md: '1rem 4rem' } }}>
          <Grid
            width={'100%'}
            container
            spacing={1}
            padding={{ xs: 0, md: 0 }}
            mb={1}
          >
            <Grid item xs={12} md={6}>
              <div>
                <Link
                  to={`/`}
                  style={{ fontSize: '1rem', fontWeight: '500' }}
                >{`Home `}</Link>
                <Link
                  to={`/tokens`}
                  style={{ fontSize: '1rem', fontWeight: '500' }}
                >
                  {' >'} Tokens
                </Link>
                <span
                  style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: 'white'
                  }}
                >
                  {' >'} {token?.tokenSymbol}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '2rem 0 0 1rem',
                  width: 'fit-content'
                }}
              >
                <Avatar
                  className="rounded"
                  src={`null`}
                  alt={token.tokenSymbol?.slice(1)}
                  style={{
                    backgroundColor: 'orange',
                    height: '25px',
                    width: '25px',
                    fontSize: '18px'
                  }}
                />
                <p
                  style={{
                    color: 'white',
                    marginLeft: '5px',
                    fontSize: '24px',
                    fontWeight: '500',
                    fontFamily: 'Inter var sans-serif'
                  }}
                >
                  <span style={{ textTransform: 'lowercase' }}>
                    {`${token?.tokenSymbol?.slice(0, 1)}`}
                  </span>
                  {token?.tokenSymbol?.slice(1)}
                </p>
              </div>
              <div
                style={{
                  marginTop: '0.5rem',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  minWidth: '90vw',
                  width: '100%',
                  flexWrap: 'wrap'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    minWidth: '60%',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      fontWeight: '400',
                      color: 'white',
                      margin: '0.5rem ',
                      cursor: 'pointer',
                      alignItems: 'center'
                    }}
                  >
                    <p
                      style={{
                        fontSize: '24px',
                        fontWeight: 500,
                        marginLeft: '5px'
                      }}
                    >
                      {convertToInternationalCurrencySystem(
                        (data?.initialFinal / data?.wrapAmount).toFixed(2)
                      )}
                    </p>
                    <small style={{ fontSize: '16px', color: 'green' }}>
                      <ArrowUpwardIcon sx={{ fontSize: '13px' }} />
                      0.00 %
                    </small>
                  </div>
                  {token?.otherToken && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: 'rgb(64, 68, 79)',
                        padding: '4px 6px',
                        borderRadius: '8px',
                        fontWeight: '400',
                        boxSizing: 'border-box',
                        maxWidth: 'fit-content',
                        color: 'white',
                        margin: '1rem ',
                        cursor: 'pointer',
                        minWidth: '200px'
                      }}
                    >
                      <Avatar
                        className="rounded"
                        src={`hfj`}
                        alt={token?.otherToken}
                        style={{
                          width: '22px',
                          height: '22px',
                          color: 'rgb(86, 90, 105)',
                          backgroundColor: 'orange'
                        }}
                      />
                      <p
                        style={{
                          fontSize: '16px',
                          fontWeight: 500,
                          marginLeft: '5px'
                        }}
                      >
                        1 {token?.otherToken} ={' '}
                        {convertToInternationalCurrencySystem(
                          cryptoData?.filter(
                            (e) => e?.symbol == token?.othertoken?.slice(1)
                          )[0]?.price
                        )}{' '}
                        USD
                      </p>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirectino: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  {' '}
                  <IconButton
                    className="dfelxalitemC shadow"
                    sx={{
                      backgroundColor: 'rgb(64, 68, 79)',
                      color: 'rgb(195, 197, 203)',
                      // padding: "8px 14px",
                      borderRadius: '12px',
                      cursor: 'pointer',
                      // width: "170px",
                      marginRight: '1rem',
                      fontWeight: '800',
                      maxHeight: '40px',
                      fontSize: '18px'
                    }}
                  >
                    <GetAppIcon />
                    {/* <p>Add Liquidity</p> */}
                  </IconButton>
                  {/* buy token modal */}
                  <BuyToken each={token} pecuCoins={pecuCoins} user={user} />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end'
                }}
              ></div>
            </Grid>
            <Grid item xs={12} md={4} mt={3}>
              <div
                style={{
                  backgroundColor: 'rgb(25, 27, 31)',
                  borderRadius: '20px',
                  height: '100%',
                  padding: '1.5rem',
                  maxWidth: '350px'
                }}
                className="shadowGrey"
              >
                <div style={{ marginBottom: '1rem' }}>
                  <p className="token-page-t1 mb-1">TVL</p>
                  <p className="token-page-t2 mb-1">
                    {' '}
                    $
                    {convertToInternationalCurrencySystem(
                      data?.wrapAmount * data?.initialFinal
                    )}
                  </p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <p className="token-page-t1 mb-1">24h Trading Vol</p>
                  <p className="token-page-t2 mb-1">
                    {/* {convertToInternationalCurrencySystem(data?.initialFinal)} */}
                    0.00
                  </p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <p className="token-page-t1 mb-1">7d Trading Vol</p>
                  <p className="token-page-t2 mb-1">
                    0.00
                    {/* {convertToInternationalCurrencySystem(data?.initialFinal)} */}
                  </p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <p className="token-page-t1 mb-1">24h Fees</p>
                  <p
                    className="token-page-t2 mb-1"
                    style={{
                      marginTop: '0.5rem',
                      fontSize: '24px'
                    }}
                  >
                    {/* $
                    {convertToInternationalCurrencySystem(
                      cryptoData?.price?.toFixed(5)
                    )} */}
                    0.00%
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={8} sx={{ marginTop: { xs: 8, md: 3 } }}>
              <Box sx={{ height: '100%' }}>
                <div
                  style={{
                    backgroundColor: 'rgb(25, 27, 31)',
                    height: '100%',
                    borderRadius: '20px',
                    padding: '1.5rem'
                  }}
                  className="shadowGrey"
                >
                  <TokenGraph id={token?.id} setTokenPrice={setTokenPrice} />
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} mt={5}>
              {/* <TopToken /> */}
              <Transactions />
            </Grid>
          </Grid>
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
        </Box>
      }
    </>
  );
}
