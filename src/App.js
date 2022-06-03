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
function App() {
  const [user,setUser]=useState(null)
  const findUser=async()=>{
    let data =localStorage.getItem('usercredshootdexas27')
    if(data){
        setUser(JSON.parse(data))
    }
  
  }
    useEffect(()=>{
      findUser()
    },[])
  return (
    <BrowserRouter>
      <div>
        <Nav />

        <Routes>
          <Route path="/create-token" element={<CreateToken />} />

          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
