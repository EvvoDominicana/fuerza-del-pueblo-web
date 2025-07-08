'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AppLogo } from '@/components/common/AppLogo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAdminAutocomplete = () => {
    setEmail('admin@paisposible.com');
    setPassword('AdminTotal2024!');
  };

  const handleDirectDashboardAccess = () => {
    setLoading(true);
    // Simular login para demo
    if (typeof window !== 'undefined') {
      localStorage.setItem('mock-user', JSON.stringify({
        uid: 'admin-demo-uid',
        email: 'admin@paisposible.com',
        displayName: 'Administrador General',
        role: 'admin',
        createdAt: new Date(),
      }));
    }
    router.push('/dashboard');
  };

  const handleDemoAccess = (userType: string) => {
    setLoading(true);
    let userData;
    
    switch (userType) {
      case 'admin':
        userData = {
          uid: 'admin-demo-uid',
          email: 'admin@paisposible.com',
          displayName: 'Administrador General',
          role: 'admin',
          createdAt: new Date(),
        };
        break;
      case 'presidente':
        userData = {
          uid: 'presidente-demo-uid',
          email: 'presidente@paisposible.com',
          displayName: 'Presidente Regional',
          role: 'presidente',
          createdAt: new Date(),
        };
        break;
      case 'coordinador':
        userData = {
          uid: 'coordinador-demo-uid',
          email: 'coordinador@paisposible.com',
          displayName: 'Coordinador de Área',
          role: 'coordinador',
          createdAt: new Date(),
        };
        break;
      case 'voluntario':
        userData = {
          uid: 'voluntario-demo-uid',
          email: 'voluntario@paisposible.com',
          displayName: 'Voluntario Activo',
          role: 'voluntario',
          createdAt: new Date(),
        };
        break;
      default:
        userData = {
          uid: 'demo-uid',
          email: 'demo@paisposible.com',
          displayName: 'Usuario Demo',
          role: 'voluntario',
          createdAt: new Date(),
        };
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('mock-user', JSON.stringify(userData));
    }
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AppLogo collapsed={false} />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Iniciar Sesión
          </CardTitle>
          <CardDescription>
            Accede a País Posible Conecta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
          
          <div className="mt-6 pt-4 border-t">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleAdminAutocomplete}
              disabled={loading}
            >
              🔑 Acceso Administrador (Autocompletar)
            </Button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Hace clic para usar las credenciales de administrador
            </p>
          </div>

          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium mb-3 text-center">🎯 Acceso Demo - Selecciona tu Rol</p>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline"
                className="text-xs bg-red-50 hover:bg-red-100 border-red-200 text-red-800"
                onClick={() => handleDemoAccess('admin')}
                disabled={loading}
              >
                🔑 Admin
              </Button>
              <Button 
                variant="outline"
                className="text-xs bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800"
                onClick={() => handleDemoAccess('presidente')}
                disabled={loading}
              >
                👑 Presidente
              </Button>
              <Button 
                variant="outline"
                className="text-xs bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-800"
                onClick={() => handleDemoAccess('coordinador')}
                disabled={loading}
              >
                📋 Coordinador
              </Button>
              <Button 
                variant="outline"
                className="text-xs bg-green-50 hover:bg-green-100 border-green-200 text-green-800"
                onClick={() => handleDemoAccess('voluntario')}
                disabled={loading}
              >
                🤝 Voluntario
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {loading ? 'Accediendo al dashboard...' : 'Cada rol tiene diferentes permisos y vistas'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
