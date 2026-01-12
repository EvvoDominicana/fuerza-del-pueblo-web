'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AppLogo } from '@/components/common/AppLogo';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
      setLoading(false);
    }
  };

  const handleAdminAutocomplete = () => {
    setEmail('admin@fuerzadelpueblo.do');
    setPassword('AdminFp2024!');
  };

  const handleDemoAccess = (role: 'admin' | 'presidente' | 'coordinador' | 'voluntario') => {
    setLoading(true);

    const userMap = {
      admin: {
        uid: 'admin-demo-uid',
        email: 'admin@fuerzadelpueblo.do',
        displayName: 'Administrador FP',
        role: 'admin'
      },
      presidente: {
        uid: 'presidente-demo-uid',
        email: 'leonel.fernandez@fuerzadelpueblo.do',
        displayName: 'Leonel Fernández',
        role: 'presidente'
      },
      coordinador: {
        uid: 'coordinador-demo-uid',
        email: 'coordinador@fuerzadelpueblo.do',
        displayName: 'Coordinador/a FP',
        role: 'coordinador'
      },
      voluntario: {
        uid: 'voluntario-demo-uid',
        email: 'militante@fuerzadelpueblo.do',
        displayName: 'Militante FP',
        role: 'voluntario'
      }
    };
    
    const userData = { ...userMap[role], createdAt: new Date() };

    if (typeof window !== 'undefined') {
      localStorage.setItem('mock-user', JSON.stringify(userData));
    }
    
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-50 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AppLogo collapsed={false} />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Iniciar Sesión
          </CardTitle>
          <CardDescription>
            Accede a la plataforma FP Conecta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
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
                🤝 Militante
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {loading ? 'Accediendo al dashboard...' : 'Cada rol tiene diferentes permisos y vistas'}
            </p>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">O inicia sesión</span>
            </div>
          </div>
          
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}
            <div className="flex items-center gap-2">
               <Button 
                type="button"
                variant="outline" 
                className="w-full"
                onClick={handleAdminAutocomplete}
                disabled={loading}
              >
                Autocompletar Admin
              </Button>
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Validando...' : 'Entrar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
