"use client";

import React from "react";
import { Box } from "@mui/material";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PremiumForceBookingCard from "@/components/PremiumForceBookingCard";

const BookNowClient = () => {
  const { language } = useLanguage();

  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          px: "22px",
          py: { xs: 10, sm: 12 },
          background: `
            radial-gradient(circle at 50% 0%, rgba(212,164,62,.10), transparent 34%),
            #080808
          `,
        }}
      >
        <PremiumForceBookingCard key={`book-now-page-${language}`} />
      </Box>
      <Footer />
    </>
  );
};

export default BookNowClient;
