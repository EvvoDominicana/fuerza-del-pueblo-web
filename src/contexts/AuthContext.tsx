'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'presidente' | 'coordinador' | 'voluntario' | 'diputado';
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

// Mapa de usuarios para la demo de Fuerza del Pueblo
const demoUsers = {
  'admin@fuerzadelpueblo.do': {
    uid: 'admin-demo-uid',
    email: 'admin@fuerzadelpueblo.do',
    displayName: 'Administrador FP',
    role: 'admin' as const,
  },
  'leonel.fernandez@fuerzadelpueblo.do': {
    uid: 'presidente-demo-uid',
    email: 'leonel.fernandez@fuerzadelpueblo.do',
    displayName: 'Leonel Fernández',
    role: 'presidente' as const,
  },
  'coordinador@fuerzadelpueblo.do': {
    uid: 'coordinador-demo-uid',
    email: 'coordinador@fuerzadelpueblo.do',
    displayName: 'Coordinador/a FP',
    role: 'coordinador' as const,
  },
  'militante@fuerzadelpueblo.do': {
    uid: 'voluntario-demo-uid',
    email: 'militante@fuerzadelpueblo.do',
    displayName: 'Militante FP',
    role: 'voluntario' as const,
  },
  'carlos.gil@fuerzadelpueblo.do': {
    uid: 'diputado-carlos-gil-uid',
    email: 'carlos.gil@fuerzadelpueblo.do',
    displayName: 'Dip. Carlos José Gil',
    role: 'diputado' as const,
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('mock-user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.email === 'admin@fuerzadelpueblo.do') {
          parsedUser.displayName = 'Dip. Carlos José Gil';
          parsedUser.role = 'admin'; // Keep role as admin but changing name
        }
        setUserProfile(parsedUser);
      }
    } catch (error) {
      console.error("Error al leer de localStorage:", error);
      localStorage.removeItem('mock-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Credenciales para pruebas
    const validPasswords: Record<string, string> = {
      'admin@fuerzadelpueblo.do': 'AdminFp2024!',
      'carlos.gil@fuerzadelpueblo.do': 'DiputadoFp2026!',
      'leonel.fernandez@fuerzadelpueblo.do': 'Leonel2024!',
      'coordinador@fuerzadelpueblo.do': 'Coordinador2024!',
      'militante@fuerzadelpueblo.do': 'Militante2024!',
    };

    if (demoUsers[email as keyof typeof demoUsers] && validPasswords[email] === password) {
      const userData = { ...demoUsers[email as keyof typeof demoUsers], createdAt: new Date() };
      localStorage.setItem('mock-user', JSON.stringify(userData));
      setUserProfile(userData);
      return;
    }

    throw new Error('Credenciales inválidas');
  };

  const logout = () => {
    localStorage.removeItem('mock-user');
    setUserProfile(null);
    window.location.href = '/login';
  };

  const isAdmin = (): boolean => {
    return userProfile?.role === 'admin' || userProfile?.role === 'diputado';
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
