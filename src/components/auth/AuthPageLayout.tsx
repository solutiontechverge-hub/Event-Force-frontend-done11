'use client';

import React from 'react';
import {
  Box,
  Grid,
  Skeleton,
  Card,
  CardContent,
  Container,
  Typography,
  Button,
} from '@mui/material';
import Image from 'next/image';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AuthBg } from '../../../public/images';

type ImageBreakpoint = 'md' | 'lg';
type AuthLayoutVariant = 'grid' | 'flex';

interface AuthPageLayoutProps {
  children: React.ReactNode;
  isMounted: boolean;
  skeleton?: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  imageBreakpoint?: ImageBreakpoint;
  imageSrc?: string | typeof AuthBg;
  imageAlt?: string;
  variant?: AuthLayoutVariant;
  showHeader?: boolean;
}

const defaultGridSkeleton = (imageBreakpoint: ImageBreakpoint) => (
  <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Grid container sx={{ minHeight: { xs: 'auto', md: '100vh' } }}>
      <Grid
        size={{
          xs: 0,
          ...(imageBreakpoint === 'md' ? { md: 7 } : { lg: 7 }),
        }}
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
      </Grid>
      <Grid
        size={{
          xs: 12,
          ...(imageBreakpoint === 'md' ? { md: 5 } : { lg: 5 }),
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: '#f8f9fa',
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 500, borderRadius: '12px' }}>
          <CardContent sx={{ p: 4 }}>
            <Skeleton variant="text" width="40%" height={40} animation="wave" sx={{ mb: 3, mx: 'auto' }} />
            <Skeleton variant="text" width="30%" height={20} animation="wave" sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={40} animation="wave" sx={{ borderRadius: '8px', mb: 3 }} />
            <Skeleton variant="text" width="30%" height={20} animation="wave" sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={40} animation="wave" sx={{ borderRadius: '8px', mb: 3 }} />
            <Skeleton variant="rectangular" height={48} animation="wave" sx={{ borderRadius: '8px', mb: 2 }} />
            <Skeleton variant="text" width="50%" height={20} animation="wave" sx={{ mx: 'auto' }} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

const flexSkeleton = (
  <Box sx={{ minHeight: '100vh' }}>
    <Skeleton width="100%" height="100vh" animation="wave" />
  </Box>
);

const resetPasswordSkeleton = (
  <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, backgroundColor: '#000000', py: 2 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton variant="text" width={150} height={40} animation="wave" />
          <Skeleton variant="rectangular" width={120} height={40} animation="wave" sx={{ borderRadius: '25px' }} />
        </Box>
      </Container>
    </Box>
    <Box sx={{ flex: 1, display: 'flex', pt: { xs: 8, md: 10 } }}>
      <Grid container sx={{ minHeight: { xs: 'auto', md: '100vh' } }}>
        <Grid size={{ xs: 0, md: 7 }} sx={{ display: { xs: 'none', md: 'flex' }, position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
          <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, sm: 3, md: 4 }, backgroundColor: '#f8f9fa' }}>
          <Card sx={{ width: '100%', maxWidth: 400, borderRadius: '12px' }}>
            <CardContent sx={{ p: 4 }}>
              <Skeleton variant="text" width="60%" height={40} animation="wave" sx={{ mb: 2, mx: 'auto' }} />
              <Skeleton variant="text" width="90%" height={40} animation="wave" sx={{ mb: 3, mx: 'auto' }} />
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} variant="rectangular" width={60} height={60} animation="wave" sx={{ borderRadius: '8px' }} />
                ))}
              </Box>
              <Skeleton variant="rectangular" height={48} animation="wave" sx={{ borderRadius: '25px', mb: 2 }} />
              <Skeleton variant="text" width="70%" height={20} animation="wave" sx={{ mx: 'auto' }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </Box>
);

function AuthHeader() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#000000',
        py: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
            Event Force
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              px: 3,
              py: 1,
              borderRadius: '25px',
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            Login/Register
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default function AuthPageLayout({
  children,
  isMounted,
  skeleton,
  requireAuth = false,
  redirectTo = '/home',
  imageBreakpoint = 'lg',
  imageSrc = AuthBg,
  imageAlt = 'Luxury Cars Background',
  variant = 'grid',
  showHeader = false,
}: AuthPageLayoutProps) {
  const imageColumnSize =
    imageBreakpoint === 'md' ? { xs: 0, md: 7 } : { xs: 0, lg: 7 };
  const formColumnSize =
    imageBreakpoint === 'md' ? { xs: 12, md: 5 } : { xs: 12, lg: 5 };

  const defaultSkeleton =
    variant === 'flex'
      ? flexSkeleton
      : showHeader
        ? resetPasswordSkeleton
        : defaultGridSkeleton(imageBreakpoint);

  const renderImageSide = () => (
    <>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        priority
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.43)',
        }}
      />
    </>
  );

  const renderContent = () => {
    if (!isMounted) {
      return skeleton ?? defaultSkeleton;
    }

    if (variant === 'flex') {
      return (
        <Box sx={{ minHeight: '100vh', display: 'flex' }}>
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              width: '58%',
              position: 'relative',
            }}
          >
            {renderImageSide()}
          </Box>
          <Box
            sx={{
              width: { xs: '100%', lg: '42%' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f8f9fa',
              p: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {children}
          </Box>
        </Box>
      );
    }

    const gridContent = (
      <Grid container sx={{ minHeight: { xs: 'auto', md: '100vh' } }}>
        <Grid
          size={imageColumnSize}
          sx={{
            display: { xs: 'none', md: 'flex' },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {renderImageSide()}
        </Grid>
        <Grid
          size={formColumnSize}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2, sm: 3, md: 4 },
            backgroundColor: '#f8f9fa',
            minHeight: { xs: '100vh', md: 'auto' },
          }}
        >
          {children}
        </Grid>
      </Grid>
    );

    if (showHeader) {
      return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <AuthHeader />
          <Box sx={{ flex: 1, display: 'flex', pt: { xs: 8, md: 10 } }}>
            {gridContent}
          </Box>
        </Box>
      );
    }

    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {gridContent}
      </Box>
    );
  };

  const content = renderContent();

  if (requireAuth === false) {
    return (
      <ProtectedRoute requireAuth={false} redirectTo={redirectTo}>
        {content}
      </ProtectedRoute>
    );
  }

  return content;
}
