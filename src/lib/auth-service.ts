// src/lib/auth-service.ts
import { mockAuthService } from './mock-auth';

// Para la demo, usamos exclusivamente el servicio de autenticación mock.
// Esto garantiza un comportamiento predecible y evita llamadas a Firebase.
export const authService = {
  login(email: string, password: string) {
    return mockAuthService.login(email, password);
  },

  logout() {
    return mockAuthService.logout();
  },

  getCurrentUser() {
    return mockAuthService.getCurrentUser();
  },

  onAuthStateChanged(callback: (user: any) => void) {
    return mockAuthService.onAuthStateChanged(callback);
  }
};
