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

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

import { useAuth } from "@/contexts/AuthContext";
const searchParams =
  typeof window !== "undefined"
    ? new URLSearchParams(window.location.search)
    : null;

const redirectPath = searchParams?.get("redirect") || "/";


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

  const { login, register } = useAuth(); // ✅ ONLY ADDITION

  /* 🔁 Mode derived from URL */
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
      setError("");
      setSuccess("");
      setLoading(true);

      try {
        if (!isValidEmail(formData.email)) {
          throw new Error("Please enter a valid email address");
        }

        /* 🔑 SIGN UP */
        if (mode === "signup") {
          if (!formData.phone || !isValidPhoneNumber(formData.phone)) {
            throw new Error("Please enter a valid phone number");
          }

          const res = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password,
          );

          const userData = {
            id: res.user.uid,
            email: formData.email,
            name: formData.fullName,
            role: "CUSTOMER",
          };

          await setDoc(doc(db, "users", res.user.uid), {
            ...userData,
            phone: formData.phone,
            createdAt: new Date(),
          });

          await register({
            email: userData.email,
            password: formData.password,
            name: userData.name,
          });

          router.push(redirectPath);
        }

        /* 🔑 SIGN IN */
        if (mode === "signin") {
          await signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password,
          );

          await login({
            email: formData.email,
            password: formData.password,
          }); // ✅ CONTEXT SYNC

          router.push(redirectPath);
        }

        /* 🔁 FORGOT PASSWORD */
        if (mode === "forgot") {
          await sendPasswordResetEmail(auth, formData.email);
          setSuccess("Password reset email sent. Check your inbox.");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [formData, mode, router, login, register],
  );

  /* 🔐 GOOGLE LOGIN */
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      await login({
        email: res.user.email || "",
        password: "google-auth",
      }); // ✅ CONTEXT SYNC

      router.push(redirectPath);
    } catch (err: any) {
      setError(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };
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
                  : "Admin Sign In"}
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

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

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
            label="Email Address"
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
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          )}

          {mode === "signin" && (
            <Box textAlign="right" mb={2}>
              <Link
                component="button"
                onClick={() => router.push("/forgot-password")}
                sx={{ fontSize: "0.75rem", fontWeight: "bold" }}
              >
                Forgot password?
              </Link>
            </Box>
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Continue"}
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
