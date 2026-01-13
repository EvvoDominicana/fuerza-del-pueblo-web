'use client';

import Image from 'next/image';
import { usePartySettings } from '@/contexts/PartySettingsContext';

export function AppLogo({ collapsed }: { collapsed?: boolean }) {
  const { settings } = usePartySettings();

  return (
    <div className="flex items-center gap-3 p-2 transition-all duration-300" suppressHydrationWarning>
      <div className="relative flex items-center justify-center bg-white rounded-full p-1 shadow-sm border border-sidebar-border/50">
        <Image
          src={settings.partyLogo}
          alt={`${settings.partyName} Logo`}
          width={collapsed ? 32 : 48}
          height={collapsed ? 32 : 48}
          className="object-contain"
        />
      </div>
      {!collapsed && (
        <div className="flex flex-col">
          <span
            className="font-headline text-2xl font-black tracking-tight leading-none"
            style={{ color: 'hsl(var(--primary))' }}
          >
            {settings.partyName}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-0.5">
            {settings.partySlogan}
          </span>
        </div>
      )}
    </div>
  );
}
