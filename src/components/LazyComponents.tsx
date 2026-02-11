"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageContentSkeleton } from "./LoadingSkeleton";

/* ======================
   LAZY IMPORTS
====================== */

const FleetSection = dynamic(() => import("./FleetSection"), {
  ssr: false,
  loading: () => <PageContentSkeleton />,
});

const TestimonialsSection = dynamic(() => import("./TestimonialsSection"), {
  ssr: false,
  loading: () => <PageContentSkeleton />,
});

const BenefitsSection = dynamic(() => import("./BenefitsSection"), {
  ssr: false,
  loading: () => <PageContentSkeleton />,
});

const ContactSection = dynamic(() => import("./ContactSection"), {
  ssr: false,
  loading: () => <PageContentSkeleton />,
});

/* ======================
   EXPORTS
====================== */

export function SuspenseFleetSection() {
  const { language } = useLanguage();
  return <FleetSection key={`fleet-${language}`} />;
}

export function SuspenseTestimonialsSection() {
  const { language } = useLanguage();
  return <TestimonialsSection key={`testimonials-${language}`} />;
}

export function SuspenseBenefitsSection() {
  const { language } = useLanguage();
  return <BenefitsSection key={`benefits-${language}`} />;
}

export function SuspenseContactSection() {
  const { language } = useLanguage();
  return <ContactSection key={`contact-${language}`} />;
}
