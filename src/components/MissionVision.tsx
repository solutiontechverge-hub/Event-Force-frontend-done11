'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
} from '@mui/material';

import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useLanguage } from '@/contexts/LanguageContext';

const PRIMARY = '#52A4C1';

export default function MissionVision() {
  const { t } = useLanguage();

  return (
    <Box
      sx={{
        width: '100%',
        py: 10,
        px: { xs: 2, sm: 4, md: 6, lg: 10 },
        background: '#f6fbfd',
      }}
    >

      {/* THIS GRID MAKES THEM EQUAL */}
      <Grid
        container
        spacing={4}
      >

        {/* Mission */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              height: 280, // ⭐ FORCE SAME HEIGHT

              display: 'flex',
              flexDirection: 'column',

              justifyContent: 'flex-start',

              p: 4,

              borderRadius: 3,

              border: `1px solid ${PRIMARY}40`,

              boxShadow: `0 5px 20px ${PRIMARY}20`,
            }}
          >

            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: 2,
                background: PRIMARY,

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                mb: 2,
              }}
            >
              <RocketLaunchIcon sx={{ color: '#fff' }} />
            </Box>

            <Typography fontWeight={600} fontSize={22} mb={1}>
              {t('mission.title')}
            </Typography>

            <Typography color="text.secondary">
              {t('mission.text')}
            </Typography>

          </Paper>
        </Grid>


        {/* Vision */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              height: 280, // ⭐ SAME HEIGHT

              display: 'flex',
              flexDirection: 'column',

              justifyContent: 'flex-start',

              p: 4,

              borderRadius: 3,

              border: `1px solid ${PRIMARY}40`,

              boxShadow: `0 5px 20px ${PRIMARY}20`,
            }}
          >

            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: 2,
                background: PRIMARY,

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                mb: 2,
              }}
            >
              <VisibilityIcon sx={{ color: '#fff' }} />
            </Box>

            <Typography fontWeight={600} fontSize={22} mb={1}>
              {t('vision.title')}
            </Typography>

            <Typography color="text.secondary">
              {t('vision.text')}
            </Typography>

          </Paper>
        </Grid>

      </Grid>

    </Box>
  );
}