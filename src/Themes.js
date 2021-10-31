import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { red, blue, yellow, deepPurple, green } from '@material-ui/core/colors';

export const sallyStyle = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#b71c1c',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: green,
    error: red,
    background: {
      default: '#F9F9F9',
    },
    red: {
      50: '#ffe7e6',
      100: '#ffc8b9',
      200: '#ffa38c',
      300: '#ff7b5e',
      400: '#ff593a',
      500: '#ff2c15',
      600: '#ff2410',
      700: '#fb1809',
      800: '#ee0202',
      900: '#d60000',
    },
    grey: {
      50: '#f8f8f8',
      100: '#efefef',
      200: '#e4e4e4',
      300: '#d3d3d3',
      400: '#aeaeae',
      500: '#8e8e8e',
      600: '#666666',
      700: '#535353',
      800: '#353535',
      900: '#151515',
    },
    green: {
      50: '#eaffe9',
      100: '#caffc7',
      200: '#a1ffa0',
      300: '#6aff73',
      400: '#00ff48',
      500: '#00fc00',
      600: '#00ea00',
      700: '#00d300',
      800: '#00be00',
      900: '#009800',
    },
  },
});
