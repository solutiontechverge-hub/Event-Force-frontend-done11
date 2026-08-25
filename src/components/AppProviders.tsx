"use client";

import ThemeProvider from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { PricingProvider } from "@/contexts/PricingContext";
import PerformanceMonitor from "@/components/PerformanceMonitor";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <PricingProvider>
            {children}
            <PerformanceMonitor />
          </PricingProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
