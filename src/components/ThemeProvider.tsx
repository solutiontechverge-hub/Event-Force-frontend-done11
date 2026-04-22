'use client';

import React from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from '@mui/material';
import { muiTheme } from '@/constants/muiTheme';

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