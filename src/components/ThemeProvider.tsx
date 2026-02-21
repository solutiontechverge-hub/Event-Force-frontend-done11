'use client';

import React from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';

import { THEME } from '@/constants/theme';

const muiTheme = createTheme({

  palette: {

    primary: {
      main: THEME.colors.primary,
    },

    background: {

      /* ⭐ THIS CONTROLS WHOLE WEBSITE BACKGROUND */
      default: '#f6fbfd',

      /* cards */
      paper: '#ffffff',
    },

    text: {
      primary: THEME.colors.text.primary,
      secondary: THEME.colors.text.secondary,
    },

  },

  typography: {
    fontFamily: THEME.typography.fontFamily.primary,
  },

  components: {

    MuiCssBaseline: {

      styleOverrides: {

        html: {
          backgroundColor: '#f6fbfd',
        },

        body: {
          backgroundColor: '#f6fbfd',
        },

        '#__next': {
          backgroundColor: '#f6fbfd',
        },

      },

    },

  },

});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}