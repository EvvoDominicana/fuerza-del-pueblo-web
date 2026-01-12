'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface PartySettings {
  partyName: string;
  partySlogan: string;
  partyLogo: string;
  primaryColor: string;
  secondaryColor: string;
  websiteUrl: string;
  contactEmail: string;
  description: string;
}

interface PartySettingsContextType {
  settings: PartySettings;
  updateSettings: (newSettings: Partial<PartySettings>) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: PartySettings = {
  partyName: 'Partido Político',
  partySlogan: 'Trabajando por un futuro mejor',
  partyLogo: '/partido-logo.png',
  primaryColor: '#3b82f6',
  secondaryColor: '#8b5cf6',
  websiteUrl: 'https://www.partido.com',
  contactEmail: 'info@partido.com',
  description: 'Somos un partido político comprometido con el desarrollo y el bienestar de todos los ciudadanos.'
};

const PartySettingsContext = createContext<PartySettingsContextType | undefined>(undefined);

export const usePartySettings = () => {
  const context = useContext(PartySettingsContext);
  if (context === undefined) {
    throw new Error('usePartySettings debe ser usado dentro de un PartySettingsProvider');
  }
  return context;
};

export const PartySettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<PartySettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const savedSettings = localStorage.getItem('partySettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      } catch (error) {
        console.error('Error loading party settings:', error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<PartySettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('partySettings', JSON.stringify(updatedSettings));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem('partySettings');
  };

  return (
    <PartySettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </PartySettingsContext.Provider>
  );
};