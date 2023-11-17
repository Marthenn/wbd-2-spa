import React, { useState, useEffect, ChangeEventHandler } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  StyledEngineProvider,
  Tab,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import theme from '../../theme/theme';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/NavBar/Navbar';
import RoundedButton from '../../components/Button/RoundedButton';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const chapters = [
  {
    id: '1',
    title: 'Chapter 1',
    content: 'Lorem ipsum dolor sit amet.',
    audio_url: 'example.mp3',
    duration: 120,
  },
  {
    id: '2',
    title: 'Chapter 2',
    content: 'Consectetur adipiscing elit.',
    audio_url: 'example2.mp3',
    duration: 150,
  },
];

interface Chapter {
  id: string;
  title: string;
  content: string;
  audio_url: string;
  duration: number;
}

const EditTranscript = () => {
  const { id } = useParams();
  const [value, setValue] = useState(chapters[0].id);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [editedCurrentChapter, setEditedCurrentChapter] = useState<Chapter | null>(null);

  const fetchData = async (chapterId: string) => {
    const data = chapters.find((chapter) => chapter.id === chapterId) || null;
    setCurrentChapter(data);
    setEditedCurrentChapter(data);
  };

  useEffect(() => {
    fetchData(value);
  }, [value]);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handlePrevChapter = () => {
    const currentChapterIndex = chapters.findIndex((chapter) => chapter.id === value);
    if (currentChapterIndex > 0) {
      const prevChapterId = chapters[currentChapterIndex - 1].id;
      setValue(prevChapterId);
    }
  };

  const handleNextChapter = () => {
    const currentChapterIndex = chapters.findIndex((chapter) => chapter.id === value);
    if (currentChapterIndex < chapters.length - 1) {
      const nextChapterId = chapters[currentChapterIndex + 1].id;
      setValue(nextChapterId);
    }
  };

  const handleAddChapter = () => {
    const newChapter: Chapter = {
      id: `${chapters.length + 1}`,
      title: 'New Chapter',
      content: '',
      audio_url: '',
      duration: 0,
    };

    chapters.push(newChapter);

    setCurrentChapter(newChapter);
    setEditedCurrentChapter(newChapter);
    setValue(newChapter.id);
  };

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newTitle = e.target.value;
    setEditedCurrentChapter((prevChapter: Chapter | null) => ({
      ...prevChapter!,
      title: newTitle,
    }));
  };
  

  const handleContentChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newContent = e.target.value;
    setEditedCurrentChapter((prevChapter) => ({
      ...prevChapter!,
      content: newContent,
    }));
  };

  const handleAudioChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newAudioUrl = e.target.value;
    setEditedCurrentChapter((prevChapter) => ({
      ...prevChapter!,
      audio_url: newAudioUrl,
    }));
  };

  const handleDeleteChapter = () => {
    const indexToDelete = chapters.findIndex((chapter) => chapter.id === currentChapter?.id);
    
    if (indexToDelete !== -1) {
      chapters.splice(indexToDelete, 1);

      const newIndex = Math.min(indexToDelete, chapters.length - 1);
      setValue(chapters[newIndex].id);
    }
  };

  const handleSaveChanges = () => {
    const indexToUpdate = chapters.findIndex((chapter) => chapter.id === currentChapter?.id);

    if (indexToUpdate !== -1 && editedCurrentChapter) {
      chapters[indexToUpdate] = { ...editedCurrentChapter };

      setCurrentChapter({ ...editedCurrentChapter });
    }
  };

  if (!currentChapter) {
    return <div>Loading...</div>;
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar category="admin" username="user#placeholder" userPhoto="" />
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
          <Link to={`/admin/EditTranscript`}>
            <ArrowBackRoundedIcon sx={{ fontSize: 40 }} />
          </Link>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
                {chapters.map((chapter) => (
                  <Tab key={chapter.id} label={chapter.title} value={chapter.id} />
                ))}
                <Tab onClick={handleAddChapter} key="new" label="+ Add Chapter" value="new" />
              </TabList>
            </Box>
            <TabPanel key={currentChapter.id} value={currentChapter.id}  sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h1">Book Title</Typography>
              <TextField
                label="Chapter Title"
                value={editedCurrentChapter?.title || ''}
                onChange={handleTitleChange}
                sx={{ marginTop: '20px', width: '40%' }}
              />
              <TextField
                label="Chapter Content"
                multiline
                rows={4}
                value={editedCurrentChapter?.content || ''}
                onChange={handleContentChange}
                sx={{ marginTop: '20px', width: '70%' }}
              />
              <Typography  sx={{ marginTop: '20px' }}> Change Audio </Typography>
              <input
                type="file"
                accept="audio/*"
                value={''}
                onChange={handleAudioChange}
              />
              <Button
                onClick={handleDeleteChapter}
                variant="contained"
                color="error"
                sx={{ marginTop: '20px', width: '150px' }}
              >
                Delete Chapter
              </Button>
              <Button
                onClick={handleSaveChanges}
                variant="contained"
                sx={{ marginTop: '20px', width: '150px' }}
              >
                Save Changes
              </Button>
            </TabPanel>
          </TabContext>
          <Box display="flex" flexDirection="row" padding="9px">
            <RoundedButton
              text="< Prev Chapter"
              onClickFunction={handlePrevChapter}
              color="roundedButtonBlack"
              disabled={chapters.findIndex((chapter) => chapter.id === value) === 0}
            />
            <RoundedButton
              text="Next Chapter >"
              onClickFunction={handleNextChapter}
              color="roundedButtonBlack"
              disabled={chapters.findIndex((chapter) => chapter.id === value) === chapters.length - 1}
            />
          </Box>
        </Container>
        <AudioPlayer audio_url={currentChapter?.audio_url || ''} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default EditTranscript;
