import {
    Box,
    Button,
    Paper,
    Typography,
    TextField,
    Grid,
    Link,
    ThemeProvider,
    StyledEngineProvider,
    CssBaseline,
    Container,
    GlobalStyles,
    Pagination,
  } from '@mui/material';
    import { useNavigate, Navigate } from 'react-router-dom';
    import * as React from 'react';
    import theme from '../theme/theme';
    import logo from '../assets/logo.svg';
    import Navbar from '../components/NavBar/Navbar';
    import SearchBar from '../components/SearchBar/SearchBar';
    import BookCard from '../components/BookCard/BookCard';
    import coverPlaceholder from '../assets/cover-placeholder.png';
    import banner1 from '../assets/banner1.svg';
    import banner2 from '../assets/banner2.svg';
    import banner3 from '../assets/banner3.svg';
    import BannerCarousel from '../components/BannerCarousel/BannerCarousel';
  
  const AudioBooks = () => {
    const onChange = (e: React.SyntheticEvent) => {};
    const bannerContent = [
        {
            imageUrl: banner1,
        },
        {
            imageUrl: banner2,
        },
        {
            imageUrl: banner3,
        },
      ];
      
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* TODO: Replace placeholder */}
          <Navbar category="user" username="user#placeholder" userPhoto="" />
          <Container
            component="main"
            sx={{
              width: '100%',
              margin: '100px 5%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              [theme.breakpoints.up('sm')]: {
                margin: '100px 2%',
              },
              [theme.breakpoints.up('lg')]: {
                margin: '100px 8%',
              },
            }}
          >
            <Box               
            sx={{[theme.breakpoints.down('md')]: 
            {display: 'none'}, padding: '20px'}}
            >
                <BannerCarousel contentArray={bannerContent}/>
            </Box>
            <Container sx={{ width: '100%' }}>
            <Typography variant="h1">Audio Books</Typography>
              <SearchBar onChangeFunction={onChange} />
              <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Grid container spacing={5}>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                    >
                        <BookCard
                        details_url=""
                        title="Book Title#placeholder"
                        author="Book Author"
                        rating={5}
                        duration={50}
                        cover={coverPlaceholder}
                    />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                    >
                        <BookCard
                        details_url=""
                        title="Book Title#placeholder"
                        author="Book Author"
                        rating={5}
                        duration={50}
                        cover={coverPlaceholder}
                    />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                    >
                        <BookCard
                        details_url=""
                        title="Book Title#placeholder"
                        author="Book Author"
                        rating={5}
                        duration={50}
                        cover={coverPlaceholder}
                    />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                    >
                        <BookCard
                        details_url=""
                        title="Book Title#placeholder"
                        author="Book Author"
                        rating={5}
                        duration={50}
                        cover={coverPlaceholder}
                    />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                    >
                        <BookCard
                        details_url=""
                        title="Book Title#placeholder"
                        author="Book Author"
                        rating={5}
                        duration={50}
                        cover={coverPlaceholder}
                    />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                    >
                        <BookCard
                        details_url=""
                        title="Book Title#placeholder"
                        author="Book Author"
                        rating={5}
                        duration={50}
                        cover={coverPlaceholder}
                    />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                    >
                        <BookCard
                        details_url=""
                        title="Book Title#placeholder"
                        author="Book Author"
                        rating={5}
                        duration={50}
                        cover={coverPlaceholder}
                    />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                    >
                        <BookCard
                        details_url=""
                        title="Book Title#placeholder"
                        author="Book Author"
                        rating={5}
                        duration={50}
                        cover={coverPlaceholder}
                    />
                    </Box>
                </Grid>
              </Grid>
              </Container>
            </Container>
            <Pagination count={5} color="primary" sx={{ margin: '20px auto' }} />
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  };
  
  export default AudioBooks;
  