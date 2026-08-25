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
import { getVehicleSlug } from "@/data/fleet";
import { getFleetImageSrc } from "@/lib/fleetImageUtils";
import { usePricing } from "@/contexts/PricingContext";

const PRIMARY = "#52A4C1";

const FleetPage = memo(() => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { fleetVehicles } = usePricing();

  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");

  const nonPremiumCars = [
    "Ford Taurus",
    "Coach 49 Seats",
    "Toyota Coaster",
    "Toyota Hiace",
  ];

  const filteredFleet = useMemo(() => {
    return fleetVehicles.filter((car) => {
      const branchMatch =
        selectedBranch === "all" || car.branches.includes(selectedBranch);

      const classMatch = selectedClass === "all" || car.class === selectedClass;

      return branchMatch && classMatch;
    });
  }, [selectedBranch, selectedClass, fleetVehicles]);

  const handleBookCar = useCallback(
    (index: number) => {
      const car = filteredFleet[index];

      const vehicleId = getVehicleSlug(car.name);

      const bookingUrl = `/manage-booking?car=${vehicleId}&from=fleet`;

      if (!isAuthenticated) {
        router.push(`/signup?redirect=${encodeURIComponent(bookingUrl)}`);
      } else {
        router.push(bookingUrl);
      }
    },
    [filteredFleet, isAuthenticated, router],
  );

  const handleViewDetails = useCallback(
    (index: number) => {
      const car = filteredFleet[index];
      const vehicleId = getVehicleSlug(car.name);

      router.push(`/our-fleet/${vehicleId}`);
    },
    [filteredFleet, router],
  );

  return (
    <Box
      sx={{
        py: { xs: 5, md: 8 },
        background: "linear-gradient(180deg,#f6fbfd 0%,#ffffff 100%)",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl">
        {/* HEADER */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight={700} mb={1}>
            Premium Fleet Collection
          </Typography>

          <Typography color="text.secondary">
            Select your ideal vehicle
          </Typography>
        </Box>

        {/* FILTERS */}
        <Grid container spacing={3} mb={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Branch</InputLabel>

              <Select
                value={selectedBranch}
                label="Branch"
                onChange={(e) => setSelectedBranch(e.target.value)}
                MenuProps={{
                  disableScrollLock: true,

                  disablePortal: true, // ⭐ THIS FIXES THE GREY SCREEN

                  PaperProps: {
                    sx: {
                      borderRadius: 2,
                      mt: 1,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    },
                  },
                }}
              >
                <MenuItem value="all">{t("fleet.selectBranch")}</MenuItem>

                <MenuItem value="Riyadh">Riyadh</MenuItem>

                <MenuItem value="Jeddah">Jeddah</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>{t("fleet.fleetClass")}</InputLabel>

              <Select
                value={selectedClass}
                label="Fleet Class"
                onChange={(e) => setSelectedClass(e.target.value)}
                MenuProps={{
                  disableScrollLock: true,
                  disablePortal: true,
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="Economy">Economy</MenuItem>
                <MenuItem value="SUV">SUV</MenuItem>
                <MenuItem value="Luxury">Luxury</MenuItem>
                <MenuItem value="Van">Van</MenuItem>
                <MenuItem value="Bus">Bus</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* GRID */}
        <Grid container spacing={4}>
          {filteredFleet.map((car, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={car.name}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,

                  border: "1px solid rgba(82,164,193,0.2)",

                  background: "linear-gradient(180deg,#fff,#f9fcff)",

                  transition: "0.35s",

                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent>
                  {/* TITLE */}
                  <Typography fontWeight={700} color={PRIMARY} mb={2}>
                    {car.name}
                  </Typography>

                  {/* IMAGE */}
                  <Box
                    sx={{
                      position: "relative",
                      height: 220,
                      mb: 2,
                    }}
                  >
                    <Image
                      src={getFleetImageSrc(car.image)}
                      alt={car.name}
                      fill
                      style={{
                        objectFit: "contain",
                      }}
                    />

                    {!nonPremiumCars.includes(car.name) && (
                      <Chip
                        label="Premium"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,

                          background: "linear-gradient(135deg,#52A4C1,#3c8ca8)",

                          color: "#fff",

                          fontWeight: 700,

                          fontSize: "0.7rem",

                          height: 26,

                          boxShadow: "0 4px 15px rgba(82,164,193,0.4)",
                        }}
                      />
                    )}
                  </Box>

                  {/* PRICE */}
                  <Typography mb={2}>
                    {car.listPrice} / {car.listDuration}
                  </Typography>

                  {/* BUTTONS */}
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Button
                      variant="outlined"
                      onClick={() => handleViewDetails(index)}
                      sx={{
                        borderColor: PRIMARY,
                        color: PRIMARY,
                      }}
                    >
                      View Details
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => handleBookCar(index)}
                      sx={{
                        background: "linear-gradient(135deg,#52A4C1,#3c8ca8)",
                      }}
                    >
                      Book Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
});

FleetPage.displayName = "FleetPage";

export default FleetPage;
