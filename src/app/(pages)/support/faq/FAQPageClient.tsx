'use client';

import React, { useState, useEffect } from 'react';
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
  Skeleton
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
import { FaqBg } from '@/assets/images';

const FAQPageClient = () => {
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

  const faqCategories = [
    {
      title: 'General Questions',
      icon: <Help />,
      color: '#52A4C1',
      questions: [
        {
          question: 'What is Event Force?',
          answer: 'Event Force is a premium transportation and event logistics company based in Saudi Arabia. We provide luxury vehicle rentals, chauffeur services, event transportation, and comprehensive logistics solutions for various occasions and events.'
        },
        {
          question: 'Where do you operate?',
          answer: 'We operate throughout Saudi Arabia, serving major cities including Riyadh, Jeddah, Dammam, and other regions. Our services are available nationwide with local expertise in each area.'
        },
        {
          question: 'What types of events do you handle?',
          answer: 'We handle a wide range of events including corporate meetings, weddings, conferences, airport transfers, city tours, VIP transportation, and large-scale event logistics. Our team can accommodate events of any size.'
        },
        {
          question: 'Do you provide 24/7 service?',
          answer: 'Yes, we provide 24/7 customer support and emergency services. Our fleet is available around the clock for urgent transportation needs, though advance booking is recommended for better availability.'
        }
      ]
    },
    {
      title: 'Booking & Reservations',
      icon: <CarRental />,
      color: '#52A4C1',
      questions: [
        {
          question: 'How do I make a booking?',
          answer: 'You can make a booking through our website, mobile app, or by calling our customer service team. Simply select your pickup location, destination, date, time, and vehicle preference. We\'ll confirm your booking within 24 hours.'
        },
        {
          question: 'How far in advance should I book?',
          answer: 'We recommend booking at least 24-48 hours in advance for standard services. For special events, peak seasons, or large groups, booking 1-2 weeks ahead ensures better availability and pricing options.'
        },
        {
          question: 'Can I modify my booking?',
          answer: 'Yes, you can modify your booking up to 24 hours before your scheduled pickup time. Changes include date, time, pickup location, and vehicle type. Contact our support team or use the "Manage Booking" section in your account.'
        },
        {
          question: 'What if I need to cancel my booking?',
          answer: 'Free cancellation is available up to 24 hours before your scheduled pickup. Cancellations within 24 hours may incur a 50% charge. Same-day cancellations are subject to full payment. Emergency situations are handled case-by-case.'
        }
      ]
    },
    {
      title: 'Payment & Pricing',
      icon: <Payment />,
      color: '#52A4C1',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), bank transfers, and digital wallets. Corporate clients can also arrange monthly billing. All payments are processed securely through encrypted channels.'
        },
        {
          question: 'When will I be charged?',
          answer: 'Payment is typically charged at the time of booking confirmation. For long-term rentals, we may require a deposit upfront with the balance due before service delivery. Corporate accounts may have different billing arrangements.'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No, we believe in transparent pricing. All fees are clearly displayed during the booking process. Additional charges may apply for extra services like waiting time, tolls, or special requests, but these are always communicated upfront.'
        },
        {
          question: 'Do you offer corporate discounts?',
          answer: 'Yes, we offer special rates for corporate clients with regular bookings. Contact our corporate team to discuss volume discounts and customized service packages for your business needs.'
        }
      ]
    },
    {
      title: 'Event Logistics',
      icon: <Event />,
      color: '#52A4C1',
      questions: [
        {
          question: 'What is included in event logistics services?',
          answer: 'Our event logistics services include transportation planning, vehicle coordination, driver management, route optimization, timeline management, and on-site support. We handle everything from small meetings to large-scale events.'
        },
        {
          question: 'Do you provide event planning services?',
          answer: 'While we specialize in transportation and logistics, we work closely with event planners and can coordinate with other vendors. Our team can provide recommendations and connections to trusted event planning partners.'
        },
        {
          question: 'Can you handle international guests?',
          answer: 'Yes, we provide services for international guests including airport transfers, city tours, and event transportation. Our drivers are professional and can assist with language barriers and cultural considerations.'
        },
        {
          question: 'What if my event has special requirements?',
          answer: 'We accommodate special requirements including accessibility needs, luxury vehicle preferences, specific timing, and custom routes. Please discuss your needs during the booking process so we can make appropriate arrangements.'
        }
      ]
    },
    {
      title: 'Safety & Security',
      icon: <Security />,
      color: '#52A4C1',
      questions: [
        {
          question: 'Are your drivers licensed and insured?',
          answer: 'Yes, all our drivers are professionally licensed, fully insured, and undergo regular background checks. They are trained in defensive driving, customer service, and emergency procedures to ensure your safety.'
        },
        {
          question: 'What safety measures do you have in place?',
          answer: 'We maintain comprehensive safety protocols including regular vehicle inspections, GPS tracking, emergency communication systems, and 24/7 monitoring. All vehicles are equipped with safety features and maintained to the highest standards.'
        },
        {
          question: 'Do you have insurance coverage?',
          answer: 'Yes, we carry comprehensive commercial insurance coverage for all our vehicles and services. This includes liability coverage, vehicle damage protection, and passenger insurance to ensure complete protection.'
        },
        {
          question: 'What happens in case of an emergency?',
          answer: 'In case of emergency, our drivers are trained to handle various situations and can contact our 24/7 support team immediately. We have established protocols for medical emergencies, vehicle breakdowns, and other urgent situations.'
        }
      ]
    }
  ];

  const popularQuestions = [
    'How much does it cost to book a vehicle?',
    'Can I book a vehicle for the same day?',
    'What types of vehicles do you have?',
    'Do you provide airport transfers?',
    'Can I book multiple vehicles for an event?',
    'What is your cancellation policy?',
    'Do you offer chauffeur services?',
    'How do I track my vehicle?'
  ];

  const handleCategoryChange = (category: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedCategory(isExpanded ? category : false);
  };

  const filteredCategories = faqCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.questions.some(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
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

        {/* Content Skeleton */}
        <Box sx={{ py: 8, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
          <Container maxWidth="lg">
            <Skeleton variant="rectangular" height={56} animation="wave" sx={{ borderRadius: '8px', mb: 4, maxWidth: '600px', mx: 'auto' }} />
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} animation="wave" sx={{ mr: 2 }} />
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
              src={FaqBg.src || FaqBg}
              alt="FAQ Hero Background"
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
                  fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.25rem', lg: '2.75rem' },
                  lineHeight: { xs: 1.2, sm: 1.3, md: 1.3 }
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
                  px: { xs: 2, sm: 0, md: 0 }
                }}
              >
                Find quick answers to the most common questions about our services
              </Typography>
            </SlideUpInView>
            
            {/* Search Bar */}
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
                Still Have Questions?
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography variant="body1" sx={{ mb: 4, color: '#666', maxWidth: '600px', mx: 'auto' }}>
                If you couldn't find the answer you're looking for, our support team is ready to help you with any questions or concerns.
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
                      +966 59 427 9012
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

export default FAQPageClient;
