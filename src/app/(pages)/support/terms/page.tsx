'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent,
  Divider,
  Button,
  Skeleton
} from '@mui/material';
import { Description } from '@mui/icons-material';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScaleInView, SlideUpInView } from '@/components/animations';
import { TermServicesBg } from '../../../../../public/images';

const TermsPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using Event Force services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
    },
    {
      title: '2. Description of Service',
      content: 'Event Force provides premium transportation and event logistics services including but not limited to luxury vehicle rentals, chauffeur services, event transportation, and comprehensive logistics solutions for various occasions and events across Saudi Arabia.'
    },
    {
      title: '3. User Responsibilities',
      content: 'Users are responsible for providing accurate information during booking, arriving on time for scheduled services, treating drivers and staff with respect, and following all applicable laws and regulations. Any damage to vehicles or equipment will be charged to the user.'
    },
    {
      title: '4. Booking and Cancellation Policy',
      content: 'Bookings must be made at least 24 hours in advance. Free cancellation is available up to 24 hours before scheduled service. Cancellations within 24 hours may incur a 50% charge. Same-day cancellations are subject to full payment. Emergency situations are handled case-by-case.'
    },
    {
      title: '5. Payment Terms',
      content: 'Payment is required at the time of booking confirmation. We accept all major credit cards, bank transfers, and digital wallets. All payments are processed securely through encrypted channels. Corporate clients may arrange monthly billing with approved credit terms.'
    },
    {
      title: '6. Service Availability',
      content: 'While we strive to provide reliable service, we cannot guarantee availability during peak times, severe weather conditions, or other circumstances beyond our control. We reserve the right to substitute vehicles of similar quality and capacity when necessary.'
    },
    {
      title: '7. Liability and Insurance',
      content: 'Event Force carries comprehensive commercial insurance coverage for all vehicles and services. Our liability is limited to the cost of the service provided. Users are responsible for their personal belongings and any damage caused by their negligence.'
    },
    {
      title: '8. Privacy and Data Protection',
      content: 'We are committed to protecting your privacy and personal information. All data is collected, stored, and processed in accordance with applicable privacy laws and our Privacy Policy. We do not sell or share your personal information with third parties without your consent.'
    },
    {
      title: '9. Prohibited Activities',
      content: 'Users are prohibited from using our services for illegal activities, transporting prohibited items, smoking in vehicles, consuming alcohol, or engaging in any behavior that may endanger the driver, other passengers, or the public.'
    },
    {
      title: '10. Intellectual Property',
      content: 'All content, trademarks, logos, and intellectual property displayed on our website and materials are the property of Event Force or our licensors. Users may not reproduce, distribute, or use any content without written permission.'
    },
    {
      title: '11. Termination',
      content: 'We reserve the right to terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these terms. Upon termination, your right to use the service will cease immediately.'
    },
    {
      title: '12. Governing Law',
      content: 'These terms shall be governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts of Saudi Arabia.'
    },
    {
      title: '13. Changes to Terms',
      content: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services after changes constitutes acceptance of the new terms.'
    },
    {
      title: '14. Contact Information',
      content: 'For questions about these terms or our services, please contact us at:\n\nEmail: legal@eventforce.sa.com\nPhone: +9660549454525 (WhatsApp) | +966125786869 \nAddress: Riyadh, Saudi Arabia'
    }
  ];

  if (!isMounted) {
    return (
      <>
        <Header />
        
        {/* Hero Section Skeleton */}
        <Box 
          sx={{ 
            pt: 8,
            height: '35vh',
            minHeight: '300px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Skeleton 
                variant="text" 
                width="40%" 
                height={60} 
                animation="wave"
                sx={{ mx: 'auto', mb: 2 }} 
              />
              <Skeleton 
                variant="text" 
                width="70%" 
                height={40} 
                animation="wave"
                sx={{ mx: 'auto' }} 
              />
            </Box>
          </Container>
        </Box>

        {/* Content Skeleton */}
        <Box sx={{ py: 8, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
          <Container maxWidth="lg">
            <Card sx={{ p: 4 }}>
              <Skeleton variant="text" width="30%" height={20} animation="wave" sx={{ mb: 2 }} />
              <Skeleton variant="text" width="100%" height={20} animation="wave" sx={{ mb: 1 }} />
              <Skeleton variant="text" width="90%" height={20} animation="wave" />
              <Divider sx={{ my: 4 }} />
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <Box key={item} sx={{ mb: 4 }}>
                  <Skeleton variant="text" width="40%" height={35} animation="wave" sx={{ mb: 2 }} />
                  <Skeleton variant="text" width="100%" height={20} animation="wave" sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="95%" height={20} animation="wave" sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="90%" height={20} animation="wave" />
                  {item < 7 && <Divider sx={{ my: 3 }} />}
                </Box>
              ))}
            </Card>
          </Container>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: 8,
          height: '35vh',
          minHeight: '300px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundColor: '#52A4C1',
        }}
      >
        {/* Background Image */}
        {isMounted && (
          <Box
            className={heroImageLoaded ? 'hero-image-container loaded' : 'hero-image-container'}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
            }}
          >
            <Image
              src={TermServicesBg.src || TermServicesBg}
              alt="Terms of Service Hero Background"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              priority
              onLoad={() => setHeroImageLoaded(true)}
              sizes="100vw"
            />
          </Box>
        )}
        
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
                  mb: { xs: 1.5, sm: 2, md: 2 },
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
                  lineHeight: { xs: 1.2, sm: 1.3, md: 1.3 }
                }}
              >
                Terms of Service
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
                Please read these terms carefully before using our services
              </Typography>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      {/* Terms Content */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Card sx={{ p: 4 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                Last updated: December 2024
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                These Terms of Service ("Terms") govern your use of Event Force's transportation and event logistics services. 
                By using our services, you agree to be bound by these terms.
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            {sections.map((section, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <ScaleInView initialScale={0.9} duration={0.8} delay={index * 0.1}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 'bold', 
                      mb: 2, 
                      color: '#333'
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#666', 
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {section.content}
                  </Typography>
                </ScaleInView>
                {index < sections.length - 1 && <Divider sx={{ my: 3 }} />}
              </Box>
            ))}
          </Card>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <SlideUpInView initialY={60} duration={0.8}>
              <Typography 
                variant="h3" 
                component="h2"
                sx={{ 
                  fontWeight: 'bold',
                  mb: 4,
                  color: '#333'
                }}
              >
                Questions About These Terms?
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography variant="body1" sx={{ mb: 4, color: '#666', maxWidth: '600px', mx: 'auto' }}>
                If you have any questions about these terms or need clarification on any points, 
                please don't hesitate to contact our legal team.
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <Button 
                variant="contained" 
                size="large"
                href="/support"
                sx={{ 
                  backgroundColor: '#52A4C1',
                  px: 4,
                  py: 1.5,
                  '&:hover': { backgroundColor: '#4A8FA8' }
                }}
              >
                Contact Support
              </Button>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default TermsPage;
