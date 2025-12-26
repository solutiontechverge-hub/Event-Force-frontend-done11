'use client';

import React from 'react';
import { Box, Container, Skeleton, Card, CardContent, Grid } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

interface PageSkeletonProps {
  heroHeight?: string;
  showHero?: boolean;
  showContent?: boolean;
  contentType?: 'default' | 'fleet' | 'contact' | 'about';
}

export const PageSkeleton: React.FC<PageSkeletonProps> = ({
  heroHeight = '35vh',
  showHero = true,
  showContent = true,
  contentType = 'default',
}) => {
  return (
    <>
      <Header />
      
      {/* Hero Section Skeleton */}
      {showHero && (
        <Box 
          sx={{ 
            pt: 8,
            height: heroHeight,
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
      )}

      {/* Content Skeleton */}
      {showContent && (
        <Box sx={{ py: 8, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
          <Container maxWidth="lg">
            {contentType === 'fleet' && (
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item}>
                    <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Skeleton variant="text" width="60%" height={30} animation="wave" sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" height={240} animation="wave" sx={{ borderRadius: '8px', mb: 2 }} />
                        <Skeleton variant="text" width="50%" height={20} animation="wave" sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" height={40} animation="wave" sx={{ borderRadius: '8px', mb: 1 }} />
                        <Skeleton variant="rectangular" height={40} animation="wave" sx={{ borderRadius: '8px' }} />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {contentType === 'contact' && (
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Skeleton variant="text" width="40%" height={40} animation="wave" sx={{ mb: 3 }} />
                      <Skeleton variant="text" width="30%" height={20} animation="wave" sx={{ mb: 1 }} />
                      <Skeleton variant="rectangular" height={40} animation="wave" sx={{ borderRadius: '8px', mb: 3 }} />
                      <Skeleton variant="text" width="30%" height={20} animation="wave" sx={{ mb: 1 }} />
                      <Skeleton variant="rectangular" height={40} animation="wave" sx={{ borderRadius: '8px', mb: 3 }} />
                      <Skeleton variant="text" width="30%" height={20} animation="wave" sx={{ mb: 1 }} />
                      <Skeleton variant="rectangular" height={120} animation="wave" sx={{ borderRadius: '8px', mb: 3 }} />
                      <Skeleton variant="rectangular" height={48} animation="wave" sx={{ borderRadius: '8px' }} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Skeleton variant="text" width="50%" height={40} animation="wave" sx={{ mb: 3 }} />
                      <Skeleton variant="rectangular" height={200} animation="wave" sx={{ borderRadius: '8px', mb: 2 }} />
                      <Skeleton variant="text" width="60%" height={20} animation="wave" sx={{ mb: 1 }} />
                      <Skeleton variant="text" width="70%" height={20} animation="wave" />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {contentType === 'about' && (
              <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Skeleton variant="text" width="60%" height={50} animation="wave" sx={{ mb: 2 }} />
                  <Skeleton variant="text" width="100%" height={20} animation="wave" sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="90%" height={20} animation="wave" sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="95%" height={20} animation="wave" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Skeleton variant="rectangular" height={300} animation="wave" sx={{ borderRadius: '8px' }} />
                </Grid>
              </Grid>
            )}

            {contentType === 'default' && (
              <Box>
                <Skeleton variant="text" width="50%" height={60} animation="wave" sx={{ mx: 'auto', mb: 4, textAlign: 'center' }} />
                <Grid container spacing={4}>
                  {[1, 2, 3].map((item) => (
                    <Grid size={{ xs: 12, md: 4 }} key={item}>
                      <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                        <CardContent sx={{ p: 3 }}>
                          <Skeleton variant="rectangular" height={200} animation="wave" sx={{ borderRadius: '8px', mb: 2 }} />
                          <Skeleton variant="text" width="80%" height={30} animation="wave" sx={{ mb: 1 }} />
                          <Skeleton variant="text" width="100%" height={20} animation="wave" />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Container>
        </Box>
      )}
      
      <Footer />
    </>
  );
};

export default PageSkeleton;

