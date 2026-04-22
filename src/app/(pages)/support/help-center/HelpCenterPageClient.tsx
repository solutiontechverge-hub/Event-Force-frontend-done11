'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  TextField,
  InputAdornment,
  Chip,
  Grid,
  Button,
  Skeleton
} from '@mui/material';
import { Search, ExpandMore, Help, Book, Support } from '@mui/icons-material';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScaleInView, SlideUpInView } from '@/components/animations';
import { HelpCenterBg } from '../../../../../public/images';
import { HELP_CENTER_CATEGORIES, HELP_CENTER_POPULAR_TOPICS } from '@/data/helpCenterContent';


const HelpCenterPageClient = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | false>(false);
  const [isMounted, setIsMounted] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const iconMap = {
    help: <Help />,
    book: <Book />,
    support: <Support />,
  } as const;

  const handleCategoryChange = (category: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedCategory(isExpanded ? category : false);
  };

  const filteredCategories = HELP_CENTER_CATEGORIES.map((c) => ({
    ...c,
    icon: iconMap[c.iconKey],
  })).filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article => 
      article.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
                width="60%" 
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
            <Skeleton variant="rectangular" height={56} animation="wave" sx={{ borderRadius: '8px', mb: 4, maxWidth: '600px', mx: 'auto' }} />
            <Skeleton variant="text" width="30%" height={40} animation="wave" sx={{ mb: 3 }} />
            {[1, 2, 3].map((item) => (
              <Card key={item} sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} animation="wave" sx={{ mr: 2 }} />
                    <Skeleton variant="text" width="200px" height={30} animation="wave" />
                  </Box>
                  {[1, 2, 3].map((article) => (
                    <Box key={article} sx={{ mb: 2, pl: 7 }}>
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
              src={HelpCenterBg.src || HelpCenterBg}
              alt="Help Center Hero Background"
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
                Help Center
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
                  px: { xs: 2, sm: 0, md: 0 }
                }}
              >
                Find answers to your questions and get the support you need
              </Typography>
            </SlideUpInView>
            
            {/* Search Bar */}
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <TextField
                fullWidth
                placeholder="Search for help articles..."
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

      {/* Popular Topics Section */}
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
              Popular Topics
            </Typography>
          </SlideUpInView>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {HELP_CENTER_POPULAR_TOPICS.map((topic, index) => (
              <ScaleInView key={index} initialScale={0.8} duration={0.6} delay={index * 0.1}>
                <Chip
                  label={topic}
                  onClick={() => setSearchQuery(topic)}
                  sx={{
                    backgroundColor: '#52A4C1',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#4A8FA8',
                    }
                  }}
                />
              </ScaleInView>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Help Categories Section */}
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

          <Grid container spacing={4}>
            {filteredCategories.map((category, categoryIndex) => (
              <Grid size={{ xs: 12 }} key={categoryIndex}>
                <ScaleInView initialScale={0.9} duration={0.8} delay={categoryIndex * 0.2}>
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
                        {category.articles.map((article, articleIndex) => (
                          <Box key={articleIndex}>
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
                                {article.question}
                              </Typography>
                              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                                {article.answer}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  </Card>
                </ScaleInView>
              </Grid>
            ))}
          </Grid>

          {filteredCategories.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
                No articles found.
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
                  '&:hover': { backgroundColor: '#4A8FA8' }
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
                Still Need Help?
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography variant="body1" sx={{ mb: 4, color: '#666', maxWidth: '600px', mx: 'auto' }}>
                If you can&apos;t find the answer you&apos;re looking for, our support team is ready to help you with any questions or concerns.
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

export default HelpCenterPageClient;
