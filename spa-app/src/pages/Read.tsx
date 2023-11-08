import React from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  StyledEngineProvider,
  Tab,
  ThemeProvider,
} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import pending from "../../assets/pending.svg";
import theme from "../theme/theme";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import BookCover from "../components/BookCard/BookCover";
import RoundedButton from "../components/Button/RoundedButton";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import back from "../assets/back.svg";
import star from "../assets/star.svg";
import read from "../assets/read.svg";
import { Link } from 'react-router-dom';

const Read = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Item One" value="1" />
                  <Tab label="Item Two" value="2" />
                  <Tab label="Item Three" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">Item One</TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Container>
        </ThemeProvider>
      </StyledEngineProvider>
  );
};

export default Read;
