"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { Language as LanguageIcon } from "@mui/icons-material";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // --- Naya useEffect Section ---
  useEffect(() => {
    // Ye line poore webpage ki direction (RTL/LTR) ko forn change karti hai
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language]);
  // ------------------------------

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: "en" | "ar") => {
    setLanguage(lang);
    handleClose();
  };

  const languages = [
    { code: "en" as const, name: "English", nativeName: "English" },
    { code: "ar" as const, name: "Arabic", nativeName: "العربية" },
  ];

  return (
    <Box>
      <Button
        key={language}
        onClick={handleClick}
        sx={{
          backgroundColor: "#52A4C1",
          borderRadius: "8px",
          width: "120px",
          height: "48px",
          px: "24px",
          py: "10px",
          fontSize: "16px",
          fontWeight: "bold",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#4A8FA8",
            transform: "scale(1.05)",
          },
          transition: "all 0.2s",
          border: "1px solid #4A8FA8",
        }}
      >
        <LanguageIcon sx={{ fontSize: "1.2rem", color: "#000000" }} />
        <Typography
          sx={{
            fontSize: language === "ar" ? "0.75rem" : "0.875rem",
            fontWeight: language === "ar" ? 700 : 600,
            color: "#000000",
            ml: 1,
            mr: language === "ar" ? 1 : 0,
          }}
        >
          {languages.find((l) => l.code === language)?.nativeName || "EN"}
        </Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 150,
            backgroundColor: "#1a1a1a",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={language === lang.code}
            sx={{
              color: language === lang.code ? "#52A4C1" : "#ffffff",
              backgroundColor:
                language === lang.code
                  ? "rgba(82, 164, 193, 0.1)"
                  : "transparent",
              "&:hover": {
                backgroundColor: "rgba(82, 164, 193, 0.15)",
              },
              "&.Mui-selected": {
                backgroundColor: "rgba(82, 164, 193, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(82, 164, 193, 0.15)",
                },
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                {lang.nativeName}
              </Typography>
              <Typography
                sx={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.6)" }}
              >
                {lang.name}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
