'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Skeleton,
  Alert,
} from '@mui/material';
import { Email } from '@mui/icons-material';
import Image from 'next/image';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

import { useMediaQuery as useCustomMediaQuery } from '@/hooks/useMediaQuery';
import { useRouter } from 'next/navigation';
import { AuthBg } from '../../../../public/images';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const isMobile = useCustomMediaQuery('(max-width:900px)');

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /* 📧 EMAIL RESET */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!isValidEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent. Please check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <Box sx={{ minHeight: '100vh' }}>
        <Skeleton width="100%" height="100vh" />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* LEFT IMAGE */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: '58%',
          position: 'relative',
        }}
      >
        <Image
          src={AuthBg}
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
          }}
        />
      </Box>

      {/* RIGHT FORM */}
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
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              fontWeight="bold"
              textAlign="center"
              mb={1}
            >
              Forgot Password?
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mb={3}
            >
              No worries, we’ll send you reset instructions.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              {/* Email Label */}
              <Typography
                variant="body2"
                sx={{
                  color: '#333',
                  fontWeight: 'bold',
                  mb: 0.5,
                  fontSize: '0.75rem',
                }}
              >
                Email Address*
              </Typography>

              {/* Email Field */}
              <TextField
                fullWidth
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address here"
                required
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#666' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: '#52A4C1',
                  color: 'white',
                  py: 1,
                  mb: 2,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  '&:hover': {
                    backgroundColor: '#4a94b1',
                  },
                }}
              >
                {loading ? 'Sending…' : 'Send Reset Email'}
              </Button>

              {/* Back to Sign In */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ color: '#666', fontSize: '0.75rem' }}>
                  Remember your password?{' '}
                  <Button
                    onClick={() => router.push('/signin')}
                    sx={{
                      color: '#52A4C1',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      p: 0,
                      minWidth: 'auto',
                      background: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    Sign in
                  </Button>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
