import React, { useEffect, useState } from 'react';
import './style.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

import ConnectWallet from '../Modal/ConnectWallet';
import { Button } from '@mui/material';
export default function Nav({ fetchWallet, wallet }) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const findUser = async () => {
    let data = localStorage.getItem('hootdex_secretcookie');
    if (data) {
      setUser(JSON.parse(data));
    }
  };
  const location = useLocation();
  useEffect(() => {
    setUser(null);
    findUser();
  }, [location]);

  useEffect(() => {
    findUser();
  }, []);
  return (
    <>
      <div className="nav">
        <div className="left__nav">
          <Link to="/" className="logo__header">
            <img src={logo} alt="nav_logo" width={200} />
          </Link>
        </div>
        <div className="right__nav">
          <Link to="/wallet">
            {' '}
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                textTransform: 'capitalize',
                m: 1
              }}
            >
              Ecosystem
            </Button>
          </Link>
          <Link to="/Community">
            {' '}
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                textTransform: 'capitalize',
                m: 1
              }}
            >
              Community
            </Button>
          </Link>
          <Link to="/">
            {' '}
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                textTransform: 'capitalize',
                m: 1
              }}
            >
              Tokens
            </Button>
          </Link>
          <Link to="/Developers">
            {' '}
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                textTransform: 'capitalize',
                m: 1
              }}
            >
              Developers
            </Button>
          </Link>
          <Link to="/Blog">
            {' '}
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                textTransform: 'capitalize',
                m: 1
              }}
            >
              Blog
            </Button>
          </Link>
          <Link to="/Faq">
            {' '}
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                textTransform: 'capitalize',
                m: 1
              }}
            >
              FAQ
            </Button>
          </Link>
          {true ? (
            <>
              {JSON.parse(
                localStorage.getItem('hootdex_secretcookie_wallet')
              ) ? (
                <Button
                  variant="outlined"
                  sx={{
                    color: 'white',
                    textTransform: 'capitalize',
                    m: 1
                  }}
                  onClick={() => {
                    localStorage.removeItem('hootdex_secretcookie_wallet');
                    fetchWallet();
                  }}
                >
                  Disconnect Wallet
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  sx={{
                    color: 'white',
                    textTransform: 'capitalize',
                    m: 1
                  }}
                  onClick={handleOpen}
                >
                  Connect Wallet
                </Button>
              )}
              <Link to="/dashboard">
                {' '}
                <Button
                  variant="outlined"
                  sx={{
                    color: 'white',
                    textTransform: 'capitalize',
                    m: 1
                  }}
                >
                  MVault
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/login">
              {' '}
              <Button
                variant="outlined"
                sx={{
                  color: 'white',
                  textTransform: 'capitalize',
                  m: 1
                }}
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
      <ConnectWallet
        setOpen={setOpen}
        open={open}
        fetchWallet={fetchWallet}
        wallet={wallet}
      />
    </>
  );
}
