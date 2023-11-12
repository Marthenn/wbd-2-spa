import { Box, Button, Typography, Grid, ThemeProvider, GlobalStyles, CssBaseline, Container, Card, CardHeader, CardContent, CardActions } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import theme from '../theme/theme';
import Navbar from '../components/NavBar/Navbar';
import bgWave from '../assets/bg-wave.svg';
import PaymentDialog from '../components/MembershipRequestDialog/PaymentDialog';
import { useState } from 'react';

const tiers = [
    {
      title: 'Free',
      price: '0',
      description: [
        '1000+ Audiobooks',
        '15 min.  Audio Preview',
      ],
      buttonText: 'Sign up for free',
      buttonVariant: 'outlined',
    },
    {
      title: 'Premium',
      price: '15',
      description: [
        '1000+ Audiobooks',
        'Unlimited Audio Access',
        'Chapter with Transcription',
        'Bookmarking',
      ],
      buttonText: 'Upgrade Premium',
      buttonVariant: 'contained',
    },
  ];

const UpgradePremium = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    const handleButtonClick = (tierTitle: string) => {
      if (tierTitle === 'Premium') {
        handleOpen();
      } else {
        navigate('/your-redirect-url');
      }
    };

    const navigate = useNavigate();

    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' }}}/>
        <CssBaseline />
        <Navbar category='user' username='user#placeholder' userPhoto=''/>
        <Box
        sx={{
          backgroundImage: `url(${bgWave})`,
          backgroundSize: 'cover',
          height: '100vh',
          mt: '100px',
        }}
        >
        <PaymentDialog 
            formData={{
                username: "user#placeholder", // dari session
                email: "email#placeholder",
                paymentProof: null,
            }}
            open={open} 
            handleClose={handleClose}
        />
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6,}}>
          <Typography
            component="h1"
            variant="h1"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Membership Plans
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" component="p">
            Choose the plan that fits your needs.
          </Typography>
        </Container>
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} sx={{ display: 'flex', justifyContent: 'center' }}>
            {tiers.map((tier) => (
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    titleTypographyProps={{
                        align: 'center',
                        color: tier.title === 'Premium' ? 'secondary' : 'primary',
                    }}
                    sx={{
                        background: tier.title === 'Premium' ?
                        theme.palette.primary.main :
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    >
                      <Typography component="h2" variant="h3" color="text.primary">
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /mo
                      </Typography>
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      onClick={() => handleButtonClick(tier.title)}
                      variant={tier.buttonVariant as 'outlined' | 'contained'}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        </Box>
    </ThemeProvider>
  );
}
export default UpgradePremium
