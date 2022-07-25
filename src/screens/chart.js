import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import axios from "axios";
import url from "../serverUrl";
import { Grid, Skeleton } from "@mui/material";
export default function Chart() {
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
    <div
      style={{
        backgroundColor: "#1a1b1f",
        borderRadius: "1rem",
        // padding: '1rem',
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <button
          className={`${
            filter === "yearly"
              ? "header-link button activeButton"
              : "header-link button"
          }`}
          onClick={() => {
            getChatData("yearly");
          }}
        >
          12M
        </button>
        <button
          className={`${
            filter === "quaterly"
              ? "header-link button activeButton"
              : "header-link button"
          }`}
          onClick={() => {
            getChatData("quaterly");
          }}
        >
          3M
        </button>
        <button
          className={`${
            filter === "monthly"
              ? "header-link button activeButton"
              : "header-link button"
          }`}
          onClick={() => {
            getChatData("monthly");
          }}
        >
          1M
        </button>
        <button
          className={`${
            filter === "weekly"
              ? "header-link button activeButton"
              : "header-link button"
          }`}
          onClick={() => {
            getChatData("weekly");
          }}
        >
          7D
        </button>
        <button
          className={`${
            filter === "hourly"
              ? "header-link button activeButton"
              : "header-link button"
          }`}
          onClick={() => {
            getChatData("hourly");
          }}
        >
          1D
        </button>
      </div>
      <div>
      {!chartData.length && (
        <Skeleton
          sx={{ bgcolor: "#033223", mt:1 }}
          variant="rectangular"
          margin={"1rem"}
          height={300}
        />
      )}
      <Grid container>
      {chartData.length > 0 ? (
        <ResponsiveContainer
          width={"100%"}
          maxWidth={"100%"}
          // height={window.screen.availHeight / 2.2}
          aspect={3}
        >
          <AreaChart
            data={chartData}
            margin={{ top: 10, left: 0, bottom: 0 }}
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
      ) : null}
      </Grid>
      </div>
    </div>
  );
}
