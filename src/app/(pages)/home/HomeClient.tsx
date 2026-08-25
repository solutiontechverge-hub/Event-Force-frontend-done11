'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MissionVision from '@/components/MissionVision';
import DownloadProfile from '@/components/DownloadProfile';
import Footer from '@/components/Footer';
import HomeBookingPopup from '@/components/HomeBookingPopup';
import {
  SuspenseBenefitsSection,
  SuspenseTestimonialsSection,
  SuspenseFleetSection,
  SuspenseContactSection,
} from '@/components/LazyComponents';
import { Divider, Box } from '@mui/material';

const HomeClient = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPopupOpen(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <Header />
      <HomeBookingPopup open={popupOpen} onClose={handleClosePopup} />
      <Box component="main">
      <HeroSection />
      <MissionVision />
      <Divider sx={{ my: 8 }} />
      <SuspenseBenefitsSection />
      <Divider sx={{ my: 8 }} />
      <DownloadProfile />
      <Divider sx={{ my: 8 }} />
      <SuspenseTestimonialsSection />
      <Divider sx={{ my: 8 }} />
      <SuspenseFleetSection />
      <Divider sx={{ my: 8 }} />
      <SuspenseContactSection />
      </Box>
      <Footer />
    </>
  );
};

export default HomeClient;
