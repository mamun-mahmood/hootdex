import axios from 'axios';
import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import url from '../serverUrl';
import {
  Alert,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  LinearProgress
} from '@mui/material';
export default function Login(props) {
  const [inputData, setInputData] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState({ type: '', show: false, msg: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const hanldeSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    // eslint-disable-next-line eqeqeq
    if (inputData.email.length == 0 || inputData.password.length == 0) {
      setAlert({
        msg: 'Please fill all required fields',
        type: 'error',
        show: true
      });
      setTimeout(() => {
        setAlert({
          msg: '',
          type: '',
          show: false
        });
      }, 1000);
      return;
    }
    axios
      .post(`${url}/user/login`, {
        email: inputData.email,
        password: inputData.password
      })
      .then((res) => {
        // eslint-disable-next-line eqeqeq
        if (res.data.loggedIn == true) {
          setAlert({
            msg: 'Login Success',
            type: 'success',
            show: true
          });
          setTimeout(() => {
            setAlert({
              msg: '',
              type: '',
              show: false
            });
          }, 1000);
          localStorage.setItem(
            'hootdex_secretcookie',
            JSON.stringify(res.data)
          );
          if (props && props.loginData) {
            props.loginData(res.data);
          }

          navigate('/');
        } else {
          setAlert({
            msg: res.data.message,
            type: 'error',
            show: true
          });
          setTimeout(() => {
            setAlert({
              msg: '',
              type: '',
              show: false
            });
          }, 1000);
        }
      })
      .catch((err) => {
        setAlert({
          msg: err.message,
          type: 'error',
          show: true
        });
        setTimeout(() => {
          setAlert({
            msg: '',
            type: '',
            show: false
          });
        }, 1000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };
  return (
    <div className="screen">
      <form className="form" onSubmit={hanldeSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Collapse in={alert.show} sx={{ maxWidth: 400, position: 'fixed' }}>
            <Alert
              variant="outlined"
              severity={alert.type}
              sx={{ mb: 2, backgroundColor: 'white', fontSize: '18px' }}
            >
              {alert.msg}
            </Alert>
          </Collapse>
        </div>
        <img
          alt="clogo"
          width={200}
          src={
            'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/ijkewxwcvdvucass0oyw'
          }
        />
        <label className="label">Email</label>
        <input
          className="input"
          type={'email'}
          name="email"
          onChange={handleChange}
          value={inputData.email}
          placeholder="Email"
        />
        <label className="label">Password</label>
        <input
          className="input"
          type={'password'}
          name="password"
          onChange={handleChange}
          value={inputData.password}
          placeholder="Password"
        />
        <div className="center-width">{loading && <LinearProgress />}</div>
        <button className="submit-btn">Login</button>
      </form>
    </div>
  );
}
