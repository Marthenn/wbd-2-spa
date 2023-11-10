import React, { useState, useEffect, SyntheticEvent, ChangeEventHandler } from 'react';
import {
  Typography,
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
  Container,
  Box,
  Grid,
  Avatar,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import theme from '../theme/theme';
import Navbar from '../components/NavBar/Navbar';
import PrimaryButtonRed from '../components/Button/PrimaryButtonRed';
import EditIcon from '@mui/icons-material/Edit';
import sideWave from '../assets/side-wave.svg';

const Profile = () => {
  const [userPhoto, setUserPhoto] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    // Simulate fetching user data from an API
    const fetchUserData = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT'); // Replace with your API endpoint
        const userData = await response.json();

        // Update state with retrieved data
        setUserPhoto(userData.userPhoto);
        setUsername(userData.username);
        setEmail(userData.email);
      } catch (error) {
        setUsername('admin#placeholder');
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const [newUserPhoto, setNewUserPhoto] = useState<string>('');
  const [newUsername, setNewUsername] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // Add logic for form submission
  };

  const handlePhotoChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewUserPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  function handleLogout(_e: SyntheticEvent<Element, Event>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar category="user" username={username} userPhoto={userPhoto} />
        <Container
          component="main"
          sx={{
            width: '100%',
            height: '100vh',
            margin: '0 3%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'baseline',
            [theme.breakpoints.up('sm')]: {
              margin: '0 2%',
            },
            [theme.breakpoints.up('lg')]: {
              margin: '0 8%',
            },
          }}
        >
          <Grid container spacing={{ xs: 0, md: 3 }} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6} sx={{ p: {xs: 0, md: 10}, mt: {xs: 20, md:5} }} justifyContent="center" alignItems="center">
              {userPhoto !== '' && newUserPhoto !== '' ? (
                <Box display="flex" flexDirection="row" alignItems="end" justifyContent="center">
                  <Avatar sx={{
                        width: { xs: 100, md: 200 },
                        height: { xs: 100, md: 200 },
                        fontSize: { xs: 40, md: 80 },
                    }} src={userPhoto ? userPhoto : newUserPhoto} alt="User" />
                  <IconButton onClick={() => document.getElementById('fileInput')?.click()}>
                    <EditIcon />
                  </IconButton>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: 'none' }}
                  />
                </Box>
              ) : (
                <Box display="flex" flexDirection="row" alignItems="end" justifyContent="center">
                  <Avatar
                    sx={{
                        width: { xs: 100, md: 200 },
                        height: { xs: 100, md: 200 },
                        fontSize: { xs: 40, md: 80 },
                    }}
                    >
                    {username.charAt(0).toUpperCase()}
                  </Avatar>
                  <IconButton onClick={() => document.getElementById('fileInput')?.click()}>
                    <EditIcon />
                  </IconButton>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: 'none' }}
                  />
                </Box>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="email"
                value={newEmail ? newEmail : email}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="username"
                label="Username"
                type="username"
                id="username"
                autoComplete="username"
                value={newUsername ? newUsername : username}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="primary"
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
              <PrimaryButtonRed
                text="Logout"
                onClickFunction={handleLogout}
              />
            </Grid>
            <Grid item xs={0} md={6} display={{ xs: 'none', md: 'flex' }}>
                <img src={sideWave} alt="" />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Profile;
