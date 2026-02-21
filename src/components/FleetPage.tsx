// "use client";

// import React, { useState, memo, useMemo, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { useLanguage } from "@/contexts/LanguageContext";
// import { useAuth } from "@/contexts/AuthContext";
// import {
//   Box,
//   Typography,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Chip,
// } from "@mui/material";
// import Image from "next/image";
// import {
//   CarBmw7Series,
//   CarChinesbus49Sea,
//   CarFordTaurus,
//   CarGmc,
//   CarHiace,
//   CarMercedesS450,
//   CarMercedesVClass,
//   CarMw5Series,
// } from "../../public/images";
// import { ScaleInView } from "@/components/animations";
// import { CarToyotaCoaster } from "../../public/images";

// interface Car {
//   name: string;
//   price: string;
//   duration: string;
//   image: any;
//   class: string;
//   year: string;
//   branches: string[];
// }

// const fleet: Car[] = [
//   {
//     name: "Ford Taurus",
//     price: "125 SAR",
//     duration: "Per hour",
//     image: CarFordTaurus,
//     class: "Economy",
//     year: "2024",
//     branches: ["Riyadh", "Jeddah"],
//   },
//   {
//     name: "GMC Yukon",
//     price: "150 SAR",
//     duration: "Per hour",
//     image: CarGmc,
//     class: "SUV",
//     year: "2024",
//     branches: ["Riyadh", "Jeddah"],
//   },

//   {
//     name: "BMW 5 Series",
//     price: "150 SAR",
//     duration: "Per hour",
//     image: CarMw5Series,
//     class: "Luxury",
//     year: "2025",
//     branches: ["Riyadh", "Jeddah"],
//   },
//   {
//     name: "Mercedes S450",
//     price: "400 SAR",
//     duration: "Per hour",
//     image: CarMercedesS450,
//     class: "Luxury",
//     year: "2025",
//     branches: ["Riyadh", "Jeddah"],
//   },
//   {
//     name: "BMW 7 Series",
//     price: "400 SAR",
//     duration: "Per hour",
//     image: CarBmw7Series,
//     class: "Luxury",
//     year: "2025",
//     branches: ["Riyadh", "Jeddah"],
//   },
//   {
//     name: "Mercedes V Class",
//     price: "300 SAR",
//     duration: "Per hour",
//     image: CarMercedesVClass,
//     class: "Van",
//     year: "2024",
//     branches: ["Riyadh", "Jeddah"],
//   },
//   {
//     name: "Toyota Hiace",
//     price: "125 SAR",
//     duration: "Per hour",
//     image: CarHiace,
//     class: "Van",
//     year: "2024",
//     branches: ["Riyadh", "Jeddah"],
//   },
//   {
//     name: "Toyota Coaster",
//     price: "150 SAR",
//     duration: "Per hour",
//     image: CarToyotaCoaster,
//     class: "Bus",
//     year: "2024",
//     branches: ["Riyadh", "Jeddah"],
//   },
//   {
//     name: "Coach 49 Seats",
//     price: "250 SAR",
//     duration: "Per hour",
//     image: CarChinesbus49Sea,
//     class: "Bus",
//     year: "2024",
//     branches: ["Riyadh", "Jeddah"],
//   },
// ];

// const FleetPage = memo(() => {
//   const router = useRouter();
//   const { isAuthenticated } = useAuth();
//   const { t } = useLanguage();
//   const [selectedBranch, setSelectedBranch] = useState("all");
//   const [selectedClass, setSelectedClass] = useState("all");
//   const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(
//     null,
//   );

//   const filteredFleet = useMemo(() => {
//     return fleet.filter((car) => {
//       const branchMatch =
//         selectedBranch === "all" || car.branches.includes(selectedBranch);

//       const classMatch = selectedClass === "all" || car.class === selectedClass;

//       return branchMatch && classMatch;
//     });
//   }, [selectedBranch, selectedClass]);

