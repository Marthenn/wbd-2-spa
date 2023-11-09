import React, { useState } from 'react';
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
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import StarIcon from '@mui/icons-material/Star';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Link } from 'react-router-dom';

function convertTimeToMinutes(time: string) {
  const [hours, minutes, _seconds] = time.split(':');
  const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  return totalMinutes;
}

const AudioBookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const data = {
    title: 'Book Title',
    cover_image_directory: '/img/cover-placeholder.png',
    description: 'Book description',
    author: 'Book Author',
    category: 'Book Category',
    duration: '02:30:00',
    rating: 4.5,
    audio_directory: '/audio/book-audio.mp3',
    curr_duration: '00:30:00',
    currentTotalSeconds: 1800,
    totalSeconds: 9000,
    bid: 1,
  };

  const [value, setValue] = useState<number | null>(data.rating);
  const [isBookmarkAdded, setIsBookmarkAdded] = useState(false);

  const handleRead = () => {
    navigate(`/AudioBooks/${data.bid}/Read`);
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
                <Typography variant="h2">{data.title}</Typography>
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
                  <Typography>{data.description}</Typography>
                  <Typography variant="h5" marginTop={2}>
                    Author
                  </Typography>
                  <Typography>{data.author}</Typography>
                  <Typography variant="h5" marginTop={2}>
                    Category
                  </Typography>
                  <Typography>{data.category}</Typography>
                  <Typography variant="h5" marginTop={2}>
                    Duration
                  </Typography>
                  <Typography>{convertTimeToMinutes(data.duration)} min</Typography>
                  <Typography variant="h5" marginTop={2}>
                    Rating
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <StarIcon sx={{ color: '#faaf00' }} />
                    <Typography>{data.rating.toFixed(2)}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Container>
        <AudioPlayer audio_url="" duration={1000} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default AudioBookDetails;