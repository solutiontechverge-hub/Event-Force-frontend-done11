'use client';

import { useState, useEffect } from 'react';
import { Box, Grid, Skeleton, Card, CardContent } from '@mui/material';
import Image from 'next/image';
import AuthForm from '@/components/AuthForm';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AuthBg } from '@/assets/images';

const SignUpPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSocialLogin = (provider: string) => {
    console.log(`Sign up with ${provider}`);
    // Handle social login logic here
  };

  if (!isMounted) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Grid container sx={{ minHeight: { xs: 'auto', md: '100vh' } }}>
          <Grid size={{ xs: 0, md: 7 }} sx={{ display: { xs: 'none', md: 'flex' }, position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
            <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, sm: 3, md: 4 }, backgroundColor: '#f8f9fa' }}>
            <Card sx={{ width: '100%', maxWidth: 500, borderRadius: '12px' }}>
              <CardContent sx={{ p: 4 }}>
                <Skeleton variant="text" width="40%" height={40} animation="wave" sx={{ mb: 3, mx: 'auto' }} />
                <Skeleton variant="text" width="30%" height={20} animation="wave" sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" height={40} animation="wave" sx={{ borderRadius: '8px', mb: 3 }} />
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
  }

  return (
    <ProtectedRoute requireAuth={false} redirectTo="/home">
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Main Content */}
       
          <Grid container sx={{ minHeight: { xs: 'auto', md: '100vh' } }}>
            {/* Left Side - Background Image */}
            <Grid
              size={{ xs: 0, md: 7 }}
              sx={{
                display: { xs: 'none', md: 'flex' },
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Image
                src={AuthBg}
                alt="Luxury Cars Background"
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
            </Grid>

            {/* Right Side - Sign Up Form */}
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 2, sm: 3, md: 4 },
                backgroundColor: '#f8f9fa',
                minHeight: { xs: '100vh', md: 'auto' },
              }}
            >
              <AuthForm 
                mode="signup" 
                onSocialLogin={handleSocialLogin}
              />
            </Grid>
          </Grid>
        </Box>
    </ProtectedRoute>
  );
};

export default SignUpPage;