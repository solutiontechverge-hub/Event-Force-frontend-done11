"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Fade,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { BackgroundPopUp } from "../../public/images";
import { THEME } from "@/constants/theme";
import { useRouter } from "next/navigation";

export default function RamadanPopup() {
  const [open, setOpen] = useState(false);

  // ✅ Always show popup on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: "18px",
          overflow: "hidden",
          maxWidth: "520px",
          width: "95%",
        },
      }}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.6)",
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: "relative" }}>
        {/* Close button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Background image */}
        <Box sx={{ position: "relative", height: "520px", width: "100%" }}>
          <Image
            src={BackgroundPopUp}
            alt="Ramadan Kareem"
            fill
            style={{ objectFit: "cover" }}
            priority
          />

          {/* Overlay content */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.9))",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              p: 4,
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#FFD700", mb: 2, fontWeight: "bold" }}
            >
              Ramadan Kareem
            </Typography>

            <Typography sx={{ color: "white", mb: 2 }}>
              VIP Airport Transfers in
              <br />
              Jeddah • Makkah • Medina
            </Typography>

            <Typography sx={{ color: "#ddd" }}>
              • Jeddah Airport to Makkah
              <br />
              • Jeddah Airport to Madinah
              <br />
              • Hotel Transfers
              <br />• VIP Chauffeur Service
            </Typography>

            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                router.push(`/our-fleet`);
              }}
              sx={{
                mt: 3,
                backgroundColor: THEME.colors.primary,
                borderRadius: 2,
                py: 1.5,
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: THEME.colors.primaryDark,
                },
              }}
            >
              Book Now
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
