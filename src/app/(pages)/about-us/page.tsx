'use client';

import React, { useState, useEffect } from 'react'
import { Box, Typography, Container } from '@mui/material'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MissionVision from '@/components/MissionVision'
import BenefitsSection from '@/components/BenefitsSection'
import DownloadProfile from '@/components/DownloadProfile'
import TestimonialsSection from '@/components/TestimonialsSection'
import AboutBg from '@/assets/images/about-bg.png'
import { AboutTeam } from '@/assets/images'
import { ScaleInView, SlideSidewayInView, SlideUpInView } from '@/components/animations'
import { PageSkeleton } from '@/components/PageSkeleton'

const AboutUsPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return <PageSkeleton heroHeight="70vh" contentType="about" />;
  }

  return (
    <>
      <Header />
      <Box 
        sx={{ 
          pt: 8,
          minHeight: '70vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          // Fallback background
          backgroundImage: `url(${AboutBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0
          }}
        >
          <Image
            src={AboutBg}
            alt="About Event Force Background"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
            priority
          />
        </Box>
        
        {/* Overlay for better text readability */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
            zIndex: 1
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 4,
            flexDirection: { xs: 'column', md: 'row' }
          }}>
            {/* Text Content - Left Side */}
            <Box sx={{ 
              textAlign: 'left', 
              maxWidth: { xs: '100%', md: '600px' },
              flex: 1
            }}>
              <SlideUpInView initialY={60} duration={0.8}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: { xs: 700, sm: 700, md: 'bold' }, 
                    mb: { xs: 2, sm: 3, md: 4 },
                    color: 'white',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
                    lineHeight: { xs: 1.2, sm: 1.3, md: 1.3 }
                  }}
                >
                  About Event Force
                </Typography>
              </SlideUpInView>
              <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem', lg: '1.5rem' },
                    fontWeight: { xs: 400, sm: 400, md: 400 },
                    px: { xs: 2, sm: 0, md: 0 }
                  }}
                >
                  We are Saudi Arabia's premier transportation and event logistics company, 
                  dedicated to providing exceptional service and luxury experiences.
                </Typography>
              </SlideUpInView>
            </Box>

             {/* Single Circular Team Image - Right Side */}
             <Box sx={{ 
               display: { xs: 'none', md: 'flex' }, // Hide on mobile and tablet, show on desktop
               justifyContent: 'center',
               alignItems: 'center',
               flex: 1,
               maxWidth: '590px',
               position: 'relative',
               minHeight: '300px'
             }}>
               <ScaleInView initialScale={0.8} duration={1.0} delay={0.4}>
                 {/* Single Circle - Team Image */}
                 <Box
                   sx={{
                     position: 'relative',
                     width: { md: '250px', lg: '300px' },
                     height: { md: '250px', lg: '300px' },
                     borderRadius: '50%',
                     overflow: 'hidden',
                     border: '4px solid #00bcd4',
                     boxShadow: '0 0 25px rgba(0, 188, 212, 0.6)',
                     zIndex: 2,
                     transition: 'transform 0.3s ease',
                     '&:hover': {
                       transform: 'scale(1.05)'
                     }
                   }}
                 >
                   <Image
                     src={AboutTeam}
                     alt="Event Force Team"
                     fill
                     style={{
                       objectFit: 'cover',
                       objectPosition: 'center'
                     }}
                   />
                 </Box>
               </ScaleInView>
             </Box>
          </Box>
        </Container>
      </Box>
      
      {/* Mission & Vision Section */}
      <MissionVision />
      
      {/* Benefits Section */}
      <BenefitsSection />
      
      {/* Download Profile Section */}
      <DownloadProfile />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      <Footer />
    </>
  )
}

export default AboutUsPage