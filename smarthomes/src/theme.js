import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0d47a1', // Dark blue color
    },
    background: {
      default: '#001e3c',
      paper: '#0a1929',
    },
  },
});

export default theme;
