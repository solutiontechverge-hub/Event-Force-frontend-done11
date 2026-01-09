'use client';

import React, { useState, useEffect } from 'react'
import { Box, Typography, Container } from '@mui/material'
import Image from 'next/image'
import Header from '@/components/Header'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

import { ScaleInView, SlideSidewayInView, SlideUpInView } from '@/components/animations'
import { PageSkeleton } from '@/components/PageSkeleton'
import { ContactUsBg } from '../../../../public/images';

const ContactUsPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return <PageSkeleton heroHeight="70vh" contentType="contact" />;
  }

  return (
    <>
      <Header />
      <Box 
        sx={{ 
          pt: 8,
          // Reduced hero height so the contact image section is smaller
          minHeight: { xs: '45vh', md: '40vh' },
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          // Fallback background
          backgroundImage: `url(${ContactUsBg})`,
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
            src={ContactUsBg}
            alt="Contact Us Background"
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
          <Box sx={{ textAlign: 'center' }}>
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
                Contact Us
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
                  maxWidth: '800px', 
                  mx: 'auto',
                  px: { xs: 2, sm: 0, md: 0 }
                }}
              >
                Get in touch with our team for any questions or to book your next transportation service.
              </Typography>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>
      
      <Box sx={{ pt: 0 }}>
        <ContactSection />
      </Box>
      <Footer />
    </>
  )
}

export default ContactUsPage