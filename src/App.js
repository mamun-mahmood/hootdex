import "./App.css";
import Home from "./screens/home";
import Nav from "./components/nav/nav";
import Footer from "./components/footer/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateToken from "./screens/createToken";
import Wallet from "./screens/wallet";
import Login from "./screens/login";
import { useEffect, useState } from "react";
import DashboardIndex from "./screens/DashboardIndex";
import TokenPage from "./screens/tokenPage";
import axios from "axios";

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
      axios
        .get(`http://localhost:3001/hootdex/getMycoins/${wall.uid}`)
        .then((res) => {
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
        <div style={{ paddingTop: '70px',  }} >
          <Routes>
            <Route path="/create-token" element={<CreateToken />} />
            <Route path="/" element={<Home />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route
              path="/t/:tokenName"
              element={<TokenPage user={user} pecuCoins={pecuCoins} />}
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
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
