import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer, 
  LineChart,
  Line,
} from "recharts";
const AssetChart = ({ tokenName }) => {
  const data = [];
  const [chartData, setChartData] = useState([])
  useEffect(() => {
    axios
      .get(`https://api.pecunovus.net/hootdex/token-info-chart/${tokenName}`)
      .then((res) => {
        setChartData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "1rem",
            marginBottom: "1rem",
            width: "100%",
          }}
        >
          <button
            className="header-link cbutton"
            onClick={() => {
              // getChatData("yearly");
            }}
          >
            12M
          </button>
          <button
            className="header-link cbutton"
            onClick={() => {
              // getChatData("quaterly");
            }}
          >
            3M
          </button>
          <button
            className="header-link cbutton"
            onClick={() => {
              // getChatData("monthly");
            }}
          >
            1M
          </button>
          <button
            className="header-link cbutton"
            onClick={() => {
              // getChatData("weekly");
            }}
          >
            7D
          </button>
          <button
            className="header-link cbutton"
            onClick={() => {
              // getChatData("hourly");
            }}
          >
            Hourly
          </button>
        </div> */}
      <ResponsiveContainer width={500} height={300}>
        <LineChart style={{ maxWidth: "100%" }} data={chartData}>
          <Line type="monotone" dataKey="today_value" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default AssetChart;
