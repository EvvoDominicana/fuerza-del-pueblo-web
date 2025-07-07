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
      <Card className="w-full max-w-md shadow-green-lg">
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
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-lg font-bold text-green-800 mb-2">🎯 Acceso Total de Admin</p>
            <p className="text-sm text-green-700 mb-4">
              Haz clic abajo para entrar directamente a la plataforma con todos los privilegios.
            </p>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg"
              onClick={goToDashboard}
            >
              🚀 Entrar como Administrador
            </Button>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => router.push('/login')}
            >
              Ir a la Página de Login Normal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
