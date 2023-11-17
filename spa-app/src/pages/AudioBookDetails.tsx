import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Rating,
  StyledEngineProvider,
  ThemeProvider,
  Typography,
} from '@mui/material';
import theme from '../theme/theme';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar/Navbar';
import BookCover from '../components/BookCard/BookCover';
import RoundedButton from '../components/Button/RoundedButton';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import StarIcon from '@mui/icons-material/Star';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import audio_url from '../../2.mp3'
import { Link } from 'react-router-dom';
import { REST_BASE_URL } from '../constants/constants';
import axios from 'axios';
import { convertTimeToMinutes } from '../utils/formatTime';
import { getToken } from '../utils/token';

interface BookDetails {
  title: string;
  description: string;
  duration: string;
  author: string;
  category: string;
  book_id: number;
  cover_image_directory: string;
  averageRating: number;
}

const AudioBookDetails = () => {
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState<BookDetails>();
  const { id } = useParams();

  const [ratingStatus, setRatingStatus] = useState<boolean>(false);
  const [value, setValue] = useState<number | null>(0);
  const [isBookmarkAdded, setIsBookmarkAdded] = useState(false);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`${REST_BASE_URL}api/book/details/${id}`
      ,{ headers: {
         "Authorization": getToken()
       }}
      );
      console.log(response.data);
      setBookDetails(response.data.bookDetails);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchFavoriteStatus = async () => {
    try {
      const response = await axios.get(`${REST_BASE_URL}api/book/rating/:uid/${id}`,
      { headers: {
        "Authorization": getToken()
      }}
      );
      console.log(response.data);
      setRatingStatus(response.data.ratingStatus);
    } catch (error) {
      console.error('Error fetching rating status:', error);
    }
  };

  const fetchRatingStatus = async () => {
    try {
      const response = await axios.get(`${REST_BASE_URL}api/book/rating/:uid/${id}`,
      { headers: {
        "Authorization": getToken()
      }}
      );
      console.log(response.data);
      setRatingStatus(response.data.ratingStatus);
    } catch (error) {
      console.error('Error fetching rating status:', error);
    }
  };

  const updateRating = async () => {
    try {
      if(ratingStatus) {
        const response = await axios.put(`${REST_BASE_URL}api/book/rating/:uid/${id}`, {rating: value}, 
        { headers: {
          "Authorization": getToken()
        }});
        console.log(response.data);
      } else {
        const response = await axios.post(`${REST_BASE_URL}api/book/rating/:uid/${id}`, {rating: value}, 
        { headers: {
          "Authorization": getToken()
        }});
        console.log(response.data);
      }  
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchFavoriteStatus();
    fetchRatingStatus();
    fetchDetails();

  }, []); 

  useEffect(() => {
    updateRating();
  }, [value]); 

  const handleRead = () => {
    navigate(`/AudioBooks/${id}/Read`);
  };

  const handleBookmarkToggle = () => {
    setIsBookmarkAdded((prev) => !prev);
  };

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
            margin: '105px 0px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            [theme.breakpoints.up('md')]: {
              margin: '100px 2%',
            },
            [theme.breakpoints.up('lg')]: {
              margin: '100px 8%',
            },
          }}
        >
          <Container sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '1%' }}>
            <Link to="/AudioBooks">
              <ArrowBackRoundedIcon sx={{ fontSize: 40 }} />
            </Link>
          </Container>
          <Container
            sx={{
              ml: '20px',
              mt: '10px',
              [theme.breakpoints.down('sm')]: {
                ml: '0px',
              },
            }}
          >
            <Grid container spacing={{ xs: 0, sm: 3 }} justifyContent="space-between" alignItems="start" sx={{ width: '100%', padding: '16px' }}>
              <Grid item xs={12}>
                <Typography variant="h2">{bookDetails?.title}</Typography>
              </Grid>
              <Grid item xs={12} sm={5} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 'max-content' }}>
                  <BookCover cover={''} />
                  <Box  display="flex" flexDirection="column" padding="0 10px" alignItems="center" justifyContent="center">
                  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
                    <Typography variant="overline">Rate:</Typography>
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(_event, newValue) => {
                        setValue(newValue);
                      }}
                      precision={0.5}
                    />
                    <Typography variant="overline" sx={{ml: 1}}>Save:</Typography>
                    {isBookmarkAdded ? (
                      <BookmarkIcon onClick={handleBookmarkToggle} sx={{ cursor: 'pointer' }} />
                    ) : (
                      <BookmarkBorderIcon onClick={handleBookmarkToggle} sx={{ cursor: 'pointer' }} />
                    )}
                  </Box>
                  <RoundedButton text="Read" onClickFunction={handleRead} color="roundedButtonPurple" icon={ChromeReaderModeIcon} fullWidth={true}/>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={7} md={9}>
                <Box p={2}>
                  <Typography variant="h5">Description</Typography>
                  <Typography>{bookDetails?.description}</Typography>
                  <Typography variant="h5" marginTop={2}>
                    Author
                  </Typography>
                  <Typography>{bookDetails?.author}</Typography>
                  <Typography variant="h5" marginTop={2}>
                    Category
                  </Typography>
                  <Typography>{bookDetails?.category}</Typography>
                  <Typography variant="h5" marginTop={2}>
                    Duration
                  </Typography>
                  <Typography>{bookDetails && convertTimeToMinutes(bookDetails.duration)} min</Typography>
                  <Typography variant="h5" marginTop={2}>
                    Rating
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <StarIcon sx={{ color: '#faaf00' }} />
                    <Typography>{bookDetails?.averageRating.toFixed(2)}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default AudioBookDetails;