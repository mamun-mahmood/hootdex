import {
  Avatar,
  Button,
  FormControl,
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
import Chart from "./chart";
export default function Home() {
  const poolTableAttributes = [
    "#",
    "Name",
    "Price",
    "Available Coins",
    "Volume",
  ];
  const [loading, setLoading] = useState(false);
  // const poolData = [
  //   {
  //     id: "45435",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  //   {
  //     id: "45436",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  //   {
  //     id: "45437",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  //   {
  //     id: "45438",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  //   {
  //     id: "45439",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  //   {
  //     id: "45440",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  //   {
  //     id: "45441",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  //   {
  //     id: "45442",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  //   {
  //     id: "45443",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  //   {
  //     id: "45444",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  //   {
  //     id: "45445",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  //   {
  //     id: "45446",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  //   {
  //     id: "45447",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  //   {
  //     id: "45448",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  //   {
  //     id: "45449",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  //   {
  //     id: "45450",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  //   {
  //     id: "45451",
  //     name: "MariaNu45token",
  //     token: "1000",
  //     coins: "1000",
  //     rate: "1",
  //   },
  // ];
  const [tokens, setTokens] = useState([]);
  const [searchKey, setSearchKey] = useState("");
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchKey) {
      fetchToken(searchKey);
    } else fetchToken("all");
  };
  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: "-1",
          width: "100%",
          height: "100%",
        }}
      ></div>
      <div
        className="screen"
        style={{ zIndex: "100", position: "sticky", width: "100%" }}
      >
        {/* <div className="banner-hero" >   <h1 className="primary__title">Available Pools</h1>
    <p style={{color:'orange'}}>Swap, earn, and build on the leading decentralized crypto trading protocol.</p>
    </div> */}
        <Chart style={{ backgroundColor: "green" }} />
        {/* <h1 className="primary__title">Listed Tokens</h1> */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          <form className="form-control" onSubmit={handleSubmit}>
            <input
              style={{
                width: "30rem",
                height: "1rem",
              }}
              className="border inputField shadow"
              type="text"
              placeholder="Search for token..."
              name="searchKey"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </form>
        </div>
        <TableContainer
          sx={{
            width: "80%",
            // ml: '10%',
            p: 1,
            backgroundColor: "#1a1b1f",
            mb: 1,
            borderRadius: "1rem",
          }}
          component={Paper}
        ><div className="">{loading && <LinearProgress />}</div>
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
                          <span style={{ marginLeft: "1rem", fontSize: '20px' }}>
                            {each.tokenName} <small style={{color: '#696c75'}} >({each.tokenSymbol})</small>
                          </span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="twhite" align="center">
                      {each.tokenPrice}
                    </TableCell>
                    <TableCell className="twhite" align="center">
                      {each.totalToken}
                    </TableCell>
                    <TableCell className="twhite" align="center">
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
      </div>
    </>
  );
}
