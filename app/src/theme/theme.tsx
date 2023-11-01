import { createTheme } from "@mui/material";
import exp from "constants";

const theme = createTheme({
    typography: {
      fontFamily: [
        'Poppins', 'sans-serif',
      ].join(','),
    },
    palette: {
        mode: 'light',
        primary: {
          main: '#1F1F1F',
        },
        secondary: {
          main: '#FFFFFF',
        },
      },
  });  

theme.typography.h1 = {
  fontSize: '1.2rem',
  fontWeight: 600,
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
}; 

theme.typography.h2 = {
    fontSize: '0.6rem',
    fontWeight: 600,
    '@media (min-width:600px)': {
      fontSize: '0.75rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem',
    },
  };  

export default theme;