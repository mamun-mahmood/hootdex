import React from 'react'
import logo from '../assets/images/logo.png'
export default function Login() {
  return (
    <div className='screen'>
        <form onSubmit={(e)=>{e.preventDefault()}}>
        <img src={logo} width={200} />
        <label>Email</label>
            <input type={'email'} placeholder='Email' />
            <label>Password</label>
            <input type={'password'} placeholder='Password' />
            <button className='submit-btn'>Login</button>
        </form>
    </div>
  )
}
