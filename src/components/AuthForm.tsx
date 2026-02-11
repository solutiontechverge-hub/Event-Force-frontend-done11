"use client";

import React, { useState, memo, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { SlideSidewayInView, SlideUpInView } from "./animations";
import { useRouter, usePathname } from "next/navigation";
import { Snackbar } from "@mui/material";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { useAuth } from "@/contexts/AuthContext";

/* 🔹 Styled phone input */
const PhoneTextField = React.forwardRef<HTMLInputElement, any>(
  function PhoneTextField(props, ref) {
    return (
      <TextField
        {...props}
        inputRef={ref}
        fullWidth
        label="Phone Number"
        required
        sx={{ mb: 2 }}
      />
    );
  },
);

const AuthForm = memo(() => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:900px)");
  const { login, register } = useAuth();

  const mode =
    pathname === "/signup"
      ? "signup"
      : pathname === "/forgot-password"
        ? "forgot"
        : "signin";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /* 🔐 SUBMIT */
const handleSubmit = useCallback(
  async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isValidEmail(formData.email)) {
        throw { code: "auth/invalid-email" };
      }

      if (mode === "signup") {
        if (!formData.phone || !isValidPhoneNumber(formData.phone)) {
          throw { code: "auth/invalid-phone" };
        }

        await register({
          email: formData.email,
          password: formData.password,
          name: formData.fullName,
          phone: formData.phone,
        });

        setSnackbar({
          open: true,
          message: "Account created successfully",
          severity: "success",
        });

        setTimeout(() => router.replace("/home"), 1000);
      }

      if (mode === "signin") {
        await login({
          email: formData.email,
          password: formData.password,
        });

        setSnackbar({
          open: true,
          message: "Login successful",
          severity: "success",
        });

        setTimeout(() => router.replace("/home"), 1000);
      }

      if (mode === "forgot") {
        const { sendPasswordResetEmail } = await import("firebase/auth");

        await sendPasswordResetEmail(auth, formData.email);

        setSnackbar({
          open: true,
          message: "Password reset email sent",
          severity: "success",
        });
      }
    } catch (err: any) {
      let message = "Something went wrong";

      switch (err.code) {
        case "auth/user-not-found":
          message = "User not found";
          break;

        case "auth/wrong-password":
          message = "Email or password is wrong";
          break;

        case "auth/invalid-email":
          message = "Invalid email address";
          break;

        case "auth/invalid-credential":
          message = "Email or password is wrong";
          break;

        case "auth/too-many-requests":
          message = "Too many attempts. Try again later.";
          break;
      }

      setSnackbar({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      setLoading(false); // 🔥 VERY IMPORTANT
    }
  },
  [formData, mode, router, login, register]
);


  /* 🔐 GOOGLE LOGIN */
  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      setSnackbar({
        open: true,
        message: "Login successful",
        severity: "success",
      });

      router.replace("/home");
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: "Google login failed",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* TITLE */}
        <SlideUpInView initialY={30} duration={0.6}>
          <Box textAlign="center" mb={3}>
            <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
              {mode === "signup"
                ? "Create Account"
                : mode === "forgot"
                  ? "Forgot Password"
                  : " Sign In"}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {mode === "signup"
                ? "Sign up for Event Force"
                : mode === "forgot"
                  ? "We’ll email you reset instructions"
                  : "Welcome back! Login to access admin dashboard"}
            </Typography>
          </Box>
        </SlideUpInView>

        {/* GOOGLE */}
        {mode !== "forgot" && (
          <SlideSidewayInView initialX={-30} duration={0.7}>
            <Button
              fullWidth
              startIcon={<Google />}
              onClick={handleGoogleLogin}
              sx={{ mb: 2 }}
            >
              Google
            </Button>
          </SlideSidewayInView>
        )}

        {mode !== "forgot" && <Divider sx={{ mb: 2 }} />}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* FORM */}
        <Box component="form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <TextField
              fullWidth
              label="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
              sx={{ mb: 1.5 }}
            />
          )}

          <TextField
            fullWidth
            label="Email Address "
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            sx={{ mb: 1.5 }}
          />

          {mode === "signup" && (
            <PhoneInput
              international
              defaultCountry="SA"
              value={formData.phone}
              onChange={(value) =>
                setFormData({ ...formData, phone: value || "" })
              }
              inputComponent={PhoneTextField}
            />
          )}

          {mode !== "forgot" && (
            <>
              <TextField
                fullWidth
                label="Password "
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 1.5 }}
              />

              {mode === "signin" && (
                <Link
                  href="/forgot-password"
                  sx={{ fontSize: "0.75rem", fontWeight: "bold" }}
                >
                  Forgot password?
                </Link>
              )}
            </>
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{ mt: 1 }}
          >
            {loading ? (
              <CircularProgress size={20} />
            ) : mode === "signup" ? (
              "Sign Up"
            ) : mode === "forgot" ? (
              "Send Reset Link"
            ) : (
              "SIGN IN"
            )}
          </Button>

          {/* FOOTER LINKS */}
          <Box textAlign="center" mt={2}>
            {mode === "signin" && (
              <Typography fontSize="0.75rem">
                Don’t have an account?{" "}
                <Link component="button" onClick={() => router.push("/signup")}>
                  Create account
                </Link>
              </Typography>
            )}

            {(mode === "signup" || mode === "forgot") && (
              <Typography fontSize="0.75rem">
                Already have an account?{" "}
                <Link component="button" onClick={() => router.push("/signin")}>
                  Sign in
                </Link>
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

AuthForm.displayName = "AuthForm";
export default AuthForm;
