'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  Fade,
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { SlideSidewayInView } from '@/components/animations';
import { useLanguage } from '@/contexts/LanguageContext';

const DownloadProfile = () => {
  const [visible, setVisible] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: { xs: 'auto', sm: 92 },
        height: { xs: 'auto', sm: 92 },
        backgroundColor: '#F5F5F5',
        display: 'flex',
        alignItems: 'center',
        px: 2,
        py: { xs: 2, sm: 0 },
      }}
    >
      <Fade in={visible} timeout={700}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'center' },
            justifyContent: 'space-between',
            gap: { xs: 2, sm: 0 },
            height: '100%',
            minHeight: { xs: 'auto', sm: 92 },
            width: '100%',
          }}
        >
          {/* Left Text */}
          <SlideSidewayInView initialX={-30} duration={0.8}>
            <Typography
              variant="body1"
              component="h3"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: { xs: '16px', sm: '18px' },
                color: '#333333',
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              {t('download.title')}
            </Typography>
          </SlideSidewayInView>

          {/* Download Button */}
          <SlideSidewayInView initialX={30} duration={0.8} delay={0.2}>
            <Button
              component="a"
              href="/pdf/Company-Profile.pdf"
              download="Event-Force-Company-Profile.pdf"
              variant="contained"
              endIcon={
                <DownloadIcon
                  sx={{ fontSize: { xs: '18px', sm: '20px' } }}
                />
              }
              sx={{
                backgroundColor: '#52A4C1',
                borderRadius: '8px',
                width: { xs: '100%', sm: 212 },
                height: 48,
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: { xs: '12px', sm: '14px' },
                color: '#FFFFFF',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                '&:hover': {
                  backgroundColor: '#4A8FA8',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s',
              }}
            >
              {t('download.button')}
            </Button>
          </SlideSidewayInView>
        </Box>
      </Fade>
    </Box>
  );
};

export default DownloadProfile;
