'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  TextField,
  InputAdornment,
  Chip,
  Grid,
  Button,
  Card,
} from '@mui/material';
import { 
  Search, 
  ExpandMore, 
  Help, 
  CarRental, 
  Payment, 
  Event, 
  Security,
  Phone,
  Email
} from '@mui/icons-material';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScaleInView, SlideUpInView } from '@/components/animations';
import { FaqBg } from '../../../../public/images';
import { useLanguage } from '@/contexts/LanguageContext';
import { FAQ_CATEGORIES, FAQ_POPULAR_QUESTIONS } from '@/data/faqContent';

const FAQPageClient = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | false>(false);

  const iconMap = {
    help: <Help />,
    carRental: <CarRental />,
    payment: <Payment />,
    event: <Event />,
    security: <Security />,
  } as const;

  const handleCategoryChange = (category: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedCategory(isExpanded ? category : false);
  };

  const filteredCategories = FAQ_CATEGORIES.map((c) => ({
    ...c,
    icon: iconMap[c.iconKey],
  })).filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.questions.some(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
          backgroundImage: `url(${FaqBg})`,
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
            src={FaqBg}
            alt="FAQ Background"
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
                {t('faq.title')}
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography 
                variant="h5" 
                sx={{ 
                  opacity: 0.9,
                  maxWidth: '800px',
                  mx: 'auto',
                  mb: 4,
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                  color: 'white',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                {t('faq.subtitle')}
              </Typography>
            </SlideUpInView>
            
            {/* Search Bar */}
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <TextField
                fullWidth
                placeholder={t('faq.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  maxWidth: '600px',
                  mx: 'auto',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    borderRadius: '50px',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#666' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      {/* Popular Questions Section */}
      <Box sx={{ py: 6, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <SlideUpInView initialY={60} duration={0.8}>
            <Typography 
              variant="h4" 
              component="h2"
              sx={{ 
                textAlign: 'center', 
                mb: 4, 
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              Popular Questions
            </Typography>
          </SlideUpInView>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {FAQ_POPULAR_QUESTIONS.map((question, index) => (
              <ScaleInView key={index} initialScale={0.8} duration={0.6} delay={index * 0.1}>
                <Chip
                  label={question}
                  onClick={() => setSearchQuery(question)}
                  sx={{
                    backgroundColor: '#9c27b0',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#7b1fa2',
                    }
                  }}
                />
              </ScaleInView>
            ))}
          </Box>
        </Container>
      </Box>

      {/* FAQ Categories Section */}
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
              Browse by Category
            </Typography>
          </SlideUpInView>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {filteredCategories.map((category, categoryIndex) => (
              <ScaleInView key={categoryIndex} initialScale={0.9} duration={0.8} delay={categoryIndex * 0.1}>
                <Card sx={{ mb: 2 }}>
                  <Accordion 
                    expanded={expandedCategory === category.title}
                    onChange={handleCategoryChange(category.title)}
                    sx={{ boxShadow: 'none' }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      sx={{
                        backgroundColor: category.color,
                        color: 'white',
                        '&:hover': {
                          backgroundColor: category.color,
                          opacity: 0.9
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        {category.icon}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {category.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                      {category.questions.map((faq, faqIndex) => (
                        <Box key={faqIndex}>
                          <Box sx={{ p: 3, borderBottom: '1px solid #eee' }}>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 'bold', 
                                mb: 2, 
                                color: '#333',
                                cursor: 'pointer'
                              }}
                            >
                              {faq.question}
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                              {faq.answer}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </Card>
              </ScaleInView>
            ))}
          </Box>

          {filteredCategories.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
                No questions found for &quot;{searchQuery}&quot;
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: '#999' }}>
                Try searching with different keywords or browse our categories above.
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => setSearchQuery('')}
                sx={{ 
                  backgroundColor: '#9c27b0',
                  '&:hover': { backgroundColor: '#7b1fa2' }
                }}
              >
                Clear Search
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      {/* Contact Support Section */}
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
                Still Have Questions?
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography variant="body1" sx={{ mb: 4, color: '#666', maxWidth: '600px', mx: 'auto' }}>
                If you couldn&apos;t find the answer you&apos;re looking for, our support team is ready to help you with any questions or concerns.
              </Typography>
            </SlideUpInView>
            
            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <ScaleInView initialScale={0.9} duration={0.8} delay={0.4}>
                  <Card sx={{ p: 3, textAlign: 'center' }}>
                    <Phone sx={{ color: '#52A4C1', fontSize: '3rem', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Call Us
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666' }}>
                      +966594279012 (WhatsApp) | +966125786869 
                    </Typography>
                  </Card>
                </ScaleInView>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <ScaleInView initialScale={0.9} duration={0.8} delay={0.6}>
                  <Card sx={{ p: 3, textAlign: 'center' }}>
                    <Email sx={{ color: '#52A4C1', fontSize: '3rem', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Email Us
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666' }}>
                      Reservations@eventforce.sa.com
                    </Typography>
                  </Card>
                </ScaleInView>
              </Grid>
            </Grid>

            <SlideUpInView initialY={40} duration={1.0} delay={0.8}>
              <Button 
                variant="contained" 
                size="large"
                href="/support"
                sx={{ 
                  backgroundColor: '#9c27b0',
                  px: 4,
                  py: 1.5,
                  '&:hover': { backgroundColor: '#7b1fa2' }
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

export default FAQPageClient;
