'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Define el tipo de perfil de usuario para asegurar consistencia
interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'presidente' | 'coordinador' | 'voluntario';
  createdAt: Date;
}

interface AuthContextType {
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Mapa de usuarios para la demo
const demoUsers = {
  'admin@partido.com': {
    uid: 'admin-demo-uid',
    email: 'admin@partido.com',
    displayName: 'Administrador General',
    role: 'admin' as const,
  },
  'presidente@partido.com': {
    uid: 'presidente-demo-uid',
    email: 'presidente@partido.com',
    displayName: 'Carlos Mendoza',
    role: 'presidente' as const,
  },
  'coordinador@partido.com': {
    uid: 'coordinador-demo-uid',
    email: 'coordinador@partido.com',
    displayName: 'Ana Rodríguez',
    role: 'coordinador' as const,
  },
  'voluntario@partido.com': {
    uid: 'voluntario-demo-uid',
    email: 'voluntario@partido.com',
    displayName: 'Carlos Martínez',
    role: 'voluntario' as const,
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Este efecto se ejecuta solo en el cliente
    try {
      const storedUser = localStorage.getItem('mock-user');
      if (storedUser) {
        setUserProfile(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error al leer de localStorage:", error);
      localStorage.removeItem('mock-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulación de login con delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Para la demo, validamos solo el admin
    if (email === 'admin@partido.com' && password === 'AdminTotal2024!') {
      const userData = { ...demoUsers['admin@partido.com'], createdAt: new Date() };
      localStorage.setItem('mock-user', JSON.stringify(userData));
      setUserProfile(userData);
      return;
    }

    throw new Error('Credenciales inválidas');
  };

  const logout = () => {
    localStorage.removeItem('mock-user');
    setUserProfile(null);
    // Redirección forzada para limpiar el estado
    window.location.href = '/login';
  };

  const isAdmin = (): boolean => {
    return userProfile?.role === 'admin';
  };

  const value = {
    userProfile,
    loading,
    login,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
