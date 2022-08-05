import {
  Alert,
  Avatar,
  Collapse,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import BuyToken from "../components/Modal/BuyToken";
import GetAppIcon from "@mui/icons-material/GetApp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import url from "../serverUrl";
import Transactions from "../components/Tables/Transactions";
import TokenGraph from "../components/Graphs/TokenGraph";
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
export default function TokenPage({ pecuCoins, user }) {
  const data = useLocation().state;
  const tokenName = useParams().tokenName;
  // const [token, setToken] = useState();
  const token = {
    tokenName: data?.baseToken,
    timestamp: data?.date_time,
    firstPrice: data?.firstPrice,
    id: data?.id,
    initialFinal: data?.initialFinal,
    pecuInvestement: data?.pecuInvestement,
    pecuValue: data?.pecuValue,
    public_key: data?.public_key,
    tokenSymbol: data?.symbol,
  };
  console.log(token);
  const [loading, setLoading] = useState(false);
  const [chartBtn, setChartBtn] = useState(3);
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
  const date = new Date().toLocaleDateString();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}/hootdex/getToken/${tokenName}`)
      .then((res) => {
        // setToken(res.data[0]);
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
        console?.log(err);
      });
  }, [tokenName]);
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
      {
        <div style={{ padding: "1rem 4rem" }}>
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
                >{`Home `}</Link>
                <Link
                  to={`/tokens`}
                  style={{ fontSize: "1rem", fontWeight: "500" }}
                >
                  {" >"} Tokens
                </Link>
                <span
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "white",
                  }}
                >
                  {" >"} {token?.tokenSymbol} / PECU
                </span>
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
                  src={`null`}
                  alt={token.tokenSymbol?.slice(1)}
                  style={{
                    backgroundColor: "orange",
                    height: "25px",
                    width: "25px",
                    fontSize: "18px",
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
                  <span style={{ textTransform: "lowercase" }}>
                    {`${token?.tokenSymbol?.slice(0, 1)}`}
                  </span>
                  {token?.tokenSymbol?.slice(1)}
                </p>
              </div>
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
                      fontWeight: "400",
                      color: "white",
                      margin: "0.5rem ",
                      cursor: "pointer",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "24px",
                        fontWeight: 500,
                        marginLeft: "5px",
                      }}
                    >
                      {convertToInternationalCurrencySystem(
                        (data?.initialFinal / data?.wrapAmount).toFixed(2)
                      )}
                    </p>
                    <small style={{ fontSize: "16px", color: "green" }}>
                      <ArrowUpwardIcon sx={{ fontSize: "13px" }} />
                      0.00 %
                    </small>
                  </div>
                  {token?.otherToken && (
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
                        alt={token?.otherToken}
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
                        1 {token?.otherToken} ={" "}
                        {convertToInternationalCurrencySystem(
                          cryptoData?.filter(
                            (e) => e?.symbol == token?.othertoken?.slice(1)
                          )[0]?.price
                        )}{" "}
                        USD
                      </p>
                    </div>
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
                  <BuyToken each={token} pecuCoins={pecuCoins} user={user} />
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
                  <p className="token-page-t1 mb-1">TVL</p>
                  <p className="token-page-t2 mb-1">
                    {" "}
                    $
                    {convertToInternationalCurrencySystem(
                      data?.wrapAmount * data?.initialFinal
                    )}
                  </p>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <p className="token-page-t1 mb-1">24h Trading Vol</p>
                  <p className="token-page-t2 mb-1">
                    {convertToInternationalCurrencySystem(data?.initialFinal)}
                  </p>
                </div>
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
                    {convertToInternationalCurrencySystem(
                      cryptoData?.price?.toFixed(5)
                    )}
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
                  <Box
                    sx={{
                      display: { xs: "inline-block", sm: "flex" },
                      justifyContent: "space-between",
                      width: "100%",
                      height: 30,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          marginTop: "0.5rem",
                          fontSize: "24px",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        {convertToInternationalCurrencySystem(
                          cryptoData?.market_cap
                        )}
                      </p>
                      {/* <p className="token-page-t1">{date}</p> */}
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgb(44, 47, 54)",
                        borderRadius: "12px",
                        textAlign: "center",
                      }}
                      className="dsparound"
                    >
                      <p
                        className={`${
                          chartBtn === 1 && "chart_btn_selected"
                        } chart_btn`}
                        onClick={() => setChartBtn(1)}
                      >
                        Volume
                      </p>
                      <p
                        className={`${
                          chartBtn === 2 && "chart_btn_selected"
                        } chart_btn`}
                        onClick={() => setChartBtn(2)}
                      >
                        TVL
                      </p>
                      <p
                        className={`${
                          chartBtn === 3 && "chart_btn_selected"
                        } chart_btn`}
                        onClick={() => setChartBtn(3)}
                      >
                        Price
                      </p>
                    </div>
                  </Box>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      height: "100%",
                      marginTop: "1rem",
                    }}
                  >
                    <TokenGraph
                      tokenName={tokenName}
                      setTokenPrice={setTokenPrice}
                    />
                  </div>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} mt={5}>
              {/* <TopToken /> */}
              <Transactions />
            </Grid>
          </Grid>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Collapse in={alert.show} sx={{ maxWidth: 400, position: "fixed" }}>
              <Alert
                variant="outlined"
                severity={alert.type}
                sx={{ mb: 2, backgroundColor: "white", fontSize: "18px" }}
              >
                {alert.msg}
              </Alert>
            </Collapse>
          </div>
        </div>
      }
    </>
  );
}
