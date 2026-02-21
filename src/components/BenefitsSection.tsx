'use client';

import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
} from '@mui/material';

import {
  OnTimeGuaranteeIcon,
  LuxuryFleetIcon,
  RealTimeGPSTrackingIcon,
  InCarWiFiIcon,
  CleanComfyIcon,
  CustomerSupportIcon,
  EasyOnlineBookingIcon,
  TrainedDriversIcon,
} from './icons';

import { SlideUpInView, ScaleInView } from '@/components/animations';
import { useLanguage } from '@/contexts/LanguageContext';

const PRIMARY = '#52A4C1';

const BenefitsSection = () => {
  const { t, language } = useLanguage();

  const benefits = useMemo(() => [
    { icon: <OnTimeGuaranteeIcon />, title: t('benefits.onTime') },
    { icon: <LuxuryFleetIcon />, title: t('benefits.luxuryFleet') },
    { icon: <RealTimeGPSTrackingIcon />, title: t('benefits.gpsTracking') },
    { icon: <InCarWiFiIcon />, title: t('benefits.wifi') },
    { icon: <CleanComfyIcon />, title: t('benefits.clean') },
    { icon: <CustomerSupportIcon />, title: t('benefits.support') },
    { icon: <EasyOnlineBookingIcon />, title: t('benefits.booking') },
    { icon: <TrainedDriversIcon />, title: t('benefits.drivers') },
  ], [t, language]);

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 8, md: 14 },

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

      <SlideUpInView>
        <Typography
          textAlign="center"
          fontSize={{ xs: 28, md: 42 }}
          fontWeight={700}
          color={PRIMARY}
          mb={8}
        >
          {t('benefits.title')}
        </Typography>
      </SlideUpInView>


      <Box
        sx={{
          display: 'grid',

          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(4,1fr)',
          },

          gap: 4,
        }}
      >

        {benefits.map((item, index) => (
          <ScaleInView key={index}>
            <Card
              sx={{
                height: 180,

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',

                borderRadius: 4,

                border: `1px solid ${PRIMARY}40`,

                transition: '0.3s',

                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: `0 15px 40px ${PRIMARY}40`,
                },
              }}
            >

              <Box
                sx={{
                  width: 60,
                  height: 60,

                  background: PRIMARY,

                  borderRadius: 3,

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  mb: 2,
                }}
              >
                {item.icon}
              </Box>

              <Typography fontWeight={600}>
                {item.title}
              </Typography>

            </Card>
          </ScaleInView>
        ))}

      </Box>

    </Box>
  );
};

export default BenefitsSection;