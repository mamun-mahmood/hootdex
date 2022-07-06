import { Alert, Box, Collapse } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";

export default function CreateToken({ user, pecuCoins }) {
  const [alert, setAlert] = useState({
    msg: "",
    type: "",
    loading: false,
  });
  const [file, setFile] = useState();

  const [fileName, setFileName] = useState("");

  const [inputData, setInputData] = useState({
    createdBy: user?.username,
    tokenName: "",
    totalToken: "",
    investementAmount: "",
    pecuCoin: "",
    tokenPrice: "",
    status: "Pending",
    tokenSymbol: "",
    fileName: "",
    approvedBy: ""
  });
  const saveFile = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("fileName", e.target.files[0].name);
    axios
      .post("https://api.pecunovus.net/hootdex/token-logo-upload", formData)
      .then((res) => {
        if (res.data.status === "ok") {
          setInputData({ ...inputData, fileName: res.data.fileName });
        }
        else {
          setAlert({
            msg: "Image upload failed",
            type: "error",
            show: true,
          });
          setTimeout(() => {
            setAlert({
              msg: "Image upload failed",
              type: "error",
              show: false,
            });
          }, 3000);
        }
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (pecuCoins?.coin >= inputData.pecuCoin) {
      axios
        .post("https://api.pecunovus.net/hootdex/create-tokens", inputData)
        .then((res) => {
          if (res.data.status === "error") {
            setAlert({
              msg: res.data.msg,
              type: "error",
              show: true,
            });
            setTimeout(() => {
              setAlert({
                msg: res.data.msg,
                type: "error",
                show: false,
              });
            }, 4000);
          }
          if (res.data.affectedRows > 0) {
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
            setAlert({
              msg: "Token Created!",
              type: "success",
              show: true,
            });
            setTimeout(() => {
              setAlert({
                msg: "Token Created!",
                type: "success",
                show: false,
              });
            }, 3000);
          }
        })
        .catch((err) => {
          setAlert({
            msg: "There was an error!",
            type: "error",
            show: true,
          });
          setTimeout(() => {
            setAlert({
              msg: "There was an error!",
              type: "error",
              show: false,
            });
          }, 3000);
        });
    } else {
      setAlert({
        msg: "You don't have enough Pecu coin!",
        type: "error",
        show: true,
      });
      setTimeout(() => {
        setAlert({
          msg: "You don't have enough Pecu coin!",
          type: "error",
          show: false,
        });
      }, 3000);
    }
  };

  const handleChange = (e) => {
    let changeData = { ...inputData };
    let name = e.target.name;
    let value = e.target.value;
    changeData[name] = value;
    setInputData(changeData);
  };

  useEffect(() => {
    let pecuRate = 42.64;
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Collapse in={alert.show} sx={{ maxWidth: 400, position: "fixed" }}>
            <Alert
              variant="outlined"
              severity={alert.type}
              sx={{ mb: 2, backgroundColor: "white", fontSize: "18px" }}
            >
              {alert.msg}
            </Alert>
          </Collapse>
        </div>
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

        <label className="label">
          Investement equivalent Pecu Coins. You have ({pecuCoins?.coin})
          available
        </label>
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
          onChange={saveFile}
          type="file"
          placeholder="Enter"
          required
        ></input>
        <button type="submit" className="submit-btn button">
          Submit Request
        </button>
      </form>
    </div>
  );
}
