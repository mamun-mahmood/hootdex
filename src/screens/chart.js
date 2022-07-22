import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import axios from 'axios';
import url from '../serverUrl';
export default function Chart() {
  const [chartData, setChartData] = useState([]);
  const getChatData = (filter) => {
    let localData = [];
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
    getChatData('yearly');
  }, []);
  // console.log(chartData);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1a1b1f',
        borderRadius: '1rem',
        marginTop: '2rem'
        // padding: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          justifyContent: 'center',
          marginTop: '1rem'
        }}
      >
        <button
          className="header-link button"
          onClick={() => {
            getChatData('yearly');
          }}
        >
          12M
        </button>
        <button
          className="header-link button"
          onClick={() => {
            getChatData('quaterly');
          }}
        >
          3M
        </button>
        <button
          className="header-link button"
          onClick={() => {
            getChatData('monthly');
          }}
        >
          1M
        </button>
        <button
          className="header-link button"
          onClick={() => {
            getChatData('weekly');
          }}
        >
          7D
        </button>
        <button
          className="header-link button"
          onClick={() => {
            getChatData('hourly');
          }}
        >
          1D
        </button>
      </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer
          width={window.screen.availWidth / 1.3}
          height={window.screen.availHeight / 2.2}
        >
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
              style={{ position: 'absolute', zIndex: '100', width: '100%' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}
