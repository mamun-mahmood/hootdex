import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Chart from "./chart";

export default function TokenPage(props) {
  const location = useLocation();
  // const {tokenData} =location?.state;
  //  const {id,name,coins,rate,token}=tokenData;
  // console.log(token)
  return (
    <div className="screen" style={{ backgroundColor: "#fff" }}>
      <div className="banner">
        <div className="banner-left">
          <img
            src={
              "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/qfavylwan5f8hiu78fsq"
            }
          />
        </div>
        <div className="banner-right">
          <div className="banner-right-h">
            <span>{"Token"}</span>
          </div>
          <div className="banner-right-h">
            <span className="label-heading">{"name"}</span>
          </div>
          <div className="banner-right-h">
            <span className="heading-btn">Summary</span>
            <span className="heading-btn">Finances</span>
            <span className="heading-btn">Technology</span>
            <span className="heading-btn">People</span>
            <span className="heading-btn">Stats</span>
          </div>
        </div>
      </div>
      <h1 className="label">Token Details</h1>
      <div className="content-body">
        <div className="card">
          <p className="label-semi">{"name"}</p>
        </div>
        <div className="card">
          <p className="label-semi">Rate:{"rate"}</p>
        </div>
        <div className="card">
          {" "}
          <p className="label-semi">Available Tokens:{"token"}</p>
        </div>
        <div className="card">
          <p className="label-semi">Coins:{"coins"}</p>
        </div>
        <div className="description">
          <h1 className="label">Token Performance</h1>
          <Chart />
        </div>
      </div>
    </div>
  );
}
