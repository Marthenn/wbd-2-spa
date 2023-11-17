import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { REST_BASE_URL } from '../constants/constants';

interface currentChapter {
  chapter_id: string;
  title: string;
  chapter_name: string;
  transcript: string;
  audio_directory: string;
}

interface chaptersIdTitle {
  chapterId: number;
  chapterName: string;
}

const Read = () => {
  const [chapters, setChapters] = useState<chaptersIdTitle[]>([]);
  const [currentChapter, setCurrentChapter] = useState<currentChapter | null>(null);
  const [value, setValue] = useState<number | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REST_BASE_URL}api/book/details/${id}/chapternames`);
        setChapters(response.data.chapterNames);

        if (response.data.chapterNames.length > 0) {
          setValue(response.data.chapterNames[0].chapterId);
        } else {
          setValue(-1);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        if (value !== null) {
          const response = await axios.get(`${REST_BASE_URL}api/book/details/${id}/chapter/${value}`);
          setCurrentChapter(response.data.chapterDetails[0]);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchChapter();
  }, [id, value]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (value === null) {
    return <div>Loading...</div>;
  }

  if (value === -1 || !currentChapter || !chapters) {
    return <div>No chapters available.</div>;
  }

  const currentChapterIndex = chapters.findIndex((chapter) => chapter.chapterId === value);

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      const prevChapterId = chapters[currentChapterIndex - 1].chapterId;
      setValue(prevChapterId);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      const nextChapterId = chapters[currentChapterIndex + 1].chapterId;
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
            <ArrowBackRoundedIcon sx={{ fontSize: 40 }} />
          </Link>
          <TabContext value={(value.toString())}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
                {chapters.map((chapter) => (
                  <Tab key={chapter.chapterId} label={chapter.chapterName} value={(chapter.chapterId.toString())} />
                ))}
              </TabList>
            </Box>
            <TabPanel key={currentChapter.chapter_id} value={currentChapter.chapter_id.toString()}>
              <Typography variant="h1">{currentChapter.title}</Typography>
              <Typography variant="h2">{currentChapter.chapter_name}</Typography>
              <Typography>{currentChapter.transcript}</Typography>
            </TabPanel>
          </TabContext>
          <Box display="flex" flexDirection="row" padding="9px">
            <RoundedButton
              text="< Prev Chapter"
              onClickFunction={handlePrevChapter}
              color="roundedButtonBlack"
              disabled={currentChapterIndex === 0}
            />
            <RoundedButton
              text="Next Chapter >"
              onClickFunction={handleNextChapter}
              color="roundedButtonBlack"
              disabled={currentChapterIndex === chapters.length - 1}
            />
          </Box>
        </Container>
        <AudioPlayer audio_url={currentChapter.audio_directory} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Read;
