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

  const handleAdminLogin = async () => {
    setEmail('admin@paisposible.com');
    setPassword('AdminTotal2024!');
    setError('');
    setLoading(true);

    try {
      // Simular delay y login automático para demo
      await new Promise(resolve => setTimeout(resolve, 500));
      await login('admin@paisposible.com', 'AdminTotal2024!');
      router.push('/dashboard');
    } catch (err: any) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
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
              onClick={handleAdminLogin}
              disabled={loading}
            >
              {loading ? 'Accediendo...' : '🔑 Acceso Administrador'}
            </Button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Hace clic para usar las credenciales de administrador
            </p>
          </div>

          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium">Demo Listo ✅</p>
            <p className="text-xs text-green-600 mt-1">
              Email: admin@paisposible.com<br/>
              Contraseña: AdminTotal2024!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
