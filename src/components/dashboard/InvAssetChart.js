import { Typography } from "@mui/material";
import React from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
const InvAssetChart = () => {
  const data02 = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 },
  ];
  return (
    <div>
      
      <PieChart width={600} height={400}>
        {/* <Pie
          dataKey="value"
          data={data02}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        /> */}
        <Pie
          dataKey="value"
          data={data02}
          innerRadius={40}
          outerRadius={80}
          fill="#82ca9d"
        />
         <Tooltip />
      </PieChart>
    </div>
  );
};

export default InvAssetChart;
