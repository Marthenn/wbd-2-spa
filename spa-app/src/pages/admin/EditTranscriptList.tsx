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
import axios from 'axios';  // Add this line
import { REST_BASE_URL } from '../../constants/constants';

interface Book {
  book_id: number;
  title: string;
  averageRating: number;
  duration: string;
  author: string;
  cover_image_directory: string;
}

const EditTranscriptList = () => {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [page, setPage] = React.useState(1)
  const [pageCount, setPageCount] = React.useState(1)

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${REST_BASE_URL}api/book/${page}`);
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const countPage = async () => {
    try {
      const response = await axios.get(`${REST_BASE_URL}api/book/count`);
      console.log(response);
      setPageCount(Math.ceil(response.data.bookCount.bookCount/8))
      console.log(response.data.bookCount)
    } catch (error) {
      console.error('Error fetching book count:', error);
    }
  };

  React.useEffect(() => {
    countPage();
  }, []); 

  React.useEffect(() => {
    fetchBooks();
  }, [page]); 

  const onChange = (_e: React.SyntheticEvent) => {};

  function HandleSearchButtonClick(_e: React.SyntheticEvent<Element, Event>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* TODO: Replace placeholder */}
        <Navbar category="admin" username="user#placeholder" userPhoto="" />
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
          <Container sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h1">Edit Transcript <EditIcon sx={{fontSize: 35}}/> </Typography>
            <Box display="flex" flexDirection="row" sx={{ alignItems: 'center' }}>
              <SearchBar onChangeFunction={onChange} />
              <RoundedButton text="Search" onClickFunction={HandleSearchButtonClick} color="roundedButtonGreen" />
            </Box>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid container spacing={{ xs: 0, md: 3 }} justifyContent="center" alignItems="center">
                {books.map((book) => (
                  <Grid item key={book.book_id} xs={12} sm={6} md={4} lg={3} style={{ paddingLeft: 0 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <BookCard
                        details_url={`/admin/EditTranscript/${book.book_id}/SelectChapter`}
                        title={book.title}
                        author={book.author}
                        rating={book.averageRating.toFixed(1)}
                        duration={book.duration}
                        cover={book.cover_image_directory}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Container>
          <Pagination count={pageCount} color="primary" sx={{ margin: '20px auto' }} onChange={handlePageChange}/>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default EditTranscriptList;
