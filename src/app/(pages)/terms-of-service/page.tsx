'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import { Gavel, Security, CreditCard, CarRental, Event } from '@mui/icons-material';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScaleInView, SlideUpInView } from '@/components/animations';
import { PageSkeleton } from '@/components/PageSkeleton';
import { TermServicesBg } from '../../../../public/images';
import { TERMS_ADDITIONAL, TERMS_LAST_UPDATED, TERMS_SECTIONS } from './terms.data';

const TermsOfServicePage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return <PageSkeleton heroHeight="50vh" contentType="default" />;
  }
  const iconMap = {
    gavel: <Gavel />,
    security: <Security />,
    creditCard: <CreditCard />,
    carRental: <CarRental />,
    event: <Event />,
  } as const;

  const sections = TERMS_SECTIONS.map((s) => ({
    ...s,
    icon: iconMap[s.iconKey],
  }));

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: 8,
          minHeight: '50vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          // Fallback background
          backgroundImage: `url(${TermServicesBg})`,
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
            src={TermServicesBg}
            alt="Terms of Service Background"
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
                  fontWeight: 'bold', 
                  mb: 3,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                Terms of Service
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography 
                variant="h5" 
                sx={{ 
                  opacity: 0.9,
                  maxWidth: '800px',
                  mx: 'auto',
                  mb: 2,
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                  color: 'white',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                Please read these terms carefully before using our services
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <Chip 
                label={`Last updated: ${TERMS_LAST_UPDATED}`}
                sx={{ 
                  backgroundColor: '#52A4C1',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      {/* Main Terms Sections */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <SlideUpInView initialY={60} duration={0.8}>
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
                textAlign: 'center', 
                mb: 6, 
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              Terms and Conditions
            </Typography>
          </SlideUpInView>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {sections.map((section, index) => (
              <ScaleInView key={index} initialScale={0.9} duration={0.8} delay={index * 0.1}>
                <Card sx={{ overflow: 'visible' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box 
                        sx={{ 
                          color: section.color,
                          mr: 2,
                          '& .MuiSvgIcon-root': { fontSize: '2rem' }
                        }}
                      >
                        {section.icon}
                      </Box>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: section.color
                        }}
                      >
                        {section.title}
                      </Typography>
                    </Box>
                    <List>
                      {section.content.map((item, itemIndex) => (
                        <ListItem key={itemIndex} sx={{ px: 0, py: 1 }}>
                          <ListItemText 
                            primary={item}
                            sx={{
                              '& .MuiListItemText-primary': {
                                lineHeight: 1.6,
                                color: '#333'
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </ScaleInView>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Additional Terms Section */}
      <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <SlideUpInView initialY={60} duration={0.8}>
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
                textAlign: 'center', 
                mb: 6, 
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              Additional Terms
            </Typography>
          </SlideUpInView>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {TERMS_ADDITIONAL.map((term, index) => (
              <ScaleInView key={index} initialScale={0.9} duration={0.8} delay={index * 0.1}>
                <Card>
                  <CardContent sx={{ p: 4 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 'bold',
                        mb: 2,
                        color: '#52A4C1'
                      }}
                    >
                      {term.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        lineHeight: 1.6,
                        color: '#333'
                      }}
                    >
                      {term.content}
                    </Typography>
                  </CardContent>
                </Card>
              </ScaleInView>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Contact Information Section */}
      <Box sx={{ py: 8 }}>
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
                If you have any questions about these Terms of Service, please contact our legal team.
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
                <Typography variant="body1" sx={{ color: '#333', fontWeight: 'bold' }}>
                  Email: legal@eventforce.sa.com
                </Typography>
                <Typography variant="body1" sx={{ color: '#333', fontWeight: 'bold' }}>
                  Phone: +9660549454525 (WhatsApp) | +966125786869 
                </Typography>
              </Box>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default TermsOfServicePage;
