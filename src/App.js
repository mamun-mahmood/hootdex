import "./App.css";
import Home from "./screens/home";
import Nav from "./components/nav/nav";
import Footer from "./components/footer/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wallet from "./screens/wallet";
import Login from "./screens/login";
import { useEffect, useState } from "react";
import DashboardIndex from "./screens/DashboardIndex";
import PoolPage from "./screens/PoolPage";
import axios from "axios";
import url from "./serverUrl";
import TokenPage from "./screens/TokenPage";
import AllTokens from "./screens/AllTokens";
import CreatePool from "./screens/CreatePool";
import InfoPage from "./screens/InfoPage";
import ProjectToken from "./screens/ProjectToken";
function App() {
  const [user, setUser] = useState(null);
  const findUser = async () => {
    let data = localStorage.getItem("hootdex_secretcookie");
    if (data) {
      setUser(JSON.parse(data));
    }
  };
  //fecth token by uid after wallet connected
  const [pecuCoins, setPecuCoins] = useState({});
  const [wallet, setWallet] = useState({});
  const fetchWallet = () => {
    const wall = JSON.parse(
      localStorage.getItem("hootdex_secretcookie_wallet")
    );
    setWallet(wall);
    if (wall?.userFound) {
      axios.get(`${url}//hootdex/getMycoins/${wall.uid}`).then((res) => {
        setPecuCoins(res.data[0]);
      });
    }
  };
  useEffect(() => {
    let data = localStorage.getItem("hootdex_secretcookie");

    if (data) {
      setUser(JSON.parse(data));
    }
    fetchWallet();
  }, []);

  const handleUserToken = (e) => {
    setUser(e);
  };
  return (
    <BrowserRouter>
      <div>
        <Nav wallet={wallet} fetchWallet={fetchWallet} />
        <Routes>
          <Route path="/create-token" element={<CreatePool />} />
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route
            path="/pools/:id"
            element={<PoolPage user={user} pecuCoins={pecuCoins} />}
          />
          <Route
            path="/tokens/:tokenName"
            element={<TokenPage user={user} pecuCoins={pecuCoins} />}
          />
          <Route
            path="/project-token/:tokenSymbol"
            element={<ProjectToken user={user} pecuCoins={pecuCoins} />}
          />
          <Route
            path="/tokens"
            element={<AllTokens user={user} pecuCoins={pecuCoins} />}
          />
          <Route
            path="/info"
            element={<InfoPage user={user} />}
          />
          <Route
            path="/login"
            element={
              <Login
                loginData={(e) => {
                  handleUserToken(e);
                }}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              user && user.loggedIn ? (
                <DashboardIndex user={user} pecuCoins={pecuCoins} />
              ) : (
                <Login />
              )
            }
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
