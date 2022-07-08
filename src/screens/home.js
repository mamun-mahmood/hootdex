import { LinearProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chart from "./chart";
export default function Home() {

  const poolTableAttributes = [
    "Id",
    "Name",
    "Token",
    "Available Coins",
    "Rate Pecu/Token",
    "Info",
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
      <div style={{ position: 'absolute', zIndex: "-1", width: '100%', height: "100%" }}>
      
      </div>
      <div className="screen" style={{zIndex: "100", position: 'sticky', width: '100%', }}>
        {/* <div className="banner-hero" >   <h1 className="primary__title">Available Pools</h1>
    <p style={{color:'orange'}}>Swap, earn, and build on the leading decentralized crypto trading protocol.</p>
    </div> */}
          <Chart style={{backgroundColor: "green" }} />
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
          <div className="center-width">{loading && <LinearProgress />}</div>
        </div>
        <div className="table__container">
          <table className="table">
            <tr className="tr">
              {poolTableAttributes.map((e, index) => (
                <th className="th" key={index}>
                  {e}
                </th>
              ))}
            </tr>
            {tokens.map((e, index) => (
              <tr className="tr" key={index}>
                <td className="td">{e.id}</td>
                <td className="td">{e.tokenName}</td>
                <td className="td">{e.totalToken}</td>
                <td className="td">{e.pecuCoin}</td>
                <td className="td">{e.rate}</td>
                <Link to={`/t/${e.tokenName}`}>
                  <button
                    style={{
                      width: "100%",
                      padding: "1rem",
                      backgroundColor: "rgb(244, 169, 50)",
                      fontSize: "14px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Visit👀
                  </button>
                </Link>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}
