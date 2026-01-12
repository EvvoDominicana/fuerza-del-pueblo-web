'use client';

import Image from 'next/image';
import { usePartySettings } from '@/contexts/PartySettingsContext';

export function AppLogo({ collapsed }: { collapsed?: boolean }) {
  const { settings } = usePartySettings();

  return (
    <div className="flex items-center gap-2 p-2 transition-all duration-300">
      <Image
        src="/logo.png" // Ruta codificada directamente para asegurar la resolución
        alt={`${settings.partyName} Logo`}
        width={36}
        height={36}
        className="object-contain"
      />
      {!collapsed && (
        <span 
          className="font-headline text-xl font-bold"
          style={{ color: 'hsl(var(--primary))' }}
        >
          {settings.partyName}
        </span>
      )}
    </div>
  );
}
