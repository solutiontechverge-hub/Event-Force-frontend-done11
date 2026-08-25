"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageContentSkeleton } from "./LoadingSkeleton";

const lazySection = (importer: () => Promise<{ default: React.ComponentType }>) =>
  dynamic(() => importer().then((mod) => mod.default), {
    loading: () => <PageContentSkeleton />,
  });

const FleetSection = lazySection(() => import("./FleetSection"));
const TestimonialsSection = lazySection(() => import("./TestimonialsSection"));
const BenefitsSection = lazySection(() => import("./BenefitsSection"));
const ContactSection = lazySection(() => import("./ContactSection"));

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
