"use client";

import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function HomeProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </AuthProvider>
  );
}
