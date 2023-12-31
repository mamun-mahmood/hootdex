import React from "react";
import {
  Avatar,
  LinearProgress,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import url from "../../serverUrl";
const Transactions = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currentValue, setCurrentValue] = useState(0);
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
  const fetchToken = (target) => {
    if (target === "all") {
      setLoading(true);
      axios
        .get(`${url}/hootdex/available-tokens-transactions`)
        .then((res) => {
          setTransactions(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      setTransactions(transactions.filter((each) => each.tokenName === target));
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchToken("all");
    get_current_index_coin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <TableContainer
        sx={{
          backgroundColor: "#1a1b1f",
          mt: 5,
          borderRadius: "1rem",
        }}
        component={Paper}
      >
        <p
          style={{
            color: "rgb(195, 197, 203)",
            fontSize: "15px",
            fontWeight: "600",
            textAlign: "left",
            backgroundColor: "#21242b",
            padding: "1rem",
          }}
        >
          All Transactions
        </p>
        {loading && <LinearProgress color="inherit" />}
        {transactions.length ? (
          <Table
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: " 1px solid #1e2128",
              },
            }}
          >
            <TableHead className="">
              <TableRow className="">
                {/* {poolTableAttributes.map((e, index) => ( */}
                <TableCell className="twhite" component="th" scope="row">
                  All
                </TableCell>
                <TableCell className="twhite"> Total Value</TableCell>
                <TableCell className="twhite" align="left">
                  Total Amount
                </TableCell>
                <TableCell className="twhite" align="left">
                  Total Amount
                </TableCell>
                <TableCell className="twhite" align="left">
                  Account
                </TableCell>
                <TableCell className="twhite" align="left">
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions &&
                transactions.map((each, index) => (
                  <TableRow key={each.id}>
                    <TableCell className="twhite" component="th" scope="row">
                      Swap PECU for {each.tokenName.toUpperCase()}
                    </TableCell>
                    <TableCell className="twhite" align="left">
                      <Link
                        to={`/t/${each.tokenName}`}
                        pecuCoins={currentValue}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            className="rounded"
                            src={`${url}/hootdex/images/${each?.logo_src}`}
                            alt="token logo"
                            style={{ width: "20px", height: "20px" }}
                          />
                          <Avatar
                            className="rounded"
                            src={`https://pecunovus.net/static/media/icon.25c8ec299d961b9dd524.ico`}
                            alt="token logo"
                            style={{ width: "20px", height: "20px" }}
                          />
                          <span
                            style={{ marginLeft: "1rem", fontSize: "20px" }}
                          >
                            {each.tokenName}{" "}
                            <small style={{ color: "#696c75" }}>
                              ({`${each.tokenSymbol}/PECU`})
                            </small>
                          </span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="twhite green" align="left">
                      {each.currentPrice}
                    </TableCell>
                    <TableCell className="twhite yellow" align="left">
                      {each.totalToken}
                    </TableCell>
                    <TableCell className="twhite pink" align="left">
                      {each.volume?.toFixed(2)}
                    </TableCell>
                    <TableCell className="twhite pink" align="left">
                      {new Date().toLocaleDateString()}
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
        ) : (
          <Skeleton
            sx={{ bgcolor: "#21242b", mt: 1 }}
            variant="rectangular"
            margin={"1rem"}
            height={100}
          />
        )}
      </TableContainer>
    </>
  );
};

export default Transactions;
