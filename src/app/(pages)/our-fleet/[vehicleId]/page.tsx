"use client";

import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Chip,
  IconButton,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CarBmw7Series,
  CarChinesbus49Sea,
  CarFordTaurus,
  CarGmc,
  CarHiace,
  CarMercedesS450,
  CarMercedesVClass,
  CarToyotaCoaster,
  HeroImages,
  MeTrendCrystalSolidWhite10,
  MeTrendWhitePlatinumTriCoat01,
  MeTrendHotPepperRed01,
  MeTrendLustrousGrey01,
  MeTrendVaporBlue01,
  MeTrendAgateBlack01,
  Gmc1,
  Gmc2,
  Gmc3,
  Gmc4,
  Gmc5,
  Gmc6,
  Gmc7,
  BmwBlack1,
  Bmw2,
  Bmw3,
  Bmw4,
  Bmw5,
  Bmw6,
  Bmw7,
  Bmw8,
  MercedesS450White,
  MercedesS450Black,
  Bmw7SeriesBlack1,
  Bmw7SeriesAlpineWhite,
  Bmw7SeriesMineralWhiteMetallic,
  Bmw7SeriesOxideGrayMetallic,
  Bmw7SeriesBrooklynGreyMetallic,
  MercedesVClassBlack,
  MercedesVClassSilver,
  MercedesVClassBlue,
  MercedesVClassGrey,
  ToyotaHiaceBlack,
  ToyotaHiaceSilver,
  ToyotaHiaceInteriorDesign,
  ToyotaHiaceActiveHeadRest,
  ToyotaHiaceSpaceComfort,
  ToyotaHiaceRearRecliningSeats,
  ToyotaHiaceDialControls,
  ToyotaHiaceDualAcControl,
  ToyotaHiaceDualAcVent,
  ToyotaHiaceLowerGloveBox,
  ToyotaHiaceLuggageSpace,
  ToyotaCoasterDefault,
  ToyotaCoasterSafetyRobust,
  ToyotaCoasterWhiteLavender,
  ToyotaCoasterWhiteTurquoise,
  ToyotaCoasterWhiteBeige,
  ToyotaCoasterYellow,
  ToyotaCoasterInterior,
  ToyotaCoasterAccommodate,
  ToyotaCoasterCreatureComforts,
} from "../../../../../public/images";
import { SlideUpInView } from "@/components/animations";
import {
  ChineseBus49Default,
  ChineseBus49KingLong,
  ChineseBus49YuTong,
  ToyotaCoasterEasierBoarding,
  ToyotaCoasterEfficientSteering,
} from "../../../../../public/images";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowBack } from "@mui/icons-material";

interface Car {
  name: string;
  price: string;
  duration: string;
  image: any;
  class: string;
  transport?: string;
  branch: string[];
}

const fleet: Car[] = [
  {
    name: "Ford Taurus",
    price: "125 SAR",
    duration: "Per Hour",
    image: CarFordTaurus,
    class: "Economy",
    branch: ["Riyadh", " ", "&", " ", "Jeddah"],
  },
  {
    name: "GMC Yukon",
    price: "150 SAR",
    duration: "Per Hour",
    image: CarGmc,
    class: "SUV",
    branch: ["Riyadh", " ", "&", " ", "Jeddah"],
  },
  {
    name: "BMW 5 Series",
    price: "150 SAR",
    duration: "Per Hour",
    image: CarBmw7Series,
    class: "Luxury",
    branch: ["Riyadh", " ", "&", " ", "Jeddah"],
  },
  {
    name: "Mercedes S450",
    price: "400 SAR",
    duration: "Per Hour",
    image: CarMercedesS450,
    class: "Luxury",
    branch: ["Riyadh", " ", "&", " ", "Jeddah"],
  },
  {
    name: "BMW 7 Series",
    price: "400 SAR",
    duration: "Per Hour",
    image: CarBmw7Series,
    class: "Luxury",
    branch: ["Riyadh", " ", "&", " ", "Jeddah"],
  },
  {
    name: "Mercedes V Class",
    price: "300 SAR",
    duration: "Per Hour",
    image: CarMercedesVClass,
    class: "Van",
    branch: ["Riyadh", " ", "&", " ", "Jeddah"],
  },
  {
    name: "Toyota Hiace",
    price: "1000 SAR",
    duration: "12 hours",
    transport: "Airport Transportation only",
    image: CarHiace,
    class: "Van",
    branch: ["Riyadh", " ", "&", " ", "Jeddah"],
  },
  {
    name: "Toyota Coaster",
    price: "1500 SAR",

    transport: "Airport Transportation only",
    duration: "12 hours",
    image: CarToyotaCoaster,
    class: "Bus",
    branch: ["Riyadh", " ", "&", " ", "Jeddah"],
  },
  {
    name: "Coach 49 Seats",
    price: "2000 SAR",

    transport: "Airport Transportation only",
    duration: "12 hours",
    image: CarChinesbus49Sea,
    class: "Bus",
    branch: ["Riyadh", " ", "&", " ", "Jeddah"],
  },
];

const VehicleDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const vehicleId = params?.vehicleId as string;
  const [isMounted, setIsMounted] = React.useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = React.useState(false);

  // Get color from URL params if available
  const colorIndexParam = searchParams?.get("colorIndex");
  const colorIdParam = searchParams?.get("color");
  const initialColorIndex = colorIndexParam ? parseInt(colorIndexParam, 10) : 0;

  const [selectedColor, setSelectedColor] = React.useState(initialColorIndex);
  const [hoveredMainImage, setHoveredMainImage] = React.useState(false);
  const [hoveredInteriorImage, setHoveredInteriorImage] = React.useState<
    number | null
  >(null);

  React.useEffect(() => {
    // Delay to show skeleton - ensures it's visible on initial load
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Update selected color when URL params change
  React.useEffect(() => {
    if (colorIndexParam) {
      const colorIndex = parseInt(colorIndexParam, 10);
      if (!isNaN(colorIndex) && colorIndex >= 0) {
        setSelectedColor(colorIndex);
      }
    }
  }, [colorIndexParam]);

  // Find the vehicle by converting the ID back to the vehicle name
  const vehicleName = vehicleId?.replace(/-/g, " ");
  const selectedCar = fleet.find(
    (car) => car.name.toLowerCase() === vehicleName?.toLowerCase(),
  );

const handleBookNow = () => {
  if (!selectedCar) return;

  const colorOptions = getColorOptions();
  const selectedColorOption = colorOptions[selectedColor];
  const imageToUse = selectedColorOption?.image || selectedCar?.image;

  let imageSrc = "";

  if (imageToUse) {
    if (typeof imageToUse === "string") {
      imageSrc = imageToUse;
    } else if (imageToUse.src) {
      imageSrc = imageToUse.src;
    }
  }

  const params = new URLSearchParams({
    car: selectedCar.name.toLowerCase().replace(/\s+/g, "-"),
    price: selectedCar.price,
    duration: selectedCar.duration,
    colorIndex: selectedColor.toString(),
    colorId: selectedColorOption?.id || "default",
    image: imageSrc,
    from: "details", // ✅ IMPORTANT
  });

  router.push(`/manage-booking?${params.toString()}`);
};

  // Helper function to check if a color is white
  const isWhiteColor = (color: string, name: string) => {
    const whiteColorValues = [
      "#FFFFFF",
      "#F5F5F5",
      "#E8E8E8",
      "#E6E6FA",
      "#F5F5DC",
      "#E8F2F6",
      "#C0C0C0",
    ];
    const colorLower = color.toUpperCase();
    const nameLower = name.toLowerCase();
    return whiteColorValues.includes(colorLower) || nameLower.includes("white");
  };

  // Color options for vehicles
  const getColorOptions = () => {
    let colors: Array<{ id: string; name: string; color: string; image: any }> =
      [];

    if (selectedCar?.name === "Ford Taurus") {
      colors = [
        {
          id: "agate-black",
          name: "Agate Black",
          color: "#1A1A1A",
          image: MeTrendAgateBlack01,
        },
        {
          id: "crystal-solid-white",
          name: "Crystal Solid White",
          color: "#FFFFFF",
          image: MeTrendCrystalSolidWhite10,
        },
        {
          id: "white-platinum-tri-coat",
          name: "White Platinum Tri Coat",
          color: "#E8E8E8",
          image: MeTrendWhitePlatinumTriCoat01,
        },
        {
          id: "hot-pepper-red",
          name: "Hot Pepper Red",
          color: "#C41E3A",
          image: MeTrendHotPepperRed01,
        },
        {
          id: "lustrous-grey",
          name: "Lustrous Grey",
          color: "#808080",
          image: MeTrendLustrousGrey01,
        },
        {
          id: "vapor-blue",
          name: "Vapor Blue",
          color: "#4A90E2",
          image: MeTrendVaporBlue01,
        },
      ];
    }

    if (
      selectedCar?.name === "GMC Yukon" ||
      selectedCar?.name?.includes("GMC")
    ) {
      colors = [
        {
          id: "glacier-white-tricoat",
          name: "Glacier White Tricoat",
          color: "#FFFFFF",
          image: Gmc1,
        },
        {
          id: "titanium-rush-metallic",
          name: "Titanium Rush Metallic",
          color: "#4A5568",
          image: Gmc2,
        },
        {
          id: "summit-white",
          name: "Summit White",
          color: "#F5F5F5",
          image: Gmc3,
        },
        {
          id: "onyx-black",
          name: "Onyx Black",
          color: "#1A1A1A",
          image: Gmc4,
        },
        {
          id: "volcanic-red-tintcoat",
          name: "Volcanic Red Tintcoat",
          color: "#8B2635",
          image: Gmc5,
        },
        {
          id: "sterling-metallic",
          name: "Sterling Metallic",
          color: "#9CA3AF",
          image: Gmc6,
        },
        {
          id: "downpour-metallic",
          name: "Downpour Metallic",
          color: "#4B5563",
          image: Gmc7,
        },
      ];
    }

    if (
      selectedCar?.name === "BMW 5 Series" ||
      selectedCar?.name?.includes("BMW 5")
    ) {
      colors = [
        {
          id: "black",
          name: "Black",
          color: "#1A1A1A",
          image: BmwBlack1,
        },
        {
          id: "color-2",
          name: "Color Option 2",
          color: "#4A5568",
          image: Bmw2,
        },
        {
          id: "color-3",
          name: "Color Option 3",
          color: "#9CA3AF",
          image: Bmw3,
        },
        {
          id: "color-4",
          name: "Color Option 4",
          color: "#4B5563",
          image: Bmw4,
        },
        {
          id: "color-5",
          name: "Color Option 5",
          color: "#1E40AF",
          image: Bmw5,
        },
        {
          id: "color-6",
          name: "Color Option 6",
          color: "#92400E",
          image: Bmw6,
        },
        {
          id: "color-7",
          name: "Color Option 7",
          color: "#065F46",
          image: Bmw7,
        },
        {
          id: "color-8",
          name: "Color Option 8",
          color: "#1E3A8A",
          image: Bmw8,
        },
      ];
    }

    if (
      selectedCar?.name === "Mercedes S450" ||
      selectedCar?.name?.includes("Mercedes S450") ||
      selectedCar?.name?.includes("Mercedes Benz S Class")
    ) {
      colors = [
        {
          id: "black",
          name: "Black",
          color: "#1A1A1A",
          image: MercedesS450Black,
        },
        {
          id: "white",
          name: "White",
          color: "#FFFFFF",
          image: MercedesS450White,
        },
      ];
    }

    if (
      selectedCar?.name === "Mercedes S450" ||
      selectedCar?.name?.includes("Mercedes S450") ||
      selectedCar?.name?.includes("Mercedes S Class")
    ) {
      colors = [
        {
          id: "white",
          name: "White",
          color: "#FFFFFF",
          image: MercedesS450White,
        },
        {
          id: "black",
          name: "Black",
          color: "#1A1A1A",
          image: MercedesS450Black,
        },
        {
          id: "ruby-black-metallic",
          name: "Ruby Black Metallic",
          color: "#4A1A1A",
          image: MercedesS450Black,
        },
        {
          id: "anthracite-blue",
          name: "Anthracite Blue",
          color: "#1A1F2E",
          image: MercedesS450Black,
        },
        {
          id: "selenite-gray-metallic",
          name: "Selenite Gray Metallic",
          color: "#9CA3AF",
          image: MercedesS450White,
        },
      ];
    }

    if (
      selectedCar?.name === "BMW 7 Series" ||
      selectedCar?.name?.includes("BMW 7")
    ) {
      colors = [
        {
          id: "black",
          name: "Black",
          color: "#1A1A1A",
          image: Bmw7SeriesBlack1,
        },
        {
          id: "alpine-white",
          name: "Alpine White",
          color: "#FFFFFF",
          image: Bmw7SeriesAlpineWhite,
        },
        {
          id: "mineral-white-metallic",
          name: "Mineral White Metallic",
          color: "#F5F5F5",
          image: Bmw7SeriesMineralWhiteMetallic,
        },
        {
          id: "oxide-gray-metallic",
          name: "Oxide Gray Metallic",
          color: "#6B7280",
          image: Bmw7SeriesOxideGrayMetallic,
        },
        {
          id: "brooklyn-grey-metallic",
          name: "Brooklyn Grey Metallic",
          color: "#9CA3AF",
          image: Bmw7SeriesBrooklynGreyMetallic,
        },
      ];
    }

    if (
      selectedCar?.name === "Mercedes V Class" ||
      selectedCar?.name?.includes("Mercedes V Class") ||
      selectedCar?.name?.includes("Mercedes V-Class")
    ) {
      colors = [
        {
          id: "black",
          name: "Black",
          color: "#1A1A1A",
          image: MercedesVClassBlack,
        },
        {
          id: "silver",
          name: "Silver Metallic",
          color: "#C0C0C0",
          image: MercedesVClassSilver,
        },
        {
          id: "blue",
          name: "Dark Blue Metallic",
          color: "#1E3A8A",
          image: MercedesVClassBlue,
        },
        {
          id: "grey",
          name: "Dark Grey Metallic",
          color: "#4B5563",
          image: MercedesVClassGrey,
        },
      ];
    }

    if (
      selectedCar?.name === "Toyota Hiace" ||
      selectedCar?.name?.includes("Toyota Hiace") ||
      selectedCar?.name?.includes("Hiace")
    ) {
      colors = [
        {
          id: "black",
          name: "Black",
          color: "#1A1A1A",
          image: ToyotaHiaceBlack,
        },
        {
          id: "silver",
          name: "Silver",
          color: "#C0C0C0",
          image: ToyotaHiaceSilver,
        },
      ];
    }

    if (
      selectedCar?.name === "Toyota Coaster" ||
      selectedCar?.name?.includes("Toyota Coaster") ||
      selectedCar?.name?.includes("Coaster")
    ) {
      colors = [
        {
          id: "default",
          name: "Default",
          color: "#52A4C1",
          image: ToyotaCoasterDefault,
        },
        {
          id: "safety-robust",
          name: "Safety Robust Body",
          color: "#9699CD",
          image: ToyotaCoasterSafetyRobust,
        },
        {
          id: "white-lavender",
          name: "White / Lavender",
          color: "#E6E6FA",
          image: ToyotaCoasterWhiteLavender,
        },
        {
          id: "white-turquoise",
          name: "White / Turquoise",
          color: "#40E0D0",
          image: ToyotaCoasterWhiteTurquoise,
        },
        {
          id: "white-beige",
          name: "White Beige",
          color: "#F5F5DC",
          image: ToyotaCoasterWhiteBeige,
        },
        {
          id: "yellow",
          name: "Yellow",
          color: "#FFD700",
          image: ToyotaCoasterYellow,
        },
      ];
    }

    if (
      selectedCar?.name === "Coach 49 Seats" ||
      selectedCar?.name?.includes("Coach 49 Seats") ||
      selectedCar?.name?.includes("Coach 49 Seats") ||
      selectedCar?.name?.includes("49 Seater")
    ) {
      colors = [
        {
          id: "default",
          name: "Default",
          color: "#253F58",
          image: ChineseBus49Default,
        },
        {
          id: "yu-tong",
          name: "Yu Tong Coach",
          color: "#E8F2F6",
          image: ChineseBus49YuTong,
        },
        {
          id: "king-long",
          name: "King Long Bus",
          color: "#4D85B4",
          image: ChineseBus49KingLong,
        },
      ];
    }

    // Default colors for other vehicles
    if (colors.length === 0) {
      colors = [
        {
          id: "default",
          name: "Default",
          color: "#52A4C1",
          image: selectedCar?.image,
        },
      ];
    }

    // Filter out white colors
    return colors.filter((color) => !isWhiteColor(color.color, color.name));
  };

  const colorOptions = getColorOptions();
  const currentColorImage =
    colorOptions[selectedColor]?.image || selectedCar?.image;

  // Validate and adjust selectedColor if it's out of bounds
  React.useEffect(() => {
    if (colorOptions.length > 0 && selectedColor >= colorOptions.length) {
      setSelectedColor(0);
    }
  }, [colorOptions.length, selectedColor]);

  const handleColorSelect = (index: number) => {
    if (index >= 0 && index < colorOptions.length) {
      setSelectedColor(index);
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
            {/* Back Button Skeleton */}
            <Box sx={{ mb: 4 }}>
              <Skeleton
                variant="rectangular"
                width={200}
                height={40}
                animation="wave"
                sx={{ borderRadius: "8px" }}
              />
            </Box>

            <Grid container spacing={4}>
              {/* Vehicle Image Skeleton - Left Side */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Card
                  sx={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Skeleton
                      variant="rectangular"
                      height={500}
                      animation="wave"
                      sx={{ borderRadius: "12px" }}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Vehicle Details Skeleton - Right Side */}
              <Grid size={{ xs: 12, md: 7 }}>
                <Card
                  sx={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={50}
                      animation="wave"
                      sx={{ mb: 4 }}
                    />

                    <Grid container spacing={3} sx={{ mb: 4 }}>
                      <Grid size={{ xs: 6 }}>
                        <Skeleton
                          variant="text"
                          width="40%"
                          height={20}
                          animation="wave"
                          sx={{ mb: 1 }}
                        />
                        <Skeleton
                          variant="text"
                          width="60%"
                          height={30}
                          animation="wave"
                          sx={{ mb: 3 }}
                        />
                        <Skeleton
                          variant="text"
                          width="40%"
                          height={20}
                          animation="wave"
                          sx={{ mb: 1 }}
                        />
                        <Skeleton
                          variant="text"
                          width="50%"
                          height={30}
                          animation="wave"
                        />
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Skeleton
                          variant="text"
                          width="40%"
                          height={20}
                          animation="wave"
                          sx={{ mb: 1 }}
                        />
                        <Skeleton
                          variant="text"
                          width="60%"
                          height={30}
                          animation="wave"
                          sx={{ mb: 3 }}
                        />
                        <Skeleton
                          variant="text"
                          width="40%"
                          height={20}
                          animation="wave"
                          sx={{ mb: 1 }}
                        />
                        <Skeleton
                          variant="text"
                          width="50%"
                          height={30}
                          animation="wave"
                          sx={{ mb: 3 }}
                        />
                        <Skeleton
                          variant="text"
                          width="40%"
                          height={20}
                          animation="wave"
                          sx={{ mb: 1 }}
                        />
                        <Skeleton
                          variant="text"
                          width="50%"
                          height={30}
                          animation="wave"
                        />
                      </Grid>
                    </Grid>

                    <Skeleton
                      variant="rectangular"
                      height={48}
                      animation="wave"
                      sx={{ borderRadius: "8px" }}
                    />
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

  if (!selectedCar) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Vehicle Not Found
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push("/our-fleet")}
            sx={{
              backgroundColor: "#52A4C1",
              "&:hover": {
                backgroundColor: "#4a94b1",
              },
            }}
          >
            {t("common.back")} {t("nav.fleet")}
          </Button>
        </Container>
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
              src={HeroImages.src || HeroImages}
              alt="Vehicle Details Hero Background"
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
                Vehicle Details
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
                Explore all the details about this vehicle
              </Typography>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: 8, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Container maxWidth="lg">
          {/* Back Button */}
          {/* <IconButton
            onClick={() => router.push("/our-fleet")}
            sx={{
              mb: 4,
              color: "#52A4C1",
              "&:hover": {
                backgroundColor: "rgba(82, 164, 193, 0.08)",
              },
            }}
          >
            <ArrowBackIcon />
            <Typography variant="body1" sx={{ ml: 1, fontWeight: 500 }}>
              {t("common.back")} {t("nav.fleet")}
            </Typography>
          </IconButton> */}
           <Button
                startIcon={<ArrowBack />}
                onClick={() => router.push("/our-fleet")}
                sx={{
                  color: "#52A4C1",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "rgba(82, 164, 193, 0.1)",
                  },
                }}
              >
                Back to Fleet
              </Button>

          <Grid container spacing={4} mt={2}>
            {/* Vehicle Image with 360 Viewer - Left Side */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Card
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Vehicle Image Container */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: { xs: 300, sm: 400, md: 500 },
                      borderRadius: "12px",
                      overflow: "hidden",
                      backgroundColor: "#f5f5f5",
                      mb: 3,
                      cursor: "zoom-in",
                    }}
                    onMouseEnter={() => setHoveredMainImage(true)}
                    onMouseLeave={() => setHoveredMainImage(false)}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        transform: hoveredMainImage
                          ? "scale(1.15)"
                          : "scale(1)",
                        transition:
                          "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        willChange: "transform",
                      }}
                    >
                      <Image
                        key={selectedColor}
                        src={currentColorImage?.src || currentColorImage}
                        alt={`${selectedCar.name} - ${
                          colorOptions[selectedColor]?.name || "Default"
                        }`}
                        fill
                        style={{ objectFit: "contain" }}
                        priority
                      />
                    </Box>
                    <Chip
                      label="Premium"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        backgroundColor: "rgba(255, 255, 255, 0.98)",
                        color: "#52A4C1",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        height: "28px",
                        px: 2,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        zIndex: 2,
                        border: "1px solid rgba(82, 164, 193, 0.2)",
                        pointerEvents: "none",
                      }}
                    />
                  </Box>

                  {/* Color Swatches - Hidden per requirements */}
                  {false &&
                    (selectedCar?.name === "Ford Taurus" ||
                      selectedCar?.name === "GMC Yukon" ||
                      selectedCar?.name?.includes("GMC") ||
                      selectedCar?.name === "BMW 5 Series" ||
                      selectedCar?.name?.includes("BMW 5") ||
                      selectedCar?.name === "BMW 7 Series" ||
                      selectedCar?.name?.includes("BMW 7") ||
                      selectedCar?.name === "Mercedes S450" ||
                      selectedCar?.name?.includes("Mercedes S450") ||
                      selectedCar?.name?.includes("Mercedes S Class") ||
                      selectedCar?.name === "Mercedes V Class" ||
                      selectedCar?.name?.includes("Mercedes V Class") ||
                      selectedCar?.name?.includes("Mercedes V-Class") ||
                      selectedCar?.name === "Toyota Hiace" ||
                      selectedCar?.name?.includes("Toyota Hiace") ||
                      selectedCar?.name?.includes("Hiace") ||
                      selectedCar?.name === "Toyota Coaster" ||
                      selectedCar?.name?.includes("Toyota Coaster") ||
                      selectedCar?.name?.includes("Coaster") ||
                      selectedCar?.name === "Coach 49 Seats" ||
                      selectedCar?.name?.includes("Coach 49 Seats") ||
                      selectedCar?.name?.includes("Coach 49 Seats") ||
                      selectedCar?.name?.includes("49 Seater")) &&
                    colorOptions.length > 1 && (
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            mb: 2,
                            color: "#1a1a1a",
                            textAlign: "center",
                          }}
                        >
                          {t("vehicle.selectColor")}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 1.5,
                            flexWrap: "wrap",
                            alignItems: "center",
                          }}
                        >
                          {colorOptions.map((color, index) => (
                            <Box
                              key={color.id}
                              onClick={() => handleColorSelect(index)}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                cursor: "pointer",
                                transition: "transform 0.2s",
                                "&:hover": {
                                  transform: "scale(1.1)",
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: "8px",
                                  backgroundColor: color.color,
                                  border:
                                    selectedColor === index
                                      ? "3px solid #52A4C1"
                                      : "2px solid #E0E0E0",
                                  boxShadow:
                                    selectedColor === index
                                      ? "0 4px 12px rgba(82, 164, 193, 0.4)"
                                      : "0 2px 4px rgba(0,0,0,0.1)",
                                  mb: 0.5,
                                  transition: "all 0.2s",
                                }}
                              />
                              {selectedColor === index && (
                                <Box
                                  sx={{
                                    width: "100%",
                                    height: 2,
                                    backgroundColor: "#52A4C1",
                                    borderRadius: 1,
                                  }}
                                />
                              )}
                            </Box>
                          ))}
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            textAlign: "center",
                            color: "#666",
                            mt: 1,
                            fontStyle: "italic",
                          }}
                        >
                          {colorOptions[selectedColor]?.name}
                        </Typography>
                      </Box>
                    )}

                  {/* Disclaimer */}
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      textAlign: "center",
                      color: "#999",
                      fontSize: "0.7rem",
                      mt: 3,
                      fontStyle: "italic",
                      lineHeight: 1.4,
                    }}
                  >
                    Images shown are for illustrative purposes only. Actual
                    specifications, features, and details may vary.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Vehicle Details - Right Side */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Card
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  height: "100%",
                }}
              >
                <CardContent
                  sx={{
                    p: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Vehicle Name */}
                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                      fontWeight: "bold",
                      color: "#1a1a1a",
                      mb: 4,
                      fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
                    }}
                  >
                    {selectedCar.name}
                  </Typography>

                  {/* Vehicle Details Grid */}
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    {/* Left Column */}
                    <Grid size={{ xs: 6 }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            mb: 1,
                            display: "block",
                          }}
                        >
                          {t("booking.price")}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#52A4C1",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                          }}
                        >
                          {selectedCar.price}
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Right Column */}
                    <Grid size={{ xs: 6 }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            mb: 1,
                            display: "block",
                          }}
                        >
                          Duration
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#1a1a1a",
                            fontSize: "1.25rem",
                            fontWeight: 600,
                          }}
                        >
                          {selectedCar.duration}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            mb: 1,
                            display: "block",
                          }}
                        >
                          Class
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#1a1a1a",
                            fontSize: "1.25rem",
                            fontWeight: 600,
                          }}
                        >
                          {selectedCar.class}
                        </Typography>
                      </Box>
                      {selectedCar.transport && (
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            mb: 1,
                            display: "block",
                          }}
                        >
                          Transportation
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#1a1a1a",
                            fontSize: "1.25rem",
                            fontWeight: 600,
                          }}
                        >
                          {selectedCar.transport}
                        </Typography>
                      </Box>
                      )}
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            mb: 1,
                            display: "block",
                          }}
                        >
                          Branch
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#1a1a1a",
                            fontSize: "1.25rem",
                            fontWeight: 600,
                          }}
                        >
                          {selectedCar.branch}
                        </Typography>
                      </Box>


                     
                      
                      
                    </Grid>
                  </Grid>

                  {/* Book Now Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleBookNow}
                    sx={{
                      backgroundColor: "#52A4C1",
                      color: "white",
                      py: 1.5,
                      fontWeight: "bold",
                      textTransform: "none",
                      borderRadius: "8px",
                      fontSize: "1.1rem",
                      "&:hover": {
                        backgroundColor: "#4a94b1",
                      },
                    }}
                  >
                    {t("vehicle.bookNow")}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Vehicle Specifications Section - Only for Ford Taurus */}
          {selectedCar?.name === "Ford Taurus" && (
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#1a1a1a",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                {t("vehicle.specifications")}
              </Typography>

              <Grid container spacing={3}>
                {/* Mechanical Specifications */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        Mechanical
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Engine
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          2.0L I-4 EcoBoost®
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          1.5L I-4 Hybrid
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Transmission
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          8-Speed Automatic / CVT
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Drive Configuration
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          FWD
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Exterior Specifications */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        Exterior
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Head Lamps
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Auto (LED)
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Tail Lamps
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          LED
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Bodystyle
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          4-Door
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Wheel Specs
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          18" / 19" Alloy
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Interior Specifications */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        {t("vehicle.interior")}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Seating
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Available seating for 5
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Air Conditioning
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Single Auto / Dual-zone
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Infotainment
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          SYNC®4
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Screen
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          13.2" Touch Screen
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* GMC Yukon Denali Features Section */}
          {(selectedCar?.name === "GMC Yukon" ||
            selectedCar?.name?.includes("GMC")) && (
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#1a1a1a",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                Denali Features
              </Typography>

              <Grid container spacing={3}>
                {/* Key Features */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        Includes Denali Key Standard Features, Plus Adds or
                        Substitutes
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#1a1a1a",
                            mb: 1.5,
                            display: "flex",
                            alignItems: "flex-start",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{ color: "#52A4C1", mr: 1, fontWeight: "bold" }}
                          >
                            •
                          </Box>
                          <Box component="span">
                            Super Cruise hands-free driver assistance
                            technology* with 3-year OnStar® One plan*
                          </Box>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#1a1a1a",
                            mb: 1.5,
                            display: "flex",
                            alignItems: "flex-start",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{ color: "#52A4C1", mr: 1, fontWeight: "bold" }}
                          >
                            •
                          </Box>
                          <Box component="span">
                            Air Ride Adaptive Suspension
                          </Box>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#1a1a1a",
                            mb: 1.5,
                            display: "flex",
                            alignItems: "flex-start",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{ color: "#52A4C1", mr: 1, fontWeight: "bold" }}
                          >
                            •
                          </Box>
                          <Box component="span">
                            24" selective machined and painted After Midnight
                            Metallic aluminum wheels
                          </Box>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#1a1a1a",
                            mb: 1.5,
                            display: "flex",
                            alignItems: "flex-start",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{ color: "#52A4C1", mr: 1, fontWeight: "bold" }}
                          >
                            •
                          </Box>
                          <Box component="span">
                            16-way power front seats with massage feature
                          </Box>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#1a1a1a",
                            display: "flex",
                            alignItems: "flex-start",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{ color: "#52A4C1", mr: 1, fontWeight: "bold" }}
                          >
                            •
                          </Box>
                          <Box component="span">
                            Bose* 18-speaker sound system
                          </Box>
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Available Features */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        Key Available Features*
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#1a1a1a",
                            mb: 1.5,
                            display: "flex",
                            alignItems: "flex-start",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{ color: "#52A4C1", mr: 1, fontWeight: "bold" }}
                          >
                            •
                          </Box>
                          <Box component="span">Night Vision*</Box>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#1a1a1a",
                            display: "flex",
                            alignItems: "flex-start",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{ color: "#52A4C1", mr: 1, fontWeight: "bold" }}
                          >
                            •
                          </Box>
                          <Box component="span">
                            Second-row heated and ventilated executive seating*
                            with massage feature and Bose* head-restraint
                            speakers
                          </Box>
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#757575",
                          fontSize: "0.7rem",
                          fontStyle: "italic",
                          mt: 2,
                          display: "block",
                        }}
                      >
                        *Available features may vary by trim and model year.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* BMW 5 Series Specifications Section */}
          {(selectedCar?.name === "BMW 5 Series" ||
            selectedCar?.name?.includes("BMW 5")) && (
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#1a1a1a",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                {t("vehicle.specifications")}
              </Typography>

              <Grid container spacing={3}>
                {/* Performance Specifications */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        Performance
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Engine
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          3.0L I-6 Turbocharged
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          2.0L I-4 Turbocharged
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Horsepower
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Up to 523 HP
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Transmission
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          8-Speed Sport Automatic
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Drive Type
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Rear-Wheel Drive / xDrive AWD
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Exterior Specifications */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        Exterior
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Headlights
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Adaptive LED Headlights
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Laserlight (Available)
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Wheels
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          18" / 19" / 20" Alloy Wheels
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Body Style
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          4-Door Sedan
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Paint Options
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Solid, Metallic, and Individual Colors
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Interior & Technology */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        {t("vehicle.interior")} & Technology
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Seating
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Available seating for 5
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Sport Seats (Available)
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Infotainment
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          BMW iDrive 8.5
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          14.9" Curved Display
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Sound System
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Harman Kardon* Surround Sound
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Bowers & Wilkins* (Available)
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Climate Control
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          4-Zone Automatic Climate Control
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Mercedes S450 Specifications Section */}
          {(selectedCar?.name === "Mercedes S450" ||
            selectedCar?.name?.includes("Mercedes S450") ||
            selectedCar?.name?.includes("Mercedes S Class")) && (
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#1a1a1a",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                {t("vehicle.specifications")}
              </Typography>

              <Grid container spacing={3}>
                {/* Dimensions & General */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        Dimensions
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Overall Length
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          5141 mm / 16'10" feet
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Overall Width
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          1905 mm / 6'3" feet
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Overall Height
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          1498 mm / 4'11" feet
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Wheel Base
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          3035 mm
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Ground Clearance
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          127 mm
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Kerb Weight
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          2015 KG
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Boot Space
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          529 L
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Engine & Performance */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        {t("vehicle.engine")} & {t("vehicle.performance")}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Engine Type
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Petrol, Turbo Charger
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Displacement
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          2999 cc
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Cylinders
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          6 Cylinders, V Configuration
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Horse Power
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          367 HP @ 6100 RPM
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Torque
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          500 Nm @ 4000 RPM
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Compression Ratio
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          10.5:1
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Fuel System
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Electronic Fuel Injection
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Max Speed
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          260 KM/H
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Transmission & Steering */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        Transmission & Steering
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Transmission Type
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Automatic (AT)
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Gearbox
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          9-Speed
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Drive Train
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          RWD (Rear-Wheel Drive)
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Steering Type
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Rack & Pinion
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Power Assisted
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Electric
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Minimum Turning Radius
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          6.1m
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Seating Capacity
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          5 persons
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          No. of Doors
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          4 doors
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* BMW 7 Series Specifications Section */}
          {(selectedCar?.name === "BMW 7 Series" ||
            selectedCar?.name?.includes("BMW 7")) && (
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#1a1a1a",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                {t("vehicle.specifications")}
              </Typography>

              <Grid container spacing={3}>
                {/* Overview & Dimensions */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        Overview
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Dimensions
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          212.2" L x 76.8" W x 60.8" H
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Seating Capacity
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Up to 5 persons
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          MSRP
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          From $97,300
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Fuel Tank Capacity
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          19.5 gallons
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Engine & Performance */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        {t("vehicle.engine")} & {t("vehicle.performance")}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Horsepower
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Up to 650 HP
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Engine Options
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          3.0L I-6 TwinPower Turbo
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          4.4L V-8 TwinPower Turbo
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Electric Motor (i7 models)
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          0-60 MPH
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          4.1 - 5.2 seconds
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Drive Train
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          RWD / xDrive AWD
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Technology & Features */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        {t("vehicle.features")}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Operating System
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          BMW OS 8.5
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Theater Screen
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          31" 8K with Amazon Fire TV
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          {t("vehicle.safety")} {t("vehicle.features")}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Active Blind Spot Protection
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Frontal Collision Warning
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Lane Departure Warning
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Fuel Economy
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          18-31 mpg (city/highway)
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          65 mpge (750e xDrive)
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Mercedes V Class Specifications Section */}
          {(selectedCar?.name === "Mercedes V Class" ||
            selectedCar?.name?.includes("Mercedes V Class") ||
            selectedCar?.name?.includes("Mercedes V-Class")) && (
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#1a1a1a",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                {t("vehicle.specifications")}
              </Typography>

              <Grid container spacing={3}>
                {/* Seating & Interior */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        Seating & Interior
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Seating Configuration
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          3-Seater Bench 1st Row
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          3-Seater Bench 2nd Row
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Climate Control
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          THERMOTRONIC Automatic
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Tempmatic in Rear
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          {t("vehicle.interior")} Features
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Ambience Lighting (64 Colors)
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Comfort Seats with Lumbar Support
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Keyless Start
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Convenience
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Electric Sliding Doors
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Electric Tailgate
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Technology & Entertainment */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        Technology & Entertainment
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Multimedia System
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          MBUX with 12.3" Touchscreen
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Dual High-Resolution Displays
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Connectivity
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Apple CarPlay & Android Auto
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Wireless Charging
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          USB Ports & SD Card Slot
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Audio System
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          2-Way Speaker System
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          FrontBass Speakers
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Digital Radio
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Safety Services
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Emergency Call System (eCall)
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Breakdown Management
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Safety & Driver Assistance */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        Safety & Driver Assistance
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Active Safety
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Active Brake Assist
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Active Distance Assist DISTRONIC
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Active Lane Keeping Assist
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Blind Spot Assist
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Airbags
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Driver & Front Passenger
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Sidebags & Windowbags
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Centre Airbag
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Parking & Assistance
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Active Parking Assist
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          360° Camera
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Crosswind Assist
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Driving Modes
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Agility Select: Comfort, ECO, Sport, Individual
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          ECO Start-Stop Function
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Toyota Hiace Specifications Section */}
          {(selectedCar?.name === "Toyota Hiace" ||
            selectedCar?.name?.includes("Toyota Hiace") ||
            selectedCar?.name?.includes("Hiace")) && (
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#1a1a1a",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                {t("vehicle.specifications")}
              </Typography>

              <Grid container spacing={3}>
                {/* Engine & Performance */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        {t("vehicle.engine")} & {t("vehicle.performance")}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Engine Type
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          2TR-FE Gasoline
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Fuel System
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Electronic Fuel Injection
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Valve Mechanism
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          16 Valve DOHC with VVT-i
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Transmission
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Continuously Variable Transmission (CVT)
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Body Style
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Commercial Vehicles
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Safety Features */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        {t("vehicle.safety")} {t("vehicle.features")}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Braking System
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          ABS (Anti-lock Brake System)
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Brake Pedal Intrusion-Reduction
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Safety Systems
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Superior Active Safety System
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Dynamic Stability Control
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Crumple Zone Protection
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Suspension
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Front Suspension - Double Wishbone
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Durability
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Corrosion Resistant Construction
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Long-term Reliability
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Overview & Features */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        Overview & Features
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Year
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          2025
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Make & Model
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Toyota Hiace
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Key Features
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Proven Track Record of Durability
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Impressive Handling & Stability
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Passenger Safety Focused
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Vehicle Investment
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Long-term Reliability Protection
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Vehicle Investment Security
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Toyota Hiace Interior Section */}
          {(selectedCar?.name === "Toyota Hiace" ||
            selectedCar?.name?.includes("Toyota Hiace") ||
            selectedCar?.name?.includes("Hiace")) && (
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#1a1a1a",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                {t("vehicle.interior")} {t("vehicle.features")}
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "300px",
                        cursor: "zoom-in",
                        overflow: "hidden",
                      }}
                      onMouseEnter={() => setHoveredInteriorImage(0)}
                      onMouseLeave={() => setHoveredInteriorImage(null)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transform:
                            hoveredInteriorImage === 0
                              ? "scale(1.15)"
                              : "scale(1)",
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          willChange: "transform",
                        }}
                      >
                        <Image
                          src={ToyotaHiaceInteriorDesign}
                          alt="Interior Design"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1a1a1a",
                          textAlign: "center",
                        }}
                      >
                        {t("vehicle.interior")} Design
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "300px",
                        cursor: "zoom-in",
                        overflow: "hidden",
                      }}
                      onMouseEnter={() => setHoveredInteriorImage(1)}
                      onMouseLeave={() => setHoveredInteriorImage(null)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transform:
                            hoveredInteriorImage === 1
                              ? "scale(1.15)"
                              : "scale(1)",
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          willChange: "transform",
                        }}
                      >
                        <Image
                          src={ToyotaHiaceActiveHeadRest}
                          alt="Active Head Rest"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1a1a1a",
                          textAlign: "center",
                        }}
                      >
                        Active Head Rest
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "300px",
                        cursor: "zoom-in",
                        overflow: "hidden",
                      }}
                      onMouseEnter={() => setHoveredInteriorImage(2)}
                      onMouseLeave={() => setHoveredInteriorImage(null)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transform:
                            hoveredInteriorImage === 2
                              ? "scale(1.15)"
                              : "scale(1)",
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          willChange: "transform",
                        }}
                      >
                        <Image
                          src={ToyotaHiaceSpaceComfort}
                          alt="Space & Comfort"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1a1a1a",
                          textAlign: "center",
                        }}
                      >
                        Space & Comfort
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "300px",
                        cursor: "zoom-in",
                        overflow: "hidden",
                      }}
                      onMouseEnter={() => setHoveredInteriorImage(3)}
                      onMouseLeave={() => setHoveredInteriorImage(null)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transform:
                            hoveredInteriorImage === 3
                              ? "scale(1.15)"
                              : "scale(1)",
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          willChange: "transform",
                        }}
                      >
                        <Image
                          src={ToyotaHiaceRearRecliningSeats}
                          alt="Rear Reclining Seats"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1a1a1a",
                          textAlign: "center",
                        }}
                      >
                        Rear Reclining Seats
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "250px",
                        cursor: "zoom-in",
                        overflow: "hidden",
                      }}
                      onMouseEnter={() => setHoveredInteriorImage(4)}
                      onMouseLeave={() => setHoveredInteriorImage(null)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transform:
                            hoveredInteriorImage === 4
                              ? "scale(1.15)"
                              : "scale(1)",
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          willChange: "transform",
                        }}
                      >
                        <Image
                          src={ToyotaHiaceDialControls}
                          alt="Dial Controls"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1a1a1a",
                          textAlign: "center",
                        }}
                      >
                        Dial Controls
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "250px",
                        cursor: "zoom-in",
                        overflow: "hidden",
                      }}
                      onMouseEnter={() => setHoveredInteriorImage(5)}
                      onMouseLeave={() => setHoveredInteriorImage(null)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transform:
                            hoveredInteriorImage === 5
                              ? "scale(1.15)"
                              : "scale(1)",
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          willChange: "transform",
                        }}
                      >
                        <Image
                          src={ToyotaHiaceDualAcControl}
                          alt="Dual A/C Control"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1a1a1a",
                          textAlign: "center",
                        }}
                      >
                        Dual A/C Control
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "250px",
                        cursor: "zoom-in",
                        overflow: "hidden",
                      }}
                      onMouseEnter={() => setHoveredInteriorImage(6)}
                      onMouseLeave={() => setHoveredInteriorImage(null)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transform:
                            hoveredInteriorImage === 6
                              ? "scale(1.15)"
                              : "scale(1)",
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          willChange: "transform",
                        }}
                      >
                        <Image
                          src={ToyotaHiaceDualAcVent}
                          alt="Dual A/C with Separate Air Vent"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1a1a1a",
                          textAlign: "center",
                        }}
                      >
                        Dual A/C with Separate Air Vent
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "300px",
                        cursor: "zoom-in",
                        overflow: "hidden",
                      }}
                      onMouseEnter={() => setHoveredInteriorImage(7)}
                      onMouseLeave={() => setHoveredInteriorImage(null)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transform:
                            hoveredInteriorImage === 7
                              ? "scale(1.15)"
                              : "scale(1)",
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          willChange: "transform",
                        }}
                      >
                        <Image
                          src={ToyotaHiaceLowerGloveBox}
                          alt="Lower Glove Box"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1a1a1a",
                          textAlign: "center",
                        }}
                      >
                        Lower Glove Box
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "300px",
                        cursor: "zoom-in",
                        overflow: "hidden",
                      }}
                      onMouseEnter={() => setHoveredInteriorImage(8)}
                      onMouseLeave={() => setHoveredInteriorImage(null)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transform:
                            hoveredInteriorImage === 8
                              ? "scale(1.15)"
                              : "scale(1)",
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          willChange: "transform",
                        }}
                      >
                        <Image
                          src={ToyotaHiaceLuggageSpace}
                          alt="Luggage Space"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1a1a1a",
                          textAlign: "center",
                        }}
                      >
                        Luggage Space
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Toyota Coaster Specifications Section */}
          {(selectedCar?.name === "Toyota Coaster" ||
            selectedCar?.name?.includes("Toyota Coaster") ||
            selectedCar?.name?.includes("Coaster")) && (
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#1a1a1a",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                {t("vehicle.specifications")}
              </Typography>

              <Grid container spacing={3}>
                {/* Overview & Dimensions */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        Overview & Dimensions
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Model
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Toyota Coaster 29 Seater F/L
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Dimensions
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          6990 x 2080 x 2635 mm
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Ground Clearance
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          185 mm
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Seating Capacity
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          29 Persons
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Kerb Weight
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          5670 KG
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Tyre Size
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          215/70/18
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Engine & Performance */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        {t("vehicle.engine")} & {t("vehicle.performance")}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Engine
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          4.0L Turbo Diesel (1GD-FTV)
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Displacement
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          4009 cc
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Horsepower
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          134 HP (100 kW)
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Torque
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          353 Nm
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Transmission
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Manual
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Fuel Type
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Diesel
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Mileage
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          7-9 KM/L
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Top Speed
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          160 KM/H
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Features & Safety */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        {t("vehicle.features")} & {t("vehicle.safety")}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          {t("vehicle.safety")} {t("vehicle.features")}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          2 Airbags (Driver & Front Passenger)
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          ABS (Anti-lock Brake System)
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Seat Belts with Pretensioners
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Rigid Circular Body Structure
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Comfort Features
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Rear AC Vents
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Adjustable Headlights
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Fog Lights
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Power Door Locks
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Rear Speakers
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Fuel Tank Capacity
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          95 L
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Toyota Coaster Interior Section */}
          {(selectedCar?.name === "Toyota Coaster" ||
            selectedCar?.name?.includes("Toyota Coaster") ||
            selectedCar?.name?.includes("Coaster")) && (
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#1a1a1a",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                {t("vehicle.interior")} {t("vehicle.features")}
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "300px",
                        cursor: "zoom-in",
                        overflow: "hidden",
                      }}
                      onMouseEnter={() => setHoveredInteriorImage(9)}
                      onMouseLeave={() => setHoveredInteriorImage(null)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transform:
                            hoveredInteriorImage === 9
                              ? "scale(1.15)"
                              : "scale(1)",
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          willChange: "transform",
                        }}
                      >
                        <Image
                          src={ToyotaCoasterInterior}
                          alt="Interior"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1a1a1a",
                          textAlign: "center",
                        }}
                      >
                        {t("vehicle.interior")}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "300px",
                        cursor: "zoom-in",
                        overflow: "hidden",
                      }}
                      onMouseEnter={() => setHoveredInteriorImage(10)}
                      onMouseLeave={() => setHoveredInteriorImage(null)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transform:
                            hoveredInteriorImage === 10
                              ? "scale(1.15)"
                              : "scale(1)",
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          willChange: "transform",
                        }}
                      >
                        <Image
                          src={ToyotaCoasterAccommodate}
                          alt="Made to Accommodate"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1a1a1a",
                          textAlign: "center",
                        }}
                      >
                        Made to Accommodate
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#757575",
                          textAlign: "center",
                          display: "block",
                          mt: 0.5,
                        }}
                      >
                        Seats up to 30 people comfortably with high roof and
                        wide body
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "300px",
                        cursor: "zoom-in",
                        overflow: "hidden",
                      }}
                      onMouseEnter={() => setHoveredInteriorImage(11)}
                      onMouseLeave={() => setHoveredInteriorImage(null)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transform:
                            hoveredInteriorImage === 11
                              ? "scale(1.15)"
                              : "scale(1)",
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          willChange: "transform",
                        }}
                      >
                        <Image
                          src={ToyotaCoasterCreatureComforts}
                          alt="Creature Comforts"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1a1a1a",
                          textAlign: "center",
                        }}
                      >
                        Creature Comforts
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#757575",
                          textAlign: "center",
                          display: "block",
                          mt: 0.5,
                        }}
                      >
                        Large, comfortable seats with individual adjustable
                        air-conditioning vents
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "300px",
                        cursor: "zoom-in",
                        overflow: "hidden",
                      }}
                      onMouseEnter={() => setHoveredInteriorImage(12)}
                      onMouseLeave={() => setHoveredInteriorImage(null)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transform:
                            hoveredInteriorImage === 12
                              ? "scale(1.15)"
                              : "scale(1)",
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          willChange: "transform",
                        }}
                      >
                        <Image
                          src={ToyotaCoasterEasierBoarding}
                          alt="Easier Boarding"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1a1a1a",
                          textAlign: "center",
                        }}
                      >
                        Easier Boarding
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#757575",
                          textAlign: "center",
                          display: "block",
                          mt: 0.5,
                        }}
                      >
                        Deep and large doorstep allows passengers to board more
                        easily and safely
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "300px",
                        cursor: "zoom-in",
                        overflow: "hidden",
                      }}
                      onMouseEnter={() => setHoveredInteriorImage(13)}
                      onMouseLeave={() => setHoveredInteriorImage(null)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transform:
                            hoveredInteriorImage === 13
                              ? "scale(1.15)"
                              : "scale(1)",
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          willChange: "transform",
                        }}
                      >
                        <Image
                          src={ToyotaCoasterEfficientSteering}
                          alt="Efficient Steering"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1a1a1a",
                          textAlign: "center",
                        }}
                      >
                        Efficient Steering
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#757575",
                          textAlign: "center",
                          display: "block",
                          mt: 0.5,
                        }}
                      >
                        Power steering and five-speed manual transmission for
                        easy and comfortable driving
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Chinese Bus 49 Seater Specifications Section */}
          {(selectedCar?.name === "Coach 49 Seats" ||
            selectedCar?.name?.includes("Coach 49 Seats") ||
            selectedCar?.name?.includes("Coach 49 Seats") ||
            selectedCar?.name?.includes("49 Seater")) && (
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#1a1a1a",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                {t("vehicle.specifications")}
              </Typography>

              <Grid container spacing={3}>
                {/* Overview & Dimensions */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        Overview & Dimensions
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Model
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Chinese Bus 49 Seater
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Seating Capacity
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          49 Persons
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Body Type
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Luxury Coach Bus
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Dimensions (L x W x H)
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          ~12000 x 2500 x 3600 mm
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Ground Clearance
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          ~200 mm
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Gross Vehicle Weight
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          ~18000 KG
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Engine & Performance */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        {t("vehicle.engine")} & {t("vehicle.performance")}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Engine Type
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Turbo Diesel
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Displacement
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          ~6000-8000 cc
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Horsepower
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          ~250-350 HP
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Transmission
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Manual Transmission
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Fuel Type
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Diesel
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Fuel Tank Capacity
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          ~200-250 L
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Top Speed
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          ~120-140 KM/H
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Features & Safety */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#52A4C1",
                          mb: 3,
                          pb: 1,
                          borderBottom: "2px solid #52A4C1",
                        }}
                      >
                        {t("vehicle.features")} & {t("vehicle.safety")}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          {t("vehicle.safety")} {t("vehicle.features")}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          ABS (Anti-lock Brake System)
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Airbags (Driver & Front)
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Seat Belts for All Passengers
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Emergency Exits
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Comfort Features
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Air Conditioning System
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Reclining Seats
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Overhead Storage
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Reading Lights
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Audio/Video System
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#757575",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          Additional Features
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Power Steering
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Large Windows
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1a1a1a", mt: 0.5 }}
                        >
                          Luggage Compartment
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default VehicleDetailsPage;
