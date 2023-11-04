import { Box, Button, Paper, Typography, TextField, Grid, Link, ThemeProvider, StyledEngineProvider, CssBaseline } from '@mui/material'
import { useNavigate, Navigate } from 'react-router-dom'
import * as React from 'react';
import theme from '../theme/theme';
import logo from '../assets/logo.svg';

const SignIn = () => {
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
    };
      return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
                <img src={logo} alt="Logo" style={{ margin: '15px', width: '35px', height: 'auto' }} />
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
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color='primary'
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
                    backgroundImage: `url(${require('../assets/SignIn.png')})`,
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
}
export default SignIn