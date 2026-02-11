"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // ✅ wait until auth finishes

    // 🔒 Protect private pages
    if (requireAuth && !isAuthenticated) {
      router.replace("/signin"); // ✅ ALWAYS redirect to signin only
      return;
    }

    // 🚫 Prevent logged-in users from accessing auth pages
    if (!requireAuth && isAuthenticated) {
      router.replace("/home");
      return;
    }
  }, [isAuthenticated, isLoading, requireAuth, router]);

  // 🛑 Don't render until auth resolved
  if (isLoading) return null;

  if (requireAuth && !isAuthenticated) return null;

  if (!requireAuth && isAuthenticated) return null;

  return <>{children}</>;
}
