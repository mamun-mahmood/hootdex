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
const WarpTokens = () => {
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState([]);
  const fetchToken = (target) => {
    if (target === 'all') {
      setLoading(true);
      axios
        .get(`${url}/wallet/get_all_tokens_wrap`)
        .then((res) => {
          if (res.data.status) {
            setTokens(removeDuplicatedToken(res.data.tokens));
          }

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
                Total Tokens
              </TableCell>
              <TableCell className="twhite" align="left">
                Volume
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
                    <Link to={`#`}>
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
                        />
                        <span style={{ marginLeft: '1rem', fontSize: '18px' }}>
                          {each.tokenName}{' '}
                          <small style={{ color: '#696c75' }}>
                            ({each.symbol})
                          </small>
                        </span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="twhite green" align="left">
                    $ {each.initialFinal}
                  </TableCell>
                  <TableCell className="twhite yellow" align="left">
                    {each.wrapAmount}
                  </TableCell>
                  <TableCell className="twhite pink" align="left">
                    {each.wrapAmount * each.initialFinal}
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

export default WarpTokens;