//   const handleBookCar = useCallback(
//     (index: number) => {
//       const car = filteredFleet[index];
//       if (car) {
//         // Create URL parameters for the selected car
//         const params = new URLSearchParams({
//           car: car.name.toLowerCase().replace(/\s+/g, "-"),
//           price: car.price,
//           duration: car.duration,
//         });

//         // Redirect to manage booking page with car data
//         router.push(`/manage-booking?${params.toString()}`);
//       }
//     },
//     [filteredFleet],
//   );

//   const handleViewDetails = useCallback(
//     (index: number) => {
//       const car = filteredFleet[index];
//       if (car) {
//         const vehicleId = car.name.toLowerCase().replace(/\s+/g, "-");
//         router.push(`/our-fleet/${vehicleId}`);
//       }
//     },
//     [filteredFleet, router],
//   );

//   // const router = useRouter();

//   const nonPremiumCars = [
//     "Ford Taurus",
//     "Coach 49 Seats",
//     "Toyota Coaster",
//     "Toyota Hiace",
//   ];

//   // return (
//   //   <Box sx={{ py: 8, backgroundColor: "white" }}>
//   //     <Container maxWidth="lg">
//   //       {/* Filters */}
//   //       <Box sx={{ mb: 6 }}>
//   //         <Grid container spacing={3} justifyContent="center">
//   //           <Grid size={{ xs: 12, sm: 6 }}>
//   //             <FormControl fullWidth>
//   //               <InputLabel>Branch</InputLabel>
//   //               <Select
//   //                 value={selectedBranch}
//   //                 label="Branch"
//   //                 onChange={(e) => setSelectedBranch(e.target.value)}
//   //                 MenuProps={{
//   //                   disableScrollLock: true,
//   //                 }}
//   //                 sx={{
//   //                   "& .MuiOutlinedInput-root": {
//   //                     borderRadius: "8px",
//   //                   },
//   //                 }}
//   //               >
//   //                 <MenuItem value="all">{t("fleet.selectBranch")}</MenuItem>
//   //                 <MenuItem value="Riyadh">Riyadh</MenuItem>
//   //                 <MenuItem value="Jeddah">Jeddah</MenuItem>
//   //               </Select>
//   //             </FormControl>
//   //           </Grid>
//   //           <Grid size={{ xs: 12, sm: 6 }}>
//   //             <FormControl fullWidth>
//   //               <InputLabel>{t("fleet.fleetClass")}</InputLabel>
//   //               <Select
//   //                 value={selectedClass}
//   //                 label={t("fleet.fleetClass")}
//   //                 onChange={(e) => setSelectedClass(e.target.value)}
//   //                 MenuProps={{
//   //                   disableScrollLock: true,
//   //                 }}
//   //                 sx={{
//   //                   "& .MuiOutlinedInput-root": {
//   //                     borderRadius: "8px",
//   //                   },
//   //                 }}
//   //               >
//   //                 <MenuItem value="all">{t("common.all")}</MenuItem>
//   //                 <MenuItem value="Economy">{t("fleet.economy")}</MenuItem>
//   //                 <MenuItem value="SUV">{t("fleet.suv")}</MenuItem>
//   //                 <MenuItem value="Luxury">{t("fleet.luxury")}</MenuItem>
//   //                 <MenuItem value="Van">{t("fleet.van")}</MenuItem>
//   //                 <MenuItem value="Bus">{t("fleet.bus")}</MenuItem>
//   //               </Select>
//   //             </FormControl>
//   //           </Grid>
//   //         </Grid>
//   //       </Box>

