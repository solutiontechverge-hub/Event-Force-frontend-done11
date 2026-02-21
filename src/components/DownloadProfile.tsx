'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';

import DownloadIcon from '@mui/icons-material/Download';
import { useLanguage } from '@/contexts/LanguageContext';

const PRIMARY = '#52A4C1';

const DownloadProfile = () => {
  const { t } = useLanguage();

  return (
    <Box
      sx={{
        width: '100%',
        py: 8,

        px: {
          xs: 2,
          sm: 4,
          md: 6,
          lg: 10,
          xl: 16,
        },

        background: `${PRIMARY}10`,
      }}
    >

      <Box
        sx={{
          borderRadius: 4,

          border: `1px solid ${PRIMARY}40`,

          p: 5,

          display: 'flex',

          flexDirection: {
            xs: 'column',
            md: 'row',
          },

          justifyContent: 'space-between',
          alignItems: 'center',

          gap: 3,
        }}
      >

        <Typography fontSize={22} fontWeight={600}>
          {t('download.title')}
        </Typography>

        <Button
          href="/pdf/Company-Profile.pdf"
          download

          startIcon={<DownloadIcon />}

          sx={{
            background: PRIMARY,
            color: '#fff',

            px: 4,
            py: 1.5,

            '&:hover': {
              background: PRIMARY,
              boxShadow: `0 10px 30px ${PRIMARY}50`,
            },
          }}
        >
          {t('download.button')}
        </Button>

      </Box>

    </Box>
  );
};

export default DownloadProfile;