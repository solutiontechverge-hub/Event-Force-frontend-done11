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
  redirectTo,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // 🔒 Private pages
    if (requireAuth && !isAuthenticated) {
      router.replace(redirectTo || "/signin");
      return;
    }

    // 🚫 Auth pages (login/signup)
    if (!requireAuth && isAuthenticated) {
      router.replace(redirectTo || "/home");
      return;
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  if (isLoading) return null;

  if (requireAuth && !isAuthenticated) return null;

  if (!requireAuth && isAuthenticated) return null;

  return <>{children}</>;
}
