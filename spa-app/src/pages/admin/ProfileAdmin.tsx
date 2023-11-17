import { useState, useEffect, SyntheticEvent, ChangeEventHandler, useRef } from 'react';
import {
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
  Container,
  Box,
  Avatar,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import theme from '../../theme/theme';
import Navbar from '../../components/NavBar/Navbar';
import EditIcon from '@mui/icons-material/Edit';
import { clearToken, getToken } from '../../utils/token';
import { decodeToken, isExpired } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import { REST_BASE_URL } from '../../constants/constants';
import axios from 'axios';

const token = getToken();

interface DecodedToken {
  uid: number;
  isAdmin: boolean;
  username: string;
  profilePicDirectry: string;
  email: string;
  exp: number;
  iat: number;
}

const Profile = () => {
  const [userPhoto, setUserPhoto] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [uid, setUid] = useState<number>(0);
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!token) {
      throw new Error('No token found');
    }

    const decodedToken = decodeToken(token) as DecodedToken;

    const isMyTokenExpired = isExpired(token) as boolean;

    setUsername(decodedToken.username);
    setEmail(decodedToken.email);
    setUserPhoto(decodedToken.profilePicDirectry);
    setUid(decodedToken.uid);

    if(isMyTokenExpired){
      navigate('/SignIn')
    }
  }, []);

  const validateEmail = (value: string) => {
    if (!value || !/^\S+@\S+\.\S+$/.test(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (value: string) => {
    if (!value || value.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = (value: string) => {
    if (newPassword !== value) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      validateEmail(value);
      setNewEmail(value);
    } else if (name === 'password') {
      validatePassword(value);
      setNewPassword(value);
      validateConfirmPassword(newConfirmPassword);
    } else if (name === 'confirmPassword') {
      validateConfirmPassword(value);
      setNewConfirmPassword(value);
    } else if (name === 'username'){
      if(!value){
        setUsernameError('Username cannot be empty')
      } else {
        setUsernameError('')
      }
      setNewUsername(value);
    }
  };
  const [newUserPhoto, setNewUserPhoto] = useState<string>('');
  const [newUsername, setNewUsername] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newConfirmPassword, setNewConfirmPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');  
  const [usernameError, setUsernameError] = useState<string>('');  

  const handleSubmit = async() => {
    try {
      const response = await axios({
        method: 'put',
        url: `${REST_BASE_URL}/account/details/${uid}`,
        data: {
            uid: uid,
            username: newUsername,
            email: newEmail,
            password: newPassword,
            profilePicDirectory: newUserPhoto,

        },
        headers: {
            "Authorization": getToken()
        }
      });
    } catch (error) {
      console.error('Error editing chapter:', error);
    }
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
    clearToken();
    navigate('/SignIn');
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar category="admin" username={username} userPhoto={userPhoto} />
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
                  ref={fileRef}
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
            <form>
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
              onChange={handleInputChange}
              error={!!emailError}
              helperText={emailError}
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
              onChange={handleInputChange}
              error={!!usernameError}
              helperText={usernameError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Change Password"
              type="password"
              id="password"
              autoComplete="password"
              value={newPassword}
              onChange={handleInputChange}
              error={!!passwordError}
              helperText={passwordError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirmPassword"
              value={newConfirmPassword}
              onChange={handleInputChange}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
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
            </Box>
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
            </form>
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
