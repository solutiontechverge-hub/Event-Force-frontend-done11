"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP_PHONE = "966594279012";

const APP_STORE_URL =
  "https://apps.apple.com/in/app/premium-force/id6759467571";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.brandbik.premiumforce";

interface PremiumForceBookingCardProps {
  component?: React.ElementType;
}

const PremiumForceBookingCard = ({
  component = "section",
}: PremiumForceBookingCardProps) => {
  const { t, isRTL, language } = useLanguage();

  const whatsappUrl = useMemo(() => {
    const message = encodeURIComponent(t("bookNow.whatsappPrefill"));
    return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
  }, [t, language]);

  return (
    <Box
      component={component}
      lang={language}
      dir={isRTL ? "rtl" : "ltr"}
      sx={{
        width: "min(680px, 100%)",
        mx: "auto",
        bgcolor: "rgba(18,18,18,.98)",
        border: "1px solid #2b2b2b",
        borderRadius: "26px",
        overflow: "hidden",
        boxShadow: "0 24px 70px rgba(0,0,0,.5)",
      }}
    >
      <Box sx={{ bgcolor: "#080808", p: 2 }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxHeight: { xs: 220, sm: 285 },
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/premium-force-booking-logo.jpg"
            alt="Premium Force"
            width={680}
            height={285}
            priority
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "285px",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </Box>
      </Box>

      <Box
        component="section"
        sx={{
          px: { xs: "18px", sm: "26px" },
          py: { xs: "25px", sm: "30px" },
          pb: { xs: "27px", sm: "32px" },
          textAlign: "center",
        }}
      >
        <Typography
          id="premium-force-booking-title"
          component="h2"
          sx={{
            m: "0 0 12px",
            fontSize: "clamp(27px, 5vw, 39px)",
            lineHeight: 1.3,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {t("bookNow.title")}
        </Typography>

        <Typography
          sx={{
            m: "0 auto 24px",
            maxWidth: 520,
            color: "#d6d6d6",
            fontSize: 17,
            lineHeight: 1.9,
          }}
        >
          {t("bookNow.leadLine1")}
          <br />
          {t("bookNow.leadLine2")}
        </Typography>

        <Box
          component="a"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "block",
            width: "100%",
            py: "17px",
            px: "20px",
            borderRadius: "14px",
            bgcolor: "#25D366",
            color: "#07150b",
            textDecoration: "none",
            fontWeight: 850,
            fontSize: 20,
            transition: "filter 0.2s",
            "&:hover": {
              filter: "brightness(1.05)",
            },
          }}
        >
          {t("bookNow.whatsapp")}
        </Box>

        <Typography
          sx={{
            mt: "10px",
            mb: "25px",
            color: "#8f8f8f",
            fontSize: 13,
          }}
        >
          {t("bookNow.hint")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            my: "7px 18px",
            color: "#999",
            fontSize: 13,
            "&::before, &::after": {
              content: '""',
              flex: 1,
              height: "1px",
              bgcolor: "#303030",
            },
          }}
        >
          {t("bookNow.divider")}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: "12px",
          }}
        >
          <Box
            component="a"
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "block",
              p: "14px 12px",
              borderRadius: "13px",
              border: "1px solid #3a3a3a",
              bgcolor: "#0d0d0d",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              lineHeight: 1.35,
              transition: "border-color 0.2s",
              "&:hover": {
                borderColor: "#52A4C1",
              },
            }}
          >
            <Typography
              component="span"
              sx={{
                display: "block",
                color: "#aaa",
                fontWeight: 500,
                fontSize: 13,
                mb: "2px",
              }}
            >
              {t("bookNow.downloadFrom")}
            </Typography>
            App Store
          </Box>

          <Box
            component="a"
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "block",
              p: "14px 12px",
              borderRadius: "13px",
              border: "1px solid #3a3a3a",
              bgcolor: "#0d0d0d",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              lineHeight: 1.35,
              transition: "border-color 0.2s",
              "&:hover": {
                borderColor: "#52A4C1",
              },
            }}
          >
            <Typography
              component="span"
              sx={{
                display: "block",
                color: "#aaa",
                fontWeight: 500,
                fontSize: 13,
                mb: "2px",
              }}
            >
              {t("bookNow.downloadFrom")}
            </Typography>
            Google Play
          </Box>
        </Box>

        <Typography
          sx={{
            mt: "22px",
            color: "#777",
            fontSize: 12,
          }}
        >
          {t("bookNow.footer")}
        </Typography>
      </Box>
    </Box>
  );
};

export default PremiumForceBookingCard;
