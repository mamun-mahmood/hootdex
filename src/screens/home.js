import React from "react";
import Chart from "./chart";

export default function Home() {
  const poolTableAttributes = [
    "Id",
    "Name",
    "Token",
    "Available Coins",
    "Rate Pecu/Token",
  ];
  const poolData = [
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45436",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45437",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45438",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45439",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45440",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45441",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45442",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45443",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45444",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45445",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45446",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45447",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45448",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45449",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45450",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45451",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    }
  ];
  return (
    <div className="screen">
    {/* <div className="banner-hero" >   <h1 className="primary__title">Available Pools</h1>
    <p style={{color:'orange'}}>Swap, earn, and build on the leading decentralized crypto trading protocol.</p>
    </div> */}
      <div>
    
        <Chart />
        <h1 className="primary__title">Available Pools</h1>
      </div>
      <div className="table__container">
        <table>
          <tr>
            {poolTableAttributes.map((e) => (
              <th>{e}</th>
            ))}
          </tr>

          {poolData.map((e) => (
            <tr>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.token}</td>
              <td>{e.coins}</td>
              <td>{e.rate}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
