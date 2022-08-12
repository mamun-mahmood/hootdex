import {
  Avatar,
  Button,
  Grid,
  StepConnector,
  Typography
} from '@mui/material';

import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyProfile = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const logout = () => {
    localStorage.removeItem('hootdex_secretcookie');
    navigate('/login');
  };

  //   First Name
  // Last Name
  // Street address
  // City
  // State
  // Zip code
  // Phone number
  // Email address
  return (
    <>
      <Box
        className="rounded shadow-light"
        sx={{
          width: '95%',
          ml: '2.5%',
          mt: 3,
          mb: 2,
          pt: 1
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          <StepConnector />
          <Typography sx={{ color: 'white' }} variant="h5">
            Personal Info
          </Typography>
          <StepConnector />
        </div>
        <Grid container sx={{ maxWidth: '100%' }} spacing={5}>
          <Grid item xs={12} md={4} mt={5} sx={{ ml: { xs: 3, sm: 0 } }}>
            <Box
              style={{
                textAlign: 'center',
                width: '100%',
                backgroundColor: '#1a1b1f'
              }}
              className="border rounded20"
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Avatar sx={{ width: 100, height: 100 }} />
              </div>
              <div
                style={{
                  color: 'white',
                  wordWrap: 'break-word'
                }}
              >
                <div
                  className="rounded center-width tUpper"
                  style={{ backgroundColor: '#01402b' }}
                >
                  <h3>{user.username}</h3>
                </div>
                <p className="fontS22">User ID: {user?.user_id}</p>
                <p className="">
                  Tier Level: {user.tier == null ? 2 : user.tier}
                </p>
              </div>
              <Button
                onClick={logout}
                variant="outlined"
                sx={{
                  color: 'white',
                  textTransform: 'capitalize',
                  m: 1
                }}
              >
                Logout
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <div
              style={{
                padding: '10px'
              }}
            >
              <p style={{ color: 'white', marginLeft: '15px' }}>First Name</p>
              <input
                className="border inputField"
                type="text"
                name="firstname"
              />
            </div>
            <div
              style={{
                padding: '10px'
              }}
            >
              <p style={{ color: 'white', marginLeft: '15px' }}>Last Name</p>
              <input
                className="border inputField"
                type="text"
                name="lastname"
              />
            </div>
            <div
              style={{
                padding: '10px'
              }}
            >
              <p style={{ color: 'white', marginLeft: '15px' }}>Username</p>
              <input
                className="border inputField"
                type="text"
                name="lastname"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div
              style={{
                padding: '10px'
              }}
            >
              <p style={{ color: 'white', marginLeft: '15px' }}>Phone</p>
              <input className="border inputField" type="text" name="phone" />
            </div>
            <div
              style={{
                padding: '10px'
              }}
            >
              <p style={{ color: 'white', marginLeft: '15px' }}>Email</p>
              <input className="border inputField" type="text" name="email" />
            </div>
            <div
              style={{
                padding: '10px'
              }}
            >
              <p style={{ color: 'white', marginLeft: '15px' }}>Country</p>
              <input className="border inputField" type="text" name="company" />
            </div>
          </Grid>
        </Grid>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          <StepConnector />
          <Typography sx={{ color: 'white' }} variant="h5">
            Address Info
          </Typography>
          <StepConnector />
        </div>
        {/* billing info */}
        <Grid container sx={{ maxWidth: '100%' }} spacing={5}>
          <Grid item xs={12} md={4}>
            <div
              style={{
                padding: '10px'
              }}
            >
              <p style={{ color: 'white', marginLeft: '15px' }}>City</p>
              <input className="border inputField" type="text" name="addres1" />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div
              style={{
                padding: '10px'
              }}
            >
              <p style={{ color: 'white', marginLeft: '15px' }}>State</p>
              <input className="border inputField" type="text" name="addres2" />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div
              style={{
                padding: '10px'
              }}
            >
              <p style={{ color: 'white', marginLeft: '15px' }}>Street</p>
              <input className="border inputField" type="text" name="phone" />
            </div>
          </Grid>
        </Grid>
        {/* settings */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            sx={{ color: 'white', borderColor: '#01402b', mb: 1 }}
          >
            Save Changes
          </Button>
        </div>
      </Box>
    </>
  );
};

export default MyProfile;
