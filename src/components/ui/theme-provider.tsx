'use client';

import { ThemeProvider as PrimerThemeProvider } from '@primer/react';
import type { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <PrimerThemeProvider preventSSRMismatch colorMode='light' dayScheme='light'>
      {children}
    </PrimerThemeProvider>
  );
}
