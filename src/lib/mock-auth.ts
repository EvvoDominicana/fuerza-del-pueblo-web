// Mock Authentication para Demo

// Listener pattern to simulate onAuthStateChanged
let listeners: ((user: any) => void)[] = [];
let currentUser: any = null;

const MOCK_ADMIN_USER = {
  uid: 'admin-demo-uid',
  email: 'admin@paisposible.com',
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

const notifyListeners = () => {
  for (const listener of listeners) {
    listener(currentUser);
  }
};

const initialize = () => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('mock-user');
    if (userStr) {
      currentUser = JSON.parse(userStr);
    } else {
      currentUser = null;
    }
    notifyListeners();
  }
};

// Initialize only on the client side
if (typeof window !== 'undefined') {
  initialize();
}

export const mockAuthService = {
  async login(email: string, password: string) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
    
    if (email === 'admin@paisposible.com' && password === 'AdminTotal2024!') {
      currentUser = MOCK_ADMIN_USER;
      if (typeof window !== 'undefined') {
        localStorage.setItem('mock-user', JSON.stringify(MOCK_ADMIN_USER));
      }
      notifyListeners();
      return { user: MOCK_ADMIN_USER };
    }
    
    throw new Error('Credenciales inválidas');
  },

  async logout() {
    currentUser = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mock-user');
    }
    notifyListeners();
  },

  getCurrentUser() {
    return currentUser;
  },

  onAuthStateChanged(callback: (user: any) => void) {
    if (typeof window === 'undefined') {
        callback(null);
        return () => {};
    }

    listeners.push(callback);
    // Immediately call the callback with the current state
    callback(currentUser);

    // Return an unsubscribe function
    return () => {
      listeners = listeners.filter(l => l !== callback);
    };
  }
};
