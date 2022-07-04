import React, { useEffect, useState } from 'react'
import './style.css'
import {Link, useLocation } from "react-router-dom";
import logo from '../../assets/images/logo.png'
export default function Nav() {
  const [user,setUser]=useState(null)
const findUser=async()=>{
  let data =localStorage.getItem('hootdex_secretcookie')
  if(data){
      setUser(JSON.parse(data))
  }

}
  
const location = useLocation();


  useEffect(() => {
  setUser(null)
  findUser()
  }, [location]);

  useEffect(()=>{
    findUser()
  },[])
  return (
    <div className='nav'>
        <div className='left__nav'><Link to="/"  className='logo__header'><img src={logo} alt="nav_logo" width={200} /></Link></div>
    <div className='right__nav'>
   
  <Link to="/wallet"> <button className='button header-link'>Ecosystem</button></Link>
  <Link to="/Community"> <button className='button header-link'>Community</button></Link>
  <Link to="/"> <button className='button header-link'>Tokens</button></Link>
  <Link to="/Developers"> <button className='button header-link'>Developers</button></Link>
  <Link to="/Blog"> <button className='button header-link'>Blog</button></Link>
        <Link to="/Faq"> <button className='button header-link'>FAQ </button></Link>
       
        {user && user.loggedIn &&(user.tier==null||user.tier==0)? <><Link to="/create-token"> <button className='button '>Create Token</button></Link>
          <Link to="/dashboard"> <button className='button '>Dashboard</button></Link></> : <></>}
         {user &&user.loggedIn?null: 
          <Link to="/login"> <button className='button'>Login</button></Link>
  }
    </div>
    </div>
  )
}
