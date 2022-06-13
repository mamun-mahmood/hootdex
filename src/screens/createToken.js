import { FormControl, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

export default function CreateToken() {
  const [inputData, setInputData] = useState({
    tokenName: "",
    issueCoin: "",
    investementAmount: "",
    pecuCoin: "",
    tokenPrice: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    let changeData = { ...inputData };
    let name = e.target.name;
    let value = e.target.value;
    changeData[name] = value;
    setInputData(changeData);
  };

  useEffect(() => {
    let pecuRate = 37.64;
    let changeData = { ...inputData };
    let totalPecuCoin = inputData.investementAmount / pecuRate;
    let tokenPrice = totalPecuCoin / inputData.issueCoin;

    changeData["pecuCoin"] = totalPecuCoin;
    changeData["tokenPrice"] = tokenPrice;
    setInputData(changeData);
  }, [inputData.investementAmount, inputData.issueCoin]);
  return (
    <div className='screen'>
        <form className="form" onSubmit={handleSubmit} >
            <h3>Create Token</h3>
            <label className="label">Token Name</label>
            <input className="input" name={'tokenName'} value={inputData.tokenName} onChange={handleChange} placeholder='Enter'></input>

            <label className="label">Total Token issue</label>
            <input className="input" name={'issueCoin'} value={inputData.issueCoin} onChange={handleChange}  type={'number'}  placeholder='Enter'></input>

            <label className="label">Value Investement (USD)</label>
            <input className="input" name={'investementAmount'} value={inputData.investementAmount} onChange={handleChange}  type={'number'} placeholder='Enter'></input>

            <label className="label">Investement equivalent Pecu Coins</label>
            <input className="input" value={inputData.pecuCoin} disabled type={'number'}  placeholder='Enter'></input>

            <label className="label">Token price (USD)</label>
            <input className="input" value={inputData.tokenPrice} disabled type={'number'} placeholder='Enter'></input>
            <button className='submit-btn'>Submit Request</button>
        </form>
    </div>
  );
}
