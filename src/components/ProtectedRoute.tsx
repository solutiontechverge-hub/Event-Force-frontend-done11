"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
  redirectTo = "/signup",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // 🔥 WAIT

    if (requireAuth && !isAuthenticated) {
      router.replace(redirectTo);
    }

    if (!requireAuth && isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  // 🔥 IMPORTANT: Do not render until auth resolved
  if (isLoading) {
    return null; // or loading spinner
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
