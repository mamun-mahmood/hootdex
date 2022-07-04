import axios from 'axios';
import React, { useState } from 'react'
import logo from '../assets/images/logo.png'
import { useNavigate } from "react-router-dom";
export default function Login(props) {
  const [inputData,setInputData]=useState({email:"",password:""})
  const navigate = useNavigate();

  const hanldeSubmit=(e)=>{
    e.preventDefault();
    // eslint-disable-next-line eqeqeq
    if(inputData.email.length==0 || inputData.password.length==0){
      alert('Please fill all required fields');
      return
      };
      axios.post(`https://api.pecunovus.net/user/login`,{
        email:inputData.email,
        password:inputData.password
      }).then(res=>{
        // eslint-disable-next-line eqeqeq
        if(res.data.loggedIn==true){
         
          localStorage.setItem('hootdex_secretcookie', JSON.stringify(res.data))
          if (props&&props.loginData) {
              props.loginData(res.data)
          }
        
        
          navigate('/dashboard')
         }
        console.log(res.data)

      }).catch(err=>{alert(err.message)})

};


const handleChange=(e)=>{
  let name =e.target.name;
  let value=e.target.value;
  setInputData({...inputData,[name]:value})
}
  return (
    <div className='screen'>
        <form className='form' onSubmit={hanldeSubmit}>
        <img  src={logo} alt="clogo"  width={200} />
        
        <label className='label'>Email</label>
            <input className='input' type={'email'} name="email" onChange={handleChange} value={inputData.email} placeholder='Email' />
            <label className='label'>Password</label>
            <input className='input' type={'password'} name="password" onChange={handleChange} value={inputData.password} placeholder='Password' />
            <button className='submit-btn'>Login</button>
        </form>
    </div>
  )
}