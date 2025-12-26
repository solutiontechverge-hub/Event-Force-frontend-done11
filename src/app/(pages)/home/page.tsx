'use client';

import React, { Suspense, useState, useEffect } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import MissionVision from '@/components/MissionVision'
import DownloadProfile from '@/components/DownloadProfile'
import Footer from '@/components/Footer'
import { PageSkeleton } from '@/components/PageSkeleton'
import { 
  SuspenseBenefitsSection, 
  SuspenseTestimonialsSection, 
  SuspenseFleetSection, 
  SuspenseContactSection 
} from '@/components/LazyComponents'

const HomePage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mount immediately - the global loading screen handles initial load
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <PageSkeleton heroHeight="60vh" contentType="default" />;
  }

  return (
    <>
      <Header />
      <HeroSection />
      <MissionVision />
      <SuspenseBenefitsSection />
      <DownloadProfile />
      <SuspenseTestimonialsSection />
      <SuspenseFleetSection />
      <SuspenseContactSection />
      <Footer />
    </>
  )
}

export default HomePage