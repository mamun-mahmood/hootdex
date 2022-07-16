import React from "react";
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
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const PoolTokens = () => {
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState([]);
  const fetchToken = (target) => {
    if (target === "all") {
      setLoading(true);
      axios
        .get("https://api.pecunovus.net/hootdex/available-tokens")
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
    fetchToken("all");
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
        <div className="">
          {loading && <LinearProgress />}
          <h1
            style={{
              color: "#fff",
              fontSize: "1.5rem",
              textAlign: "center",
              backgroundColor: "green",
            }}
          >
            Pool Tokens
          </h1>
        </div>
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
                #
              </TableCell>
              <TableCell className="twhite">Name</TableCell>
              <TableCell className="twhite" align="center">
                Price
              </TableCell>
              <TableCell className="twhite" align="center">
                Available Tokens
              </TableCell>
              <TableCell className="twhite" align="center">
                Volume
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens.length &&
              tokens.map((each, index) => (
                <TableRow key={each.id}>
                  <TableCell className="twhite" component="th" scope="row">
                    {each.id}
                  </TableCell>
                  <TableCell className="twhite" align="left">
                    <Link to={`/t/${each.tokenName}`}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          className="rounded"
                          src={`http://localhost:3001/hootdex/images/${each?.logo_src}`}
                          alt="token logo"
                        />
                        <span style={{ marginLeft: "1rem", fontSize: "20px" }}>
                          {each.tokenName}{" "}
                          <small style={{ color: "#696c75" }}>
                            ({each.tokenSymbol})
                          </small>
                        </span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="twhite green" align="center">
                    {each.tokenPrice}
                  </TableCell>
                  <TableCell className="twhite yellow" align="center">
                    {each.totalToken}
                  </TableCell>
                  <TableCell className="twhite pink" align="center">
                    {each.investementAmount}
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
