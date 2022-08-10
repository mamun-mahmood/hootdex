import { Box, Button, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import url from '../../serverUrl';
// function convertToInternationalCurrencySystem(labelValue) {
//   // Nine Zeroes for Billions
//   return Math.abs(Number(labelValue)) >= 1.0e9
//     ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'b'
//     : // Six Zeroes for Millions
//     Math.abs(Number(labelValue)) >= 1.0e6
//     ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'm'
//     : // Three Zeroes for Thousands
//     Math.abs(Number(labelValue)) >= 1.0e3
//     ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'k'
//     : Math.abs(Number(labelValue));
// }
const TokenGraph = ({ id, pool, currentValue }) => {
  const [chartBtn, setChartBtn] = useState(2);
  const [chartData, setChartData] = useState([]);
  const [filter, setFilter] = useState('daily');
  console.log(id);
  const getChatData = (target) => {
    setFilter(target);
    axios
      .get(`http://localhost:3001/hootdex/token-price-daily?token_id=${id}`)
      .then((res) => {
        setChartData(res.data);
        console.log(res.data);
        let i = 0;
        i = res.data?.length - 1;
        const data = [
          {
            currentPrice: res?.data[i]?.today_value,
            previousPrice: res?.data[i - 1]?.today_value
          }
        ];
        // setpoolPrice(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
    useEffect(() => {
      getChatData("daily");
    }, []);

  return (
    <>
      <Box
        sx={{
          display: { xs: 'inline-block', sm: 'flex' },
          justifyContent: 'space-between',
          width: '100%',
          height: 30
        }}
      >
        <div>
          {/* <p className="pool-page-t1">{date}</p> */}
        </div>
        <div
          style={{
            backgroundColor: 'rgb(44, 47, 54)',
            borderRadius: '12px',
            textAlign: 'center'
          }}
          className="dsparound"
        >
          <p
            className={`${chartBtn === 1 && 'chart_btn_selected'} chart_btn`}
            onClick={() => setChartBtn(1)}
          >
            Volume
          </p>
          <p
            className={`${chartBtn === 2 && 'chart_btn_selected'} chart_btn`}
            onClick={() => setChartBtn(2)}
          >
            TVL
          </p>
          <p
            className={`${chartBtn === 3 && 'chart_btn_selected'} chart_btn`}
            onClick={() => setChartBtn(3)}
          >
            Price
          </p>
        </div>
      </Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
          minWidth: '100%'
        }}
      >
        <Button
          className={`${
            filter === 'daily'
              ? 'header-link chart-button activeButton'
              : 'header-link chart-button'
          }`}
          onClick={() => {
            getChatData('daily');
          }}
        >
          1D
        </Button>
        <Button
          className={`${
            filter === 'weekly'
              ? 'header-link chart-button activeButton'
              : 'header-link chart-button'
          }`}
          sx={{ display: { xs: 'none', md: 'block' } }}
          onClick={() => {
            getChatData('weekly');
          }}
        >
          1W
        </Button>
        <Button
          className={`${
            filter === 'monthly'
              ? 'header-link chart-button activeButton'
              : 'header-link chart-button'
          }`}
          onClick={() => {
            getChatData('monthly');
          }}
        >
          3M
        </Button>
        <Button
          className={`${
            filter === 'quaterly'
              ? 'header-link chart-button activeButton'
              : 'header-link chart-button'
          }`}
          onClick={() => {
            getChatData('quaterly');
          }}
        >
          1m
        </Button>
        <Button
          className={`${
            filter === 'yearly'
              ? 'header-link chart-button activeButton'
              : 'header-link chart-button'
          }`}
          onClick={() => {
            getChatData('yearly');
          }}
        >
          1Y
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
          marginTop: '1rem'
        }}
      >
        <ResponsiveContainer width={'100%'} height={300}>
          <LineChart height={'100%'} data={chartData}>
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#01402b"
              strokeWidth={2}
            />
            <XAxis dataKey="date_time" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default TokenGraph;
