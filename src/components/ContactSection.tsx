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
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { MobileIcon, EmailIcon, LocationIcon } from "./icons";
import TelephoneIcon from "./icons/TelephoneIcon";
import { SlideUpInView, SlideSidewayInView } from "@/components/animations";
import { sendContactEmail } from "@/services/emailService";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

      setFormData({
        name: "",
        email: "",
        message: "",
      });
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

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background:
          "linear-gradient(180deg, #f8fbfd 0%, #eef5f8 100%)",
      }}
    >
      <Container maxWidth="xl">

        <Grid container spacing={4} alignItems="stretch">

          {/* LEFT CONTACT CARD */}
          <Grid item xs={12} md={5}>
            <SlideSidewayInView initialX={-60} duration={0.8}>
              <Card
                sx={{
                  height: "100%",
                  p: { xs: 4, md: 5 },
                  borderRadius: 4,
                  color: "white",
                  background:
                    "linear-gradient(145deg,#0f2027,#203a43,#2c5364)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight="700"
                  mb={3}
                >
                  {t("contact.contactUs")}
                </Typography>

                <Typography mb={4} opacity={0.8}>
                  Event Force
                </Typography>

                <Stack spacing={3}>

                  <Stack direction="row" spacing={2}>
                    <TelephoneIcon />
                    <Typography>
                      +966125786869
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <MobileIcon />
                    <Typography>
                      +966549454525
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <EmailIcon />
                    <Typography>
                      info@eventforce.sa.com
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <LocationIcon />
                    <Typography fontSize="14px">
                      8303 Al Ghamdi Center, Jeddah  
                      <br />
                      White Space, Riyadh, Saudi Arabia
                    </Typography>
                  </Stack>

                </Stack>
              </Card>
            </SlideSidewayInView>
          </Grid>

          {/* RIGHT FORM CARD */}
          <Grid item xs={12} md={7}>
            <SlideUpInView initialY={60} duration={0.8}>
              <Card
                sx={{
                  p: { xs: 4, md: 6 },
                  borderRadius: 4,
                  background: "white",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight="700"
                  mb={1}
                >
                  {t("contact.getInTouch")}
                </Typography>

                <Typography
                  mb={4}
                  color="text.secondary"
                >
                  {t("contact.description")}
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                >
                  <Stack spacing={3}>

                    <TextField
                      name="name"
                      label={t("contact.name")}
                      fullWidth
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />

                    <TextField
                      name="email"
                      label={t("contact.email")}
                      fullWidth
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />

                    <TextField
                      name="message"
                      label={t("contact.message")}
                      fullWidth
                      required
                      multiline
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={isSubmitting}
                      sx={{
                        height: 54,
                        fontWeight: 600,
                        fontSize: 16,
                        borderRadius: 3,
                        background:
                          "linear-gradient(135deg,#52A4C1,#1976d2)",
                        boxShadow:
                          "0 10px 25px rgba(82,164,193,0.4)",

                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        t("contact.sendMessage")
                      )}
                    </Button>

                  </Stack>
                </Box>
              </Card>
            </SlideUpInView>
          </Grid>

        </Grid>
      </Container>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() =>
          setSnackbar({ ...snackbar, open: false })
        }
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default ContactSection;