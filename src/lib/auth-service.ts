// Servicio de autenticación con fallback a mock para demo
import { mockAuthService } from './mock-auth';

const USE_MOCK_AUTH = true; // Siempre usar mock para demo

export const authService = {
  async login(email: string, password: string) {
    if (USE_MOCK_AUTH) {
      return mockAuthService.login(email, password);
    }
    
    // Código real de Firebase aquí
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const { auth } = await import('./firebase');
    return signInWithEmailAndPassword(auth, email, password);
  },

  async logout() {
    if (USE_MOCK_AUTH) {
      return mockAuthService.logout();
    }
    
    const { signOut } = await import('firebase/auth');
    const { auth } = await import('./firebase');
    return signOut(auth);
  },

  getCurrentUser() {
    if (USE_MOCK_AUTH) {
      return mockAuthService.getCurrentUser();
    }
    
    // Firebase current user
    return null;
  },

  onAuthStateChanged(callback: (user: any) => void) {
    if (USE_MOCK_AUTH) {
      return mockAuthService.onAuthStateChanged(callback);
    }
    
    // Firebase auth state listener
    const { onAuthStateChanged } = require('firebase/auth');
    const { auth } = require('./firebase');
    return onAuthStateChanged(auth, callback);
  }
};