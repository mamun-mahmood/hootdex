import { Typography } from "@mui/material";
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
const AssetChart = () => {
  const data = [
    {
      name: "Page A",
      uv: 2000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
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
      <ResponsiveContainer
        width= {500}
        height= {300}
        
      >
         <LineChart style={{maxWidth: '100%'}} data={data}>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default AssetChart;
