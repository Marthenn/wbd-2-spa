import * as React from 'react';
import {
  Box,
  Container,
  CssBaseline,
  StyledEngineProvider,
  Tab,
  ThemeProvider,
  Typography,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import theme from '../theme/theme';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/NavBar/Navbar';
import RoundedButton from '../components/Button/RoundedButton';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const chapters = [
  {
    id: '1',
    title: 'Chapter 1',
    content: 'Content for Chapter 1...',
  },
  {
    id: '2',
    title: 'Chapter 2',
    content: 'Content for Chapter 2...',
  },
  // Add more chapters as needed
];

const Read = () => {
  const { chapterId } = useParams();
  const [value, setValue] = React.useState(chapterId || chapters[0].id);
  const { id } = useParams();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const currentChapterIndex = chapters.findIndex((chapter) => chapter.id === value);

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      const prevChapterId = chapters[currentChapterIndex - 1].id;
      setValue(prevChapterId);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      const nextChapterId = chapters[currentChapterIndex + 1].id;
      setValue(nextChapterId);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar category="user" username="user#placeholder" userPhoto="" />
        <Container
          component="main"
          sx={{
            width: '100%',
            margin: '105px 0px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            justifyContent: 'center',
            [theme.breakpoints.up('md')]: {
              margin: '100px 2%',
            },
            [theme.breakpoints.up('lg')]: {
              margin: '100px 8%',
            },
          }}
        >
          <Link to={`/AudioBooks/${id}/Details`}>
          <ArrowBackRoundedIcon sx={{fontSize: 40}}/>
          </Link>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
                {chapters.map((chapter) => (
                  <Tab key={chapter.id} label={chapter.title} value={chapter.id} />
                ))}
              </TabList>
            </Box>
            {chapters.map((chapter) => (
              <TabPanel key={chapter.id} value={chapter.id}>
                <Typography variant="h1">Book Title</Typography>
                <Typography variant="h2">{chapter.title}</Typography>
                <Typography>{chapter.content}</Typography>
              </TabPanel>
            ))}
          </TabContext>
          <Box display="flex" flexDirection="row" padding="9px">
            <RoundedButton
              text="< Prev Chapter"
              onClickFunction={handlePrevChapter}
              color="roundedButtonBlack"
            />
            <RoundedButton
              text="Next Chapter >"
              onClickFunction={handleNextChapter}
              color="roundedButtonBlack"
            />
          </Box>
        </Container>
        <AudioPlayer audio_url="" duration={1000} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Read;
