// Servicio de autenticación dedicado al mock para demo
import { mockAuthService } from './mock-auth';

// El servicio ahora solo apunta al mock para mayor estabilidad en la demo.
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
