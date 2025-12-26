'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Image from 'next/image';

interface ColorOption {
  id: string;
  name: string;
  color: string; // Hex color or image path
  images?: string[]; // Array of 360 images for this color
}

interface Vehicle360ViewerProps {
  vehicleName: string;
  defaultImage: any;
  colors: ColorOption[];
  isOpen: boolean;
  onClose: () => void;
}

const Vehicle360Viewer: React.FC<Vehicle360ViewerProps> = ({
  vehicleName,
  defaultImage,
  colors,
  isOpen,
  onClose,
}) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lastDragX = useRef(0);

  // Get current color's images or use default
  const currentColorImages = colors[selectedColor]?.images || [];
  const totalImages = currentColorImages.length || 12; // Default to 12 images for 360
  const currentColor = colors[selectedColor] || colors[0];

  // Calculate image index based on cumulative drag distance
  useEffect(() => {
    if (isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const dragDistance = dragOffset;
      const dragPercentage = dragDistance / containerWidth;
      const totalRotation = dragPercentage * totalImages;
      const newIndex = Math.floor(Math.abs(totalRotation) % totalImages);
      setCurrentImageIndex(newIndex);
    }
  }, [dragOffset, isDragging, totalImages]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    lastDragX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - lastDragX.current;
      setDragOffset(prev => prev + deltaX);
      lastDragX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    lastDragX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const deltaX = e.touches[0].clientX - lastDragX.current;
      setDragOffset(prev => prev + deltaX);
      lastDragX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleColorSelect = (index: number) => {
    setSelectedColor(index);
    setCurrentImageIndex(0);
    setDragOffset(0);
  };

  // Get current image to display
  const getCurrentImage = () => {
    if (currentColorImages.length > 0) {
      // If we have multiple images, use the calculated index
      const imageIndex = currentColorImages.length > 1 
        ? currentImageIndex % currentColorImages.length 
        : 0;
      return currentColorImages[imageIndex] || currentColorImages[0];
    }
    // Fallback to default image
    return defaultImage;
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#f5f5f5',
          borderRadius: '16px',
          maxHeight: '90vh',
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ p: 4 }}>
          {/* Title */}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              textAlign: 'center',
              color: '#1a1a1a',
            }}
          >
            {vehicleName}
          </Typography>

          {/* 360 Viewer Container */}
          <Box
            ref={containerRef}
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: '300px', sm: '400px', md: '500px' },
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              mb: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Box
              ref={imageRef}
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                src={getCurrentImage()}
                alt={`${vehicleName} - ${currentColor.name} - View ${currentImageIndex + 1}`}
                fill
                style={{
                  objectFit: 'contain',
                }}
                priority
              />
            </Box>

            {/* Drag Instruction Overlay */}
            {!isDragging && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  px: 2,
                  py: 1,
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  pointerEvents: 'none',
                }}
              >
                Drag to rotate 360°
              </Box>
            )}
          </Box>

          {/* Color Options */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#1a1a1a',
                textAlign: 'center',
              }}
            >
              Select Color
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1.5,
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {colors.map((color, index) => (
                <Box
                  key={color.id}
                  onClick={() => handleColorSelect(index)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '8px',
                      backgroundColor: color.color,
                      border: selectedColor === index ? '3px solid #52A4C1' : '2px solid #E0E0E0',
                      boxShadow: selectedColor === index 
                        ? '0 4px 12px rgba(82, 164, 193, 0.4)' 
                        : '0 2px 4px rgba(0,0,0,0.1)',
                      mb: 0.5,
                      transition: 'all 0.2s',
                    }}
                  />
                  {selectedColor === index && (
                    <Box
                      sx={{
                        width: '100%',
                        height: 2,
                        backgroundColor: '#52A4C1',
                        borderRadius: 1,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Current Color Name */}
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: '#666',
              fontStyle: 'italic',
            }}
          >
            {currentColor.name}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Vehicle360Viewer;

