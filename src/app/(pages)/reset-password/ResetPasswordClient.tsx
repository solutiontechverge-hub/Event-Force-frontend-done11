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
} from '@mui/material';
import { useMediaQuery as useCustomMediaQuery } from '@/hooks/useMediaQuery';
import AuthPageLayout from '@/components/auth/AuthPageLayout';

const ResetPasswordClient = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const isMounted = usePageMount();
  const isMobile = useCustomMediaQuery('(max-width:900px)');

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    otp.join('');
  };

  const handleResend = () => {
    // Handle resend OTP logic here
  };

  return (
    <AuthPageLayout isMounted={isMounted} showHeader imageBreakpoint="md">
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
              Enter the 4 digit verification code that was sent to your email to
              change your password
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 1.5, sm: 2 },
                justifyContent: 'center',
                mb: 3,
                flexWrap: 'wrap',
              }}
            >
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
    </AuthPageLayout>
  );
};

export default ResetPasswordClient;
