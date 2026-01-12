'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { PartySettingsProvider } from '@/contexts/PartySettingsContext';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <PartySettingsProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </PartySettingsProvider>
  );
}