'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Skeleton,
} from '@mui/material';
import Image from 'next/image';
import { AuthBg } from '../../../../public/images';
import { useMediaQuery as useCustomMediaQuery } from '@/hooks/useMediaQuery';

const ResetPasswordPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useCustomMediaQuery('(max-width:900px)');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    // Handle OTP verification logic here
  };

  const handleResend = () => {
    // Handle resend OTP logic here
  };

  if (!isMounted) {
    return (
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
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
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

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', pt: { xs: 8, md: 10 } }}>
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
                background: 'linear-gradient(45deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))',
              }}
            />
          </Grid>

          {/* Right Side - Reset Password Form */}
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
            <Card
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: 400 },
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                borderRadius: 3,
                mx: { xs: 1, sm: 0 },
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
                  <Typography
                    variant={isMobile ? 'h5' : 'h4'}
                    sx={{
                      fontWeight: 'bold',
                      color: '#333',
                      mb: 1,
                    }}
                  >
                    Reset Password
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#666',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    }}
                  >
                    Enter the 4 digit verification code that was sent to your email to change your password
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                  {/* OTP Input Fields */}
                  <Box sx={{ 
                    display: 'flex', 
                    gap: { xs: 1.5, sm: 2 }, 
                    justifyContent: 'center', 
                    mb: 3,
                    flexWrap: 'wrap'
                  }}>
                    {otp.map((digit, index) => (
                      <TextField
                        key={index}
                        id={`otp-${index}`}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        inputProps={{
                          maxLength: 1,
                          style: {
                            textAlign: 'center',
                            fontSize: isMobile ? '1.2rem' : '1.5rem',
                            fontWeight: 'bold',
                          },
                        }}
                        sx={{
                          width: { xs: 50, sm: 60 },
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: '#ddd',
                            },
                            '&:hover fieldset': {
                              borderColor: '#1976d2',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1976d2',
                              borderWidth: 2,
                            },
                          },
                        }}
                      />
                    ))}
                  </Box>

                  {/* Verify OTP Button */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: '#1976d2',
                      color: 'white',
                      py: 1.5,
                      mb: 3,
                      borderRadius: '25px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      '&:hover': {
                        backgroundColor: '#1565c0',
                      },
                    }}
                  >
                    Verify OTP
                  </Button>

                  {/* Resend Link */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
                      Didn't receive a code?{' '}
                      <Button
                        onClick={handleResend}
                        sx={{
                          color: '#1976d2',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                          textTransform: 'none',
                          p: 0,
                          minWidth: 'auto',
                          '&:hover': {
                            textDecoration: 'underline',
                            backgroundColor: 'transparent',
                          },
                        }}
                      >
                        Resend
                      </Button>
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
