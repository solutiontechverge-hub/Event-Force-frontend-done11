'use client';

import React, { useState } from 'react';
import { usePageMount } from '@/hooks/usePageMount';
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
  CardContent,
  Skeleton,
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
  Email,
} from '@mui/icons-material';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScaleInView, SlideUpInView } from '@/components/animations';
import { FaqBg } from '../../../../../public/images';
import {
  faqCategories,
  popularQuestions,
  type FAQCategoryKey,
} from './data';

const categoryIcons: Record<FAQCategoryKey, React.ReactElement> = {
  general: <Help />,
  booking: <CarRental />,
  payment: <Payment />,
  event: <Event />,
  safety: <Security />,
};

const FAQPageClient = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | false>(false);
  const isMounted = usePageMount();
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqCategories.flatMap((category) =>
      category.questions.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    ),
  };

  const handleCategoryChange =
    (category: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedCategory(isExpanded ? category : false);
    };

  const filteredCategories = faqCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.questions.some(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  if (!isMounted) {
    return (
      <>
        <Header />

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
                width="50%"
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

        <Box sx={{ py: 8, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
          <Container maxWidth="lg">
            <Skeleton
              variant="rectangular"
              height={56}
              animation="wave"
              sx={{ borderRadius: '8px', mb: 4, maxWidth: '600px', mx: 'auto' }}
            />
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Skeleton
                      variant="circular"
                      width={40}
                      height={40}
                      animation="wave"
                      sx={{ mr: 2 }}
                    />
                    <Skeleton variant="text" width="200px" height={30} animation="wave" />
                  </Box>
                  {[1, 2, 3, 4].map((question) => (
                    <Box key={question} sx={{ mb: 2, pl: 7 }}>
                      <Skeleton variant="text" width="80%" height={25} animation="wave" sx={{ mb: 1 }} />
                      <Skeleton variant="text" width="100%" height={20} animation="wave" />
                      <Skeleton variant="text" width="90%" height={20} animation="wave" />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            ))}
          </Container>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <Box component="main">
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
                src={FaqBg.src || FaqBg}
                alt="FAQ Hero Background"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority
                onLoad={() => setHeroImageLoaded(true)}
                sizes="100vw"
              />
            </Box>
          )}

          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
              zIndex: 1,
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
                    fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.25rem', lg: '2.75rem' },
                    lineHeight: { xs: 1.2, sm: 1.3, md: 1.3 },
                  }}
                >
                  Frequently Asked Questions
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
                    mb: { xs: 3, sm: 4, md: 4 },
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 2, sm: 0, md: 0 },
                  }}
                >
                  Find quick answers to the most common questions about our services
                </Typography>
              </SlideUpInView>

              <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
                <TextField
                  fullWidth
                  placeholder="Search FAQ..."
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
                  color: '#333',
                }}
              >
                Popular Questions
              </Typography>
            </SlideUpInView>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              {popularQuestions.map((question, index) => (
                <ScaleInView key={index} initialScale={0.8} duration={0.6} delay={index * 0.1}>
                  <Chip
                    label={question}
                    onClick={() => setSearchQuery(question)}
                    sx={{
                      backgroundColor: '#52A4C1',
                      color: 'white',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#4A8FA8',
                      },
                    }}
                  />
                </ScaleInView>
              ))}
            </Box>
          </Container>
        </Box>

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
                  color: '#333',
                }}
              >
                Browse by Category
              </Typography>
            </SlideUpInView>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {filteredCategories.map((category, categoryIndex) => (
                <ScaleInView
                  key={category.key}
                  initialScale={0.9}
                  duration={0.8}
                  delay={categoryIndex * 0.1}
                >
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
                            opacity: 0.9,
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                          {categoryIcons[category.key]}
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
                                  cursor: 'pointer',
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
                  No questions found.
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: '#999' }}>
                  Try searching with different keywords or browse our categories above.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    setSearchQuery('');
                    setExpandedCategory(false);
                  }}
                  sx={{
                    backgroundColor: '#52A4C1',
                    '&:hover': { backgroundColor: '#4A8FA8' },
                  }}
                >
                  Clear Search
                </Button>
              </Box>
            )}
          </Container>
        </Box>

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
                    color: '#333',
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
                        +9660549454525 (WhatsApp) | +966125786869
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
                    backgroundColor: '#52A4C1',
                    px: 4,
                    py: 1.5,
                    '&:hover': { backgroundColor: '#4A8FA8' },
                  }}
                >
                  Contact Support
                </Button>
              </SlideUpInView>
            </Box>
          </Container>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default FAQPageClient;
