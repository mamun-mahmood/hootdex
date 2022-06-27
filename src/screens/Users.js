import {
  Alert,
  Box,
  Collapse,
  FormControl,
  IconButton,
  LinearProgress,
  MenuItem,
  Select,
  StepConnector,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Users = ({ user }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [tier1, setTier1] = useState([]);
  const [tier2, setTier2] = useState([]);
  const [tierPending, setTierPending] = useState([]);
  // const [rows, setRows] = useState(10);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(10);
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const fetchUser = (target) => {
    if (target === "all" ) {
      setLoading(true);
      axios
        .get("http://localhost:3001/hootdex/alluser")
        .then((res) => {
          setUsers(res.data);
          setAllUsers(res.data);
          setTier1(res.data.filter((each) => each.tier === 1));
          setTier2(res.data.filter((each) => each.tier === 2));
          setTierPending(res.data.filter((each) => each.tier === null));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
    if (target.includes("@")) {
      setLoading(true);
      setUsers(users.filter((each) => each.email === target));
      setLoading(false);
    } else if (target !== "all") {
      setLoading(true);
      setUsers(users.filter((each) => each.uname === target));
      setLoading(false);
    }
  };
  const handleChange = (e, uname) => {
    setLoading(true);
    axios
      .post(
        `http://localhost:3001/hootdex/update-tier-level/${uname}/${e.target.value}`
      )
      .then((res) => {
        setLoading(false);
        setRefresh(!refresh);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchUser("all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
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
          sx={{
            width: "80%",
            ml: "10%",
            p: 1,
            backgroundColor: "black",
            mb: 1,
          }}
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
              <p>Tier 1: {tier1.length}</p>
              <p>Tier 2: {tier2.length}</p>
              <p>Pending: {tierPending.length}</p>
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
                  height: "1rem",
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Collapse
              in={!users.length && !loading}
              sx={{ maxWidth: 400, position: "absolute" }}
            >
              <Alert
                variant="outlined"
                severity="error"
                action={
                  <IconButton aria-label="close" color="inherit" size="small">
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2, backgroundColor: "white", fontSize: "18px" }}
              >
                Nothing found!
              </Alert>
            </Collapse>
          </div>
          <Table className="shadow">
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
                <TableCell className="twhite" align="center">
                  Tier
                </TableCell>
                <TableCell className="twhite" align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length &&
                users.slice(from, to).map((each, index) => (
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
                    <TableCell className="twhite" align="center">
                      <FormControl sx={{ minWidth: 120 }}>
                        <Select
                          className="shadow twhite"
                          sx={{ border: "1px solid white", height: 40 }}
                          value={each.tier === null ? "null" : each.tier}
                          onChange={(e) => handleChange(e, each.uname)}
                        >
                          <MenuItem sx={{ display: "none" }} value="null">
                            <em>Null</em>
                          </MenuItem>
                          <MenuItem sx={{ display: "none" }} value="0">
                            0
                          </MenuItem>
                          <MenuItem value="1">Tier 1</MenuItem>
                          <MenuItem value="2">Tier 2</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell className="twhite" align="center">
                      Edit
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
      </Box>
    </div>
  );
};

export default Users;
