// 'use client';

import React from 'react';
import { metadata } from './metadata';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export { metadata };

export default function HomeLayout({
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
