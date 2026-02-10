"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
// import { PageContentSkeleton } from "@/components/PageSkeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageContentSkeleton } from "./LoadingSkeleton";

/* ======================
   LAZY IMPORTS
====================== */

const FleetSection = dynamic(() => import("./FleetSection"), {
  ssr: false,
});

const TestimonialsSection = dynamic(() => import("./TestimonialsSection"), {
  ssr: false,
});

const BenefitsSection = dynamic(() => import("./BenefitsSection"), {
  ssr: false,
});

const ContactSection = dynamic(() => import("./ContactSection"), {
  ssr: false,
});

/* ======================
   SUSPENSE WRAPPERS
====================== */

export function SuspenseFleetSection() {
  const { language } = useLanguage();

  return (
    <Suspense
      key={`fleet-${language}`} // ✅ UNIQUE
      fallback={<PageContentSkeleton />}
    >
      <FleetSection />
    </Suspense>
  );
}

export function SuspenseTestimonialsSection() {
  const { language } = useLanguage();

  return (
    <Suspense
      key={`testimonials-${language}`} // ✅ UNIQUE
      fallback={<PageContentSkeleton />}
    >
      <TestimonialsSection />
    </Suspense>
  );
}

export function SuspenseBenefitsSection() {
  const { language } = useLanguage();

  return (
    <Suspense
      key={`benefits-${language}`} // ✅ UNIQUE
      fallback={<PageContentSkeleton />}
    >
      <BenefitsSection />
    </Suspense>
  );
}

export function SuspenseContactSection() {
  const { language } = useLanguage();

  return (
    <Suspense
      key={`contact-${language}`} // ✅ UNIQUE
      fallback={<PageContentSkeleton />}
    >
      <ContactSection />
    </Suspense>
  );
}
