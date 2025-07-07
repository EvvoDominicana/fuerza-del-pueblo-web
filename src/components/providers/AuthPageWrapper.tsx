'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import { SidebarNav } from '@/components/navigation/SidebarNav';

export default function AuthPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AppLayout>
        <SidebarNav />
        {children}
      </AppLayout>
    </AuthProvider>
  );
}