//   //       {/* Fleet Grid */}
//   //       <Grid container spacing={3}>
//   //         {filteredFleet.map((car, index) => (
//   //           <Grid
//   //             size={{ xs: 12, sm: 6, md: 4 }}
//   //             key={`${car.name}-${car.branches}-${car.year}-${index}`}
//   //           >
//   //             <ScaleInView
//   //               initialScale={0.8}
//   //               duration={0.6}
//   //               delay={index * 0.1}
//   //             >
//   //               <Card
//   //                 sx={{
//   //                   height: "100%",
//   //                   borderRadius: "8px",
//   //                   backgroundColor: "#F8F8F8",
//   //                   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//   //                   transition: "transform 0.3s, box-shadow 0.3s",
//   //                   "&:hover": {
//   //                     transform: "translateY(-2px)",
//   //                     boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
//   //                   },
//   //                 }}
//   //               >
//   //                 <CardContent sx={{ p: 3 }}>
//   //                   {/* Vehicle Title - Top Left */}
//   //                   <Typography
//   //                     variant="h6"
//   //                     component="h3"
//   //                     sx={{
//   //                       fontWeight: "bold",
//   //                       color: "#52A4C1",
//   //                       mb: 2,
//   //                       fontSize: "1.1rem",
//   //                       textAlign: "left",
//   //                     }}
//   //                   >
//   //                     {car.name}
//   //                   </Typography>

//   //                   {/* Car Image - Centered */}
//   //                   <Box
//   //                     sx={{
//   //                       position: "relative",
//   //                       width: "100%",
//   //                       height: { xs: 200, sm: 220, md: 240 },
//   //                       mb: 2,
//   //                       backgroundColor: "white",
//   //                       borderRadius: "8px",
//   //                       overflow: "hidden",
//   //                       cursor: "zoom-in",
//   //                     }}
//   //                     onMouseEnter={() => setHoveredImageIndex(index)}
//   //                     onMouseLeave={() => setHoveredImageIndex(null)}
//   //                   >
//   //                     <Box
//   //                       sx={{
//   //                         position: "relative",
//   //                         width: "100%",
//   //                         height: "100%",
//   //                         transform:
//   //                           hoveredImageIndex === index
//   //                             ? "scale(1.15)"
//   //                             : "scale(1)",
//   //                         transition:
//   //                           "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//   //                         willChange: "transform",
//   //                         // Shrink Ford Taurus like BMW
//   //                         ...(car.name
//   //                           .toLowerCase()
//   //                           .includes("ford taurus") && {
//   //                           maxWidth: "85%",
//   //                           maxHeight: "85%",
//   //                           margin: "auto",
//   //                         }),
//   //                       }}
//   //                     >
//   //                       <Image
//   //                         src={car.image.src || car.image}
//   //                         alt={car.name}
//   //                         fill
//   //                         style={{ objectFit: "contain" }}
//   //                       />
//   //                     </Box>

//   //                     {!nonPremiumCars.includes(car.name) && (
//   //                       <Chip
//   //                         label="Premium"
//   //                         size="small"
//   //                         sx={{
//   //                           position: "absolute",
//   //                           top: 12,
//   //                           right: 12,
//   //                           backgroundColor: "rgba(255, 255, 255, 0.98)",
//   //                           color: "#52A4C1",
//   //                           fontWeight: 700,
//   //                           fontSize: "0.7rem",
//   //                           height: "26px",
//   //                           px: 1.8,
//   //                           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//   //                           zIndex: 2,
//   //                           border: "1px solid rgba(82, 164, 193, 0.2)",
//   //                           "& .MuiChip-label": {
//   //                             padding: "0 6px",
//   //                             letterSpacing: "0.5px",
//   //                           },
//   //                         }}
//   //                       />
//   //                     )}
//   //                   </Box>

//   //                   {/* Rent Info - Left Aligned */}
//   //                   <Box sx={{ mb: 2.5, textAlign: "left" }}>
//   //                     <Typography
//   //                       variant="body1"
//   //                       sx={{
//   //                         color: "#333",
//   //                         fontSize: "0.9rem",
//   //                         fontWeight: "500",
//   //                       }}
//   //                     >
//   //                       {t("fleet.rent")}: {car.price} / {car.duration}
//   //                     </Typography>
//   //                   </Box>

