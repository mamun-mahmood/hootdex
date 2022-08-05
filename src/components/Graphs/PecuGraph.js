import React, { memo, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  AreaChart,
  Area,
} from "recharts";
import axios from "axios";
import url from "../../serverUrl";
import { Skeleton, Button, Box } from "@mui/material";
export default memo(function Chart() {
  const [chartData, setChartData] = useState([]);
  const [filter, setFilter] = useState("");
  const getChatData = (filter) => {
    // let localData = [];
    setFilter(filter);
    axios
      .get(`${url}/wallet/get_change_index_coin_${filter}`)
      .then((res) => {
        res.data.forEach((e) => {
          let localData = res.data;
          setChartData(localData);
        });
      })
      .catch((err) => getChatData(filter));
  };

  useEffect(() => {
    getChatData("yearly");
  }, []);
  // console.log(chartData);
  return (
    <Box
      sx={{
        backgroundColor: "#1a1b1f",
        borderRadius: "1rem",
        mt: "1rem",
        width: "80%",
        textAlign: "center",
      }}
    >
      {" "}
      <p
        style={{
          color: "rgb(195, 197, 203)",
          fontSize: "15px",
          fontWeight: "600",
          textAlign: "center",
          backgroundColor: "#21242b",
          width: "100%",
          padding: "0.5rem 0 0.5rem 0",
        }}
      >
        PECU CHART
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
          marginTop: "1rem",
          minWidth: "100%",
        }}
      >
        <Button
          className={`${
            filter === "yearly"
              ? "header-link chart-button activeButton"
              : "header-link chart-button"
          }`}
          onClick={() => {
            getChatData("yearly");
          }}
        >
          12M
        </Button>
        <Button
          className={`${
            filter === "quaterly"
              ? "header-link chart-button activeButton"
              : "header-link chart-button"
          }`}
          sx={{ display: { xs: "none", md: "block" } }}
          onClick={() => {
            getChatData("quaterly");
          }}
        >
          3M
        </Button>
        <Button
          className={`${
            filter === "monthly"
              ? "header-link chart-button activeButton"
              : "header-link chart-button"
          }`}
          onClick={() => {
            getChatData("monthly");
          }}
        >
          1M
        </Button>
        <Button
          className={`${
            filter === "weekly"
              ? "header-link chart-button activeButton"
              : "header-link chart-button"
          }`}
          onClick={() => {
            getChatData("weekly");
          }}
        >
          7D
        </Button>
        <Button
          className={`${
            filter === "hourly"
              ? "header-link chart-button activeButton"
              : "header-link chart-button"
          }`}
          onClick={() => {
            getChatData("hourly");
          }}
        >
          1D
        </Button>
      </div>
      <div>
        {chartData.length > 0 ? (
          <ResponsiveContainer
            width={"100%"}
            // height={window.screen.availHeight / 2.2}
            aspect={3}
          >
            <AreaChart
              data={chartData}
              style={{ width: "100%" }}
              // margin={{ top: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="rgb(255, 145, 0)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="rgb(255, 145, 0)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="rgb(255, 145, 0)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="rgb(255, 145, 0)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis dataKey="chart_date" />
              {/* <YAxis /> */}
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <Tooltip />
              <Area
                type="monotone"
                dataKey="today_value"
                stroke="rgb(255, 145, 0)"
                fillOpacity={1}
                fill="url(#colorUv)"
                style={{ position: "absolute", zIndex: "100", width: "100%" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <Skeleton
            sx={{ bgcolor: "#21242b", mt: 1 }}
            variant="rectangular"
            margin={"1rem"}
            height={400}
          />
        )}
      </div>
    </Box>
  );
});
