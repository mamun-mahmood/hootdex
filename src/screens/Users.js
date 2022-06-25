import {
  Box,
  LinearProgress,
  StepConnector,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Users = ({ user }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [rows, setRows] = useState(10);
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchUser = (target) => {
    if (target === "all") {
      setLoading(true);
      axios.get("http://localhost:3001/hootdex/alluser").then((res) => {
        setUsers(res.data);
        setAllUsers(res.data)
        setLoading(false);
      });
    } 
    if (target.includes("@")) {
      setLoading(true);
      console.log(target);
      axios
        .get(`http://localhost:3001/hootdex/userbyemail/${target}`)
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        });
    } else {
      setLoading(true);
      axios.get(`http://localhost:3001/hootdex/user/${target}`).then((res) => {
        setUsers(res.data);
        setLoading(false);
      });
    }
  };
  useEffect(() => {
    fetchUser("all");
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchKey) {
      fetchUser(searchKey);
    } else fetchUser("all");
  };
  return (
    <div>
      <Box>
        <TableContainer
          sx={{ width: "80%", ml: "10%", p: 1, backgroundColor: "black" }}
          component={Paper}
        >
          <div className="rounded fontS22 tcenter twhite bg1 ">
            <p>Hootdex Users</p>
            <StepConnector />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "1rem",
              }}
            >
              <p>Total: {allUsers.length}</p>
              <p>Tier 1: 0</p>
              <p>Tier 2: 0</p>
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            <form className="form-control" onSubmit={handleSubmit}>
              <input
                style={{
                  width: "30rem",
                  height: "1.5rem",
                }}
                className="border inputField shadow" 
                type="text"
                placeholder="Search with username or email..."
                name="searchKey"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </form>
          </div>
          {loading && <LinearProgress />}
          <Table
            className="shadow"
            aria-label="simple table"
            sx={{ backgroundColor: "" }}
          >
            <TableHead className="">
              <TableRow className="">
                <TableCell className="twhite" component="th" scope="row">
                  Id
                </TableCell>
                <TableCell className="twhite" align="left">
                  Username
                </TableCell>
                <TableCell className="twhite" align="left">
                  Email
                </TableCell>
                <TableCell className="twhite" align="left">
                  Tier
                </TableCell>
                <TableCell className="twhite" align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length &&
                users.slice(0, 10).map((each, index) => (
                  <TableRow
                    className={`${
                      index % 2 === 0 ? "bg1 borderS" : "bg2 borderS"
                    }`}
                    key={each.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="twhite" component="th" scope="row">
                      {each.id}
                    </TableCell>
                    <TableCell className="twhite" align="left">
                      {each.uname}
                    </TableCell>
                    <TableCell className="twhite" align="left">
                      {each.email}
                    </TableCell>
                    <TableCell className="twhite" align="left">
                      {each.tier === null ? "none" : each.tier}
                    </TableCell>
                    <TableCell className="twhite" align="right">
                      Select
                    </TableCell>
                  </TableRow>
                ))}
              <TablePagination
                sx={{ color: "white" }}
                rowsPerPageOptions={[10, 50]}
                onChange={(e) => setRows(e)}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default Users;
