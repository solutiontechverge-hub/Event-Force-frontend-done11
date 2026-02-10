"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Fade,
  Chip,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  CarBmw7Series,
  CarGmc,
  CarMercedesS450,
  CarFordTaurus,
  CarMercedesVClass,
  CarMw5Series,
  CarToyotaCoaster,
} from "../../public/images";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SlideUpInView } from "@/components/animations";
import OptimizedImage from "@/components/OptimizedImage";
import { THEME } from "@/constants/theme";
import { useLanguage } from "@/contexts/LanguageContext";

const FleetSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width:900px)");
  const { t, language } = useLanguage();

  const nonPremiumCars = [
    "Ford Taurus",
    "Coach 49 Seats",
    "Toyota Coaster",
    "Toyota Hiace",
  ];

  const fleet = [
    {
      name: "Ford Taurus",
      price: "125 SAR",
      duration: "Per hour",
      image: CarFordTaurus,
      features: ["Luxury Interior", "GPS Navigation", "Wi-Fi"],
    },
    {
      name: "GMC Yukon",
      price: "150 SAR",
      duration: "Per hour",
      image: CarGmc,
      features: ["Spacious", "Premium Sound", "Climate Control"],
    },
    {
      name: "BMW 5 Series",
      price: "150 SAR",
      duration: "Per hour",
      image: CarMw5Series,
      features: ["Executive Class", "Leather Seats", "Advanced Safety"],
    },
    {
      name: "Mercedes S-Class",
      price: "400 SAR",
      duration: "Per hour",
      image: CarMercedesS450,
      features: ["Ultimate Luxury", "Chauffeur Service", "Premium Amenities"],
    },
    {
      name: "Mercedes V-Class",
      price: "300 SAR",
      duration: "Per hour",
      image: CarMercedesVClass,
      features: ["Executive Comfort", "Advanced Tech", "Quiet Ride"],
    },
    {
      name: "Toyota Coaster",
      price: "150 SAR",
      duration: "Per hour",
      image: CarToyotaCoaster,
      features: ["Off-Road Capable", "Luxury SUV", "All-Weather"],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const max = Math.max(1, fleet.length - 3);
        const delta = language === "ar" ? -1 : 1;
        return (prev + delta + max) % max;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [fleet.length, language]);

  const nextFleet = () =>
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, fleet.length - 3));

  const prevFleet = () =>
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.max(1, fleet.length - 3)) %
        Math.max(1, fleet.length - 3)
    );

  return (
    <Box sx={{ py: 10, px: { lg: 12, md: 6, xs: 2 }, backgroundColor: "grey.50" }}>
      <Fade in={visible} timeout={700}>
        <Box>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <SlideUpInView initialY={60} duration={0.8}>
              <Typography variant={isMobile ? "h4" : "h3"} fontWeight="bold">
                {t("fleet.mostRentedCars")}
              </Typography>
            </SlideUpInView>
          </Box>

          <Box sx={{ position: "relative" }}>
            <IconButton
              onClick={language === "ar" ? nextFleet : prevFleet}
              sx={{ position: "absolute", left: -60, top: "50%", zIndex: 2 }}
            >
              {language === "ar" ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>

            <IconButton
              onClick={language === "ar" ? prevFleet : nextFleet}
              sx={{ position: "absolute", right: -60, top: "50%", zIndex: 2 }}
            >
              {language === "ar" ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>

            <Box sx={{ overflow: "hidden" }}>
              <Box
                sx={{
                  display: "flex",
                  transition: "transform 0.5s ease",
                  transform: `translateX(${
                    language === "ar"
                      ? currentIndex * 25
                      : -currentIndex * 25
                  }%)`,
                }}
              >
                {fleet.map((car, index) => (
                  <Box key={car.name} sx={{ width: "25%", px: 2 }}>
                    {/* Card content unchanged */}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default FleetSection;
