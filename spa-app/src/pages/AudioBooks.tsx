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
  import theme from '../theme/theme';
  import Navbar from '../components/NavBar/Navbar';
  import SearchBar from '../components/SearchBar/SearchBar';
  import BookCard from '../components/BookCard/BookCard';
  import banner1 from '../assets/banner1.svg';
  import banner2 from '../assets/banner2.svg';
  import banner3 from '../assets/banner3.svg';
  import BannerCarousel from '../components/BannerCarousel/BannerCarousel';
  import RoundedButton from '../components/Button/RoundedButton';
  import axios from 'axios';  // Add this line
  import { REST_BASE_URL } from '../constants/constants';
  interface Book {
    id: number;
    title: string;
    rating: number;
    duration: number;
  }

  const AudioBooks = () => {
    const [books, setBooks] = React.useState<Book[]>([]);
  
    // Function to fetch books from the server
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${REST_BASE_URL}api/book/fetch`);
        console.log(response);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    React.useEffect(() => {
      fetchBooks();
    }, []);  // Fetch books when the component mounts
  
    const onChange = (_e: React.SyntheticEvent) => {};
  
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
  
    function HandleSearchButtonClick(_e: React.SyntheticEvent<Element, Event>): void {
      throw new Error('Function not implemented.');
    }
  
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
            <Box sx={{ [theme.breakpoints.down('md')]: { display: 'none' }, padding: '24px' }}>
              <BannerCarousel contentArray={bannerContent} />
            </Box>
            <Container sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h1">Audio Books</Typography>
              <Box display="flex" flexDirection="row" sx={{ alignItems: 'center' }}>
                <SearchBar onChangeFunction={onChange} />
                <RoundedButton text="Search" onClickFunction={HandleSearchButtonClick} color="roundedButtonGreen" />
              </Box>
              <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container spacing={{ xs: 0, md: 3 }} justifyContent="center" alignItems="center">
                  {books.map((book) => (
                    <Grid item key={book.id} xs={12} sm={6} md={4} lg={3} style={{ paddingLeft: 0 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <BookCard
                          details_url={`/AudioBooks/${book.id}/Details`}
                          title={book.title}
                          author=''
                          rating={book.rating}
                          duration={book.duration}
                          cover=''
                        />
                      </Box>
                    </Grid>
                  ))}
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
  