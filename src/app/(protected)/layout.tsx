'use client';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import { SidebarNav } from '@/components/navigation/SidebarNav';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function ProtectedRoutesLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Verificando sesión...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AppLayout>
      <SidebarNav />
      {children}
    </AppLayout>
  );
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoutesLayout>{children}</ProtectedRoutesLayout>
    </AuthProvider>
  );
}
