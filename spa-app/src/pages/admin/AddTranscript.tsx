import React, { useState, useEffect, ChangeEventHandler, useRef } from 'react';
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
import { getToken } from '../../utils/token';

interface Chapter {
  chapter_id: string;
  title: string;
  chapter_name: string;
  transcript: string;
  audio_directory: string;
}

const AddTranscript = () => {
  const { id } = useParams();
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [openAddAlert, setOpenAddAlert] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChapterTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentChapter({
      ...currentChapter!,
      chapter_name: event.target.value,
    });
  };

  const handleChapterContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentChapter({
      ...currentChapter!,
      transcript: event.target.value,
    });
  };

  const handleSaveChanges = async() => {
    try {
      const response = await axios({
        method: 'post',
        url: `${REST_BASE_URL}api/book/details/${id}/chapter`,
        data: {
            chapter_id: currentChapter?.chapter_id,
            title: currentChapter?.title,
            chapter_name: currentChapter?.chapter_name,
            transcript: currentChapter?.transcript,
            audio_directory: fileRef.current!.files![0],
        },
        headers: {
            "Authorization": getToken()
        }
      });
      
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
                value={currentChapter?.transcript || ''}
                onChange={handleChapterContentChange}
                sx={{ marginTop: '20px', width: '70%' }}
              />
              <Typography sx={{mt: 3}}>Audio File: </Typography>
              <input
                type="file"
                accept="audio/*"
                ref={fileRef}
              />
              <Button
                onClick={handleSaveChanges}
                variant="contained"
                color="primary"
                sx={{ marginTop: '20px', width: '150px' }}
                disabled={!currentChapter?.chapter_name || !currentChapter?.transcript || fileRef.current?.files!.length === 0}
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
