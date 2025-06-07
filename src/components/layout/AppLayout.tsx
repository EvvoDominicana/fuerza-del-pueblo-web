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


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar side="left" collapsible="icon" variant="sidebar">
        <CustomSidebarHeader />
        <SidebarContent>
          {/* SidebarNav will be a child of AppLayout where it's used */}
        </SidebarContent>
        <SidebarFooter>
          <Link href="/profile" passHref legacyBehavior>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <UserCircle2 className="h-5 w-5" />
              <span className="group-data-[collapsible=icon]:hidden">Mi Cuenta</span>
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive">
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