//   //                   {/* Buttons - View Details and Book Now */}
//   //                   <Box
//   //                     sx={{
//   //                       display: "flex",
//   //                       gap: 1.5,
//   //                       flexDirection: "column",
//   //                     }}
//   //                   >
//   //                     <Button
//   //                       variant="outlined"
//   //                       fullWidth
//   //                       onClick={() => handleViewDetails(index)}
//   //                       sx={{
//   //                         borderColor: "#52A4C1",
//   //                         color: "#52A4C1",
//   //                         py: 1.2,
//   //                         fontWeight: "bold",
//   //                         textTransform: "none",
//   //                         borderRadius: "8px",
//   //                         fontSize: "0.9rem",
//   //                         "&:hover": {
//   //                           borderColor: "#4a94b1",
//   //                           color: "#4a94b1",
//   //                           backgroundColor: "rgba(82, 164, 193, 0.08)",
//   //                         },
//   //                       }}
//   //                     >
//   //                       {t("fleet.viewDetails")}
//   //                     </Button>
//   //                     <Button
//   //                       variant="contained"
//   //                       fullWidth
//   //                       onClick={() => {
//   //                         const vehicleId = car.name
//   //                           .toLowerCase()
//   //                           .replace(/\s+/g, "-");

//   //                         const bookingUrl = `/manage-booking?car=${vehicleId}&from=fleet`;

//   //                         if (!isAuthenticated) {
//   //                           router.push(
//   //                             `/signup?redirect=${encodeURIComponent(bookingUrl)}`,
//   //                           );
//   //                         } else {
//   //                           router.push(bookingUrl);
//   //                         }
//   //                       }}
//   //                     >
//   //                       {t("fleet.bookNow")}
//   //                     </Button>
//   //                   </Box>
//   //                 </CardContent>
//   //               </Card>
//   //             </ScaleInView>
//   //           </Grid>
//   //         ))}
//   //       </Grid>

//   //       {filteredFleet.length === 0 && (
//   //         <Box sx={{ textAlign: "center", py: 8 }}>
//   //           <Typography variant="h6" color="text.secondary">
//   //             {t("fleet.noVehicles")}
//   //           </Typography>
//   //         </Box>
//   //       )}
//   //     </Container>
//   //   </Box>
//   // );

// return (
//   <Box
//     sx={{
//       py: { xs: 6, md: 10 },
//       px: { xs: 2, md: 4, lg: 6 },

//       background: `
//         linear-gradient(180deg, #f6fbfd 0%, #ffffff 100%)
//       `,
//       minHeight: "100vh",
//     }}
//   >
//     <Container maxWidth="xl">

//       {/* HEADER */}
//       <Box sx={{ mb: 6, textAlign: "center" }}>
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: 700,
//             color: "#111",
//             mb: 1,
//           }}
//         >
//           Premium Fleet Collection
//         </Typography>

//         <Typography color="text.secondary">
//           Choose from our luxury and economy vehicles
//         </Typography>
//       </Box>

//       {/* FILTER BAR */}
//       <Box
//         sx={{
//           mb: 6,
//           p: 3,
//           borderRadius: 3,

//           background: "rgba(255,255,255,0.7)",
//           backdropFilter: "blur(10px)",

//           border: "1px solid rgba(0,0,0,0.05)",

