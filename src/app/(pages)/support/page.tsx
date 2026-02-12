"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Chip,
  Divider,
  Button,
  Skeleton,
} from "@mui/material";
import {
  Help,
  QuestionAnswer,
  Description,
  PrivacyTip,
  ArrowForward,
  Support,
  ContactSupport,
} from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfflineFallback from "@/components/OfflineFallback";
import { ScaleInView, SlideUpInView } from "@/components/animations";
import { useOffline } from "@/hooks/useOffline";
import { HeroImages } from "../../../../public/images";

const SupportPage = () => {
  const { isOffline } = useOffline();
  const [isMounted, setIsMounted] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  // Cache support pages when component mounts
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      navigator.serviceWorker.controller
    ) {
      navigator.serviceWorker.controller.postMessage({
        type: "CACHE_SUPPORT_PAGES",
      });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Show offline fallback if offline and no cached content
  if (
    isOffline &&
    typeof window !== "undefined" &&
    !window.navigator.serviceWorker?.controller
  ) {
    return <OfflineFallback showNavigation={true} />;
  }

  // Show skeleton loader while mounting
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
            backgroundColor: "#f5f5f5",
          }}
        >
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
            <Box sx={{ textAlign: "center" }}>
              <Skeleton
                variant="text"
                width="40%"
                height={60}
                animation="wave"
                sx={{ mx: "auto", mb: 2 }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={40}
                animation="wave"
                sx={{ mx: "auto" }}
              />
            </Box>
          </Container>
        </Box>

        {/* Content Skeleton */}
        <Box sx={{ py: 8, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
          <Container maxWidth="lg">
            <Skeleton
              variant="text"
              width="40%"
              height={50}
              animation="wave"
              sx={{ mx: "auto", mb: 6, textAlign: "center" }}
            />
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Card sx={{ mb: 4 }}>
                  <CardContent sx={{ p: 0 }}>
                    {[1, 2, 3, 4].map((item) => (
                      <React.Fragment key={item}>
                        <Box sx={{ p: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                            }}
                          >
                            <Skeleton
                              variant="circular"
                              width={40}
                              height={40}
                              animation="wave"
                            />
                            <Box sx={{ flex: 1 }}>
                              <Skeleton
                                variant="text"
                                width="60%"
                                height={30}
                                animation="wave"
                                sx={{ mb: 1 }}
                              />
                              <Skeleton
                                variant="text"
                                width="100%"
                                height={20}
                                animation="wave"
                              />
                            </Box>
                            <Skeleton
                              variant="rectangular"
                              width={24}
                              height={24}
                              animation="wave"
                            />
                          </Box>
                        </Box>
                        {item < 4 && <Divider />}
                      </React.Fragment>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Card sx={{ p: 3 }}>
                    <Skeleton
                      variant="text"
                      width="50%"
                      height={30}
                      animation="wave"
                      sx={{ mb: 2 }}
                    />
                    <Skeleton
                      variant="rectangular"
                      height={100}
                      animation="wave"
                      sx={{ borderRadius: "8px", mb: 2 }}
                    />
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={20}
                      animation="wave"
                    />
                  </Card>
                  <Card sx={{ p: 3 }}>
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={30}
                      animation="wave"
                      sx={{ mb: 2 }}
                    />
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <Skeleton
                          key={item}
                          variant="rectangular"
                          width={100}
                          height={32}
                          animation="wave"
                          sx={{ borderRadius: "16px" }}
                        />
                      ))}
                    </Box>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Footer />
      </>
    );
  }

  const supportItems = [
    {
      title: "Help Center",
      description:
        "Find answers to common questions and get step-by-step guides",
      icon: <Help />,
      href: "/support/help-center",
      color: "#52A4C1",
    },
    {
      title: "FAQ",
      description: "Browse frequently asked questions for quick solutions",
      icon: <QuestionAnswer />,
      href: "/support/faq",
      color: "#1976d2",
    },
    {
      title: "Terms of Service",
      description: "Read our terms and conditions for using our services",
      icon: <Description />,
      href: "/support/terms",
      color: "#f57c00",
    },
    {
      title: "Privacy Policy",
      description: "Learn how we protect and handle your personal information",
      icon: <PrivacyTip />,
      href: "/support/privacy",
      color: "#9c27b0",
    },
  ];

  const quickActions = [
    {
      title: "Contact Support",
      description: "Get in touch with our support team",
      icon: <ContactSupport />,
      href: "/contact-us",
      color: "#52A4C1",
      type: "link" as const,
    },
    {
      title: "Live Chat",
      description: "Chat with us in real-time",
      icon: <Support />,
      href: "#",
      color: "#1976d2",
      type: "whatsapp" as const,
    },
  ];

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
              alt="Support Center Hero Background"
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
                Support Center
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
                Get help, find answers, and access all the information you need
              </Typography>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      {/* Support Navigation Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <SlideUpInView initialY={60} duration={0.8}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                textAlign: "center",
                mb: 6,
                fontWeight: "bold",
                color: "#333",
              }}
            >
              How Can We Help You?
            </Typography>
          </SlideUpInView>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Card sx={{ mb: 4 }}>
                <CardContent sx={{ p: 0 }}>
                  <List sx={{ p: 0 }}>
                    {supportItems.map((item, index) => (
                      <React.Fragment key={index}>
                        <ListItem disablePadding>
                          <ListItemButton
                            component={Link}
                            href={item.href}
                            sx={{
                              p: 3,
                              "&:hover": {
                                backgroundColor: "#f8f9fa",
                                "& .MuiListItemIcon-root": {
                                  color: item.color,
                                  transform: "scale(1.1)",
                                },
                                "& .MuiListItemText-primary": {
                                  color: item.color,
                                },
                              },
                              transition: "all 0.3s ease",
                            }}
                          >
                            <ListItemIcon sx={{ mr: 3, color: item.color }}>
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="h6"
                                  sx={{ fontWeight: "bold", mb: 1 }}
                                >
                                  {item.title}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#666" }}
                                >
                                  {item.description}
                                </Typography>
                              }
                            />
                            <ArrowForward sx={{ color: "#ccc" }} />
                          </ListItemButton>
                        </ListItem>
                        {index < supportItems.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <ScaleInView initialScale={0.9} duration={0.8} delay={0.2}>
                  <Card sx={{ p: 3, textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mb: 2, color: "#333" }}
                    >
                      Quick Actions
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      {quickActions.map((action, index) => {
                        const commonProps = {
                          variant: "outlined" as const,
                          startIcon: action.icon,
                          sx: {
                            justifyContent: "flex-start",
                            textAlign: "left",
                            p: 2,
                            borderColor: action.color,
                            color: action.color,
                            "&:hover": {
                              backgroundColor: action.color,
                              color: "white",
                              borderColor: action.color,
                            },
                          },
                        };

                        // For "Live Chat", open WhatsApp like on the home page
                        if (action.type === "whatsapp") {
                          return (
                            <Button
                              key={index}
                              {...commonProps}
                              onClick={() => {
                                const phoneNumber = "++966549454525";
                                const message =
                                  "Hello! I need support regarding Event Force services.";
                                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                                window.open(
                                  whatsappUrl,
                                  "_blank",
                                  "noopener,noreferrer",
                                );
                              }}
                            >
                              <Box>
                                <Typography
                                  variant="body2"
                                  sx={{ fontWeight: "bold" }}
                                >
                                  {action.title}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{ opacity: 0.8 }}
                                >
                                  {action.description}
                                </Typography>
                              </Box>
                            </Button>
                          );
                        }

                        // Default behavior: normal link button
                        return (
                          <Button
                            key={index}
                            {...commonProps}
                            component={Link}
                            href={action.href}
                          >
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: "bold" }}
                              >
                                {action.title}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{ opacity: 0.8 }}
                              >
                                {action.description}
                              </Typography>
                            </Box>
                          </Button>
                        );
                      })}
                    </Box>
                  </Card>
                </ScaleInView>

                <ScaleInView initialScale={0.9} duration={0.8} delay={0.4}>
                  <Card sx={{ p: 3, backgroundColor: "#f8f9fa" }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mb: 2, color: "#333" }}
                    >
                      Popular Topics
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {[
                        "Booking Issues",
                        "Payment Problems",
                        "Driver Contact",
                        "Cancellation",
                        "Refunds",
                      ].map((topic, index) => (
                        <Chip
                          key={index}
                          label={topic}
                          size="small"
                          sx={{
                            backgroundColor: "#52A4C1",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#4A8FA8",
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Card>
                </ScaleInView>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Support Section */}
      <Box sx={{ py: 8, backgroundColor: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center" }}>
            <SlideUpInView initialY={60} duration={0.8}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  mb: 4,
                  color: "#333",
                }}
              >
                Still Need Help?
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography
                variant="body1"
                sx={{ mb: 4, color: "#666", maxWidth: "600px", mx: "auto" }}
              >
                If you can't find what you're looking for, our support team is
                ready to help you with any questions or concerns.
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <Button
                variant="contained"
                size="large"
                href="/contact-us"
                sx={{
                  backgroundColor: "#52A4C1",
                  px: 4,
                  py: 1.5,
                  "&:hover": { backgroundColor: "#4A8FA8" },
                }}
              >
                Contact Support
              </Button>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default SupportPage;
