import React, { useEffect, useState } from 'react'
import './style.css'
import {Link } from "react-router-dom";
import logo from '../../assets/images/logo.png'
export default function Nav() {
  const [user,setUser]=useState(null)
const findUser=async()=>{
  let data =localStorage.getItem('hootdex_secretcookie')
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
   
  <Link to="/wallet"> <button className='button header-link'>Ecosystem</button></Link>
  <Link to="/wallet"> <button className='button header-link'>Community</button></Link>
  <Link to="/wallet"> <button className='button header-link'>Tokens</button></Link>
  <Link to="/wallet"> <button className='button header-link'>Developers</button></Link>
  <Link to="/wallet"> <button className='button header-link'>Blog</button></Link>
  <Link to="/wallet"> <button className='button header-link'>FAQ</button></Link>
  {user &&user.loggedIn?<><Link to="/create-token"> <button className='button '>Create Token</button></Link>
   <Link to="/dashboard"> <button className='button '>Wallet</button></Link></>: <Link to="/login"> <button>Login</button></Link>
  }
    </div>
    </div>
  )
}
