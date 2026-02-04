'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    setLanguage(lang);
    handleClose();
  };

  const languages = [
    { code: 'en' as const, name: 'English', nativeName: 'English' },
    { code: 'ar' as const, name: 'Arabic', nativeName: 'العربية' },
  ];

  return (
    <Box>
      <Button
        onClick={handleClick}
        sx={{
          color: 'inherit',
          minWidth: 'auto',
          px: 1.5,
          py: 0.5,
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <LanguageIcon sx={{ fontSize: '1.2rem' }} />
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
          {languages.find(l => l.code === language)?.nativeName || 'EN'}
        </Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 150,
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={language === lang.code}
            sx={{
              color: language === lang.code ? '#52A4C1' : '#ffffff',
              backgroundColor: language === lang.code ? 'rgba(82, 164, 193, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(82, 164, 193, 0.15)',
              },
              '&.Mui-selected': {
                backgroundColor: 'rgba(82, 164, 193, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(82, 164, 193, 0.15)',
                },
              },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {lang.nativeName}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                {lang.name}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSelector;

