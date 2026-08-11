'use client';

import React from 'react';
import { usePageMount } from '@/hooks/usePageMount';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Alert,
  Divider,
} from '@mui/material';
import {
  DataUsage,
  Settings,
  Shield,
  Cookie,
  Visibility,
  Delete,
} from '@mui/icons-material';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScaleInView, SlideUpInView } from '@/components/animations';
import { PageSkeleton } from '@/components/PageSkeleton';
import { PrivacyPolicyBg } from '../../../../public/images';
import {
  PRIVACY_LAST_UPDATED,
  privacyContactEmail,
  privacyContactPhone,
  privacyCookieTypes,
  privacyDataProtection,
  privacyDataTypes,
  privacyDataUsage,
  privacyIntro,
  privacyUserRights,
  type PrivacyUserRight,
} from '@/data/legal/privacy';

const userRightIcons: Record<PrivacyUserRight['icon'], React.ReactElement> = {
  Visibility: <Visibility />,
  Settings: <Settings />,
  Delete: <Delete />,
  DataUsage: <DataUsage />,
};

const PrivacyPolicyClient = () => {
  const isMounted = usePageMount();

  if (!isMounted) {
    return <PageSkeleton heroHeight="50vh" contentType="default" />;
  }

  return (
    <>
      <Header />

      <Box
        sx={{
          pt: 8,
          minHeight: '50vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundImage: `url(${PrivacyPolicyBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box
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
            src={PrivacyPolicyBg}
            alt="Privacy Policy Background"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            priority
          />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
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
                  fontWeight: 'bold',
                  mb: 3,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                }}
              >
                Privacy Policy
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
                }}
              >
                Your privacy is important to us. Learn how we protect your
                personal information.
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <Chip
                label={`Last updated: ${PRIVACY_LAST_UPDATED}`}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <ScaleInView initialScale={0.9} duration={0.8}>
            <Alert severity="info" sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Important Notice
              </Typography>
              <Typography variant="body1">{privacyIntro}</Typography>
            </Alert>
          </ScaleInView>

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
              Information We Collect
            </Typography>
          </SlideUpInView>

          <ScaleInView initialScale={0.9} duration={0.8}>
            <Card sx={{ mb: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <DataUsage sx={{ color: '#4caf50', mr: 2, fontSize: '2rem' }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                    Personal Information
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                  We collect various types of personal information to provide and
                  improve our services:
                </Typography>
                <List>
                  {privacyDataTypes.map((type, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <ListItemText
                        primary={type}
                        sx={{
                          '& .MuiListItemText-primary': {
                            lineHeight: 1.6,
                            color: '#333',
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </ScaleInView>
        </Container>
      </Box>

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
                color: '#333',
              }}
            >
              How We Use Your Information
            </Typography>
          </SlideUpInView>

          <ScaleInView initialScale={0.9} duration={0.8}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Settings sx={{ color: '#1976d2', mr: 2, fontSize: '2rem' }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    Data Usage Purposes
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                  We use your personal information for the following purposes:
                </Typography>
                <List>
                  {privacyDataUsage.map((usage, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <ListItemText
                        primary={usage}
                        sx={{
                          '& .MuiListItemText-primary': {
                            lineHeight: 1.6,
                            color: '#333',
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </ScaleInView>
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
              Data Protection & Security
            </Typography>
          </SlideUpInView>

          <ScaleInView initialScale={0.9} duration={0.8}>
            <Card sx={{ mb: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Shield sx={{ color: '#f57c00', mr: 2, fontSize: '2rem' }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                    Security Measures
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                  We implement comprehensive security measures to protect your
                  personal information:
                </Typography>
                <List>
                  {privacyDataProtection.map((measure, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <ListItemText
                        primary={measure}
                        sx={{
                          '& .MuiListItemText-primary': {
                            lineHeight: 1.6,
                            color: '#333',
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </ScaleInView>
        </Container>
      </Box>

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
                color: '#333',
              }}
            >
              Your Privacy Rights
            </Typography>
          </SlideUpInView>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
            }}
          >
            {privacyUserRights.map((right, index) => (
              <ScaleInView
                key={index}
                initialScale={0.9}
                duration={0.8}
                delay={index * 0.1}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box sx={{ color: '#52A4C1', mb: 2 }}>
                      {userRightIcons[right.icon]}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      {right.title}
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      {right.description}
                    </Typography>
                  </CardContent>
                </Card>
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
              Cookie Policy
            </Typography>
          </SlideUpInView>

          <ScaleInView initialScale={0.9} duration={0.8}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Cookie sx={{ color: '#9c27b0', mr: 2, fontSize: '2rem' }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#9c27b0' }}>
                    Types of Cookies We Use
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                  We use cookies and similar technologies to enhance your
                  experience on our website:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {privacyCookieTypes.map((cookie, index) => (
                    <Box key={index}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', mb: 1, color: '#333' }}
                      >
                        {cookie.type}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                        <strong>Purpose:</strong> {cookie.purpose}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        <strong>Examples:</strong> {cookie.examples}
                      </Typography>
                      {index < privacyCookieTypes.length - 1 && (
                        <Divider sx={{ mt: 2 }} />
                      )}
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </ScaleInView>
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
                Questions About Privacy?
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography
                variant="body1"
                sx={{ mb: 4, color: '#666', maxWidth: '600px', mx: 'auto' }}
              >
                If you have any questions about this Privacy Policy or how we
                handle your personal information, please contact our privacy team.
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1" sx={{ color: '#333', fontWeight: 'bold' }}>
                  Email: {privacyContactEmail}
                </Typography>
                <Typography variant="body1" sx={{ color: '#333', fontWeight: 'bold' }}>
                  Phone: {privacyContactPhone}
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

export default PrivacyPolicyClient;
