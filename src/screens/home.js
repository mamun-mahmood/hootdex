import { LinearProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chart from "./chart";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
export default function Home() {
  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };
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
      <Particles
        options={{
          fpsLimit: 40,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 2,
              },
              repulse: {
                distance: 100,
                duration: 0.8,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1200,
              },
              value: 50,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
      />
      <div className="screen">
        {/* <div className="banner-hero" >   <h1 className="primary__title">Available Pools</h1>
    <p style={{color:'orange'}}>Swap, earn, and build on the leading decentralized crypto trading protocol.</p>
    </div> */}
        <div>
          <Chart />
          {/* <h1 className="primary__title">Listed Tokens</h1> */}
        </div>
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
                    Info
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
