'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
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
import { UserCircle2, LogOut } from 'lucide-react';
import { SidebarNav } from '@/components/navigation/SidebarNav';
import Link from 'next/link';

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

export default function MainAppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This runs on the client, after hydration
    const user = localStorage.getItem('mock-user');
    if (user) {
      setUserProfile(JSON.parse(user));
    } else {
      // If no user, redirect to login. This is a protected layout.
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('mock-user');
    router.push('/login');
  };

  // Render a loading state while checking for user auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If no user profile is found after checking, don't render the layout
  if (!userProfile) {
    return null;
  }

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
          <AppLogo collapsed={true} />
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}