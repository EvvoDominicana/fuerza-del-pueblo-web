'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Esta es la página raíz de la aplicación.
// Su única función es redirigir a la página de login.
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  // Muestra un indicador de carga mientras se realiza la redirección.
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Cargando plataforma...</p>
      </div>
    </div>
  );
}
