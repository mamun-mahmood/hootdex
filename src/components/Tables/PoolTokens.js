import React from 'react';
import {
  Avatar,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import url from '../../serverUrl';
function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'b'
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'm'
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'k'
    : Math.abs(Number(labelValue));
}
const PoolTokens = () => {
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [cryptoData, setCryptoData] = useState([]);
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
  const get_crypto_Data = () => {
    axios.get(`https://mhiservers2.com/crypto/index`).then((res) => {
      setCryptoData(res.data);
    });
  };
  const fetchToken = (target) => {
    if (target === 'all') {
      setLoading(true);
      axios
        .get(`${url}/hootdex/available-tokens`)
        .then((res) => {
          setTokens(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      setTokens(tokens.filter((each) => each.tokenName === target));
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchToken('all');
    get_current_index_coin();
    get_crypto_Data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <TableContainer
        sx={{
          backgroundColor: '#1a1b1f',
          mt: 5,
          borderRadius: '1rem'
        }}
        component={Paper}
      >
        <p
          style={{
            color: 'rgb(195, 197, 203)',
            fontSize: '15px',
            fontWeight: 'bold',
            textAlign: 'left',
            backgroundColor: '#21242b',
            width: '100%',

            padding: '1rem'
          }}
        >
          Top Pools
        </p>
        {loading && <LinearProgress color="inherit" />}
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: ' 1px solid #1e2128'
            }
          }}
        >
          <TableHead className="">
            <TableRow className="">
              {/* {poolTableAttributes.map((e, index) => ( */}
              <TableCell className="twhite" component="th" scope="row">
                #
              </TableCell>
              <TableCell className="twhite">Name</TableCell>
              <TableCell className="twhite" align="left">
                Price
              </TableCell>
              <TableCell className="twhite" align="left">
                Price Change ⬇
              </TableCell>
              <TableCell className="twhite" align="left">
                Volume 24H
              </TableCell>
              <TableCell className="twhite" align="left">
                TVL
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens.length &&
              tokens.map((each, index) => (
                <TableRow key={each.id}>
                  <TableCell className="twhite" component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell className="twhite" align="left">
                    <Link to={`/pools/${each.tokenName}`} pecuCoins={currentValue}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Avatar
                          className="rounded"
                          src={`${url}/hootdex/images/${each?.logo_src}`}
                          alt="token logo"
                          style={{ width: '20px', height: '20px' }}
                        />
                        <Avatar
                          className="rounded"
                          src={`https://pecunovus.net/static/media/icon.25c8ec299d961b9dd524.ico`}
                          alt="token logo"
                          style={{ width: '20px', height: '20px' }}
                        />
                        <span style={{ marginLeft: '1rem', fontSize: '14px' }}>
                          {each.tokenName}{' '}
                          <small style={{ color: '#696c75' }}>
                            (
                            {`${each.tokenSymbol}${
                              each.otherToken ? `/${each.otherToken}` : null
                            }/PECU`}
                            )
                          </small>
                        </span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="twhite green" align="left">
                    $
                    {cryptoData.length > 0 &&
                      (
                        ((each.totalToken +
                          Math.abs(
                            each.investementAmount +
                              each.pecuCoin * currentValue +
                              each.otherTokenAmount *
                                cryptoData?.filter(
                                  (e) => e.symbol == each.otherToken.slice(1)
                                )[0].price -
                              each.firstTVL
                          )) /
                          each.totalToken) *
                        each.tokenPrice
                      ).toFixed(2)}
                  </TableCell>
                  <TableCell className="twhite yellow" align="left">
                    {cryptoData.length > 0 &&
                      (
                        ((each.totalToken +
                          Math.abs(
                            each.investementAmount +
                              each.pecuCoin * currentValue +
                              each.otherTokenAmount *
                                cryptoData?.filter(
                                  (e) => e.symbol == each.otherToken.slice(1)
                                )[0].price -
                              each.firstTVL
                          )) /
                          each.totalToken) *
                          each.tokenPrice -
                        each.tokenPrice
                      ).toFixed(2)}
                    %
                  </TableCell>
                  <TableCell className="twhite pink" align="left">
                    {convertToInternationalCurrencySystem(
                      (each.volume / each.pecuCoin) * currentValue
                    )}
                  </TableCell>

                  <TableCell className="twhite blue" align="left">
                    {cryptoData.length > 0 &&
                      convertToInternationalCurrencySystem(
                        each.investementAmount +
                          each.pecuCoin * currentValue +
                          each.otherTokenAmount *
                            cryptoData.filter(
                              (e) => e.symbol == each.otherToken.slice(1)
                            )[0].price
                      )}

                    {/* {convertToInternationalCurrencySystem(each.totalToken)} */}
                  </TableCell>
                </TableRow>
              ))}

            {/* <TablePagination
                sx={{ color: "white" }}
                rowsPerPageOptions={[10, 50]}
                onChange={(e) => setRows(e)}
              /> */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PoolTokens;
