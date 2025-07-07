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

          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-sm text-green-800 font-medium mb-2">Demo Listo ✅</p>
             <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={handleDirectDashboardAccess}
              disabled={loading}
            >
              {loading ? 'Accediendo...' : '🚀 Ir Directo al Dashboard'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
