'use client';

import type React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/common/AppLogo';
import { Button } from '@/components/ui/button';
import { UserCircle2, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarNav } from '@/components/navigation/SidebarNav';

function CustomSidebarHeader() {
  const { state } = useSidebar();
  return (
    <SidebarHeader className="p-0">
      <div className="flex items-center justify-between p-2 border-b border-sidebar-border">
         <AppLogo collapsed={state === 'collapsed'} />
        <SidebarTrigger className="hidden md:flex" />
      </div>
    </SidebarHeader>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { userProfile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar side="left" collapsible="icon" variant="sidebar">
        <CustomSidebarHeader />
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter>
          <Button asChild variant="ghost" className="w-full justify-start gap-2">
            <Link href="/profile">
              <UserCircle2 className="h-5 w-5" />
              <span className="group-data-[collapsible=icon]:hidden">
                {userProfile?.displayName || 'Mi Cuenta'}
              </span>
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="group-data-[collapsible=icon]:hidden">Cerrar Sesión</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:hidden">
          <SidebarTrigger />
          <AppLogo collapsed={true}/>
        </header>
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
