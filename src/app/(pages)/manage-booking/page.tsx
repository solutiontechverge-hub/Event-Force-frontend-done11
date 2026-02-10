import { Suspense } from "react";
import { Box, Typography, Container, Skeleton } from "@mui/material";
import ManageBookingClient from "./ManageBookingClient";
import ProtectedRoute from "@/components/ProtectedRoute";

// Loading component for Suspense fallback
const ManageBookingLoading = () => (
  <Box sx={{ minHeight: "100vh", pt: 8 }}>
    <Container maxWidth="lg">
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Skeleton
          variant="text"
          width="50%"
          height={60}
          sx={{ mb: 2, mx: "auto" }}
        />
        <Skeleton variant="text" width="70%" height={30} sx={{ mx: "auto" }} />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
        }}
      >
        <Skeleton variant="rectangular" height={400} />
        <Skeleton variant="rectangular" height={400} />
      </Box>
    </Container>
  </Box>
);

// Main page component with Suspense
const ManageBookingPage = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<ManageBookingLoading />}>
        <ManageBookingClient />
      </Suspense>
    </ProtectedRoute>
  );
};

export default ManageBookingPage;
