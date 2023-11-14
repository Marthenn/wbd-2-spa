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

  const [faceio, setFaceIO] = useState(null);
  const [error, setError] = useState(null);

  // hook to initialize FaceIO instance when component mounts
  useEffect(() => {
    const initFaceIO = async () => {
      try {
        const faceioInstance = new faceIO(/*TODO: Fill with the corresponding API KEY FROM .env*/);
        setFaceIO(faceioInstance);
      } catch (error) {
        setError("Failed to initialize FaceIO: " + error.message);
      }
    };
    initFaceIO();
  }, []);

  // handle authentication of FaceIO
  const handleEnroll = async () => {
    try {
      const response = await faceio.enroll({
        locale: "auto",
        payload: {
          email: "email#placeholder",
          pin: "pin#placeholder",
        },
      });
      // TODO: handle the payroll gotten from faceio to REST
    } catch (error) {
      setError("Authentication failed: " + error.message);
    }
  };

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
            mt: 5,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
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
          <Box
            sx={{
              width: '100%',
              maxWidth: '500px',
              px: 3,
              py: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {userPhoto !== '' && newUserPhoto !== '' ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'end',
                  justifyContent: 'center',
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 100, md: 200 },
                    height: { xs: 100, md: 200 },
                    fontSize: { xs: 40, md: 80 },
                  }}
                  src={userPhoto ? userPhoto : newUserPhoto}
                  alt="User"
                />
                <IconButton
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'end',
                  justifyContent: 'center',
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 100, md: 200 },
                    height: { xs: 100, md: 200 },
                    fontSize: { xs: 40, md: 80 },
                  }}
                >
                  {username.charAt(0).toUpperCase()}
                </Avatar>
                <IconButton
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 1,
              }}
            >
              <Typography variant="body1" sx={{ mr: 1 }}>
                Premium account active until: dari session
              </Typography>
              <RoundedButton
                text="Extend"
                onClickFunction={handleOpenPaymentDialog}
                color="roundedButtonPurple"
                fullWidth={false}
              />
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
          </Box>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Profile;
