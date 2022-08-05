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
const TopToken = () => {
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState([]);
  console.log('Top token reders');
  useEffect(() => {
    // const fetchToken = (target) => {
    // if (target === "all") {
    setLoading(true);
    axios
      .get(`${url}/wallet/get_all_tokens_wrap`)
      .then((res) => {
        if (res.data.status) {
          console.log(res.data);
          setTokens(removeDuplicatedToken(res.data.tokens));
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    // } else {
    //   setLoading(true);
    //   setTokens(tokens.filter((each) => each.tokenName === target));
    //   setLoading(false);
    // }
    // };
    // fetchToken("all");
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
        <div className="">
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
            Top Tokens
          </p>
          {loading && <LinearProgress color="inherit" />}
        </div>
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
                    <Link
                      to={`/tokens/tokenid`}
                      state={each}
                      // pecuCoins={currentValue}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Avatar
                          className="rounded"
                          src={`${url}/hootdex/images/${each?.logo_src}`}
                          alt={each.symbol.slice(1)}
                          style={{
                            backgroundColor: 'orange',
                            height: '25px',
                            width: '25px',
                            fontSize: '18px'
                          }}
                        />
                        <span
                          style={{
                            marginLeft: '1rem',
                            fontSize: '18px',
                            color: 'grey'
                          }}
                        >
                          {each.tokenName} (
                          <small style={{ color: 'orange' }}>
                            {each.symbol
                              .split('')
                              .map((e, i) => (i == 0 ? e.toLowerCase() : e))
                              .join('')}
                          </small>
                          )
                        </span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="twhite green" align="left">
                    ${' '}
                    {convertToInternationalCurrencySystem(
                      (each.initialFinal / each.wrapAmount).toFixed(2)
                    )}
                  </TableCell>
                  <TableCell className="twhite yellow" align="left">
                    {(
                      (Math.abs(each.initialFinal - each.firstPrice) /
                        each.wrapAmount /
                        each.initialFinal) *
                      100
                    ).toFixed(2)}{' '}
                    %
                  </TableCell>
                  <TableCell className="twhite pink" align="left">
                    {convertToInternationalCurrencySystem(each.initialFinal)}
                  </TableCell>
                  <TableCell className="twhite blue" align="left">
                    {/* {each.wrapAmount * each.initialFinal} */}${' '}
                    {convertToInternationalCurrencySystem(
                      each.wrapAmount * each.initialFinal
                    )}
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

export default React.memo(TopToken);
