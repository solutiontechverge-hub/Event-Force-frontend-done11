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
import { useLanguage } from "@/contexts/LanguageContext";
import "react-phone-number-input/style.css";
import { useAuth } from "@/contexts/AuthContext";
import PickupDestinationSingleFlow from "./PickupDropoffMap";
import {
  BmwBlack1,
  CarBmw7Series,
  CarChinesbus49Sea,
  CarGmc,
  CarHiace,
  CarMercedesS450,
  CarMercedesVClass,
  CarToyotaCoaster,
  ManageBookingBg,
  MeTrendAgateBlack01,
} from "../../../../public/images";

interface Car {
  name: string;
  price: string;
  duration: string;
  image: any;
  class: string;
  year: string;
  branch: string;
}

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

const fleet: Car[] = [
  {
    name: "Ford Taurus",
    price: "125 SAR",
    duration: "Per hour",
    image: MeTrendAgateBlack01, // Default to black (#1A1A1A)
    class: "Economy",
    year: "2024",
    branch: "Riyadh",
  },
  {
    name: "GMC Yukon",
    price: "150 SAR",
    duration: "Per hour",
    image: CarGmc,
    class: "SUV",
    year: "2024",
    branch: "Jeddah",
  },
  {
    name: "BMW 5 Series",
    price: "150 SAR",
    duration: "Per hour",
    image: BmwBlack1,
    class: "Luxury",
    year: "2025",
    branch: "Riyadh",
  },
  {
    name: "Mercedes S450",
    price: "400 SAR",
    duration: "Per hour",
    image: CarMercedesS450,
    class: "Luxury",
    year: "2025",
    branch: "Jeddah",
  },
  {
    name: "BMW 7 Series",
    price: "400 SAR",
    duration: "Per hour",
    image: CarBmw7Series,
    class: "Luxury",
    year: "2025",
    branch: "Riyadh",
  },
  {
    name: "Mercedes V Class",
    price: "300 SAR",
    duration: "Per hour",
    image: CarMercedesVClass,
    class: "Van",
    year: "2024",
    branch: "Jeddah",
  },
  {
    name: "Toyota Hiace",
    price: "1000 SAR",
    duration: "12 hours",
    image: CarHiace,
    class: "Van",
    year: "2024",
    branch: "Riyadh",
  },
  {
    name: "Toyota Coaster",
    price: "1500 SAR",
    duration: "12 hours",
    image: CarToyotaCoaster,
    class: "Bus",
    year: "2024",
    branch: "Jeddah",
  },
  {
    name: "Coach 49 Seats",
    price: "2000 SAR",
    duration: "12 hours",
    image: CarChinesbus49Sea,
    class: "Bus",
    year: "2024",
    branch: "Riyadh",
  },
];

