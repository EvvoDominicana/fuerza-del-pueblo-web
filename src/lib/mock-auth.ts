// Mock Authentication para Demo
const MOCK_ADMIN_USER = {
  uid: 'admin-demo-uid',
  email: 'admin@fuerzadelpueblo.do',
  displayName: 'Administrador General',
  role: 'admin' as const,
  createdAt: new Date(),
  permissions: {
    all: true,
    manageUsers: true,
    manageTasks: true,
    manageEvents: true,
    manageNews: true,
    manageTraining: true,
    manageOrganization: true,
    viewAnalytics: true
  }
};

const MOCK_PRESIDENT_USER = {
  uid: 'presidente-demo-uid',
  email: 'presidente@fuerzadelpueblo.do',
  displayName: 'Carlos Mendoza',
  role: 'presidente' as const,
  createdAt: new Date(),
  permissions: {
    all: false,
    manageUsers: true,
    manageTasks: true,
    manageEvents: true,
    manageNews: true,
    manageTraining: true,
    manageOrganization: true,
    viewAnalytics: true,
    manageMessages: true,
    strategicPlanning: true
  }
};

export const mockAuthService = {
  async login(email: string, password: string) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@fuerzadelpueblo.do' && password === 'AdminTotal2024!') {
      // Guardar en localStorage para persistencia
      if (typeof window !== 'undefined') {
        localStorage.setItem('mock-user', JSON.stringify(MOCK_ADMIN_USER));
      }
      return { user: MOCK_ADMIN_USER };
    }
    
    if (email === 'presidente@fuerzadelpueblo.do' && password === 'Presidente2024!') {
      // Guardar en localStorage para persistencia
      if (typeof window !== 'undefined') {
        localStorage.setItem('mock-user', JSON.stringify(MOCK_PRESIDENT_USER));
      }
      return { user: MOCK_PRESIDENT_USER };
    }
    
    throw new Error('Credenciales inválidas');
  },

  async logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mock-user');
    }
  },

  getCurrentUser() {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('mock-user');
    return userStr ? JSON.parse(userStr) : null;
  },

  onAuthStateChanged(callback: (user: any) => void) {
    if (typeof window === 'undefined') {
      callback(null);
      return () => {};
    }
    
    // Verificar inmediatamente
    const user = this.getCurrentUser();
    callback(user);
    
    // Simular listener (para demo)
    const interval = setInterval(() => {
      const currentUser = this.getCurrentUser();
      callback(currentUser);
    }, 1000);
    
    // Retornar función de cleanup
    return () => clearInterval(interval);
  }
};
