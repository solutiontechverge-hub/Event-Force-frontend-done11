"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { MobileIcon, EmailIcon, LocationIcon, WhatsAppIcon } from "./icons";
import {
  ScaleInView,
  SlideSidewayInView,
  SlideUpInView,
} from "@/components/animations";
import { sendContactEmail } from "@/services/emailService";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendContactEmail(formData);
      setSnackbar({
        open: true,
        message: t("contact.success"),
        severity: "success",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || t("contact.error"),
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



  return (
    <Box sx={{ py: 10, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Match booking page layout by centering content in a container */}
      <Container maxWidth="lg">
        <Grid
          container
          sx={{
            position: "relative",
            minHeight: { xs: "auto", lg: "500px" },
            width: "100%",
          }}
        >
          {/* Contact Us Card - Left side */}
          <Grid
            size={{ xs: 12, lg: 5 }}
            sx={{
              zIndex: 2,
              position: { xs: "relative", lg: "absolute" },
              top: { xs: 0, lg: 140 },
              left: 0,
              height: { xs: "auto", lg: "392px" },
            }}
          >
            <SlideSidewayInView initialX={-50} duration={0.8}>
              <Card
                sx={{
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  p: { xs: 3, sm: 4, lg: 6 },
                  height: "100%",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: "bold",
                      mb: { xs: 3, sm: 4 },
                      fontFamily: "Poppins, sans-serif",
                      fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                    }}
                  >
                    {t("contact.contactUs")}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: { xs: 1.5, sm: 2 },
                    }}
                  >
                    <IconButton
                      size="small"
                      component="a"
                      href="https://wa.me/966125786869"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: "#52A4C1", mr: { xs: 1.5, sm: 2 } }}
                    >
                      <WhatsAppIcon />
                    </IconButton>
                    <Typography
                      variant="body1"
                      component="a"
                      href="https://wa.me/966125786869"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        fontFamily: "Poppins, sans-serif",
                        lineHeight: 1.6,
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": {
                          color: "#25D366",
                        },
                      }}
                    >
                      Event Force Tel: +9660549454525
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: { xs: 1.5, sm: 2 },
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{ color: "#52A4C1", mr: { xs: 1.5, sm: 2 } }}
                    >
                      <MobileIcon />
                    </IconButton>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        fontFamily: "Poppins, sans-serif",
                        lineHeight: 1.6,
                      }}
                    >
                      +966125786869 
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: { xs: 1.5, sm: 2 },
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{ color: "#52A4C1", mr: { xs: 1.5, sm: 2 } }}
                    >
                      <EmailIcon />
                    </IconButton>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        fontFamily: "Poppins, sans-serif",
                        lineHeight: 1.6,
                        wordBreak: "break-word",
                      }}
                    >
                      info@eventforce.sa.com
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      mb: { xs: 3, sm: 4 },
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        color: "#52A4C1",
                        mr: { xs: 1.5, sm: 2 },
                        mt: "2px",
                      }}
                    >
                      <LocationIcon />
                    </IconButton>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        fontFamily: "Poppins, sans-serif",
                        lineHeight: 1.7,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{ fontWeight: "bold", display: "block", mb: 0.5 }}
                      >
                        {t("contact.headquarters")}:
                      </Box>
                      8303 Al Ghamdi Center, 1st floor, Office #103, Oman
                      Street, Al Baghdadiyah Al Gharbiyah Dist., Jeddah 22234,
                      Kingdom of Saudi Arabia
                      <Box
                        component="span"
                        sx={{
                          fontWeight: "bold",
                          display: "block",
                          mt: 1.5,
                          mb: 0.5,
                        }}
                      >
                        {t("contact.branch")}:
                      </Box>
                      White Space, King Abdullah Dt. Riyadh 12211, Saudi Arabia
                    </Typography>
                  </Box>
                </Box>

                {/* <Box sx={{ display: 'flex', gap: 2, mt: 'auto', p: 1 }}>
                <IconButton sx={{ color: '#52A4C1' }}>
                  <WhatsAppIcon />
                </IconButton>
                <IconButton sx={{ color: '#52A4C1' }}>
                  <MobileIcon />
                </IconButton>
                <IconButton sx={{ color: '#52A4C1' }}>
                  <EmailIcon />
                </IconButton>
              </Box> */}
              </Card>
            </SlideSidewayInView>
          </Grid>

          {/* Contact Form Card - Right side with overlap */}
          <Grid
            size={{ xs: 12, lg: 10 }}
            sx={{
              ml: { xs: 0, lg: "auto" },
              mt: { xs: 2, lg: 6 },
              zIndex: 1,
              position: "relative",
            }}
          >
            <SlideUpInView initialY={60} duration={0.9} delay={0.3}>
              <Card
                sx={{
                  p: { xs: 4, lg: 6 },
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    display: {
                      xs: "block",
                      lg: "none",
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      fontFamily: "Poppins, sans-serif",
                      color: "#333333",
                    }}
                  >
                    Love to hear from you
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#666666",
                      mb: 4,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {t("contact.getInTouch")}
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                  >
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          fontFamily: "Poppins, sans-serif",
                          color: "#333333",
                        }}
                      >
                        {t("contact.name")} *
                      </Typography>
                      <TextField
                        fullWidth
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder={t("contact.namePlaceholder")}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#F5F5F5",
                            borderRadius: 1,
                            "& fieldset": {
                              borderColor: "#E0E0E0",
                            },
                            "&:hover fieldset": {
                              borderColor: "#BDBDBD",
                            },
                            "&.Mui-focused": {
                              backgroundColor: "#F5F5F5",
                              "& fieldset": {
                                borderColor: "#52A4C1",
                                borderWidth: 2,
                              },
                            },
                          },
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          fontFamily: "Poppins, sans-serif",
                          color: "#333333",
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      >
                        {t("contact.email")} *
                      </Typography>
                      <TextField
                        fullWidth
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder={t("contact.emailPlaceholder")}
                        inputProps={{
                          inputMode: "email",
                          autoComplete: "email",
                        }}
                        sx={{
                          width: "100%",
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#F5F5F5",
                            borderRadius: 1,
                            fontSize: { xs: "16px", sm: "1rem" },
                            "& input": {
                              fontSize: { xs: "16px", sm: "1rem" },
                              padding: { xs: "12px 14px", sm: "14px" },
                            },
                            "& fieldset": {
                              borderColor: "#E0E0E0",
                            },
                            "&:hover fieldset": {
                              borderColor: "#BDBDBD",
                            },
                            "&.Mui-focused": {
                              backgroundColor: "#F5F5F5",
                              "& fieldset": {
                                borderColor: "#52A4C1",
                                borderWidth: 2,
                              },
                            },
                          },
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          fontFamily: "Poppins, sans-serif",
                          color: "#333333",
                        }}
                      >
                        {t("contact.message")} *
                      </Typography>
                      <TextField
                        fullWidth
                        name="message"
                        multiline
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder={t("contact.messagePlaceholder")}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#F5F5F5",
                            borderRadius: 1,
                            "& fieldset": {
                              borderColor: "#E0E0E0",
                            },
                            "&:hover fieldset": {
                              borderColor: "#BDBDBD",
                            },
                            "&.Mui-focused": {
                              backgroundColor: "#F5F5F5",
                              "& fieldset": {
                                borderColor: "#52A4C1",
                                borderWidth: 2,
                              },
                            },
                          },
                        }}
                      />
                    </Box>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={isSubmitting}
                      sx={{
                        backgroundColor: "#52A4C1",
                        borderRadius: 1,
                        py: 2,
                        textTransform: "none",
                        fontWeight: "bold",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "16px",
                        "&:hover": {
                          backgroundColor: "#4A8FA8",
                        },
                      }}
                    >
                      {isSubmitting ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress size={20} color="inherit" />
                          <span>{t("common.loading")}</span>
                        </Box>
                      ) : (
                        t("contact.sendMessage")
                      )}
                    </Button>
                  </Box>
                </Box>

                <Grid container sx={{ display: { xs: "none", lg: "flex" } }}>
                  <Grid
                    size={{ xs: 12, lg: 5 }}
                    sx={{ display: language === "ar" ? "none" : "block" }}
                  >
                    <Box></Box>
                  </Grid>
                  <Grid size={{ xs: 12, lg: 7 }}>
                    <Box component="form" onSubmit={handleSubmit}>
                      <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          fontFamily: "Poppins, sans-serif",
                          color: "#333333",
                        }}
                      >
                        {t("contact.getInTouch")}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#666666",
                          mb: 4,
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        {t("contact.description")}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: "bold",
                              mb: 1,
                              fontFamily: "Poppins, sans-serif",
                              color: "#333333",
                            }}
                          >
                            {t("contact.name")} *
                          </Typography>
                          <TextField
                            fullWidth
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder={t("contact.namePlaceholder")}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "#F5F5F5",
                                borderRadius: 1,
                                "& fieldset": {
                                  borderColor: "#E0E0E0",
                                },
                                "&:hover fieldset": {
                                  borderColor: "#BDBDBD",
                                },
                                "&.Mui-focused": {
                                  backgroundColor: "#F5F5F5",
                                  "& fieldset": {
                                    borderColor: "#52A4C1",
                                    borderWidth: 2,
                                  },
                                },
                              },
                            }}
                          />
                        </Box>

                        <Box>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: "bold",
                              mb: 1,
                              fontFamily: "Poppins, sans-serif",
                              color: "#333333",
                              fontSize: { xs: "0.875rem", sm: "1rem" },
                            }}
                          >
                            {t("contact.email")} *
                          </Typography>
                          <TextField
                            fullWidth
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your email address"
                            inputProps={{
                              inputMode: "email",
                              autoComplete: "email",
                            }}
                            sx={{
                              width: "100%",
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "#F5F5F5",
                                borderRadius: 1,
                                fontSize: { xs: "16px", sm: "1rem" },
                                "& input": {
                                  fontSize: { xs: "16px", sm: "1rem" },
                                  padding: { xs: "12px 14px", sm: "14px" },
                                },
                                "& fieldset": {
                                  borderColor: "#E0E0E0",
                                },
                                "&:hover fieldset": {
                                  borderColor: "#BDBDBD",
                                },
                                "&.Mui-focused": {
                                  backgroundColor: "#F5F5F5",
                                  "& fieldset": {
                                    borderColor: "#52A4C1",
                                    borderWidth: 2,
                                  },
                                },
                              },
                            }}
                          />
                        </Box>

                        <Box>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: "bold",
                              mb: 1,
                              fontFamily: "Poppins, sans-serif",
                              color: "#333333",
                            }}
                          >
                            {t("contact.message")} *
                          </Typography>
                          <TextField
                            fullWidth
                            name="message"
                            multiline
                            rows={5}
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            placeholder={t("contact.messagePlaceholder")}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "#F5F5F5",
                                borderRadius: 1,
                                "& fieldset": {
                                  borderColor: "#E0E0E0",
                                },
                                "&:hover fieldset": {
                                  borderColor: "#BDBDBD",
                                },
                                "&.Mui-focused": {
                                  backgroundColor: "#F5F5F5",
                                  "& fieldset": {
                                    borderColor: "#52A4C1",
                                    borderWidth: 2,
                                  },
                                },
                              },
                            }}
                          />
                        </Box>
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          size="large"
                          disabled={isSubmitting}
                          sx={{
                            backgroundColor: "#52A4C1",
                            borderRadius: 1,
                            py: 2,
                            textTransform: "none",
                            fontWeight: "bold",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "16px",
                            "&:hover": {
                              backgroundColor: "#4A8FA8",
                            },
                          }}
                        >
                          {isSubmitting ? (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                justifyContent: "center",
                              }}
                            >
                              <CircularProgress size={20} color="inherit" />
                              <span>Sending Message...</span>
                            </Box>
                          ) : (
                            t("contact.sendMessage")
                          )}
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </SlideUpInView>
          </Grid>
        </Grid>
      </Container>

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
    </Box>
  );
};

export default ContactSection;
