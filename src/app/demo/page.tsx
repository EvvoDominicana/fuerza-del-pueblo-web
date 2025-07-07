'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLogo } from '@/components/common/AppLogo';

export default function DemoPage() {
  const router = useRouter();

  const goToDashboard = () => {
    // Simular login para demo
    if (typeof window !== 'undefined') {
      localStorage.setItem('demo-logged-in', 'true');
      localStorage.setItem('demo-user', JSON.stringify({
        email: 'admin@paisposible.com',
        displayName: 'Administrador General',
        role: 'admin'
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
            Acceso Demo
          </CardTitle>
          <CardDescription>
            Acceso directo para presentación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-lg font-bold text-green-800 mb-2">🎯 Demo Lista</p>
            <p className="text-sm text-green-700 mb-4">
              Como administrador tienes acceso total a todas las funcionalidades
            </p>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={goToDashboard}
            >
              🚀 Entrar como Administrador
            </Button>
          </div>

          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => router.push('/login')}
            >
              🔑 Ir a Login Normal
            </Button>
          </div>

          <div className="text-center text-xs text-gray-500">
            <p>Credenciales para login manual:</p>
            <p className="font-mono">admin@paisposible.com</p>
            <p className="font-mono">AdminTotal2024!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}