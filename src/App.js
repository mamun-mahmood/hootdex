import logo from "./logo.svg";
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

function App() {
  const [user,setUser]=useState(null)
  const findUser=async()=>{
    let data =localStorage.getItem('hootdex_secretcookie')
    if(data){
        setUser(JSON.parse(data))
    }
  
  }

  useEffect(()=>{
    let data=localStorage.getItem('hootdex_secretcookie')
  
   if(data){
    
       setUser(JSON.parse(data))
   }
  },[])


  const handleUserToken=(e)=>{
    setUser(e)
  
  }

  return (
    <BrowserRouter>
      <div>
        <Nav />

        <Routes>
          <Route path="/create-token" element={<CreateToken user={user} />} />

          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/tokenDetails" element={<TokenPage />} />
          <Route path="/login" element={<Login loginData={(e)=>{handleUserToken(e)}} />} />
          <Route path="/dashboard" element={user&& user.loggedIn?<DashboardIndex user={user} />:<Login />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
