"use client";

import React from "react";
import { Dialog, DialogContent, IconButton, Box } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import PremiumForceBookingCard from "@/components/PremiumForceBookingCard";
import { useLanguage } from "@/contexts/LanguageContext";

interface HomeBookingPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function HomeBookingPopup({ open, onClose }: HomeBookingPopupProps) {
  const { language } = useLanguage();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="premium-force-booking-title"
      PaperProps={{
        sx: {
          bgcolor: "transparent",
          boxShadow: "none",
          overflow: "visible",
          m: { xs: 1.5, sm: 2 },
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.82)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      <DialogContent sx={{ p: 0, overflow: "visible" }}>
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={onClose}
            aria-label="Close"
            sx={{
              position: "absolute",
              top: { xs: 8, sm: 12 },
              right: { xs: 8, sm: 12 },
              zIndex: 2,
              color: "#fff",
              bgcolor: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.15)",
              "&:hover": { bgcolor: "rgba(82, 164, 193, 0.35)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          <PremiumForceBookingCard
            key={`home-popup-${language}`}
            component="div"
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
