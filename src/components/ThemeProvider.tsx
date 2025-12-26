'use client';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/lib/emotion-cache';
import { useEffect, useState } from 'react';

// Create a cache for emotion - use singleton pattern to ensure consistency
let cache: ReturnType<typeof createEmotionCache> | null = null;

function getEmotionCache() {
  if (!cache) {
    cache = createEmotionCache();
  }
  return cache;
}

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

  useEffect(() => {
    setMounted(true);
    // Signal that styles are loaded
    document.body.classList.add('styles-loaded');
    
    // Hide initial loading screen
    const loadingScreen = document.getElementById('initial-loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.remove();
      }, 300);
    }
  }, []);

  return (
    <CacheProvider value={getEmotionCache()}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
          {children}
        </div>
      </MuiThemeProvider>
    </CacheProvider>
  );
}
