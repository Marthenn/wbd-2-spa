import React, { useState, useEffect, ChangeEventHandler } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  StyledEngineProvider,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import theme from '../../theme/theme';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/NavBar/Navbar';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { REST_BASE_URL } from '../../constants/constants';
import Alerts from '../../components/Alerts/Alerts';
import axios from 'axios';

interface Chapter {
  chapter_id: string;
  title: string;
  chapter_name: string;
  transcript_directory: string;
  audio_directory: string;
}

const AddTranscript = () => {
  const { id } = useParams();
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [openAddAlert, setOpenAddAlert] = useState(false);

  const handleChapterTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentChapter({
      ...currentChapter!,
      chapter_name: event.target.value,
    });
  };

  const handleChapterContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentChapter({
      ...currentChapter!,
      transcript_directory: event.target.value,
    });
  };

  const handleChapterAudioChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newAudioUrl = e.target.value;
    setCurrentChapter({
      ...currentChapter!,
      audio_directory: newAudioUrl,
    });
  };

  const handleSaveChanges = async() => {
    try {
      const response = await axios.post(`${REST_BASE_URL}api/book/details/${id}/chapter`);
      if(response.data.message === 'success') {
        setOpenAddAlert(true);
      }
    } catch (error) {
      console.error('Error editing chapter:', error);
    }
  };  
  const handleAddAlertClose = (
  ) => {
    setOpenAddAlert(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Alerts
          open={openAddAlert}
          handleClose={handleAddAlertClose}
          title="Chapter Added!"
        />
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
          <Link to={`/admin/EditTranscript/${id}/SelectChapter`}>
            <ArrowBackRoundedIcon sx={{ fontSize: 40 }} />
          </Link>
          <Typography variant="h1">Book Title: New Chapter</Typography>
              <TextField
                label="Chapter Title"
                value={currentChapter?.chapter_name || ''}
                onChange={handleChapterTitleChange}
                sx={{ marginTop: '20px', width: '40%' }}
              />
              <TextField
                label="Chapter Content"
                multiline
                rows={4}
                value={currentChapter?.transcript_directory || ''}
                onChange={handleChapterContentChange}
                sx={{ marginTop: '20px', width: '70%' }}
              />
              <Typography sx={{mt: 3}}>Audio File: </Typography>
              <input
                type="file"
                accept="audio/*"
                onChange={handleChapterAudioChange}
              />
              <Button
                onClick={handleSaveChanges}
                variant="contained"
                color="primary"
                sx={{ marginTop: '20px', width: '150px' }}
                disabled={!currentChapter?.chapter_name || !currentChapter?.transcript_directory || !currentChapter?.audio_directory}
              >
                Add Chapter
              </Button>
        </Container>
        <AudioPlayer audio_url={currentChapter?.audio_directory || ''} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default AddTranscript;
