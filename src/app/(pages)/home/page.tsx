'use client';

import React from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import MissionVision from '@/components/MissionVision'
import DownloadProfile from '@/components/DownloadProfile'
import Footer from '@/components/Footer'
import { 
  SuspenseBenefitsSection, 
  SuspenseTestimonialsSection, 
  SuspenseFleetSection, 
  SuspenseContactSection 
} from '@/components/LazyComponents'
import RamadanPopup from '@/components/RamadanPopup';
import { Divider } from '@mui/material';

const HomePage = () => {
  return (
    <>
    <RamadanPopup />
      <Header />
      <HeroSection />
      <MissionVision />
      <SuspenseBenefitsSection />
      <Divider sx={{ my: 8 }} />
      <DownloadProfile />
      <SuspenseTestimonialsSection />
      <SuspenseFleetSection />
      <SuspenseContactSection />
      <Footer />
    </>
  )
}

export default HomePage
