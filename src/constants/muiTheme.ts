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
      default: THEME.colors.background.default, // whole site bg
      paper: '#ffffff', // cards bg
    },

    text: {
      primary: THEME.colors.text.primary,
      secondary: THEME.colors.text.secondary,
    },

  },

  typography: {
    fontFamily: THEME.typography.fontFamily.primary,
  },

  shape: {
    borderRadius: 12,
  },

  components: {

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: THEME.colors.background.default,
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

    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: THEME.colors.primary,
          '&:hover': {
            backgroundColor: THEME.colors.primaryDark,
          },
        },
        outlinedPrimary: {
          borderColor: THEME.colors.primary,
          color: THEME.colors.primary,
          '&:hover': {
            borderColor: THEME.colors.primaryDark,
            backgroundColor: 'rgba(82, 164, 193, 0.08)',
          },
        },
        textPrimary: {
          color: THEME.colors.primary,
          '&:hover': {
            backgroundColor: 'rgba(82, 164, 193, 0.08)',
          },
        },
      },
    },

  },

});