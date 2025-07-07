'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '@/lib/auth-service';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

interface AuthContextType {
  user: any;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, displayName: string) => Promise<any>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUserProfile(user); // Para mock auth, el usuario ya incluye el perfil
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<any> => {
    return authService.login(email, password);
  };

  const register = async (email: string, password: string, displayName: string): Promise<any> => {
    // Para demo, simplemente simular registro
    const userProfile: UserProfile = {
      uid: 'demo-user-' + Date.now(),
      email,
      displayName,
      role: 'user',
      createdAt: new Date()
    };
    
    setUserProfile(userProfile);
    return { user: userProfile };
  };

  const logout = async (): Promise<void> => {
    return authService.logout();
  };

  const isAdmin = (): boolean => {
    return userProfile?.role === 'admin';
  };

  const value = {
    user,
    userProfile,
    loading,
    login,
    register,
    logout,
    isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};