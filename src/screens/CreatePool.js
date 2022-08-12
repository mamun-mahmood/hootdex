import { Alert, Box, Collapse, } from '@mui/material';
import axios from 'axios';
import url from '../serverUrl';
import React, { useEffect, useState } from 'react';

export default function CreatePool({ token, closeMe }) {
  const [user, setUser] = useState('');
  const [alert, setAlert] = useState({
    msg: '',
    type: '',
    show: false
  });
  const [currentValue, setCurrentValue] = useState(null);
  const [inputData, setInputData] = useState({
    createdBy: user.username,
    tokenName: token?.token_name,
    totalToken: token?.amount_issued,
    investementAmount: token?.amount_issued * token?.token_price,
    pecuCoin: '',
    otherToken: '',
    otherTokenAmount: '',
    tokenPrice: token?.token_price,
    status: 'Pending',
    tokenSymbol: token?.token_symbol,
    fileName: '',
    approvedBy: '',
    pecuRate: currentValue,
    cTime: new Date()
  });
  const [wrapTokenPrice, setWrapTokenPrice] = useState('');
  const [cryptoData, setCryptoData] = useState([]);

  const [tokens, setTokens] = useState([]);
  const removeDuplicatedToken = (allData) => {
    for (let i = 0; i < allData.length; i++) {
      for (let j = i + 1; j < allData.length; j++) {
        if (allData[i].symbol == allData[j].symbol) {
          allData[i].wrapAmount = allData[j].wrapAmount + allData[i].wrapAmount;
          allData[i].initialFinal =
            allData[j].initialFinal + allData[i].initialFinal;
          allData = allData.filter((e) => e !== allData[j]);
        }
      }
    }

    for (let i = 0; i < allData.length; i++) {
      for (let j = i + 1; j < allData.length; j++) {
        if (allData[i].symbol == allData[j].symbol) {
          return removeDuplicatedToken(allData);
        }
      }
    }

    return allData;
  };
  const get_crypto_Data = () => {
    axios.get(`https://mhiservers2.com/crypto/index`).then((res) => {
      setCryptoData(res.data);
    });
  };
  const fetchToken = (target) => {
    axios
      .get(`${url}/wallet/get_all_tokens_wrap`)
      .then((res) => {
        if (res.data.status) {
          setTokens(removeDuplicatedToken(res.data.tokens));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const get_current_index_coin = () => {
    axios
      .get(`${url}/wallet/get_current_index_coin`)
      .then((res) => {
        setCurrentValue(res.data[0].value);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const saveFile = (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    formData.append('fileName', e.target.files[0].name);
    axios.post(`${url}/hootdex/token-logo-upload`, formData).then((res) => {
      if (res.data.status === 'ok') {
        setInputData({ ...inputData, fileName: res.data.fileName });
      } else {
        setAlert({
          msg: 'Image upload failed',
          type: 'error',
          show: true
        });
        setTimeout(() => {
          setAlert({
            msg: 'Image upload failed',
            type: 'error',
            show: false
          });
        }, 3000);
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const bodyData = {
      project_name: token?.token_name,
      project_token_symbol: token?.token_symbol,
      project_token_amount: token?.amount_issued,
      project_token_price: token?.token_price,
      pecu_symbol: 'PECU',
      pecu_amount: inputData.pecuCoin,
      pecu_price: currentValue,
      wrap_token_symbol: inputData.otherToken,
      wrap_token_amount: inputData.otherTokenAmount,
      wrap_token_price: wrapTokenPrice,
      createdBy: user.username,
      owner: user.email,
      img: inputData.fileName,
      user_id: user.user_id,
      status: 1
    };

    if (inputData.pecuCoin) {
      axios
        .post(`${url}/hootdex/create-liquidity-pool`, bodyData)
        .then((res) => {
          if (res.data.status === 'error') {
            setAlert({
              msg: res.data.msg,
              type: 'error',
              show: true
            });
            setTimeout(() => {
              setAlert({
                msg: res.data.msg,
                type: 'error',
                show: false
              });
            }, 4000);
          }
          if (res.data.affectedRows > 0) {
            window.scrollTo(0, 0);
            setInputData({
              createdBy: user.username,
              tokenName: '',
              totalToken: '',
              investementAmount: '',
              pecuCoin: '',
              tokenPrice: '',
              status: 'Pending',
              tokenSymbol: ''
            });
            setAlert({
              msg: 'Pool Created!',
              type: 'success',
              show: true
            });
            setTimeout(() => {
              setAlert({
                msg: 'Pool Created!',
                type: 'success',
                show: false
              });
              closeMe();
            }, 3000);
          }
        })
        .catch((err) => {
          setAlert({
            msg: 'There was an error!',
            type: 'error',
            show: true
          });
          setTimeout(() => {
            setAlert({
              msg: 'There was an error!',
              type: 'error',
              show: false
            });
          }, 3000);
        });
    } else {
      setAlert({
        msg: "You don't have enough Pecu coin!",
        type: 'error',
        show: true
      });
      setTimeout(() => {
        setAlert({
          msg: "You don't have enough Pecu coin!",
          type: 'error',
          show: false
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
    let pecuRate = currentValue;
    let changeData = { ...inputData };

    // let totalPecuCoin = inputData.investementAmount / pecuRate;
    // let tokenPrice = totalPecuCoin / inputData.totalToken;
    // changeData['pecuCoin'] = totalPecuCoin;
    // changeData['tokenPrice'] = tokenPrice;
    changeData['pecuRate'] = pecuRate;
    setInputData(changeData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue]);

  useEffect(() => {
    let data = localStorage.getItem('hootdex_secretcookie');

    if (data) {
      setUser(JSON.parse(data));
      get_current_index_coin();
      fetchToken();
    }
  }, []);

  useEffect(() => {
    setInputData({ ...inputData, createdBy: user.username });
  }, [user]);

  useEffect(() => {
    get_crypto_Data();
  }, []);

  useEffect(() => {
    if (cryptoData.length > 0 && inputData.otherToken) {
      let wrap_token_price = cryptoData.filter(
        (e, i) => e.symbol == inputData.othertoken?.slice(1)
      );
      if (wrap_token_price && wrap_token_price[0]) {
        setWrapTokenPrice(wrap_token_price[0].price);
      }
    }
  }, [inputData.otherToken, cryptoData]);
  return user && user.username ? (
    <div className="screen" style={{ padding: '1rem' }}>
      <Box sx={{ mt: 2, position: 'fixed', zIndex: 1002, top: 80 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Collapse in={alert.show} sx={{ maxWidth: 400, position: 'fixed' }}>
            <Alert
              variant="outlined"
              severity={alert.type}
              sx={{ mb: 2, backgroundColor: 'white', fontSize: '18px' }}
            >
              {alert.msg}
            </Alert>
          </Collapse>
        </div>
      </Box>
      <form id="myForm" className="form" onSubmit={handleSubmit}>
        <h5>Create Pool</h5>

        <label className="label">Token Name</label>
        <input
          className="input"
          name={'tokenName'}
          value={inputData.tokenName}
          onChange={handleChange}
          placeholder="Enter"
          required
          disabled
        ></input>
        <label className="label">Token Symbol</label>
        <input
          className="input"
          name={'tokenSymbol'}
          value={inputData.tokenSymbol}
          onChange={handleChange}
          type={'text'}
          placeholder="Enter"
          required
          disabled
        ></input>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '93%',

            padding: '0px'
          }}
        >
          <span>
            {' '}
            <label className="label">Token price (USD)</label>
            <input
              className="input"
              style={{ marginLeft: '0px' }}
              value={inputData.tokenPrice}
              disabled
              type={'number'}
              placeholder="Enter"
              required
            ></input>
          </span>
          <span>
            <label className="label">Total Token issue</label>
            <input
              className="input"
              style={{ marginLeft: '0px' }}
              name={'totalToken'}
              value={inputData.totalToken}
              onChange={handleChange}
              type={'number'}
              placeholder="Enter"
              required
              disabled
            ></input>
          </span>
          <span>
            <label className="label">Value Investement (USD)</label>
            <input
              className="input"
              style={{ marginLeft: '0px' }}
              name={'investementAmount'}
              value={inputData.investementAmount}
              onChange={handleChange}
              type={'number'}
              placeholder="Enter"
              required
              disabled
            ></input>
          </span>
        </div>

        {/* <label className="label">
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
        ></input> */}

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '93%',
            width: '93%',
            padding: '0px'
          }}
        >
          <span style={{ flex: '0.5' }}>
            {' '}
            <label className="label">Token to be staked</label>
            <select
              style={{
                padding: '0.85rem',
                width: '93%',
                marginTop: '1rem',
                color: 'orange',
                fontWeight: 'bold',
                fontSize: '1rem',
                name: 'pecu'
              }}
            >
              <option value={'PECU'}>PECU</option>
            </select>
          </span>
          <span style={{ flex: '0.5' }}>
            <label className="label">Amount(Coin)</label>
            <input
              type="number"
              className="input"
              name="pecuCoin"
              min={1}
              onChange={handleChange}
            />
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '93%',
            width: '93%',
            padding: '0px'
          }}
        >
          <span style={{ flex: '0.5' }}>
            {' '}
            <label className="label">Token to be staked</label>
            <select
              style={{
                padding: '0.85rem',
                width: '93%',
                marginTop: '1rem',
                color: 'orange',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
              name="otherToken"
              onChange={handleChange}
            >
              <option>select</option>
              {tokens.map((e, i) => (
                <option key={i} value={e.symbol}>
                  {e.symbol}
                </option>
              ))}
            </select>
          </span>
          <span style={{ flex: '0.5' }}>
            <label className="label">Amount(Token)</label>
            <input
              type="number"
              className="input"
              name="otherTokenAmount"
              min={1}
              onChange={handleChange}
            />
          </span>
        </div>

        <label className="label">Upload token logo</label>
        <input
          className="input"
          onChange={saveFile}
          type="file"
          placeholder="Enter"
        ></input>
        <span>
          {' '}
          <button type="submit" className="submit-btn button">
            Submit Request
          </button>
          <button
            onClick={() => closeMe()}
            className="submit-btn button"
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Cancel
          </button>
        </span>
      </form>
    </div>
  ) : (
    <div className="screen" style={{ padding: '1rem' }}>
      <h1 style={{ color: '#fff' }}>Loading...</h1>
    </div>
  );
}
