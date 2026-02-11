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
} from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "@/components/Header";

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

  /* 🔥 SYNC USER DATA FROM FIRESTORE */
  useEffect(() => {
    if (!user?.id) return;

    const fetchUserProfile = async () => {
      try {
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
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user?.id]);

  /* 🔥 FETCH USER BOOKINGS */
  useEffect(() => {
    if (!user?.id) return;

    const fetchBookings = async () => {
      try {
        setBookingsLoading(true);

        const q = query(
          collection(db, "bookings"),
          where("userId", "==", user.id),
          orderBy("createdAt", "desc")
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
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchBookings();
  }, [user?.id]);

  /* 🔐 UPDATE PROFILE IN FIRESTORE */
  const handleUpdateProfile = async () => {
    if (!user?.id) return;

    setLoading(true);

    try {
      const userRef = doc(db, "users", user.id);

      await updateDoc(userRef, {
        name: name,
        phone: phone,
      });

      updateUser({
        name,
        phone,
      });

      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <Box
        sx={{
          minHeight: "100vh",
          pt: "96px",
          px: { xs: 2, md: 6 },
          display: "flex",
          justifyContent: "center",
          background: `
            radial-gradient(
              1200px 600px at 50% 0%,
              rgba(0, 180, 200, 0.15),
              rgba(2, 15, 23, 1) 55%
            )
          `,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 900 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => router.back()}
              sx={{
                color: "#ffffff",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Back
            </Button>

            <Typography
              variant="h5"
              sx={{ ml: 2, fontWeight: "bold", color: "#ffffff" }}
            >
              My Profile
            </Typography>
          </Box>

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

          <Typography sx={sectionTitle}>My Bookings</Typography>

          {bookingsLoading ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : bookings.length === 0 ? (
            <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
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
                    <Typography
                      sx={{ fontWeight: "bold", color: "#ffffff" }}
                    >
                      {booking.service}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {booking.date}
                    </Typography>
                  </Box>

                  <Chip
                    label={booking.status}
                    color={
                      booking.status === "confirmed"
                        ? "success"
                        : booking.status === "pending"
                        ? "warning"
                        : "error"
                    }
                    sx={{ fontWeight: "bold" }}
                  />
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Box>
    </>
  );
}

/* 🎨 STYLES */
const cardStyle = {
  mb: 5,
  backgroundColor: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
};

const bookingCardStyle = {
  mb: 2,
  backgroundColor: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const sectionTitle = {
  fontWeight: "bold",
  mb: 2,
  color: "#ffffff",
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
  mb: 2,
  "& .MuiInputBase-root": {
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: "10px",
    color: "#ffffff",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.7)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.3)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#52A4C1",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#52A4C1",
    borderWidth: 2,
  },
};
