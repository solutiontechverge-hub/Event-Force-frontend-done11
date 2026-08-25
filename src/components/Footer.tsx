'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Typography,
  Grid,
  Link as MuiLink,
} from '@mui/material';
import {
  WhatsApp,
} from '@mui/icons-material';
import { LogoApplePay, LogoEventForce, LogoMada, LogoMastercard, LogoVisa } from '../../public/images';
import { SlideSidewayInView, SlideUpInView } from '@/components/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { FOOTER_LINKS } from './footer.data';

const PaymentLogoCard = ({ label, src }: { label: string; src: any }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        px: 1.25,
        py: 0.75,
        height: 48,
        width: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Image
        src={src}
        alt={label}
        width={110}
        height={32}
        style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
      />
    </Box>
  );
};

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = 2026; // Static year to prevent hydration mismatch

  const footerLinks = useMemo(() => ({
    navigation: FOOTER_LINKS.navigation.map((l) => ({ name: t(l.labelKey), href: l.href })),
    services: FOOTER_LINKS.services.map((l) => ({ name: t(l.labelKey), href: l.href })),
    support: FOOTER_LINKS.support.map((l) => ({ name: t(l.labelKey), href: l.href })),
  }), [t, language]);

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#000000',
        color: 'white',
        py: 8,
      }}
    >
      <Box sx={{ px: 1.5, maxWidth: { xs: '100%', xl: '1200px' }, mx: 'auto' }}>
        <Grid container spacing={6}>
          {/* Logo and Description */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <SlideUpInView initialY={40} duration={0.7}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Image
                  src={LogoEventForce}
                  alt="Event Force Logo"
                  width={168}
                  height={51}
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'grey.400',
                  lineHeight: 1.6,
                  mb: 3,
                }}
              >
                {t('footer.description')}
              </Typography>

            </SlideUpInView>
          </Grid>

          {/* Navigation Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <SlideSidewayInView initialX={-30} duration={0.8} delay={0.2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                {t('footer.navigation')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {footerLinks.navigation.map((link) => (
                  <MuiLink
                    key={link.name}
                    component={Link}
                    href={link.href}
                    sx={{
                      color: 'grey.400',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'white',
                      },
                      transition: 'color 0.3s',
                    }}
                  >
                    {link.name}
                  </MuiLink>
                ))}
              </Box>
            </SlideSidewayInView>
          </Grid>

          {/* Services */}
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <SlideSidewayInView initialX={-30} duration={0.8} delay={0.4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                {t('footer.services')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {footerLinks.services.map((link) => (
                  <MuiLink
                    key={link.name}
                    href={link.href}
                    sx={{
                      color: 'grey.400',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'white',
                      },
                      transition: 'color 0.3s',
                    }}
                  >
                    {link.name}
                  </MuiLink>
                ))}
              </Box>
            </SlideSidewayInView>
          </Grid>

          {/* Support */}
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <SlideSidewayInView initialX={-30} duration={0.8} delay={0.6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                {t('footer.support')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {footerLinks.support.map((link) => (
                  <MuiLink
                    key={link.name}
                    component={Link}
                    href={link.href}
                    sx={{
                      color: 'grey.400',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'white',
                      },
                      transition: 'color 0.3s',
                    }}
                  >
                    {link.name}
                  </MuiLink>
                ))}
              </Box>
            </SlideSidewayInView>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <SlideUpInView initialY={30} duration={0.7} delay={0.8}>
          <Box
            sx={{
              borderTop: '1px solid',
              borderColor: 'grey.800',
              mt: 6,
              pt: 4,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: { xs: 'center', md: 'flex-start' },
                alignItems: 'center',
              }}
            >
              <PaymentLogoCard label="Mada" src={LogoMada} />
              <PaymentLogoCard label="Apple Pay" src={LogoApplePay} />
              <PaymentLogoCard label="Mastercard" src={LogoMastercard} />
              <PaymentLogoCard label="Visa" src={LogoVisa} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: 3,
                color: 'grey.400',
                fontSize: '0.875rem',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MuiLink
                  href="https://wa.me/966125786869"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'grey.400',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    '&:hover': {
                      color: '#25D366',
                    },
                    transition: 'color 0.3s',
                  }}
                >
                  <WhatsApp sx={{ fontSize: '1rem' }} />
                  <Typography variant="body2">Event Force Tel: +966594279012</Typography>
                </MuiLink>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">+966125786869 </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">Reservations@eventforce.sa.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">{t('footer.location')}</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'grey.400' }}>
              © {currentYear} Event Force. {t('footer.copyright')}
            </Typography>
          </Box>
        </SlideUpInView>
      </Box>
    </Box>
  );
};

export default Footer;