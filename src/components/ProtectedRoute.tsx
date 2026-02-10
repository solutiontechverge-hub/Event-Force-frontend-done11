"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
  requireAuth?: boolean; // true = protected page
  redirectTo?: string;
};

export default function ProtectedRoute({
  children,
  requireAuth = true,
  redirectTo = "/signin",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // 🔒 Protected pages (profile, manage-booking)
    if (requireAuth && !isAuthenticated) {
      router.replace(redirectTo);
    }

    // 🔓 Auth pages (signin/signup)
    if (!requireAuth && isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  if (isLoading) return null;

  return <>{children}</>;
}
