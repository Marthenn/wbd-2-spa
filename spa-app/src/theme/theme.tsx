import { createTheme, responsiveFontSizes } from "@mui/material/styles";

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
    error: {
      main: '#FF1C26',
    },
  },
});

const responsiveTheme = responsiveFontSizes(theme);

responsiveTheme.typography.h1 = {
  fontSize: '1.8rem',
  fontWeight: 600,
  '@media (min-width:600px)': {
    fontSize: '2.0rem',
  },
  [responsiveTheme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

responsiveTheme.typography.h2 = {
  fontSize: '1.5rem',
  fontWeight: 600,
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [responsiveTheme.breakpoints.up('md')]: {
    fontSize: '1.8rem',
  },
};

responsiveTheme.typography.h5 = {
  fontSize: '1.0rem',
  fontWeight: 600,
  '@media (min-width:600px)': {
    fontSize: '1.0rem',
  },
  [responsiveTheme.breakpoints.up('md')]: {
    fontSize: '1.0rem',
  },
};

export default responsiveTheme;
