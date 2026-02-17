"use client";

import React, { useState, memo, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import Image from "next/image";
import {
  CarBmw7Series,
  CarChinesbus49Sea,
  CarFordTaurus,
  CarGmc,
  CarHiace,
  CarMercedesS450,
  CarMercedesVClass,
  CarMw5Series,
} from "../../public/images";
import { ScaleInView } from "@/components/animations";
import { CarToyotaCoaster } from "../../public/images";

interface Car {
  name: string;
  price: string;
  duration: string;
  image: any;
  class: string;
  year: string;
  branches: string[];
}

const fleet: Car[] = [
  {
    name: "Ford Taurus",
    price: "125 SAR",
    duration: "Per hour",
    image: CarFordTaurus,
    class: "Economy",
    year: "2024",
    branches: ["Riyadh", "Jeddah"],
  },
  {
    name: "GMC Yukon",
    price: "150 SAR",
    duration: "Per hour",
    image: CarGmc,
    class: "SUV",
    year: "2024",
    branches: ["Riyadh", "Jeddah"],
  },

  {
    name: "BMW 5 Series",
    price: "150 SAR",
    duration: "Per hour",
    image: CarMw5Series,
    class: "Luxury",
    year: "2025",
    branches: ["Riyadh", "Jeddah"],
  },
  {
    name: "Mercedes S450",
    price: "400 SAR",
    duration: "Per hour",
    image: CarMercedesS450,
    class: "Luxury",
    year: "2025",
    branches: ["Riyadh", "Jeddah"],
  },
  {
    name: "BMW 7 Series",
    price: "400 SAR",
    duration: "Per hour",
    image: CarBmw7Series,
    class: "Luxury",
    year: "2025",
    branches: ["Riyadh", "Jeddah"],
  },
  {
    name: "Mercedes V Class",
    price: "300 SAR",
    duration: "Per hour",
    image: CarMercedesVClass,
    class: "Van",
    year: "2024",
    branches: ["Riyadh", "Jeddah"],
  },
  {
    name: "Toyota Hiace",
    price: "125 SAR",
    duration: "Per hour",
    image: CarHiace,
    class: "Van",
    year: "2024",
    branches: ["Riyadh", "Jeddah"],
  },
  {
    name: "Toyota Coaster",
    price: "150 SAR",
    duration: "Per hour",
    image: CarToyotaCoaster,
    class: "Bus",
    year: "2024",
    branches: ["Riyadh", "Jeddah"],
  },
  {
    name: "Coach 49 Seats",
    price: "250 SAR",
    duration: "Per hour",
    image: CarChinesbus49Sea,
    class: "Bus",
    year: "2024",
    branches: ["Riyadh", "Jeddah"],
  },
];

const FleetPage = memo(() => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(
    null,
  );

  const filteredFleet = useMemo(() => {
    return fleet.filter((car) => {
      const branchMatch =
        selectedBranch === "all" || car.branches.includes(selectedBranch);

      const classMatch = selectedClass === "all" || car.class === selectedClass;

      return branchMatch && classMatch;
    });
  }, [selectedBranch, selectedClass]);

  const handleBookCar = useCallback(
    (index: number) => {
      const car = filteredFleet[index];
      if (car) {
        // Create URL parameters for the selected car
        const params = new URLSearchParams({
          car: car.name.toLowerCase().replace(/\s+/g, "-"),
          price: car.price,
          duration: car.duration,
        });

        // Redirect to manage booking page with car data
      router.push(`/manage-booking?${params.toString()}`);

      }
    },
    [filteredFleet],
  );

  const handleViewDetails = useCallback(
    (index: number) => {
      const car = filteredFleet[index];
      if (car) {
        const vehicleId = car.name.toLowerCase().replace(/\s+/g, "-");
        router.push(`/our-fleet/${vehicleId}`);
      }
    },
    [filteredFleet, router],
  );

  // const router = useRouter();

  const nonPremiumCars = [
    "Ford Taurus",
    "Coach 49 Seats",
    "Toyota Coaster",
    "Toyota Hiace",
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: "white" }}>
      <Container maxWidth="lg">
        {/* Filters */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Branch</InputLabel>
                <Select
                  value={selectedBranch}
                  label="Branch"
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                >
                  <MenuItem value="all">{t("fleet.selectBranch")}</MenuItem>
                  <MenuItem value="Riyadh">Riyadh</MenuItem>
                  <MenuItem value="Jeddah">Jeddah</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>{t("fleet.fleetClass")}</InputLabel>
                <Select
                  value={selectedClass}
                  label={t("fleet.fleetClass")}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                >
                  <MenuItem value="all">{t("common.all")}</MenuItem>
                  <MenuItem value="Economy">{t("fleet.economy")}</MenuItem>
                  <MenuItem value="SUV">{t("fleet.suv")}</MenuItem>
                  <MenuItem value="Luxury">{t("fleet.luxury")}</MenuItem>
                  <MenuItem value="Van">{t("fleet.van")}</MenuItem>
                  <MenuItem value="Bus">{t("fleet.bus")}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Fleet Grid */}
        <Grid container spacing={3}>
          {filteredFleet.map((car, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={`${car.name}-${car.branches}-${car.year}-${index}`}
            >
              <ScaleInView
                initialScale={0.8}
                duration={0.6}
                delay={index * 0.1}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: "8px",
                    backgroundColor: "#F8F8F8",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Vehicle Title - Top Left */}
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: "bold",
                        color: "#52A4C1",
                        mb: 2,
                        fontSize: "1.1rem",
                        textAlign: "left",
                      }}
                    >
                      {car.name}
                    </Typography>

                    {/* Car Image - Centered */}
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: { xs: 200, sm: 220, md: 240 },
                        mb: 2,
                        backgroundColor: "white",
                        borderRadius: "8px",
                        overflow: "hidden",
                        cursor: "zoom-in",
                      }}
                      onMouseEnter={() => setHoveredImageIndex(index)}
                      onMouseLeave={() => setHoveredImageIndex(null)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transform:
                            hoveredImageIndex === index
                              ? "scale(1.15)"
                              : "scale(1)",
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          willChange: "transform",
                          // Shrink Ford Taurus like BMW
                          ...(car.name
                            .toLowerCase()
                            .includes("ford taurus") && {
                            maxWidth: "85%",
                            maxHeight: "85%",
                            margin: "auto",
                          }),
                        }}
                      >
                        <Image
                          src={car.image.src || car.image}
                          alt={car.name}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </Box>

                      {!nonPremiumCars.includes(car.name) && (
                        <Chip
                          label="Premium"
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            backgroundColor: "rgba(255, 255, 255, 0.98)",
                            color: "#52A4C1",
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            height: "26px",
                            px: 1.8,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                            zIndex: 2,
                            border: "1px solid rgba(82, 164, 193, 0.2)",
                            "& .MuiChip-label": {
                              padding: "0 6px",
                              letterSpacing: "0.5px",
                            },
                          }}
                        />
                      )}
                    </Box>

                    {/* Rent Info - Left Aligned */}
                    <Box sx={{ mb: 2.5, textAlign: "left" }}>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#333",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                        }}
                      >
                        {t("fleet.rent")}: {car.price} / {car.duration}
                      </Typography>
                    </Box>

                    {/* Buttons - View Details and Book Now */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        flexDirection: "column",
                      }}
                    >
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => handleViewDetails(index)}
                        sx={{
                          borderColor: "#52A4C1",
                          color: "#52A4C1",
                          py: 1.2,
                          fontWeight: "bold",
                          textTransform: "none",
                          borderRadius: "8px",
                          fontSize: "0.9rem",
                          "&:hover": {
                            borderColor: "#4a94b1",
                            color: "#4a94b1",
                            backgroundColor: "rgba(82, 164, 193, 0.08)",
                          },
                        }}
                      >
                        {t("fleet.viewDetails")}
                      </Button>
               <Button
  variant="contained"
  fullWidth
  onClick={() => {
    const vehicleId = car.name.toLowerCase().replace(/\s+/g, "-");

    if (!isAuthenticated) {
      router.push(`/signup?redirect=/manage-booking?car=${vehicleId}`);
    } else {
      router.push(`/manage-booking?car=${vehicleId}`);
    }
  }}
>
  {t("fleet.bookNow")}
</Button>
                    </Box>
                  </CardContent>
                </Card>
              </ScaleInView>
            </Grid>
          ))}
        </Grid>

        {filteredFleet.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              {t("fleet.noVehicles")}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
});

FleetPage.displayName = "FleetPage";

export default FleetPage;
