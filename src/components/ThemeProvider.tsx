'use client';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EmotionRegistry from '@/components/EmotionRegistry';
import { useEffect, useState } from 'react';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-outfit), Arial, Helvetica, sans-serif',
  },
  palette: {
    primary: {
      main: '#52A4C1',
    },
    secondary: {
      main: '#1976d2',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          overflowY: 'scroll', // Prevent layout shift when scrollbar is hidden
        },
        body: {
          fontFamily: 'var(--font-outfit), Arial, Helvetica, sans-serif',
          backgroundColor: '#000000',
          color: '#ffffff',
        },
      },
    },
  },
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    setMounted(true);
    // Signal that styles are loaded
    document.body.classList.add('styles-loaded');
    
    // Hide initial loading screen (only add class, don't remove from DOM to avoid hydration issues)
    const loadingScreen = document.getElementById('initial-loading-screen');
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
      loadingScreen.classList.add('hidden');
    }

    // Listen for direction changes from LanguageContext
    const updateDirection = () => {
      const dir = document.documentElement.dir || 'ltr';
      setDirection(dir as 'ltr' | 'rtl');
    };
    
    updateDirection();
    const observer = new MutationObserver(updateDirection);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
    
    return () => observer.disconnect();
  }, []);

  const themeWithDirection = createTheme({
    ...theme,
    direction,
  });

  return (
    <EmotionRegistry>
      <MuiThemeProvider theme={themeWithDirection}>
        <CssBaseline />
        <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
          {children}
        </div>
      </MuiThemeProvider>
    </EmotionRegistry>
  );
}
