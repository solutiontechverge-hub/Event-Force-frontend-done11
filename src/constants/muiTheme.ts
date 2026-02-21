'use client';

import { createTheme } from '@mui/material/styles';
import { THEME } from '@/constants/theme';

export const muiTheme = createTheme({

  palette: {

    primary: {
      main: THEME.colors.primary,
      dark: THEME.colors.primaryDark,
    },

    secondary: {
      main: THEME.colors.secondary,
    },

    background: {
      default: THEME.colors.background.paper, // whole site bg
      paper: '#ffffff', // cards bg
    },

    text: {
      primary: THEME.colors.text.primary,
      secondary: THEME.colors.text.secondary,
    },

  },

  typography: {
    fontFamily: THEME.typography.fontFamily.secondary,
  },

  shape: {
    borderRadius: 12,
  },

  components: {

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: THEME.colors.background.paper,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },

  },

});