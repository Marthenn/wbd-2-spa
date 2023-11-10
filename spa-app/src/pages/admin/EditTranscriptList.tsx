import {
    Box,
    Typography,
    Grid,
    ThemeProvider,
    StyledEngineProvider,
    CssBaseline,
    Container,
    Pagination,
  } from '@mui/material';
    import * as React from 'react';
    import theme from '../../theme/theme';
    import Navbar from '../../components/NavBar/Navbar';
    import SearchBar from '../../components/SearchBar/SearchBar';
    import BookCard from '../../components/BookCard/BookCard';
    import RoundedButton from '../../components/Button/RoundedButton';
    import EditIcon from '@mui/icons-material/Edit';
  
  const EditTranscriptList = () => {
    const onChange = (_e: React.SyntheticEvent) => {};
    function HandleSearchButtonClick(_e: React.SyntheticEvent<Element, Event>): void {
        throw new Error('Function not implemented.');
    }

    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* TODO: Replace placeholder */}
          <Navbar category="admin" username="admin#placeholder" userPhoto="" />
          <Container
            component="main"
            sx={{
              width: '100%',
              margin: '100px 3%',
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
            <Container sx={{ width: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Typography variant="h1" pt= '24px'>Edit Transcript <EditIcon sx={{fontSize: 30}}/></Typography>
              
              <Box display="flex" flexDirection="row" sx={{ alignItems: 'center' }} >
                <SearchBar onChangeFunction={onChange} />
                <RoundedButton text='Search' onClickFunction={HandleSearchButtonClick} color='roundedButtonGreen'/>
              </Box>
              <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Grid container spacing={{ xs: 0, md: 3 }} justifyContent='center' alignItems='center'>
                <Grid item xs={12} sm={6} md={4} lg={3} style={{paddingLeft: 0}}>
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                    >
                        <BookCard
                        details_url="/admin/EditTranscript/1/Edit"
                        title="Book Title#placeholder"
                        author="Book Author"
                        rating={5}
                        duration={50}
                        cover=""
                    />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} style={{paddingLeft: 0}}>
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
                        cover=""
                    />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} style={{paddingLeft: 0}}>
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
                        cover=""
                    />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} style={{paddingLeft: 0}}>
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
                        cover=""
                    />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} style={{paddingLeft: 0}}>
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
                        cover=""
                    />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} style={{paddingLeft: 0}}>
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
                        cover=""
                    />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} style={{paddingLeft: 0}}>
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
                        cover=""
                    />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} style={{paddingLeft: 0}}>
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
                        cover=""
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
  
  export default EditTranscriptList;
  