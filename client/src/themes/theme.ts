import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto", "Open Sans", "sans-serif" ',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  palette: {
    primary: { main: '#de4f48' }, //pink
  },
  shape: {
    borderRadius: 3,
  },

});
