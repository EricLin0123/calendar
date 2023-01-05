import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#946D46',
        lighter: '#EADBCC',
        darker: '#C29679',
        text: '#4C3824',
      },
      secondary: {
        main: '#AAA57F',
        lightest: '#F5F4F1',
        lighter: '#CEC9C0',
        darker: '#6C817C',
        text: '#44524F',
      },
    },
  });

  export default Theme;