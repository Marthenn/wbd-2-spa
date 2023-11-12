import * as React from 'react';
import {
  Box,
  Container,
  CssBaseline,
  StyledEngineProvider,
  Tab,
  ThemeProvider,
  Typography,
  TextField,
  Button,
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

const chapters: any[] = [
  {
    id: '1',
    title: 'Chapter 1',
    content: 'Content for Chapter 1...',
    audio_url: 'URL_FOR_CHAPTER_1_AUDIO',
    duration: 100,
  },
  {
    id: '2',
    title: 'Chapter 2',
    content: 'Content for Chapter 2...',
    audio_url: 'URL_FOR_CHAPTER_2_AUDIO',
    duration: 100,
  },
];

const EditTranscript = () => {
  const [value, setValue] = React.useState(chapters.length > 0 ? chapters[0].id : '0');
  const { id } = useParams();

  const [editedChapters, setEditedChapters] = React.useState(
    chapters.map((chapter) => ({ ...chapter }))
  );

  const [newChapter, setNewChapter] = React.useState<{
    title: string;
    content: string;
    audio: File | null | undefined; // Add undefined to the type
  }>({
    title: 'Untitled Chapter',
    content: '',
    audio: null,
  });

  const [isEditMode, setIsEditMode] = React.useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setIsEditMode(false);
  };

  const currentChapterIndex = chapters.findIndex((chapter) => chapter.id === value);

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      const prevChapterId = chapters[currentChapterIndex - 1].id;
      setValue(prevChapterId);
      setIsEditMode(false);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      const nextChapterId = chapters[currentChapterIndex + 1].id;
      setValue(nextChapterId);
      setIsEditMode(false);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedChapters = [...editedChapters];
    updatedChapters[index] = {
      ...updatedChapters[index],
      title: event.target.value,
    };
    setEditedChapters(updatedChapters);
    setIsEditMode(true);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedChapters = [...editedChapters];
    updatedChapters[index] = {
      ...updatedChapters[index],
      content: event.target.value,
    };
    setEditedChapters(updatedChapters);
    setIsEditMode(true);
  };

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setNewChapter({
      ...newChapter,
      audio: file,
    });
    setIsEditMode(true);
  };

  const handleNewChapterTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewChapter({
      ...newChapter,
      title: event.target.value,
    });
  };

  const handleNewChapterContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewChapter({
      ...newChapter,
      content: event.target.value,
    });
  };

const handleAddChapter = () => {
    const addedChapter = {
      id: `${chapters.length + 1}`,
      title: newChapter.title,
      content: newChapter.content,
    };
  
    chapters.push(addedChapter);
    const updatedEditedChapters = [...editedChapters, { ...addedChapter }];
    setEditedChapters(updatedEditedChapters);
  
    setValue(addedChapter.id);
    setNewChapter({
      title: 'Untitled Chapter',
      content: '',
      audio: null,
    });
    setIsEditMode(true);
  };
  

  const handleDeleteChapter = (chapterId: string) => {
    const chapterIndex = chapters.findIndex((chapter) => chapter.id === chapterId);
    if (chapterIndex !== -1) {
      chapters.splice(chapterIndex, 1);
      const nextChapterId = chapters.length > 0 ? chapters[0].id : '0';
      setValue(nextChapterId);
      setIsEditMode(false);
    }
  };

  const handleSaveChanges = () => {
    const updatedChapters = [...chapters];
    console.log(updatedChapters);
    editedChapters.forEach((editedChapter) => {
      const editedIndex = updatedChapters.findIndex((chapter) => chapter.id === editedChapter.id);
      if (editedIndex !== -1) {
        updatedChapters[editedIndex] = {
          ...updatedChapters[editedIndex],
          title: editedChapter.title,
          content: editedChapter.content,
        };
      }
    });
    chapters.splice(0, chapters.length, ...updatedChapters);
    setIsEditMode(false);
  };

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
                {chapters.map((chapter, index) => (
                  <Tab
                    key={chapter.id}
                    label={(isEditMode && chapter.id === value && editedChapters[index])
                      ? editedChapters[index].title
                      : chapter.title
                    }
                    value={chapter.id}
                  />
                ))}
                <Tab key="new" label="+ Add Chapter" onClick={handleAddChapter} value="new" />
              </TabList>
            </Box>
            {chapters.map((chapter, index) => (
              <TabPanel key={chapter.id} value={chapter.id} sx={{ display: value === chapter.id ? 'flex' : 'none', flexDirection: 'column' }}>
                <Typography variant="h1">Book Title</Typography>
                <TextField
                  label="Chapter Title"
                  value={editedChapters[index].title}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(event, index)}
                  sx={{ marginTop: '20px', width: '40%' }}
                />
                <TextField
                  label="Chapter Content"
                  multiline
                  rows={4}
                  value={editedChapters[index].content}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleContentChange(event, index)}
                  sx={{ marginTop: '20px', width: '70%' }}
                />
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioChange}
                  style={{ marginTop: '20px' }}
                />
                <Button
                  onClick={() => handleDeleteChapter(chapter.id)}
                  variant="contained"
                  color="error"
                  sx={{ marginTop: '20px', width: '150px' }}
                >
                  Delete Chapter
                </Button>
              </TabPanel>
            ))}
            <TabPanel key="new" value="new" sx={{ display: value === 'new' ? 'flex' : 'none', flexDirection: 'column' }}>
              <Typography variant="h1">Book Title</Typography>
              <TextField
                label="Chapter Title"
                value={newChapter.title}
                onChange={handleNewChapterTitleChange}
                sx={{ marginTop: '20px', width: '40%' }}
              />
              <TextField
                label="Chapter Content"
                multiline
                rows={4}
                value={newChapter.content}
                onChange={handleNewChapterContentChange}
                sx={{ marginTop: '20px', width: '70%' }}
              />
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
                style={{ marginTop: '20px' }}
              />
              <Button
                onClick={handleAddChapter}
                variant="contained"
                color="primary"
                sx={{ marginTop: '20px', width: '150px' }}
              >
                Add Chapter
              </Button>
            </TabPanel>
          </TabContext>
          {isEditMode && (
            <Box display="flex" flexDirection="row" padding="9px">
              <Button
                onClick={handleSaveChanges}
                variant="contained"
                sx={{ ml: 2, width: '150px' }}
              >
                Save Changes
              </Button>
            </Box>
          )}
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
        {chapters.length > 0 && (
          <AudioPlayer
            audio_url={chapters[currentChapterIndex].audio_url}
            duration={chapters[currentChapterIndex].duration}
          />
        )}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default EditTranscript;