const ManageBookingClient = () => {
  const { user, updateUser } = useAuth();
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const searchParams = useSearchParams();
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
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
    phone: "", // ← ONLY phone
    selectedCar: "",

    serviceType: "",
    pickupLocation: "",
    destination: "",
    tripType: "",
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

  useEffect(() => {
    // Delay to show skeleton - ensures it's visible on initial load
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Get car from URL params
  const carParam = searchParams?.get("car") || "";
  const colorIdParam = searchParams?.get("colorId") || "";
  const colorIndexParam = searchParams?.get("colorIndex") || "";

  // Function to get color image based on car name and color ID

  // Function to get all color options for a car

  // Find the selected car
  const selectedCar = useMemo(() => {
    if (!carParam) return null;

    const carName = carParam.replace(/-/g, " ");

    return (
      fleet.find((car) => car.name.toLowerCase() === carName.toLowerCase()) ||
      null
    );
  }, [carParam]);

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
  const vehicleKeyMap: Record<string, string> = {
    "ford taurus": "fordTaurus",
    "gmc yukon": "yukon",
    "bmw 5 series": "bmw5",
    "bmw 7 series": "bmw7Mercedes",
    "mercedes s450": "bmw7Mercedes",
    "mercedes v class": "bmw7Mercedes",
    "toyota hiace": "hiace12",
    "toyota coaster": "coaster23",
    "coach 49 seats": "bus49",
  };

  const getVehicleKey = (name: string) => {
    if (!name) return null;

    const lower = name.toLowerCase().trim();

    return vehicleKeyMap[lower] || null;
  };
  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };
      // Reset selected color when car changes

      if (name === "serviceType") {
        updated.pickupLocation = prev.pickupLocation;
        updated.destination = prev.destination;
      }

      return updated;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
    }
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

    /* ✅ EMAIL VALIDATION */
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(formData.email)) {
    //   setSnackbar({
    //     open: true,
    //     message: "Please enter a valid email address",
    //     severity: "error",
    //   });
    //   return;
    // }
    const userEmail = auth.currentUser?.email;

    if (!userEmail) {
      setSnackbar({
        open: true,
        message: "User email not found. Please login again.",
        severity: "error",
      });
      return;
    }

    /* ✅ PHONE VALIDATION (country code + number) */
    // const fullPhone = `${formData.phone}`;
    // if (!isValidPhoneNumber(fullPhone)) {
    //   setSnackbar({
    //     open: true,
    //     message: "Please enter a valid phone number",
    //     severity: "error",
    //   });
    //   return;
    // }
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
        serviceType: formData.serviceType,
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
    const vehicleId = displayCar.name.toLowerCase().replace(/\s+/g, "-");
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
  }, [formData.selectedCar, selectedCar]);

  const isAirportOnlyVehicle = useMemo(() => {
    const name = formData.selectedCar?.toLowerCase() || "";

    return (
      name.includes("toyota hiace") ||
      name.includes("toyota coaster") ||
      name.includes("coach 49")
    );
  }, [formData.selectedCar]);
  // ✅ Service options (NO Fragment, MUI safe)
  const serviceOptions = useMemo(() => {
    if (isAirportOnlyVehicle) {
      return [
        {
          value: "airport-pickup",
          label: t("service.airport"),
        },
      ];
    }

    return [
      {
        value: "airport-pickup",
        label: t("service.airport"),
      },
      {
        value: "downtown",
        label: t("service.downtown"),
      },
      {
        value: "inter-city",
        label: t("service.intercity"),
      },
      {
        value: "hourly",
        label: t("service.hourly"),
      },
      {
        value: "8-hours",
        label: t("service.8hours"),
      },
      {
        value: "12-hours",
        label: t("service.12hours"),
      },
    ];
  }, [isAirportOnlyVehicle, t]);

  // 🔁 Auto-force airport service for those vehicles
  useEffect(() => {
    if (isAirportOnlyVehicle) {
      setFormData((prev) => ({
        ...prev,
        serviceType: "airport-pickup",
      }));
    }
  }, [isAirportOnlyVehicle]);

  // Pricing data from spreadsheet
  const pricing: any = {
    // Airport Pickup / Drop
    "riyadh-airport-city": {
      fordTaurus: 150,
      yukon: 300,
      bmw5: 250,
      bmw7Mercedes: 450,
      hiace12: 500,
      coaster23: 800,
      bus49: 1200,
    },
    "dammam-airport-city": {
      fordTaurus: 150,
      yukon: 300,
      bmw5: 250,
      bmw7Mercedes: 450,
      hiace12: 500,
      coaster23: 800,
      bus49: 1200,
    },
    "jeddah-airport-city": {
      fordTaurus: 150,
      yukon: 300,
      bmw5: 250,
      bmw7Mercedes: 400,
      hiace12: 500,
      coaster23: 800,
      bus49: 1200,
    },
    "madina-airport-city": {
      fordTaurus: 150,
      yukon: 250,
      bmw5: 250,
      bmw7Mercedes: 450,
      hiace12: 300,
      coaster23: 800,
      bus49: 1200,
    },

    // Downtown
    "riyadh-downtown-city": {
      fordTaurus: 125,
      yukon: 250,
      bmw5: 225,
      bmw7Mercedes: 350,
      hiace12: 400,
      coaster23: 600,
      bus49: 1000,
    },
    "dammam-downtown-city": {
      fordTaurus: 125,
      yukon: 250,
      bmw5: 225,
      bmw7Mercedes: 350,
      hiace12: 400,
      coaster23: 600,
      bus49: 1000,
    },
    "jeddah-downtown-city": {
      fordTaurus: 125,
      yukon: 250,
      bmw5: 225,
      bmw7Mercedes: 350,
      hiace12: 400,
      coaster23: 600,
      bus49: 1000,
    },
    "madina-downtown-city": {
      fordTaurus: 125,
      yukon: 225,
      bmw5: 225,
      bmw7Mercedes: 800,
      hiace12: 400,
      coaster23: 600,
      bus49: 1000,
    },

    // Intercity
    "jeddah-kaust": {
      fordTaurus: 225,
      yukon: 400,
      bmw5: 400,
      bmw7Mercedes: 1250,
      hiace12: 600,
      coaster23: 1000,
      bus49: 1500,
    },
    "jeddah-kaec": {
      fordTaurus: 300,
      yukon: 500,
      bmw5: 500,
      bmw7Mercedes: 1400,
      hiace12: 750,
      coaster23: 1200,
      bus49: 2000,
    },
    "jeddah-yanbu": {
      fordTaurus: 600,
      yukon: 1000,
      bmw5: 1000,
      bmw7Mercedes: 3000,
      hiace12: 1200,
      coaster23: 2000,
      bus49: 2500,
    },
    "jeddah-red-sea-umluj": {
      fordTaurus: 1500,
      yukon: 2500,
      bmw5: 2500,
      bmw7Mercedes: 4500,
      hiace12: 1600,
      coaster23: 3000,
      bus49: 3500,
    },
    "jeddah-neom": {
      fordTaurus: 2500,
      yukon: 3500,
      bmw5: 3500,
      bmw7Mercedes: 5000,
      hiace12: 2000,
      coaster23: 3500,
      bus49: 4000,
    },
    "jeddah-airport-makkah": {
      fordTaurus: 300,
      yukon: 500,
      bmw5: 500,
      bmw7Mercedes: 1250,
      hiace12: 600,
      coaster23: 1000,
      bus49: 1000,
    },
    "jeddah-makkah-medina": {
      fordTaurus: 900,
      yukon: 1500,
      bmw5: 1500,
      bmw7Mercedes: 3000,
      hiace12: 1400,
      coaster23: 1800,
      bus49: 2000,
    },

    // Hourly
    hourly: {
      fordTaurus: 125,
      yukon: 150,
      bmw5: 150,
      bmw7Mercedes: 400,
      hiace12: null,
      coaster23: null,
      bus49: null,
    },

    "8-hours": {
      fordTaurus: 750,
      yukon: 1200,
      bmw5: 1200,
      bmw7Mercedes: 2000,
      hiace12: 850,
      coaster23: 1200,
      bus49: 1500,
    },

    "12-hours": {
      fordTaurus: 1000,
      yukon: 1500,
      bmw5: 1500,
      bmw7Mercedes: 2400,
      hiace12: 1000,
      coaster23: 1500,
      bus49: 2000,
    },

    "extra-hour": {
      fordTaurus: 125,
      yukon: 150,
      bmw5: 150,
      bmw7Mercedes: 300,
      hiace12: 125,
      coaster23: 150,
      bus49: 250,
    },
  };
  // Pricing calculation based on spreadsheet
  // const calculatePrice = useMemo(() => {
  //   if (!formData.selectedCar || !formData.serviceType) return null;

  //   const vehicleKey = getVehicleKey(formData.selectedCar);

  //   if (!vehicleKey) return null;

  //   const service = formData.serviceType;

  //   const pickup = formData.pickupLocation?.toLowerCase() || "";
  //   const dest = formData.destination?.toLowerCase() || "";

  //   // ✅ HOURLY
  //   if (service === "hourly")
  //     return pricing.hourly?.[vehicleKey] ?? displayCar?.price ?? null;

  //   if (service === "8-hours")
  //     return pricing["8-hours"]?.[vehicleKey] ?? displayCar?.price ?? null;

  //   if (service === "12-hours")
  //     return pricing["12-hours"]?.[vehicleKey] ?? displayCar?.price ?? null;

  //   if (service === "extra-hour")
  //     return pricing["extra-hour"]?.[vehicleKey] ?? displayCar?.price ?? null;

  //   // If no pickup location yet → return base price
  //   if (!pickup) {
  //     return (
  //       pricing.hourly?.[vehicleKey] ??
  //       pricing["8-hours"]?.[vehicleKey] ??
  //       pricing["12-hours"]?.[vehicleKey] ??
  //       null
  //     );
  //   }

  //   // AIRPORT
  //   if (service === "airport-pickup") {
  //     if (pickup.includes("riyadh"))
  //       return pricing["riyadh-airport-city"]?.[vehicleKey] ?? null;

  //     if (pickup.includes("jeddah"))
  //       return pricing["jeddah-airport-city"]?.[vehicleKey] ?? null;

  //     if (pickup.includes("dammam"))
  //       return pricing["dammam-airport-city"]?.[vehicleKey] ?? null;

  //     if (pickup.includes("madina"))
  //       return pricing["madina-airport-city"]?.[vehicleKey] ?? null;
  //   }

  //   // DOWNTOWN
  //   if (service === "downtown") {
  //     if (pickup.includes("riyadh"))
  //       return pricing["riyadh-downtown-city"]?.[vehicleKey] ?? null;

  //     if (pickup.includes("jeddah"))
  //       return pricing["jeddah-downtown-city"]?.[vehicleKey] ?? null;
  //   }

  //   // INTERCITY
  //   if (service === "inter-city") {
  //     if (pickup.includes("jeddah") && dest.includes("makkah"))
  //       return pricing["jeddah-airport-makkah"]?.[vehicleKey] ?? null;
  //   }

  //   return null;
  // }, [
  //   formData.selectedCar,
  //   formData.serviceType,
  //   formData.pickupLocation,
  //   formData.destination,
  //   displayCar,
  // ]);

  const calculatePrice = useMemo(() => {
    if (!formData.selectedCar || !formData.serviceType) return null;

    const vehicleKey = getVehicleKey(formData.selectedCar);
    if (!vehicleKey) return null;

    const service = formData.serviceType;
    const pickup = formData.pickupLocation?.toLowerCase() || "";
    const dest = formData.destination?.toLowerCase() || "";

    // -----------------------
    // HOURLY / FIXED HOURS
    // -----------------------
    if (service === "hourly") return pricing.hourly?.[vehicleKey] ?? null;

    if (service === "8-hours") return pricing["8-hours"]?.[vehicleKey] ?? null;

    if (service === "12-hours")
      return pricing["12-hours"]?.[vehicleKey] ?? null;

    if (service === "extra-hour")
      return pricing["extra-hour"]?.[vehicleKey] ?? null;

    // -----------------------
    // AIRPORT TRANSFERS
    // -----------------------
    if (service === "airport-pickup") {
      if (pickup.includes("riyadh"))
        return pricing["riyadh-airport-city"]?.[vehicleKey] ?? null;

      if (pickup.includes("dammam"))
        return pricing["dammam-airport-city"]?.[vehicleKey] ?? null;

      if (pickup.includes("jeddah")) {
        if (dest.includes("makkah"))
          return pricing["jeddah-airport-makkah"]?.[vehicleKey] ?? null;

        return pricing["jeddah-airport-city"]?.[vehicleKey] ?? null;
      }

      if (
        pickup.includes("madinah") ||
        pickup.includes("medina") ||
        pickup.includes("madina")
      )
        return pricing["madina-airport-city"]?.[vehicleKey] ?? null;
    }

    // -----------------------
    // DOWNTOWN
    // -----------------------
    if (service === "downtown") {
      if (pickup.includes("riyadh"))
        return pricing["riyadh-downtown-city"]?.[vehicleKey] ?? null;

      if (pickup.includes("dammam"))
        return pricing["dammam-downtown-city"]?.[vehicleKey] ?? null;

      if (pickup.includes("jeddah"))
        return pricing["jeddah-downtown-city"]?.[vehicleKey] ?? null;

      if (
        pickup.includes("madinah") ||
        pickup.includes("medina") ||
        pickup.includes("madina")
      )
        return pricing["madina-downtown-city"]?.[vehicleKey] ?? null;
    }

    // -----------------------
    // INTERCITY (Pickup + Destination REQUIRED)
    // -----------------------
    if (service === "inter-city") {
      if (pickup.includes("jeddah")) {
        if (dest.includes("kaust"))
          return pricing["jeddah-kaust"]?.[vehicleKey] ?? null;

        if (dest.includes("kaec"))
          return pricing["jeddah-kaec"]?.[vehicleKey] ?? null;

        if (dest.includes("yanbu"))
          return pricing["jeddah-yanbu"]?.[vehicleKey] ?? null;

        if (dest.includes("umluj") || dest.includes("red sea"))
          return pricing["jeddah-red-sea-umluj"]?.[vehicleKey] ?? null;

        if (dest.includes("neom"))
          return pricing["jeddah-neom"]?.[vehicleKey] ?? null;

        if (dest.includes("makkah"))
          return pricing["jeddah-airport-makkah"]?.[vehicleKey] ?? null;

        if (dest.includes("madinah") || dest.includes("medina"))
          return pricing["jeddah-makkah-medina"]?.[vehicleKey] ?? null;
      }
    }

    return null;
  }, [
    formData.selectedCar,
    formData.serviceType,
    formData.pickupLocation,
    formData.destination,
  ]);

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
                        src={displayCar.image.src || displayCar.image}
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
                        {formData.serviceType === "hourly" &&
                          `Rent: ${calculatePrice} SAR / Hour`}

                        {formData.serviceType === "8-hours" &&
                          `Rent: ${calculatePrice} SAR / 8 Hours`}

                        {formData.serviceType === "12-hours" &&
                          `Rent: ${calculatePrice} SAR / 12 Hours`}

                        {formData.serviceType === "airport-pickup" &&
                          `Airport Transfer: ${calculatePrice} SAR`}

                        {formData.serviceType === "downtown" &&
                          `City Ride: ${calculatePrice} SAR`}

                        {formData.serviceType === "inter-city" &&
                          `Intercity Ride: ${calculatePrice} SAR`}

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
                      `Rent: ${displayCar.price} / ${displayCar.duration}`
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

                    {/* Service Type */}
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
                        {t("booking.serviceType")}*
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
                          value={formData.serviceType || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              serviceType: e.target.value,
                            }))
                          }
                          displayEmpty
                          required
                          IconComponent={ArrowDropDown}
                        >
                          <MenuItem value="" disabled>
                            {t("booking.selectServiceType")}
                          </MenuItem>

                          {serviceOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>

                    {/* <PickupDropoffMap /> */}
                    <PickupDestinationSingleFlow
                      setPickupLocation={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          pickupLocation: value,
                        }))
                      }
                      setDestinationLocation={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          destination: value,
                        }))
                      }
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
                        type="submit"
                        variant="contained"
                        fullWidth
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
                        {isSubmitting ? "Submitting..." : "Confirm"}
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
