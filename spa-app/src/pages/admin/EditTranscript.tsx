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

const EditTranscript = () => {
  const { id, chapterId } = useParams();
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openEditAlert, setOpenEditAlert] = useState(false);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axios.get(`${REST_BASE_URL}api/book/details/${id}/chapter/${chapterId}`);
        setCurrentChapter(response.data.chapterDetails[0]);
      } catch (error) {
        console.error('Error fetching chapter:', error);
      }
    };

    fetchChapter();
  }, [id, chapterId]);

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

  const handleDeleteChapter = async() => {
    try {
      const response = await axios.delete(`${REST_BASE_URL}api/book/details/${id}/chapter/${chapterId}`);
      if(response.data.message === 'success') {
        setOpenDeleteAlert(true);
      }
    } catch (error) {
      console.error('Error deleting chapter:', error);
    }
  };

  const handleSaveChanges = async() => {
    try {
      const response = await axios.put(`${REST_BASE_URL}api/book/details/${id}/chapter/${chapterId}`);
      if(response.data.message === 'success') {
        setOpenEditAlert(true);
      }
    } catch (error) {
      console.error('Error editing chapter:', error);
    }
  };  

  const handleDeleteAlertClose = (
  ) => {
    setOpenDeleteAlert(false);
  };

  const handleEditAlertClose = (
  ) => {
    setOpenEditAlert(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Alerts
          open={openDeleteAlert}
          handleClose={handleDeleteAlertClose}
          title="Chapter Deleted!"
        />
        <Alerts
          open={openEditAlert}
          handleClose={handleEditAlertClose}
          title="Chapter Edited!"
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
          <Typography variant="h1">Book Title: {currentChapter?.chapter_id}</Typography>
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
                Save Changes
              </Button>
              <Button
                onClick={handleDeleteChapter}
                variant="contained"
                color="error"
                sx={{ marginTop: '20px', width: '150px' }}
              >
                Delete Chapter
              </Button>
        </Container>
        <AudioPlayer audio_url={currentChapter?.audio_directory || ''} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default EditTranscript;
