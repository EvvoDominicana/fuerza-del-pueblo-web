'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLogo } from '@/components/common/AppLogo';

export default function DemoPage() {

  const handleLogin = (role: 'admin' | 'user' | 'leader' | 'member') => {
    let userData;

    switch (role) {
      case 'admin':
        userData = {
          uid: 'admin-demo-uid',
          email: 'admin@paisposible.com',
          displayName: 'Administrador General',
          role: 'admin',
          createdAt: new Date(),
        };
        break;
      case 'user':
        userData = {
          uid: 'user-demo-uid',
          email: 'usuario@paisposible.com',
          displayName: 'Usuario Regular',
          role: 'user',
          createdAt: new Date(),
        };
        break;
      case 'leader':
        userData = {
          uid: 'leader-demo-uid',
          email: 'lider@paisposible.com',
          displayName: 'Líder Regional',
          role: 'leader',
          createdAt: new Date(),
        };
        break;
      case 'member':
        userData = {
          uid: 'member-demo-uid',
          email: 'miembro@paisposible.com',
          displayName: 'Miembro Activo',
          role: 'member',
          createdAt: new Date(),
        };
        break;
    }

    if (typeof window !== 'undefined') {
      console.log(`Setting ${role} data:`, userData);
      localStorage.setItem('mock-user', JSON.stringify(userData));
      console.log(`${role} data saved to localStorage`);
    }

    console.log('Navigating to dashboard with hard reload...');
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-lg shadow-green-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AppLogo collapsed={false} />
          </div>
          <CardTitle className="text-2xl font-bold font-headline">
            Página de Acceso para Demo
          </CardTitle>
          <CardDescription>
            Usa esta página para tu presentación.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 max-h-[80vh] overflow-y-auto">
          {/* Admin Access */}
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-base font-bold text-green-800 mb-1">👑 Acceso Administrador</p>
            <p className="text-xs text-green-700 mb-3">
              Control total de la plataforma, gestión de usuarios y todas las funcionalidades
            </p>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white h-10 text-sm"
              onClick={() => handleLogin('admin')}
            >
              🚀 Entrar como Administrador
            </Button>
          </div>

          {/* User Access */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-base font-bold text-blue-800 mb-1">👤 Acceso Usuario Regular</p>
            <p className="text-xs text-blue-700 mb-3">
              Vista de militante con acceso a tareas, eventos y funciones básicas
            </p>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 text-sm"
              onClick={() => handleLogin('user')}
            >
              👥 Entrar como Usuario
            </Button>
          </div>

          {/* Structure Leader Access */}
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
            <p className="text-base font-bold text-purple-800 mb-1">📊 Líder de Estructura</p>
            <p className="text-xs text-purple-700 mb-3">
              Gestión regional/municipal con permisos intermedios
            </p>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white h-10 text-sm"
              onClick={() => handleLogin('leader')}
            >
              🏛️ Entrar como Líder
            </Button>
          </div>

          {/* Member Access */}
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
            <p className="text-base font-bold text-orange-800 mb-1">🤝 Miembro Regular</p>
            <p className="text-xs text-orange-700 mb-3">
              Acceso básico para militantes con funciones esenciales de participación
            </p>
            <Button 
              className="w-full bg-orange-600 hover:bg-orange-700 text-white h-10 text-sm"
              onClick={() => handleLogin('member')}
            >
              🎯 Entrar como Miembro
            </Button>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.href = '/login'}
            >
              🔐 Ir a Login con Credenciales
            </Button>
          </div>

          <div className="text-center text-xs text-gray-500 pt-2">
            <p className="font-semibold mb-1">Credenciales para login manual:</p>
            <div className="bg-gray-50 p-2 rounded text-left font-mono text-xs">
              <p>Email: admin@paisposible.com</p>
              <p>Contraseña: AdminTotal2024!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
