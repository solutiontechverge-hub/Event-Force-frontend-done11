'use client';

import { useEffect, useState } from 'react';

/** Delays mount flag for skeleton loading UX — used across marketing/auth pages. */
export function usePageMount(delayMs = 500): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return isMounted;
}
