'use client';

import React, { useState } from 'react';
import { usePageMount } from '@/hooks/usePageMount';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
} from '@mui/material';
import { Email } from '@mui/icons-material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useMediaQuery as useCustomMediaQuery } from '@/hooks/useMediaQuery';
import { useRouter } from 'next/navigation';
import AuthPageLayout from '@/components/auth/AuthPageLayout';

const ForgotPasswordClient = () => {
  const router = useRouter();
  const isMobile = useCustomMediaQuery('(max-width:900px)');
  const isMounted = usePageMount();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

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
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to send reset email';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageLayout isMounted={isMounted} variant="flex">
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
            No worries, we'll send you reset instructions.
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
    </AuthPageLayout>
  );
};

export default ForgotPasswordClient;
