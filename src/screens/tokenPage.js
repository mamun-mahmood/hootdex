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
import { useParams } from "react-router-dom";
import BuyToken from "../components/Modal/BuyToken";
import Chart from "./chart";
import GetAppIcon from "@mui/icons-material/GetApp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TinyLineChart from "../components/Charts/TinyLineChart";
import AssetChart from "../components/dashboard/AssetChart";
import WarpTokens from "../components/Tables/WarpTokens";
import PoolTokens from "../components/Tables/PoolTokens";
import url from "../serverUrl";
export default function TokenPage({ pecuCoins, user }) {
  const tokenName = useParams().tokenName;
  const [token, setToken] = useState({});
  const [loading, setLoading] = useState(false);
  const [chartBtn, setChartBtn] = useState(3);
  const [alert, setAlert] = useState({
    msg: "",
    type: "",
    show: false,
  });
  const [currentValue, setCurrentValue] = useState(0);
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
  const date = new Date().toLocaleDateString();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}/hootdex/getToken/${tokenName}`)
      .then((res) => {
        setToken(res.data[0]);
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
  }, [tokenName]);
  useEffect(() => {
    get_current_index_coin();
  }, []);
  const [tokenPrice, setTokenPrice] = useState([
    {
      currentPrice: null,
      previousPrice: null,
    },
  ]);
  const currentPrice = tokenPrice[0]?.currentPrice;
  const previousPrice = tokenPrice[0]?.previousPrice;
  console.log(tokenPrice);
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
  console.log(token);
  // const timeofL = token?.aTime?.toDateString()
  return (
    <>
      {loading && <LinearProgress sx={{ backgroundColor: "grey" }} />}
      <div style={{ padding: "1rem" }}>
        <Grid width={"100%"} container spacing={1} mb={1}>
          <Grid item xs={12} md={6}>
            <div className="dfelxalitemC">
              <Avatar
                src={`${url}/hootdex/images/${token?.logo_src}`}
                alt={token.tokenName}
              />
              <p
                style={{
                  color: "white",
                  marginLeft: "1rem",
                  fontSize: "26px",
                  fontWeight: "500",
                  fontFamily: "Iner var sans-serif",
                }}
              >
                {token?.tokenName}{" "}
                <span style={{ fontSize: "20px", color: "rgb(195, 197, 203)" }}>
                  ({token?.tokenSymbol})
                </span>{" "}
              </p>
            </div>
            <div>
              <p
                className="token-page-t2"
                style={{
                  marginTop: "0.5rem",
                  fontSize: "32px",
                }}
              >
                ${token?.currentPrice?.toFixed(5)}{" "}
                {/* {tokenPrice[0]?.previousPrice} */}
                {priceUp ? (
                  <small style={{ fontSize: "18px", color: "#4caf50" }}>
                    (<ArrowUpwardIcon sx={{ fontSize: "18px" }} />
                    {tokenPriceIncreasePercentage?.toFixed(2)}%)
                  </small>
                ) : (
                  <small style={{ fontSize: "18px", color: "red" }}>
                    (<ArrowDownwardIcon sx={{ fontSize: "18px" }} />
                    {tokenPriceIncreasePercentage?.toFixed(2)}%)
                  </small>
                )}
              </p>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "3rem",
              }}
            >
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
                }}
              >
                <GetAppIcon />
                <p>Add Liquidity</p>
              </IconButton>
              {/* buy token modal */}
              <BuyToken each={token} pecuCoins={pecuCoins} user={user} />
            </div>
          </Grid>
          <Grid item xs={12} md={4} mt={3}>
            <div
              style={{
                backgroundColor: "rgb(25, 27, 31)",
                borderRadius: "20px",
                height: "100%",
                padding: "1.5rem",
              }}
              className="shadowGrey"
            >
              <div style={{ marginBottom: "1rem" }}>
                <p className="token-page-t1 mb-1">TVL</p>
                <p className="token-page-t2 mb-1">
                  ${token?.volume?.toFixed(2)}
                </p>
                {/* <small style={{ fontSize: "18px", color: "red" }}>
                  <ArrowDownwardIcon sx={{ fontSize: "18px" }} />
                  10.89%
                </small>{" "} */}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                {/* <p className="token-page-t1 mb-1">24h Trading Vol</p> */}
                <p className="token-page-t1 mb-1">Available</p>
                <p className="token-page-t2 mb-1">${token?.totalToken}</p>
                {/* <small style={{ fontSize: "18px", color: "red" }}>
                  <ArrowDownwardIcon sx={{ fontSize: "18px" }} />
                  10.89%
                </small>{" "} */}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                {/* <p className="token-page-t1 mb-1">7d Trading Vol</p> */}
                <p className="token-page-t1 mb-1">Initial Price</p>
                <p className="token-page-t2 mb-1">
                  ${token?.tokenPrice?.toFixed(5)}
                </p>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                {/* <p className="token-page-t1 mb-1">24h Fees</p> */}
                <p className="token-page-t1 mb-1">Created By</p>
                <p className="token-page-t2 mb-1">${token?.createdBy}</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={8} sx={{marginTop: { xs: 8, md: 3 },}} >
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
                    <p className="token-page-t2">
                      ${token?.volume?.toFixed(2)}
                    </p>
                    <p className="token-page-t1">{date}</p>
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
                  <AssetChart
                    tokenName={tokenName}
                    setTokenPrice={setTokenPrice}
                  />
                </div>
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} mt={5}>
            {/* <WarpTokens /> */}
            <PoolTokens />
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
    </>
  );
}
