import { Container } from "@mui/material";
import React from "react";
import {
  Pie,
  PieChart,
} from "recharts";

export default function Piechart({ user }) {
  const assets = [
    { name: "XMG", coins: 4 },
    { name: "PECU", coins: 4 },
  ];
  const xmgData = [
    { name: "acc1", coins: 1 },
    { name: "acc2", coins: 3 },
    { name: "acc3", coins: 1 },
    { name: "acc4", coins: 2 },
    { name: "acc5", coins: 0.4 },
    { name: "acc6", coins: 0.2 },
    { name: "acc7", coins: 0.4 },
  ];
  const pecuData = [
    { name: "acc1", coins: 0.4 },
    { name: "acc2", coins: 0.2 },
    { name: "acc3", coins: 0.4 },
    { name: "acc4", coins: 1 },
    { name: "acc5", coins: 3 },
    { name: "acc6", coins: 1 },
    { name: "acc7", coins: 2 },
  ];

  const accessEmails = [
    "maxme@gmail.com",
    "officialaakashbhardwaj@gmail.com",
    "info@megahoot.com",
    "hortonglobalindustries@gmail.com",
    "ucwent@gmail.com",
    "info@ucwe.com",
    "megahootinc@gmail.com",
    "louis@falconglobalacquisitions.com",
    "info@falconglobalacquisitions.com",
    "acc1@falconglobalacquisitions.com",
    "acc2@falconglobalacquisitions.com",
    "acc3@falconglobalacquisitions.com",
    "acc4@falconglobalacquisitions.com",
    "acc5@falconglobalacquisitions.com",
    "acc6@falconglobalacquisitions.com",
    "acc7@falconglobalacquisitions.com",
    "acc8@falconglobalacquisitions.com",
    "acc9@falconglobalacquisitions.com",
  ];
  return (
      <div className="" style={{backgroundColor: "#00071a", borderTop: "1px solid #fff",
      borderLeft: "1px solid #fff",
      borderBottom: "3px solid #fff",
      borderRight: "3px solid #fff",}}>
        {user ? (
          <div>
            {accessEmails.includes(user.email) && (
              <>
                {/* <div style={{ display: "flex", flexDirection: "row" }}> */}
                  {" "}
                  <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    {" "}
                    <h5 style={{ color: "orange" }}>
                      XMG DISTRIBUTION :orange
                    </h5>
                    <h5 style={{ color: "blue" }}>PECU DISTRIBUTION :blue</h5>
                    <h5 style={{ color: "green" }}>
                      XMG/PECU DISTRIBUTION :green
                    </h5>
                  </div>
                  <div style={{display: "flex", justifyContent: "center"}}>
                  <PieChart width={600} height={600}>
                    <Pie
                      data={xmgData}
                      dataKey="coins"
                      nameKey={"name"}
                      innerRadius={200}
                      outerRadius={250}
                      fill="orange"
                      label
                    />
                    <Pie
                      data={pecuData}
                      dataKey="coins"
                      nameKey={"name"}
                      innerRadius={110}
                      outerRadius={150}
                      fill="blue"
                      label
                    />
                    <Pie
                      data={assets}
                      dataKey="coins"
                      nameKey={"name"}
                      outerRadius={50}
                      fill="green"
                      label
                    />
                  </PieChart>
                  </div>
                {/* </div> */}
              </>
            )}
          </div>
        ) : null}
      </div>
  );
}
