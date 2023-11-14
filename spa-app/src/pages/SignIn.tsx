import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Grid,
  Link,
  Alert,
  IconButton,
  Snackbar,
  AlertTitle,
} from '@mui/material';
import { ThemeProvider, CssBaseline, StyledEngineProvider } from '@mui/material';
import theme from '../theme/theme';
import logo from '../assets/logo.svg';
import SignInImage from '../assets/SignIn.png';
import CheckStatusDialog from '../components/CheckStatusDialog/CheckStatusDialog';
import FaceIcon from '@mui/icons-material/Face';
import {SyntheticEvent, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { REST_BASE_URL } from '../constants/constants';

const SignIn = () => {
  const [openCheckStatus, setOpenCheckStatus] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
    try{
      const response = await fetch(`${REST_BASE_URL}/account/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setOpenAlert(true);
      } else {
        localStorage.setItem("token", `Bearer ${data.token}`);
        navigate("/AudioBooks");
      }
    }
    catch(error){
      setOpenAlert(true);
    }
  };

  const handleAlertClose = (_event?: React.SyntheticEvent | Event, _reason?: string) => { {
    setOpenAlert(false);
  }}

  // const [faceio, setFaceIO] = useState<any>(null);
  // const [error, setError] = useState<any>(null);

  // hook to initialize FaceIO instance when component mounts
  // useEffect(()=>{
  //   const initFaceIO = async() => {
  //     try {
  //       const faceioInstance = new faceio(/*TODO: Fill with the corresponding API KEY FROM .env*/);
  //       setFaceIO(faceioInstance);
  //     } catch (error) {
  //       setError("Failed to initialize FaceIO: " + error.message);
  //     }
  //   }
  // })

  // // handle authentication of FaceIO
  // const handleAuthenticate = async() => {
  //   try {
  //     const response = await faceio.authenticate({
  //       locale: "auto",
  //     });
  //     // TODO: handle the payroll gotten from faceio to REST
  //   } catch (error) {
  //     setError("Authentication failed: " + error.message);
  //   }
  // }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical:'top',  horizontal:'left' }}>
          <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
            <AlertTitle>Login Failed!</AlertTitle>
            Please check your username and password again.
          </Alert>
        </Snackbar>
        <CheckStatusDialog
            open={openCheckStatus} 
            handleClose={handleCloseCheckStatus}
        />
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
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  color="primary"
                  // onClick={handleAuthenticate}
                  startIcon={<FaceIcon />}
                >
                  Sign In with Face ID
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
