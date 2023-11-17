import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Grid,
  Link,
} from '@mui/material';
import { ThemeProvider, CssBaseline, StyledEngineProvider } from '@mui/material';
import theme from '../theme/theme';
import logo from '../assets/logo.svg';
import SignInImage from '../assets/SignIn.png';
import CheckStatusDialog from '../components/CheckStatusDialog/CheckStatusDialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alerts from '../components/Alerts/Alerts';
import { REST_BASE_URL } from '../constants/constants';
import axios from 'axios';
import { setToken } from '../utils/token';

const SignIn = () => {
  const [openCheckStatus, setOpenCheckStatus] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleOpenCheckStatus = () => {
    setOpenCheckStatus(true);
  };

  const handleCloseCheckStatus = () => {
    setOpenCheckStatus(false);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const requestBody = {
      username,
      password,
    };

    try {
      const response = await axios.post(`${REST_BASE_URL}/account/token`, requestBody);

      if (!response.data.token) {
        setOpenAlert(true);
      } else {
        setToken(`Bearer ${response.data.token}`);
        navigate('/AudioBooks');
      }
    } catch (error) {
      setOpenAlert(true);
    }
  };

  const handleAlertClose = (
    _event?: React.SyntheticEvent | Event,
    _reason?: string
  ) => {
    setOpenAlert(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Alerts
          open={openAlert}
          handleClose={handleAlertClose}
          title="Sign In Failed!"
          description="Please check your username & password again."
        />
        <CheckStatusDialog open={openCheckStatus} handleClose={handleCloseCheckStatus} />
        <Grid container component="main" sx={{ height: '100vh' }}>
          <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
            <img
              src={logo}
              alt="Logo"
              style={{ margin: '15px', width: '35px', height: 'auto' }}
            />
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
              }}
            >
              <Typography component="h1" variant="h2">
                Welcome!
              </Typography>
              <Typography component="h1" variant="h1">
                Sign in to WEBWBD Premium
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="primary"
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/SignUpPremium" variant="body2">
                      {"Don't have an account? Sign Up for Premium"}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={handleOpenCheckStatus}
                      variant="outlined"
                      color="primary"
                      sx={{ mt: 1 }}
                      fullWidth
                    >
                      Already applied request? Check your request status
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={6}
            md={8}
            sx={{
              backgroundImage: `url(${SignInImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Grid>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default SignIn;
