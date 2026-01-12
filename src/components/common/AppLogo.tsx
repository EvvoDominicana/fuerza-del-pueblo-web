'use client';

import Image from 'next/image';
import { usePartySettings } from '@/contexts/PartySettingsContext';

export function AppLogo({ collapsed }: { collapsed?: boolean }) {
  const { settings } = usePartySettings();

  return (
    <div className="flex items-center gap-2 p-2 transition-all duration-300">
      <Image
        src={settings.partyLogo}
        alt={`${settings.partyName} Logo`}
        width={56}
        height={56}
        className="object-contain"
      />
      {!collapsed && (
        <span 
          className="font-headline text-xl font-bold"
          style={{ color: settings.primaryColor }}
        >
          {settings.partyName} Conecta
        </span>
      )}
    </div>
  );
}
