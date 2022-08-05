import {
  Alert,
  Avatar,
  Collapse,
  Grid,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import BuyToken from "../components/Modal/BuyToken";
import GetAppIcon from "@mui/icons-material/GetApp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PoolGraph from "../components/Graphs/PoolGraph";
import url from "../serverUrl";
import Transactions from "../components/Tables/Transactions";
function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "b"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "m"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "k"
    : Math.abs(Number(labelValue));
}
export default function PoolPage({ pecuCoins, user }) {
  const id = useParams().id;
  const pool_id = window.atob(id);
  const [pool, setPool] = useState({});
  const [loading, setLoading] = useState(false);

  const [cryptoData, setCryptoData] = useState([]);
  const [alert, setAlert] = useState({
    msg: "",
    type: "",
    show: false,
  });
  const [currentValue, setCurrentValue] = useState(0);
  const [tokenPrice, setTokenPrice] = useState([
    {
      currentPrice: null,
      previousPrice: null,
    },
  ]);
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

  const get_crypto_Data = () => {
    axios.get(`${url}/crypto/index`).then((res) => {
      setCryptoData(res.data);
    });
  };
  const date = new Date().toLocaleDateString();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}/hootdex/liquidity-pool-info/?id=${pool_id}`)
      .then((res) => {
        setPool(res.data.data[0]);
        console.log(res.data.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setAlert({
          msg: "There was an error",
          type: "error",
          show: true,
        });
        setTimeout(() => {
          setAlert({
            msg: "There was an error",
            type: "error",
            show: false,
          });
        }, 3000);
        console.log(err);
      });
  }, [pool_id]);
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
          <LinearProgress sx={{ backgroundColor: "grey" }} />
        </div>
      )}
      {!loading &&
        cryptoData.length > 0 &&
        pool?.project_token_symbol &&
        currentValue && (
          <Box sx={{ padding: { xs: 1, md: "1rem 4rem" } }}>
            <Grid
              width={"100%"}
              container
              spacing={1}
              padding={{ xs: 0, md: 0 }}
              mb={1}
            >
              <Grid item xs={12} md={6}>
                <div>
                  <Link
                    to={`/`}
                    style={{ fontSize: "1rem", fontWeight: "500" }}
                  >{`Home  >  Pools  >  ${pool?.project_token_symbol} ${
                    pool?.wrap_token_symbol
                      ? `/ ${pool?.wrap_token_symbol
                          .split("")
                          .map((e, i) => (i == 0 ? e.toLowerCase() : e))
                          .join("")}`
                      : null
                  } / PECU `}</Link>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "2rem 0 0 1rem",
                    width: "fit-content",
                  }}
                >
                  <Avatar
                    className="rounded"
                    src={`${url}/hootdex/images/${pool?.logo_src}`}
                    alt="token logo"
                    style={{
                      width: "24px",
                      height: "24px",
                      color: "rgb(86, 90, 105)",
                    }}
                  />
                  <Avatar
                    className="rounded"
                    src={`https://pecunovus.net/static/media/icon.25c8ec299d961b9dd524.ico`}
                    alt="token logo"
                    style={{
                      width: "24px",
                      height: "24px",
                      color: "rgb(86, 90, 105)",
                    }}
                  />
                  <p
                    style={{
                      color: "white",
                      marginLeft: "5px",
                      fontSize: "24px",
                      fontWeight: "500",
                      fontFamily: "Inter var sans-serif",
                    }}
                  >
                    {`${pool?.project_token_symbol} ${
                      pool?.wrap_token_symbol
                        ? `/ ${pool?.wrap_token_symbol
                            .split("")
                            .map((e, i) => (i == 0 ? e.toLowerCase() : e))
                            .join("")}`
                        : null
                    } / PECU`}
                  </p>
                  <p
                    className="token-page-t2"
                    style={{
                      fontSize: "13px",
                      backgroundColor: "rgb(64, 68, 79)",
                      padding: "2px",
                      borderRadius: "8px",
                      fontWeight: "400",
                      boxSizing: "border-box",
                      cursor: "pointer",
                      fontFamily: "arial",
                      marginLeft: "6px",
                    }}
                  >
                    {pool.investementAmount +
                      pool?.pecu_amount * currentValue +
                      pool?.wrap_token_amount *
                        cryptoData?.filter(
                          (e) => e.symbol == pool?.wrap_token_symbol.slice(1)
                        )[0].price >
                    pool.firstTVL ? (
                      <small style={{ fontSize: "13px" }}>
                        <ArrowUpwardIcon sx={{ fontSize: "13px" }} />
                        {pool.investementAmount +
                          pool?.pecu_amount * currentValue +
                          pool?.wrap_token_amount *
                            cryptoData?.filter(
                              (e) =>
                                e.symbol == pool?.wrap_token_symbol.slice(1)
                            )[0].price >
                        pool.firstTVL
                          ? (
                              (Math.abs(
                                pool.investementAmount +
                                  pool?.pecu_amount * currentValue +
                                  pool?.wrap_token_amount *
                                    cryptoData?.filter(
                                      (e) =>
                                        e.symbol ==
                                        pool?.wrap_token_symbol.slice(1)
                                    )[0].price -
                                  pool.firstTVL
                              ) *
                                100) /
                              pool.firstTVL
                            ).toFixed(2)
                          : "0.00"}
                        %
                      </small>
                    ) : (
                      <small style={{ fontSize: "13px" }}>
                        <ArrowDownwardIcon sx={{ fontSize: "13px" }} />
                        {pool.investementAmount +
                          pool?.pecu_amount * currentValue +
                          pool?.wrap_token_amount *
                            cryptoData?.filter(
                              (e) =>
                                e.symbol == pool?.wrap_token_symbol.slice(1)
                            )[0].price <
                        pool.firstTVL
                          ? (
                              (Math.abs(
                                pool.investementAmount +
                                  pool?.pecu_amount * currentValue +
                                  pool?.wrap_token_amount *
                                    cryptoData?.filter(
                                      (e) =>
                                        e.symbol ==
                                        pool?.wrap_token_symbol.slice(1)
                                    )[0].price -
                                  pool.firstTVL
                              ) *
                                100) /
                              pool.firstTVL
                            ).toFixed(2)
                          : "0.00"}
                        %
                      </small>
                    )}
                  </p>
                </div>
                {/* <div
              style={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              {' '}
              <div className="dfelxalitemC">
                <Avatar
                  src={`${url}/hootdex/images/${token?.logo_src}`}
                  alt={token.tokenName}
                />
                <p
                  style={{
                    color: 'white',
                    marginLeft: '1rem',
                    fontSize: '26px',
                    fontWeight: '500',
                    fontFamily: 'arial'
                  }}
                >
                  {token?.tokenName}{' '}
                  <span
                    style={{ fontSize: '20px', color: 'rgb(195, 197, 203)' }}
                  >
                    ({token?.tokenSymbol})
                  </span>{' '}
                </p>
              </div>
              <div className="dfelxalitemC" style={{ marginLeft: '1rem' }}>
                <Avatar
                  src={`https://pecunovus.net/static/media/icon.25c8ec299d961b9dd524.ico`}
                  alt={token.tokenName}
                />
                <p
                  style={{
                    color: 'white',
                    marginLeft: '1rem',
                    fontSize: '26px',
                    fontWeight: '500',
                    fontFamily: 'arial'
                  }}
                >
                  {'PECU'}{' '}
                  <span
                    style={{ fontSize: '20px', color: 'rgb(195, 197, 203)' }}
                  >
                    ({'PECU'})
                  </span>{' '}
                </p>
              </div>
            </div> */}
                <div
                  style={{
                    marginTop: "0.5rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    minWidth: "90vw",
                    width: "100%",

                    flexWrap: "wrap",
                  }}
                >
                  {/* <p
                className="token-page-t2"
                style={{
                  marginTop: '0.5rem',
                  fontSize: '18px'
                }}
              >
                ${token?.currentPrice?.toFixed(5)}{' '}
                {priceUp ? (
                  <small style={{ fontSize: '18px', color: '#4caf50' }}>
                    (<ArrowUpwardIcon sx={{ fontSize: '18px' }} />
                    {tokenPriceIncreasePercentage?.toFixed(2)}%)
                  </small>
                ) : (
                  <small style={{ fontSize: '18px', color: 'red' }}>
                    (<ArrowDownwardIcon sx={{ fontSize: '18px' }} />
                    {tokenPriceIncreasePercentage?.toFixed(2)}%)
                  </small>
                )}
              </p> */}
                  <div
                    style={{
                      display: "flex",
                      minWidth: "60%",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "rgb(64, 68, 79)",
                        padding: "4px 6px",
                        borderRadius: "8px",
                        fontWeight: "400",
                        boxSizing: "border-box",
                        maxWidth: "fit-content",
                        color: "white",
                        margin: "1rem ",
                        cursor: "pointer",
                        minWidth: "200px",
                      }}
                    >
                      <Avatar
                        className="rounded"
                        src={`${url}/hootdex/images/${pool?.logo_src}`}
                        alt="token logo"
                        style={{
                          width: "22px",
                          height: "22px",
                          color: "rgb(86, 90, 105)",
                        }}
                      />
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          marginLeft: "5px",
                        }}
                      >
                        {}1 {pool?.project_token_symbol} ={" "}
                        {convertToInternationalCurrencySystem(
                          (
                            ((pool.project_token_amount +
                              Math.abs(
                                pool?.pecuCoin * currentValue +
                                  pool?.wrap_token_amount *
                                    cryptoData?.filter(
                                      (e) =>
                                        e.symbol ==
                                        pool?.wrap_token_symbol.slice(1)
                                    )[0].price -
                                  pool.firstTVL
                              )) /
                              pool.project_token_amount) *
                            pool?.project_token_price
                          ).toFixed(2)
                        )}
                        USD
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "rgb(64, 68, 79)",
                        padding: "4px 6px",
                        borderRadius: "8px",
                        fontWeight: "400",
                        boxSizing: "border-box",
                        maxWidth: "fit-content",
                        color: "white",
                        margin: "1rem ",
                        cursor: "pointer",
                        minWidth: "200px",
                      }}
                    >
                      <Avatar
                        className="rounded"
                        src={`https://pecunovus.net/static/media/icon.25c8ec299d961b9dd524.ico`}
                        alt="token logo"
                        style={{
                          width: "22px",
                          height: "22px",
                          color: "rgb(86, 90, 105)",
                        }}
                      />
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          marginLeft: "5px",
                        }}
                      >
                        1 {"PECU"} = {currentValue?.toFixed(2)} USD
                      </p>
                    </div>
                    {pool?.wrap_token_symbol && (
                      <Link
                        to={`/tokens/tokenid`}
                        state={pool?.wrap_token_symbol}
                        // pecuCoins={currentValue}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            backgroundColor: "rgb(64, 68, 79)",
                            padding: "4px 6px",
                            borderRadius: "8px",
                            fontWeight: "400",
                            boxSizing: "border-box",
                            maxWidth: "fit-content",
                            color: "white",
                            margin: "1rem ",
                            cursor: "pointer",
                            minWidth: "200px",
                          }}
                        >
                          <Avatar
                            className="rounded"
                            src={`hfj`}
                            alt={pool?.wrap_token_symbol}
                            style={{
                              width: "22px",
                              height: "22px",
                              color: "rgb(86, 90, 105)",
                              backgroundColor: "orange",
                            }}
                          />
                          <p
                            style={{
                              fontSize: "16px",
                              fontWeight: 500,
                              marginLeft: "5px",
                            }}
                          >
                            1{" "}
                            {pool?.wrap_token_symbol
                              .split("")
                              .map((e, i) => (i == 0 ? e.toLowerCase() : e))
                              .join("")}
                            ={" "}
                            {convertToInternationalCurrencySystem(
                              cryptoData.filter(
                                (e) =>
                                  e.symbol == pool?.wrap_token_symbol.slice(1)
                              )[0].price
                            )}{" "}
                            USD
                          </p>
                        </div>
                      </Link>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirectino: "row",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {" "}
                    <IconButton
                      className="dfelxalitemC shadow"
                      sx={{
                        backgroundColor: "rgb(64, 68, 79)",
                        color: "rgb(195, 197, 203)",
                        // padding: "8px 14px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        // width: "170px",
                        marginRight: "1rem",
                        fontWeight: "800",
                        maxHeight: "40px",
                        fontSize: "18px",
                      }}
                    >
                      <GetAppIcon />
                      <p>Add Liquidity</p>
                    </IconButton>
                    {/* buy token modal */}
                    <BuyToken pool={pool} pecuCoins={pecuCoins} user={user} />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                ></div>
              </Grid>
              <Grid item xs={12} md={4} mt={3}>
                <div
                  style={{
                    backgroundColor: "rgb(25, 27, 31)",
                    borderRadius: "20px",
                    height: "100%",
                    padding: "1.5rem",
                    maxWidth: "350px",
                  }}
                  className="shadowGrey"
                >
                  <div style={{ marginBottom: "1rem" }}>
                    <div
                      className="glassmorphosism"
                      style={{ padding: "1rem" }}
                    >
                      <p
                        className="token-page-t2 mb-1"
                        style={{ fontSize: "1rem", fontFamily: "arial" }}
                      >
                        Total Tokens Locked
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            margin: "0.5rem",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              flexDriection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              className="rounded"
                              src={`${url}/hootdex/images/${pool?.logo_src}`}
                              alt="token logo"
                              style={{ width: "20px", height: "20px" }}
                            />
                            <p
                              style={{
                                color: "white",
                                marginLeft: "1rem",
                                fontSize: "13px",
                                fontWeight: "bold",
                                fontFamily: "arial",
                              }}
                            >
                              {pool?.project_token_symbol}:
                            </p>
                          </span>

                          <p
                            style={{
                              color: "white",
                              marginLeft: "1rem",
                              fontSize: "13px",
                              fontWeight: "bold",
                              fontFamily: "arial",
                            }}
                          >
                            {` ${convertToInternationalCurrencySystem(
                              pool?.project_token_amount
                            )}`}
                            {/* <br></br>$
                        {convertToInternationalCurrencySystem(
                          token.investementAmount
                        )} */}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                            margin: "0.5rem",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              flexDriection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              className="rounded"
                              src={`https://pecunovus.net/static/media/icon.25c8ec299d961b9dd524.ico`}
                              alt="token logo"
                              style={{ width: "20px", height: "20px" }}
                            />{" "}
                            <p
                              style={{
                                color: "white",
                                marginLeft: "1rem",
                                fontSize: "13px",
                                fontWeight: "bold",
                                fontFamily: "arial",
                              }}
                            >
                              {`PECU :`}
                              {/* <br></br>$
                      {convertToInternationalCurrencySystem(token.pecuCoin)} */}
                            </p>
                          </span>

                          <p
                            style={{
                              color: "white",
                              marginLeft: "1rem",
                              fontSize: "13px",
                              fontWeight: "bold",
                              fontFamily: "arial",
                            }}
                          >
                            {`${convertToInternationalCurrencySystem(
                              pool?.pecu_amount
                            )}`}
                            {/* <br></br>$
                        {convertToInternationalCurrencySystem(token.pecuCoin)} */}
                          </p>
                        </div>
                        {pool?.wrap_token_symbol && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "flex-start",
                              margin: "0.5rem",
                              width: "100%",
                              justifyContent: "space-between",
                            }}
                          >
                            {" "}
                            <span
                              style={{
                                display: "flex",
                                flexDriection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Avatar
                                className="rounded"
                                src={`hjh`}
                                alt={pool?.wrap_token_symbol}
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  backgroundColor: "orange",
                                }}
                              />
                              <p
                                style={{
                                  color: "white",
                                  marginLeft: "1rem",
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  fontFamily: "arial",
                                }}
                              >
                                {`${pool?.wrap_token_symbol
                                  .split("")
                                  .map((e, i) => (i == 0 ? e.toLowerCase() : e))
                                  .join("")} : 
                          `}
                              </p>
                            </span>
                            <p
                              style={{
                                color: "white",
                                marginLeft: "1rem",
                                fontSize: "13px",
                                fontWeight: "bold",
                                fontFamily: "arial",
                              }}
                            >
                              {`${convertToInternationalCurrencySystem(
                                pool?.wrap_token_amount
                              )}
                          `}
                              {/* <br></br>$
                          {convertToInternationalCurrencySystem(
                            token.otherTokenAmount
                          )} */}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="token-page-t1 mb-1">TVL</p>
                    <p
                      className="token-page-t2 mb-1"
                      style={{ fontSize: "24px" }}
                    >
                      $
                      {convertToInternationalCurrencySystem(
                        pool?.project_token_amount * pool?.project_token_price +
                          pool?.pecu_amount * pool?.pecu_price +
                          pool?.wrap_token_price * pool?.wrap_token_amount
                      )}
                    </p>
                    {/* <small style={{ fontSize: "18px", color: "red" }}>
                  <ArrowDownwardIcon sx={{ fontSize: "18px" }} />
                  10.89%
                </small>{" "} */}
                  </div>
                  {/* <div style={{ marginBottom: '1rem' }}>
           
                <p className="token-page-t1 mb-1">Total amount</p>
                <p className="token-page-t2 mb-1">{token?.totalToken}</p>
              
              </div> */}

                  {/* <div style={{ marginBottom: '1rem' }}>
            
                <p className="token-page-t1 mb-1">Initial Price</p>
                <p className="token-page-t2 mb-1">
                  ${token?.tokenPrice?.toFixed(5)}
                </p>
              </div> */}

                  <p className="token-page-t2">
                    {" "}
                    <p className="token-page-t1 mb-1">Volume 24h</p>
                    {/* {tokenPrice[0]?.previousPrice} */}
                    <p
                      style={{
                        marginTop: "0.5rem",
                        fontSize: "24px",
                      }}
                    >
                      {" "}
                      {pool?.volume
                        ? convertToInternationalCurrencySystem(
                            (pool.volume / pool?.pecu_amount) * currentValue
                          )
                        : "00"}
                    </p>
                    {pool.investementAmount +
                      pool?.pecu_amount * currentValue +
                      pool?.wrap_token_amount *
                        cryptoData?.filter(
                          (e) => e.symbol == pool?.wrap_token_symbol.slice(1)
                        )[0].price >
                    pool.firstTVL ? (
                      <small style={{ fontSize: "15px", color: "green" }}>
                        <ArrowUpwardIcon
                          sx={{ fontSize: "15px", color: "green" }}
                        />
                        {pool.investementAmount +
                          pool?.pecu_amount * currentValue +
                          pool?.wrap_token_amount *
                            cryptoData?.filter(
                              (e) =>
                                e.symbol == pool?.wrap_token_symbol.slice(1)
                            )[0].price >
                        pool.firstTVL
                          ? (
                              (Math.abs(
                                pool.investementAmount +
                                  pool?.pecu_amount * currentValue +
                                  pool?.wrap_token_amount *
                                    cryptoData?.filter(
                                      (e) =>
                                        e.symbol ==
                                        pool?.wrap_token_symbol.slice(1)
                                    )[0].price -
                                  pool.firstTVL
                              ) *
                                100) /
                              pool.firstTVL
                            ).toFixed(2)
                          : "0.00"}
                        %
                      </small>
                    ) : (
                      <small style={{ fontSize: "13px" }}>
                        <ArrowDownwardIcon sx={{ fontSize: "13px" }} />
                        {pool.investementAmount +
                          pool?.pecu_amount * currentValue +
                          pool?.wrap_token_amount *
                            cryptoData?.filter(
                              (e) =>
                                e.symbol == pool?.wrap_token_symbol.slice(1)
                            )[0].price <
                        pool.firstTVL
                          ? (
                              (Math.abs(
                                pool.investementAmount +
                                  pool?.pecu_amount * currentValue +
                                  pool?.wrap_token_amount *
                                    cryptoData?.filter(
                                      (e) =>
                                        e.symbol ==
                                        pool?.wrap_token_symbol.slice(1)
                                    )[0].price -
                                  pool.firstTVL
                              ) *
                                100) /
                              pool.firstTVL
                            ).toFixed(2)
                          : "0.00"}
                        %
                      </small>
                    )}
                  </p>
                  <br></br>
                  <div style={{ marginBottom: "1rem" }}>
                    <p className="token-page-t1 mb-1">24h Fees</p>
                    <p
                      className="token-page-t2 mb-1"
                      style={{
                        marginTop: "0.5rem",
                        fontSize: "24px",
                      }}
                    >
                      $
                      {/* {convertToInternationalCurrencySystem(
                      token?.currentPrice?.toFixed(5)
                    )} */}
                      {pool?.fees
                        ? convertToInternationalCurrencySystem(
                            (
                              ((pool?.project_token_amount +
                                Math.abs(
                                  pool.investementAmount +
                                    pool?.pecu_amount * currentValue +
                                    pool?.wrap_token_amount *
                                      cryptoData?.filter(
                                        (e) =>
                                          e.symbol ==
                                          pool?.wrap_token_symbol.slice(1)
                                      )[0].price -
                                    pool.firstTVL
                                )) /
                                pool?.project_token_amount) *
                              pool?.project_token_price
                            ).toFixed(2)
                          )
                        : "0.00%"}
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={8} sx={{ marginTop: { xs: 8, md: 3 } }}>
                <Box sx={{ height: "100%" }}>
                  <div
                    style={{
                      backgroundColor: "rgb(25, 27, 31)",
                      height: "100%",
                      borderRadius: "20px",
                      padding: "1.5rem",
                    }}
                    className="shadowGrey"
                  >
                    <PoolGraph
                      id={pool.id}
                      setTokenPrice={setTokenPrice}
                      pool={pool}
                      currentValue={currentValue}
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} mt={5}>
                {/* <TopToken /> */}
                <Transactions />
              </Grid>
            </Grid>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Collapse
                in={alert.show}
                sx={{ maxWidth: 400, position: "fixed" }}
              >
                <Alert
                  variant="outlined"
                  severity={alert.type}
                  sx={{ mb: 2, backgroundColor: "white", fontSize: "18px" }}
                >
                  {alert.msg}
                </Alert>
              </Collapse>
            </div>
          </Box>
        )}
    </>
  );
}
