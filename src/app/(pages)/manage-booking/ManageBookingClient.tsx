"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import "react-phone-number-input/style.css";
import { CalendarToday, ArrowDropDown, ArrowBack } from "@mui/icons-material";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SlideUpInView } from "@/components/animations";
import { sendBookingEmail } from "@/services/emailService";
import { usePageMount } from "@/hooks/usePageMount";
import { useLanguage } from "@/contexts/LanguageContext";
import "react-phone-number-input/style.css";
import { useAuth } from "@/contexts/AuthContext";
import PickupDestinationSingleFlow from "./PickupDropoffMap";
import { getVehicleSlug, toBookingFleetFromResolved } from "@/data/fleet";
import { getFleetImageSrc } from "@/lib/fleetImageUtils";
import { usePricing } from "@/contexts/PricingContext";
import { ManageBookingBg } from "../../../../public/images";

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string; // ✅ single international phone
  selectedCar: string;
  //  car_name?: string;
  serviceType: string;
  pickupLocation: string;
  destination: string;
  tripType: string;
  photo: File | null;
  pickupDate: string;
  returnDate: string;
}

const ManageBookingClient = () => {
  const { user, updateUser } = useAuth();
  const { fleetVehicles, getVehicleBySlug, getBookingPrice } = usePricing();
  const fleet = useMemo(
    () => toBookingFleetFromResolved(fleetVehicles),
    [fleetVehicles],
  );
  const [selectedRouteKey, setSelectedRouteKey] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const isMounted = usePageMount();
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [hoveredCarImage, setHoveredCarImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const getMinDateTime = () => {
    const now = new Date();

    // ⏱ force 2 hours ahead
    now.setHours(now.getHours() + 2);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    selectedCar: "",
    pickupLocation: "",
    destination: "",
    photo: null as File | null,
    pickupDate: "",
    returnDate: "",
  });

  useEffect(() => {
    if (!formData.pickupDate) {
      setFormData((prev) => ({
        ...prev,
        pickupDate: getMinDateTime(),
      }));
    }
  }, []);

  // Get car from URL params
  const carParam = searchParams?.get("car") || "";

  useEffect(() => {
    if (!carParam) return;

    const foundVehicle = getVehicleBySlug(carParam);

    if (foundVehicle) {
      setFormData((prev) => ({
        ...prev,
        selectedCar: foundVehicle.name,
      }));
    }
  }, [carParam, getVehicleBySlug]);
  const colorIdParam = searchParams?.get("colorId") || "";
  const colorIndexParam = searchParams?.get("colorIndex") || "";

  // Function to get color image based on car name and color ID

  // Function to get all color options for a car

  // Find the selected car
  const selectedCar = useMemo(() => {
    if (!carParam) return null;

    const foundVehicle = getVehicleBySlug(carParam);
    if (!foundVehicle) return null;

    return (
      fleet.find((car) => car.name === foundVehicle.name) ||
      null
    );
  }, [carParam, fleet, getVehicleBySlug]);

  useEffect(() => {
    if (selectedCar) {
      setFormData((prev) => ({
        ...prev,
        selectedCar: selectedCar.name,
      }));
    }
  }, [selectedCar]);

  // Set default car if provided in URL or use first car as default
  useEffect(() => {
    if (selectedCar) {
      setFormData((prev) => ({
        ...prev,
        selectedCar: selectedCar.name,
      }));
    } else if (!formData.selectedCar) {
      setFormData((prev) => ({
        ...prev,
        selectedCar: fleet[0].name,
      }));
    }
  }, [selectedCar]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Get minimum datetime (2 hours from now) for pickup date
  const getDynamicMinDateTime = () => {
    const now = new Date();
    const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    if (!formData.pickupDate) {
      return twoHoursLater.toISOString().slice(0, 16);
    }

    const selectedDate = new Date(formData.pickupDate);

    // If user selected TODAY → enforce +2 hours
    if (selectedDate.toDateString() === now.toDateString()) {
      return twoHoursLater.toISOString().slice(0, 16);
    }

    // If FUTURE date → allow full day
    return new Date(selectedDate.setHours(0, 0, 0, 0))
      .toISOString()
      .slice(0, 16);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser) {
      setSnackbar({
        open: true,
        message: "Please login to confirm booking",
        severity: "error",
      });
      return;
    }

    const userEmail = auth.currentUser?.email;

    if (!userEmail) {
      setSnackbar({
        open: true,
        message: "User email not found. Please login again.",
        severity: "error",
      });
      return;
    }

    const fullPhone = phone;

    if (!fullPhone || fullPhone.length < 8) {
      setSnackbar({
        open: true,
        message: "Please enter a valid phone number",
        severity: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      /* ⏱ 2 HOURS TIME RULE (KEEP AS-IS) */
      if (formData.pickupDate) {
        const pickupDateTime = new Date(formData.pickupDate);
        const minDateTime = new Date(Date.now() + 2 * 60 * 60 * 1000);

        if (pickupDateTime < minDateTime) {
          setSnackbar({
            open: true,
            message: t("booking.minTime"),
            severity: "error",
          });
          setIsSubmitting(false);
          return;
        }
      }

      /* 🔥 SAVE BOOKING */
      await addDoc(collection(db, "bookings"), {
        userId: auth.currentUser.uid,
        fullName: formData.fullName,
        email: userEmail,

        phone: fullPhone, // ✅ validated phone
        car: displayCar.name,

        pickupLocation: formData.pickupLocation,
        destination: formData.destination,
        pickupDate: formData.pickupDate,
        flightNumber: formData.returnDate || "",
        estimatedPrice: calculatePrice ?? null,
        createdAt: serverTimestamp(),
      });

      /* 📧 EMAIL */
      // await sendBookingEmail(formData);
      await sendBookingEmail({
        ...formData,
        email: userEmail,
        phone: phone,
        fullName: name,
        selectedCar: displayCar.name,
        price: calculatePrice ?? undefined,
      });

      setSnackbar({
        open: true,
        message: `${t("booking.success")} Please check spam folder as well.`,
        severity: "success",
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || t("booking.error"),
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleCancel = () => {
    router.push("/our-fleet");
  };

  const handleBackToDetails = () => {
    const from = searchParams.get("from");

    // If came from fleet page
    if (from === "fleet") {
      router.push("/our-fleet");
      return;
    }

    // If came from vehicle details page
    if (from === "details" && displayCar) {
      const vehicleId = getVehicleSlug(displayCar.name);
      router.push(`/our-fleet/${vehicleId}`);
      return;
    }

    // fallback
    router.push("/our-fleet");
  };

  // Get the selected color image from formData

  const displayCar = useMemo(() => {
    let car = null;

    if (formData.selectedCar)
      car =
        fleet.find((c) => c.name === formData.selectedCar) ||
        selectedCar ||
        fleet[0];
    else car = selectedCar || fleet[0];

    return car;
  }, [formData.selectedCar, selectedCar, fleet]);

  const isAirportOnlyVehicle = useMemo(() => {
    const name = formData.selectedCar?.toLowerCase() || "";

    return (
      name.includes("toyota hiace") ||
      name.includes("toyota coaster") ||
      name.includes("coach 49")
    );
  }, [formData.selectedCar]);

  // 🔁 Auto-force airport service for those vehicles
  useEffect(() => {
    if (isAirportOnlyVehicle) {
      setFormData((prev) => ({
        ...prev,
        serviceType: "airport-pickup",
      }));
    }
  }, [isAirportOnlyVehicle]);

  const PRESET_LOCATIONS = [
    "Riyadh Airport  ",
    "Riyadh Airport to city ",
    "Riyadh Downtown to Inside City",
    "Dammam Airport ",
    "Dammam Airport to city",
    "Dammam Downtown to Inside City",
    "Jeddah Airport ",
    "Jeddah Airport to city",
    "Jeddah Downtown to Inside City",
    "Jeddah To KAUST",
    "Jeddah To KAEC",
    "Jeddah To Yanbu",
    "Jeddah To Red Sea Umluj",
    "Jeddah To NEOM",
    "JED Airport to Makkah",
    "Jeddah or Makkah To Madinah",
    "Madinah Airport to City",
    "Madina downtown to inside city",
  ];

  const calculatePrice = useMemo(() => {
    if (!formData.selectedCar) return null;

    return getBookingPrice(
      formData.selectedCar,
      formData.pickupLocation,
      formData.destination,
    );
  }, [
    formData.selectedCar,
    formData.pickupLocation,
    formData.destination,
    getBookingPrice,
  ]);


  const isAirportPickup = useMemo(() => {
    const pickup = formData.pickupLocation?.toLowerCase() || "";

    return (
      pickup.includes("airport") ||
      pickup.includes("airport to") ||
      pickup.includes("apt")
    );
  }, [formData.pickupLocation]);

  const isPresetLocation = PRESET_LOCATIONS.some(
    (loc) =>
      loc.toLowerCase().trim() ===
      formData.pickupLocation?.toLowerCase().trim(),
  );
  const handleBookNow = async () => {
    try {
      // =============================
      // FIREBASE USER CHECK
      // =============================

      const firebaseUser = auth.currentUser;

      if (!firebaseUser) {
        setSnackbar({
          open: true,
          message: "Please login first",
          severity: "error",
        });
        return;
      }

      if (!firebaseUser.email) {
        setSnackbar({
          open: true,
          message: "User email not found. Please login again.",
          severity: "error",
        });
        return;
      }

      // =============================
      // NORMALIZE VALUES
      // =============================

      const normalizedPickup =
        formData.pickupLocation?.toLowerCase().trim().replace(/\s+/g, " ") ||
        "";

      const normalizedDestination =
        formData.destination?.toLowerCase().trim().replace(/\s+/g, " ") || "";

      // =============================
      // NAME CHECK
      // =============================

      if (!name || name.trim().length < 3) {
        setSnackbar({
          open: true,
          message: "Please enter valid full name",
          severity: "error",
        });
        return;
      }

      // =============================
      // PHONE CHECK
      // =============================

      if (!phone || phone.trim().length < 8) {
        setSnackbar({
          open: true,
          message: "Please enter valid phone number",
          severity: "error",
        });
        return;
      }

      // =============================
      // VEHICLE CHECK
      // =============================

      if (!displayCar) {
        setSnackbar({
          open: true,
          message: "Please select vehicle",
          severity: "error",
        });
        return;
      }

      // =============================
      // PICKUP CHECK
      // =============================

      if (!normalizedPickup) {
        setSnackbar({
          open: true,
          message: "Please select pickup location",
          severity: "error",
        });
        return;
      }

      // =============================
      // DESTINATION CHECK
      // =============================

      if (!isAirportOnlyVehicle && !normalizedDestination) {
        setSnackbar({
          open: true,
          message: "Please select destination location",
          severity: "error",
        });
        return;
      }

      // =============================
      // DATE CHECK
      // =============================

      if (!formData.pickupDate) {
        setSnackbar({
          open: true,
          message: "Please select pickup date and time",
          severity: "error",
        });
        return;
      }

      // =============================
      // TIME LIMIT CHECK (2 HOURS)
      // =============================

      const selectedTime = new Date(formData.pickupDate);
      const minAllowedTime = new Date(Date.now() + 2 * 60 * 60 * 1000);

      if (selectedTime < minAllowedTime) {
        setSnackbar({
          open: true,
          message: "Pickup time must be at least 2 hours from now",
          severity: "error",
        });
        return;
      }

      // =============================
      // PRICE CHECK
      // =============================

      if (
        calculatePrice === null ||
        calculatePrice === undefined ||
        calculatePrice <= 0
      ) {
        setSnackbar({
          open: true,
          message:
            "Unable to calculate price. Please select valid pickup location.",
          severity: "error",
        });
        return;
      }

      // =============================
      // START PROCESS
      // =============================

      setIsSubmitting(true);

      // =============================
      // SAVE BOOKING TO FIRESTORE
      // =============================

      await addDoc(collection(db, "bookings"), {
        userId: firebaseUser.uid,
        email: firebaseUser.email,
        fullName: name.trim(),
        phone: phone.trim(),
        car: displayCar.name,
        pickupLocation: normalizedPickup,
        destination: normalizedDestination,
        pickupDate: formData.pickupDate,
        flightNumber: formData.returnDate || "",
        estimatedPrice: calculatePrice,
        createdAt: serverTimestamp(),
      });

      // =============================
      // SEND EMAIL
      // =============================

      await sendBookingEmail({
        fullName: name.trim(),
        email: firebaseUser.email,
        phone: phone.trim(),
        selectedCar: displayCar.name,
        pickupLocation: normalizedPickup,
        destination: normalizedDestination,
        pickupDate: formData.pickupDate,
        returnDate: formData.returnDate,
        price: calculatePrice ?? undefined,
      });

      setSnackbar({
        open: true,
        message: `${t("booking.success")} Please check spam folder as well.`,
        severity: "success",
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error?.message || t("booking.error"),
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return (
      <>
        <Header />

        {/* Hero Section Skeleton */}
        <Box
          sx={{
            pt: 8,
            height: "35vh",
            minHeight: "300px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            backgroundColor: "#52A4C1",
          }}
        >
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
            <Box sx={{ textAlign: "center" }}>
              <Skeleton
                variant="text"
                width="40%"
                height={60}
                sx={{ mx: "auto", mb: 2, bgcolor: "rgba(255,255,255,0.3)" }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={40}
                sx={{ mx: "auto", bgcolor: "rgba(255,255,255,0.2)" }}
              />
            </Box>
          </Container>
        </Box>

        <Box sx={{ py: 8, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {/* Car Details Card Skeleton - Left Side */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Card
                  sx={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={40}
                      animation="wave"
                      sx={{ mb: 3 }}
                    />
                    <Skeleton
                      variant="rectangular"
                      height={350}
                      animation="wave"
                      sx={{ borderRadius: "8px", mb: 3 }}
                    />
                    <Skeleton
                      variant="text"
                      width="50%"
                      height={30}
                      animation="wave"
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Booking Form Skeleton - Right Side */}
              <Grid size={{ xs: 12, md: 7 }}>
                <Card
                  sx={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    {/* Form Fields Skeleton */}
                    <Skeleton
                      variant="text"
                      width="30%"
                      height={20}
                      animation="wave"
                      sx={{ mb: 1 }}
                    />
                    <Skeleton
                      variant="rectangular"
                      height={40}
                      animation="wave"
                      sx={{ borderRadius: "8px", mb: 3 }}
                    />

                    <Skeleton
                      variant="text"
                      width="30%"
                      height={20}
                      animation="wave"
                      sx={{ mb: 1 }}
                    />
                    <Skeleton
                      variant="rectangular"
                      height={40}
                      animation="wave"
                      sx={{ borderRadius: "8px", mb: 3 }}
                    />

                    <Skeleton
                      variant="text"
                      width="30%"
                      height={20}
                      animation="wave"
                      sx={{ mb: 1 }}
                    />
                    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                      <Skeleton
                        variant="rectangular"
                        width={120}
                        height={40}
                        animation="wave"
                        sx={{ borderRadius: "8px" }}
                      />
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={40}
                        animation="wave"
                        sx={{ borderRadius: "8px" }}
                      />
                    </Box>

                    <Skeleton
                      variant="text"
                      width="30%"
                      height={20}
                      animation="wave"
                      sx={{ mb: 1 }}
                    />
                    <Skeleton
                      variant="rectangular"
                      height={40}
                      animation="wave"
                      sx={{ borderRadius: "8px", mb: 3 }}
                    />

                    <Skeleton
                      variant="text"
                      width="30%"
                      height={20}
                      animation="wave"
                      sx={{ mb: 1 }}
                    />
                    <Skeleton
                      variant="rectangular"
                      height={40}
                      animation="wave"
                      sx={{ borderRadius: "8px", mb: 3 }}
                    />

                    <Skeleton
                      variant="text"
                      width="30%"
                      height={20}
                      animation="wave"
                      sx={{ mb: 1 }}
                    />
                    <Skeleton
                      variant="rectangular"
                      height={120}
                      animation="wave"
                      sx={{ borderRadius: "8px", mb: 3 }}
                    />

                    <Skeleton
                      variant="text"
                      width="30%"
                      height={20}
                      animation="wave"
                      sx={{ mb: 1 }}
                    />
                    <Skeleton
                      variant="rectangular"
                      height={40}
                      animation="wave"
                      sx={{ borderRadius: "8px", mb: 3 }}
                    />

                    <Skeleton
                      variant="text"
                      width="30%"
                      height={20}
                      animation="wave"
                      sx={{ mb: 1 }}
                    />
                    <Skeleton
                      variant="rectangular"
                      height={40}
                      animation="wave"
                      sx={{ borderRadius: "8px", mb: 4 }}
                    />

                    {/* Buttons Skeleton */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Skeleton
                        variant="rectangular"
                        width="50%"
                        height={48}
                        animation="wave"
                        sx={{ borderRadius: "8px" }}
                      />
                      <Skeleton
                        variant="rectangular"
                        width="50%"
                        height={48}
                        animation="wave"
                        sx={{ borderRadius: "8px" }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          pt: 8,
          height: "35vh",
          minHeight: "300px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: "#52A4C1",
        }}
      >
        {/* Background Image */}
        {isMounted && (
          <Box
            className={
              heroImageLoaded
                ? "hero-image-container loaded"
                : "hero-image-container"
            }
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
            }}
          >
            <Image
              src={ManageBookingBg.src || ManageBookingBg}
              alt="Booking Form Hero Background"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              priority
              onLoad={() => setHeroImageLoaded(true)}
              sizes="100vw"
            />
          </Box>
        )}

        {/* Overlay for better text readability */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
            zIndex: 1,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{ textAlign: "center" }}>
            <SlideUpInView initialY={60} duration={0.8}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: { xs: 700, sm: 700, md: "bold" },
                  mb: { xs: 1.5, sm: 2, md: 2 },
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  fontSize: {
                    xs: "1.5rem",
                    sm: "2rem",
                    md: "2.5rem",
                    lg: "3rem",
                  },
                  lineHeight: { xs: 1.2, sm: 1.3, md: 1.3 },
                }}
              >
                {t("booking.title")}
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography
                variant="h5"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                  textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  fontSize: {
                    xs: "0.875rem",
                    sm: "1rem",
                    md: "1.25rem",
                    lg: "1.5rem",
                  },
                  fontWeight: { xs: 400, sm: 400, md: 400 },
                  maxWidth: "800px",
                  mx: "auto",
                  px: { xs: 2, sm: 0, md: 0 },
                }}
              >
                {t("booking.subtitle")}
              </Typography>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: 8, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Container maxWidth="lg">
          {/* Back to Details Button */}
          {displayCar && (
            <Box sx={{ mb: 3 }}>
              <Button
                startIcon={<ArrowBack />}
                onClick={handleBackToDetails}
                sx={{
                  color: "#52A4C1",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "rgba(82, 164, 193, 0.1)",
                  },
                }}
              >
                {searchParams.get("from") === "fleet"
                  ? "Back to Fleet"
                  : "Back to Vehicle Details"}
              </Button>
            </Box>
          )}

          <Grid container spacing={4}>
            {/* Car Details Card - Left Side */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Card
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  position: { md: "sticky" },
                  top: { md: 100 },
                  height: "fit-content",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: "bold",
                      mb: 3,
                      color: "#52A4C1",
                    }}
                  >
                    {displayCar.name}
                  </Typography>

                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: { xs: 250, sm: 300, md: 350 },
                      mb: 3,
                      borderRadius: "8px",
                      overflow: "hidden",
                      backgroundColor: "#f5f5f5",
                      cursor: "zoom-in",
                    }}
                    onMouseEnter={() => setHoveredCarImage(true)}
                    onMouseLeave={() => setHoveredCarImage(false)}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        transform: hoveredCarImage ? "scale(1.15)" : "scale(1)",
                        transition:
                          "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        willChange: "transform",
                      }}
                    >
                      <Image
                        src={getFleetImageSrc(displayCar.image)}
                        alt={displayCar.name}
                        fill
                        style={{ objectFit: "contain" }}
                        priority
                      />
                    </Box>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#52A4C1",
                      mb: 1,
                    }}
                  >
                    {calculatePrice !== null ? (
                      <>
                        {isAirportPickup
                          ? `Rent: ${calculatePrice} SAR`
                          : isPresetLocation
                            ? `Rent : ${calculatePrice} SAR`
                            : `Rent: ${calculatePrice} SAR / Hour`}

                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            color: "#666",
                            fontSize: "0.75rem",
                            mt: 0.5,
                          }}
                        >
                          Excluding VAT
                        </Typography>
                      </>
                    ) : (
                      <>
                        Rent: {displayCar.price} / {displayCar.duration}
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            color: "#666",
                            fontSize: "0.75rem",
                            mt: 0.5,
                          }}
                        >
                          Excluding VAT
                        </Typography>
                      </>
                    )}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Booking Form - Right Side */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Card
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box component="form" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          color: "#333",
                          fontSize: "0.875rem",
                        }}
                      >
                        {t("booking.fullName")}*
                      </Typography>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            backgroundColor: "#F8F8F8",
                          },
                        }}
                      />
                    </Box>

                    {/* Email Address */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          color: "#333",
                          fontSize: "0.875rem",
                        }}
                      >
                        {t("booking.email")}*
                      </Typography>

                      <TextField
                        fullWidth
                        label="Email"
                        value={user?.email || ""}
                        disabled
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            backgroundColor: "#F8F8F8",
                          },
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          color: "#333",
                          fontSize: "0.875rem",
                        }}
                      >
                        {t("booking.phone")}*
                      </Typography>

                      <TextField
                        fullWidth
                        label="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            backgroundColor: "#F8F8F8",
                          },
                        }}
                      />
                    </Box>

                    {/* Select Car */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          color: "#333",
                          fontSize: "0.875rem",
                        }}
                      >
                        {t("booking.selectCar")}
                      </Typography>
                      <FormControl
                        fullWidth
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            backgroundColor: "#F8F8F8",
                          },
                        }}
                      >
                        <Select
                          value={formData.selectedCar || ""}
                          MenuProps={{
                            disablePortal: true,
                            disableScrollLock: true,
                          }}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              selectedCar: e.target.value,
                            }))
                          }
                        >
                          <MenuItem value="" disabled>
                            {t("booking.selectCarPlaceholder")}
                          </MenuItem>
                          {fleet.map((car) => (
                            <MenuItem key={car.name} value={car.name}>
                              {car.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>

                    {/* <PickupDropoffMap /> */}
                    <PickupDestinationSingleFlow
                      airportOnly={isAirportOnlyVehicle}
                      setPickupLocation={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          pickupLocation: value,
                        }))
                      }
                      setDestinationLocation={(value) =>
                        setFormData((prev) => ({ ...prev, destination: value }))
                      }
                      setSelectedRouteKey={setSelectedRouteKey}
                    />

                    {/* )} */}

                    {/* Calculated Price Display */}
                    {calculatePrice !== null && (
                      <Box
                        sx={{
                          mb: 3,
                          p: 2,
                          backgroundColor: "#E3F2FD",
                          borderRadius: "8px",
                          border: "1px solid #52A4C1",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            mb: 0.5,
                            color: "#1976D2",
                            fontSize: "0.875rem",
                          }}
                        >
                          Dear Valued Guest, we kindly request confirmation of
                          your booking to allow our agent to verify the
                          reservation and proceed accordingly. Chauffeur and
                          vehicle details will be provided upon confirmation.
                        </Typography>
                      </Box>
                    )}

                    {/* Pickup Date (Required) */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          color: "#333",
                          fontSize: "0.875rem",
                        }}
                      >
                        {t("booking.pickupDate")}*
                      </Typography>
                      <TextField
                        fullWidth
                        name="pickupDate"
                        type="datetime-local"
                        value={formData.pickupDate}
                        onChange={handleInputChange}
                        required
                        inputProps={{
                          min: getDynamicMinDateTime(), // ✅ FIXED
                        }}
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <CalendarToday sx={{ color: "#666" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            backgroundColor: "#F8F8F8",
                          },
                        }}
                      />

                      <Typography
                        variant="caption"
                        sx={{
                          mt: 0.5,
                          color: "#666",
                          fontSize: "0.75rem",
                          display: "block",
                        }}
                      >
                        {t("booking.minTime")}
                      </Typography>
                    </Box>

                    {/* Flight # (Optional but recommended) */}
                    <Box sx={{ mb: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          color: "#333",
                          fontSize: "0.875rem",
                        }}
                      >
                        {t("booking.flightNumber")}
                      </Typography>
                      <TextField
                        fullWidth
                        name="returnDate"
                        type="text"
                        value={formData.returnDate}
                        onChange={handleInputChange}
                        placeholder={t("booking.flightNumberPlaceholder")}
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            backgroundColor: "#F8F8F8",
                          },
                        }}
                      />
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleCancel}
                        sx={{
                          py: 1.5,
                          borderRadius: "8px",
                          borderColor: "#D8D8D8",
                          backgroundColor: "#D8D8D8",
                          color: "#333",
                          textTransform: "none",
                          fontWeight: "bold",
                          "&:hover": {
                            borderColor: "#C0C0C0",
                            backgroundColor: "#C0C0C0",
                          },
                        }}
                      >
                        {t("booking.cancel")}
                      </Button>
                      <Button
                        // type="submit"
                        // type="button "
                        variant="contained"
                        fullWidth
                        onClick={handleBookNow}
                        disabled={isSubmitting}
                        sx={{
                          py: 1.5,
                          borderRadius: "8px",
                          backgroundColor: "#52A4C1",
                          textTransform: "none",
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "#4a94b1",
                          },
                        }}
                      >
                        {/* {isSubmitting ? "Submitting..." : "Confirm"} */}
                        {isSubmitting ? "Booking..." : "Book Now"}
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Toast Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </>
  );
};

export default ManageBookingClient;
