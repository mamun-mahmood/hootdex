import { Alert, Box, Collapse } from "@mui/material";
import axios from "axios";
import IconButton from "@mui/material/IconButton";

import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function CreateToken({ user }) {
  const [alert, setAlert] = React.useState(false);
  console.log(user);
  const [inputData, setInputData] = useState({
    createdBy: user?.username,
    tokenName: "",
    totalToken: "",
    investementAmount: "",
    pecuCoin: "",
    tokenPrice: "",
    status: "Pending",
    tokenSymbol: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/hootdex/create-tokens", inputData)
      .then((res) => {
        if (res.data.affectedRows > 0) {
          setAlert(true);
          window.scrollTo(0, 0);
          setInputData({
            createdBy: user?.username,
            tokenName: "",
            totalToken: "",
            investementAmount: "",
            pecuCoin: "",
            tokenPrice: "",
            status: "Pending",
            tokenSymbol: "",
          });
          setTimeout(() => {
            setAlert(false);
          }, 5000);
        }
      });
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
    let tokenPrice = totalPecuCoin / inputData.totalToken;
    changeData["pecuCoin"] = totalPecuCoin;
    changeData["tokenPrice"] = tokenPrice;
    setInputData(changeData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputData.investementAmount, inputData.totalToken]);

  return (
    <div className="screen">
      <Box sx={{ mt: 2, position: "fixed", zIndex: 1000, top: 0 }}>
        <Collapse in={alert}>
          <Alert
            variant="outlined"
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2, backgroundColor: "white", fontSize: "18px" }}
          >
            Token created successfully!
          </Alert>
        </Collapse>
      </Box>
      <form id="myForm" className="form" onSubmit={handleSubmit}>
        <h3>Create Token</h3>
        <label className="label">Token Name</label>
        <input
          className="input"
          name={"tokenName"}
          value={inputData.tokenName}
          onChange={handleChange}
          placeholder="Enter"
          required
        ></input>

        <label className="label">Token Symbol</label>
        <input
          className="input"
          name={"tokenSymbol"}
          value={inputData.tokenSymbol}
          onChange={handleChange}
          type={"text"}
          placeholder="Enter"
          required
        ></input>
        <label className="label">Total Token issue</label>
        <input
          className="input"
          name={"totalToken"}
          value={inputData.totalToken}
          onChange={handleChange}
          type={"number"}
          placeholder="Enter"
          required
        ></input>
        <label className="label">Value Investement (USD)</label>
        <input
          className="input"
          name={"investementAmount"}
          value={inputData.investementAmount}
          onChange={handleChange}
          type={"number"}
          placeholder="Enter"
          required
        ></input>

        <label className="label">Investement equivalent Pecu Coins</label>
        <input
          className="input"
          value={inputData.pecuCoin}
          disabled
          type={"number"}
          placeholder="Enter"
          required
        ></input>

        <label className="label">Token price (USD)</label>
        <input
          className="input"
          value={inputData.tokenPrice}
          disabled
          type={"number"}
          placeholder="Enter"
          required
        ></input>
        <label className="label">Upload token logo</label>
        <input
          className="input"
          // value={inputData.tokenPrice}
          type={"file"}
          placeholder="Enter"
          required
        ></input>
        <button className="submit-btn button">Submit Request</button>
      </form>
    </div>
  );
}