//           boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
//         }}
//       >
//         <Grid container spacing={3}>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <FormControl fullWidth>
//               <InputLabel>Branch</InputLabel>
//               <Select
//                 value={selectedBranch}
//                 label="Branch"
//                 onChange={(e) => setSelectedBranch(e.target.value)}
//               >
//                 <MenuItem value="all">{t("fleet.selectBranch")}</MenuItem>
//                 <MenuItem value="Riyadh">Riyadh</MenuItem>
//                 <MenuItem value="Jeddah">Jeddah</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid size={{ xs: 12, md: 6 }}>
//             <FormControl fullWidth>
//               <InputLabel>{t("fleet.fleetClass")}</InputLabel>
//               <Select
//                 value={selectedClass}
//                 label={t("fleet.fleetClass")}
//                 onChange={(e) => setSelectedClass(e.target.value)}
//               >
//                 <MenuItem value="all">All Classes</MenuItem>
//                 <MenuItem value="Economy">Economy</MenuItem>
//                 <MenuItem value="SUV">SUV</MenuItem>
//                 <MenuItem value="Luxury">Luxury</MenuItem>
//                 <MenuItem value="Van">Van</MenuItem>
//                 <MenuItem value="Bus">Bus</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* FLEET GRID */}
//       <Grid container spacing={4}>
//         {filteredFleet.map((car, index) => (
//           <Grid size={{ xs: 12, sm: 6, md: 4 }} key={car.name}>

//             <Card
//               sx={{
//                 height: "100%",
//                 borderRadius: "18px",

//                 background:
//                   "linear-gradient(180deg,#ffffff 0%,#f9fcff 100%)",

//                 border: "1px solid rgba(82,164,193,0.15)",

//                 boxShadow: "0 10px 30px rgba(0,0,0,0.06)",

//                 transition: "all 0.35s ease",

//                 "&:hover": {
//                   transform: "translateY(-8px)",
//                   boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
//                 },
//               }}
//             >

//               <CardContent>

//                 {/* TITLE */}
//                 <Typography
//                   sx={{
//                     fontWeight: 700,
//                     color: "#52A4C1",
//                     mb: 2,
//                   }}
//                 >
//                   {car.name}
//                 </Typography>

//                 {/* IMAGE */}
//                 <Box
//                   sx={{
//                     position: "relative",
//                     height: 220,
//                     mb: 2,
//                   }}
//                 >
//                   <Image
//                     src={car.image.src || car.image}
//                     alt={car.name}
//                     fill
//                     style={{
//                       objectFit: "contain",
//                       transition: "transform 0.4s",
//                     }}
//                   />
//                 </Box>

//                 {/* PRICE */}
//                 <Typography
//                   sx={{
//                     fontWeight: 600,
//                     mb: 2,
//                   }}
//                 >
//                   {car.price} / {car.duration}
//                 </Typography>

//                 {/* BUTTONS */}
//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>

//                   <Button
//                     variant="outlined"
//                     onClick={() => handleViewDetails(index)}
//                     sx={{
//                       borderRadius: 2,
//                       borderColor: "#52A4C1",
//                       color: "#52A4C1",
//                     }}
//                   >
//                     View Details
//                   </Button>

//                   <Button
//                     variant="contained"
//                     onClick={() => handleBookCar(index)}
//                     sx={{
//                       borderRadius: 2,
//                       background:
//                         "linear-gradient(135deg,#52A4C1,#3c8ca8)",
//                     }}
//                   >
//                     Book Now
//                   </Button>

//                 </Box>

//               </CardContent>

//             </Card>

//           </Grid>
//         ))}
//       </Grid>

//       {/* EMPTY STATE */}
//       {filteredFleet.length === 0 && (
//         <Box textAlign="center" mt={8}>
//           <Typography>No vehicles found</Typography>
//         </Box>
//       )}

//     </Container>
//   </Box>
// );

// });

// FleetPage.displayName = "FleetPage";

// export default FleetPage;

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
  CarToyotaCoaster,
} from "../../public/images";

const PRIMARY = "#52A4C1";

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

  const nonPremiumCars = [
    "Ford Taurus",
    "Coach 49 Seats",
    "Toyota Coaster",
    "Toyota Hiace",
  ];

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

      const vehicleId = car.name.toLowerCase().replace(/\s+/g, "-");

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
      const vehicleId = car.name.toLowerCase().replace(/\s+/g, "-");

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
                      src={car.image.src || car.image}
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
                    {car.price} / {car.duration}
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
