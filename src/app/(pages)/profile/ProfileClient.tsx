"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import { AuthBg } from "../../../../public/images";

type Booking = {
  id: string;
  service: string;
  date: string;
  status: "pending" | "confirmed" | "cancelled";
};

export default function ProfileClient() {
  const { user, updateUser } = useAuth();
  const router = useRouter();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  /* FETCH USER PROFILE */
  useEffect(() => {
    if (!user?.id) return;

    const fetchUserProfile = async () => {
      const userRef = doc(db, "users", user.id);
      const snapshot = await getDoc(userRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        setName(data.name || "");
        setPhone(data.phone || "");

        updateUser({
          name: data.name || "",
          phone: data.phone || "",
        });
      }
    };

    fetchUserProfile();
  }, [user?.id]);

  /* FETCH BOOKINGS */
  useEffect(() => {
    if (!user?.id) return;

    const fetchBookings = async () => {
      setBookingsLoading(true);

      const q = query(
        collection(db, "bookings"),
        where("userId", "==", user.id),
        orderBy("createdAt", "desc"),
      );

      const snapshot = await getDocs(q);

      const userBookings: Booking[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          service: data.car || data.serviceType || "Service",
          date: data.pickupDate
            ? new Date(data.pickupDate).toLocaleDateString()
            : "N/A",
          status: data.status || "pending",
        };
      });

      setBookings(userBookings);
      setBookingsLoading(false);
    };

    fetchBookings();
  }, [user?.id]);

  const handleUpdateProfile = async () => {
    if (!user?.id) return;

    setLoading(true);

    try {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, { name, phone });

      updateUser({ name, phone });

      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to update profile",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <Box sx={{ position: "relative", minHeight: "100vh" }}>
        {/* Background */}
        <Image
          src={AuthBg}
          alt="Profile Background"
          fill
          style={{ objectFit: "cover", zIndex: -1 }}
        />

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
          }}
        />

        {/* CONTENT */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            pt: { xs: 12, md: 14 },
            px: { xs: 2, md: 4 },
            maxWidth: 1100,
            mx: "auto",
          }}
        >
          {/* HEADER SECTION */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              mb: 6,
            }}
          >
            <Button
              onClick={() => router.back()}
              startIcon={<ArrowBackIcon />}
              sx={{
                position: { xs: "relative", md: "absolute" },
                left: { md: 0 },
                mb: { xs: 2, md: 0 },
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(6px)",
                textTransform: "none",
                px: 2,
                py: 1,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.18)",
                },
              }}
            >
              Back
            </Button>

            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                fontSize: {
                  xs: "1.6rem",
                  sm: "2rem",
                  md: "2.5rem",
                },
              }}
            >
              My Profile
            </Typography>
          </Box>

          {/* PERSONAL INFO CARD */}
          <Card sx={cardStyle}>
            <CardContent>
              <Typography sx={sectionTitle}>
                Personal Information
              </Typography>

              <TextField
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={inputStyles}
              />

              <TextField
                fullWidth
                label="Email"
                value={user?.email || ""}
                disabled
                sx={inputStyles}
              />

              <TextField
                fullWidth
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={inputStyles}
              />

              <Button
                variant="contained"
                onClick={handleUpdateProfile}
                disabled={loading}
                sx={saveButton}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>

          {/* BOOKINGS SECTION */}
          <Typography sx={sectionTitle}>My Bookings</Typography>

          {bookingsLoading ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : bookings.length === 0 ? (
            <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
              You haven’t made any bookings yet.
            </Typography>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id} sx={bookingCardStyle}>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
                      {booking.service}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                      {booking.date}
                    </Typography>
                  </Box>

               
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

/* STYLES */

const cardStyle = {
  mb: 5,
  backgroundColor: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
};

const bookingCardStyle = {
  mb: 2,
  backgroundColor: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.2)",
};

const sectionTitle = {
  fontWeight: "bold",
  mb: 3,
  color: "#ffffff",
  fontSize: "1.3rem",
};

const saveButton = {
  mt: 2,
  backgroundColor: "#52A4C1",
  fontWeight: "bold",
  textTransform: "none",
  px: 4,
  py: 1.2,
  borderRadius: "10px",
};

const inputStyles = {
  mb: 3,
  "& .MuiInputBase-root": {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: "10px",
    color: "#ffffff",
  },
  "& .MuiInputLabel-root": {
    color: "#ffffff",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.5)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#52A4C1",
  },
};
