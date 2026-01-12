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

const DEFAULT_SETTINGS: PartySettings = {
  partyName: 'Fuerza del Pueblo',
  partySlogan: 'La Fuerza que nos une',
  partyLogo: '/logo.jpg', // Usar el logo local
  primaryColor: '#00a651', // Verde principal del logo de FP
  secondaryColor: '#008441', // Un verde más oscuro para contraste
  websiteUrl: 'https://www.fuerzadelpueblo.do',
  contactEmail: 'info@fuerzadelpueblo.do',
  description: 'Somos el partido de la Fuerza del Pueblo, comprometidos con el desarrollo y el bienestar de todos los dominicanos.'
};

interface PartySettingsContextType {
  settings: PartySettings;
  updateSettings: (newSettings: Partial<PartySettings>) => void;
  resetSettings: () => void;
}

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
        // Mezclamos los defaults con los guardados para evitar que falten propiedades
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
    
    // Opcional: Actualizar las variables CSS de la raíz si los colores cambian
    if (newSettings.primaryColor) {
      // Esta es una simplificación. En una app real, convertirías HEX a HSL.
      // Por ahora, el reinicio de la página tras guardar en settings aplicará los cambios de `globals.css`
    }
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
