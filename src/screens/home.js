import React from "react";

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
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },

     {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
     {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
     {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
    {
      id: "45435",
      name: "MariaNu45token",
      token: "1000",
      coins: "1000",
      rate: "1",
    },
  ];
  return (
    <div>
      <div>
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
