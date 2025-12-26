'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Fade,
  Chip,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  CarBmw7Series,
  CarGmc,
  CarMercedesS450,
  CarFordTaurus,
  CarMercedesVClass,
  CarToyotaCoaster,
} from '@/assets/images';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ScaleInView, SlideSidewayInView, SlideUpInView } from '@/components/animations';
import OptimizedImage from '@/components/OptimizedImage';
import { THEME, IMAGE_CONFIG } from '@/constants/theme';

const FleetSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery('(max-width:900px)');

  const fleet = [
    {
      name: 'Ford Taurus',
      price: '125 SAR',
      duration: 'Per hour',
      image: CarFordTaurus,
      features: ['Luxury Interior', 'GPS Navigation', 'Wi-Fi']
    },
    {
      name: 'GMC Yukon',
      price: '150 SAR',
      duration: 'Per hour',
      image: CarGmc,
      features: ['Spacious', 'Premium Sound', 'Climate Control']
    },
    {
      name: 'BMW 5 Series',
      price: '150 SAR',
      duration: 'Per day',
      image: CarBmw7Series,
      features: ['Executive Class', 'Leather Seats', 'Advanced Safety']
    },
    {
      name: 'Mercedes S-Class',
      price: '400 SAR',
      duration: 'Per day',
      image: CarMercedesS450,
      features: ['Ultimate Luxury', 'Chauffeur Service', 'Premium Amenities']
    },
    {
      name: 'Mercedes V-Class',
      price: '200 SAR',
      duration: 'Per day',
      image: CarMercedesVClass,
      features: ['Executive Comfort', 'Advanced Tech', 'Quiet Ride']
    },
    {
      name: 'Toyota Coaster',
      price: '180 SAR',
      duration: 'Per day',
      image: CarToyotaCoaster,
      features: ['Off-Road Capable', 'Luxury SUV', 'All-Weather']
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, fleet.length - 3));
    }, 5000);
    return () => clearInterval(interval);
  }, [fleet.length]);

  const nextFleet = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, fleet.length - 3));
  };

  const prevFleet = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, fleet.length - 3)) % Math.max(1, fleet.length - 3));
  };

  const handleMouseLeave = () => {
    setHoveredImageIndex(null);
  };


  return (
    <Box sx={{ py: 10, px: { lg: 12, md: 6, xs: 2 }, backgroundColor: 'grey.50' }}>
   
        <Fade in={visible} timeout={700}>
          <Box>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <SlideUpInView initialY={60} duration={0.8}>
                <Typography
                  variant={isMobile ? 'h4' : 'h3'}
                  component="h2"
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '36px',
                    color: '#525252',
                    mb: 2,
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60px',
                      height: '4px',
                      backgroundColor: '#52A4C1',
                      borderRadius: '2px',
                    },
                  }}
                >
                  Most Rented Cars
                </Typography>
              </SlideUpInView>
            </Box>

            <Box sx={{ position: 'relative' }}>
              {/* Navigation Arrows */}
              <IconButton
                onClick={prevFleet}
                sx={{
                  position: 'absolute',
                  left: -60,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  boxShadow: 4,
                  '&:hover': {
                    backgroundColor: 'grey.100',
                    transform: 'translateY(-50%) scale(1.1)',
                  },
                  zIndex: 2,
                  display: { xs: 'none', lg: 'flex' },
                }}
              >
                <ChevronLeft />
              </IconButton>

              <IconButton
                onClick={nextFleet}
                sx={{
                  position: 'absolute',
                  right: -60,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  boxShadow: 4,
                  '&:hover': {
                    backgroundColor: 'grey.100',
                    transform: 'translateY(-50%) scale(1.1)',
                  },
                  zIndex: 2,
                  display: { xs: 'none', lg: 'flex' },
                }}
              >
                <ChevronRight />
              </IconButton>

              {/* Fleet Cards Carousel */}
              <Box sx={{ overflow: 'hidden', pb: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    transition: 'transform 0.5s ease-in-out',
                    transform: isMobile 
                      ? `translateX(-${currentIndex * 100}%)` 
                      : `translateX(-${currentIndex * 25}%)`, // 25% for 4 cards on lg
                  }}
                >
                  {fleet.map((car, index) => (
                    <Box 
                      key={index} 
                      sx={{ 
                        width: { xs: '100%', sm: '50%', md: '33.333%', lg: '25%' },
                        px: { xs: 1, sm: 2 }, 
                        py: 2,
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Card
                        sx={{
                          height: { xs: 480, sm: 540, md: 600 },
                          display: 'flex',
                          flexDirection: 'column',
                          backgroundColor: 'transparent',
                          boxShadow: 'none',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          transition: 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out',
                          '&:hover': {
                            transform: isMobile ? 'none' : 'scale(1.03)',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                          },
                        }}
                      >
                        <CardMedia
                          sx={{
                            height: { xs: 320, sm: 360, md: 400 },
                            position: 'relative',
                            backgroundColor: 'transparent',
                            overflow: 'hidden',
                            cursor: isMobile ? 'default' : 'zoom-in',
                            flex: 1,
                          }}
                          onMouseEnter={() => !isMobile && setHoveredImageIndex(index)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <Box
                            className="car-image-container"
                            data-image-index={index}
                            sx={{
                              position: 'relative',
                              width: '100%',
                              height: '100%',
                              overflow: 'hidden',
                            }}
                          >
                            <Box
                              sx={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                transform: hoveredImageIndex === index && !isMobile
                                  ? 'scale(1.15)'
                                  : 'scale(1)',
                                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                willChange: 'transform',
                              }}
                            >
                              <OptimizedImage
                                src={car.image.src || car.image}
                                alt={car.name}
                                fill
                                objectFit="cover"
                                objectPosition="center"
                                loading="lazy"
                                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
                                style={{
                                  pointerEvents: 'none',
                                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                              />
                            </Box>
                            <Chip
                              label="Premium"
                              size="small"
                              sx={{
                                position: 'absolute',
                                top: { xs: 14, md: 16 },
                                right: { xs: 14, md: 16 },
                                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                color: '#52A4C1',
                                fontWeight: 700,
                                fontSize: { xs: '0.7rem', md: '0.75rem' },
                                height: { xs: '26px', md: '28px' },
                                px: { xs: 1.8, md: 2 },
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                zIndex: 10,
                                border: '1px solid rgba(82, 164, 193, 0.2)',
                                '& .MuiChip-label': {
                                  padding: { xs: '0 6px', md: '0 8px' },
                                  letterSpacing: '0.5px',
                                },
                              }}
                            />
                          </Box>
                        </CardMedia>

                        <CardContent sx={{ 
                          p: { xs: 2, sm: 3 },
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 1,
                          justifyContent: 'space-between',
                          backgroundColor: 'white',
                        }}>
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                              fontFamily: 'Poppins, sans-serif',
                              fontWeight: 'bold',
                              color: THEME.colors.primary,
                              mb: 2,
                              fontSize: { xs: '1.1rem', sm: '1.25rem' },
                            }}
                          >
                            {car.name}
                          </Typography>

                          <Box sx={{ mb: 3 }}>
                            <Typography
                              variant="body1"
                              sx={{
                                fontFamily: 'Poppins, sans-serif',
                                color: '#525252',
                                fontWeight: 400,
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                lineHeight: 1.4,
                              }}
                            >
                              Rent: {car.price} / {car.duration}
                            </Typography>
                          </Box>

                          {/* Features */}
                          <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {car.features.map((feature, featureIndex) => (
                                <Chip
                                  key={featureIndex}
                                  label={feature}
                                  size="small"
                                  sx={{
                                    backgroundColor: 'primary.50',
                                    color: 'primary.main',
                                    fontSize: '0.75rem',
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>

                          {/* Book Now Button */}
                          <Button
                            component={Link}
                            href="/manage-booking"
                            variant="contained"
                            fullWidth
                            sx={{
                              backgroundColor: THEME.colors.primary,
                              borderRadius: 2,
                              py: 1.5,
                              fontWeight: 'bold',
                              textTransform: 'none',
                              '&:hover': {
                                backgroundColor: THEME.colors.primaryDark,
                              },
                            }}
                          >
                            Book Now
                          </Button>
                        </CardContent>
                      </Card>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Dots Indicator */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
                {Array.from({ length: Math.max(1, fleet.length - 3) }).map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: index === currentIndex ? '#52A4C1' : 'grey.300',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        backgroundColor: index === currentIndex ? '#4A8FA8' : 'grey.400',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Fade>
    </Box>
  );
};

export default FleetSection;