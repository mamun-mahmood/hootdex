import React, { useEffect, useState } from 'react'
import './style.css'
import {Link } from "react-router-dom";
import logo from '../../assets/images/logo.png'
export default function Nav() {
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
    <div className='nav'>
        <div className='left__nav'><Link to="/"  className='logo__header'><img src={logo} width={200} /></Link></div>
    <div className='right__nav'>
   
  <Link to="/wallet"> <button className='header-link'>Ecosystem</button></Link>
  <Link to="/wallet"> <button className='header-link'>Community</button></Link>
  <Link to="/wallet"> <button className='header-link'>Tokens</button></Link>
  <Link to="/wallet"> <button className='header-link'>Developers</button></Link>
  <Link to="/wallet"> <button className='header-link'>Blog</button></Link>
  <Link to="/wallet"> <button className='header-link'>FAQ</button></Link>
  {user?<><Link to="/create-token"> <button>Create Token</button></Link>
   <Link to="/wallet"> <button>Wallet</button></Link></>: <Link to="/login"> <button>Login</button></Link>
  }
    </div>
    </div>
  )
}
