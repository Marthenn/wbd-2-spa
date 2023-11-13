import React, { useState, useEffect, SyntheticEvent, ChangeEventHandler } from 'react';
import {
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
  Typography,
} from '@mui/material';
import theme from '../theme/theme';
import Navbar from '../components/NavBar/Navbar';
import EditIcon from '@mui/icons-material/Edit';
import sideWave from '../assets/side-wave.svg';
import RoundedButton from '../components/Button/RoundedButton';
import PaymentDialog from '../components/MembershipRequestDialog/PaymentDialog';
import StatusDialog from '../components/CheckStatusDialog/StatusDialog';

const Profile = () => {
  const [userPhoto, setUserPhoto] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openCheckStatus, setOpenCheckStatus] = useState(false);
  
  const handleOpenCheckStatus = () => {
    setOpenCheckStatus(true);
  };

  const handleCloseCheckStatus = () => {
    setOpenCheckStatus(false);
  };

  const handleOpenPaymentDialog = () => {
    setOpenPaymentDialog(true);
  };

  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false);
  };

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
  const [newPassword, setNewPassword] = useState<string>('');

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
            margin: '30px 3%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'baseline',
            [theme.breakpoints.up('sm')]: {
              margin: '30px 2%',
            },
            [theme.breakpoints.up('lg')]: {
              margin: '30px 8%',
            },
          }}
        >
        <PaymentDialog 
            formData={{
                username: "user#placeholder", // dari session
                email: "email#placeholder",
                paymentProof: null,
            }}
            open={openPaymentDialog} 
            handleClose={handleClosePaymentDialog}
        />
        <StatusDialog
            open={openCheckStatus} 
            handleClose={handleCloseCheckStatus}
        />
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                value={newPassword ? newPassword : password}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body1" sx={{ mr: 1 }}>
                  Premium account active until: dari session
                </Typography>
                <RoundedButton text="Extend" onClickFunction={handleOpenPaymentDialog} color="roundedButtonPurple" fullWidth={false}/>
              </Box>
              <Button
                onClick={handleOpenCheckStatus}
                variant="outlined"
                color="primary"
                sx={{ mt: 1 }}
                fullWidth
              >
                Already applied request? Check your request status
              </Button>
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
              <Button
                  onClick={handleLogout}
                  variant="contained"
                  color="error"
                  fullWidth
                >
                  Logout
                </Button>
            </Grid>
            <Grid item xs={0} md={6} display={{ xs: 'none', md: 'flex' }}>
                <img src={sideWave} alt="" 
                  style={{
                    objectFit: 'cover',
                    height: '100vh',
                  }}
                />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Profile;
