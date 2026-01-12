'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  UserCircle2,
  Users,
  Newspaper,
  CalendarDays,
  Trophy,
  ListChecks,
  GraduationCap,
  MessageCircle,
  Settings,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'presidente', 'coordinador', 'voluntario'] },
  { href: '/profile', label: 'Mi Perfil', icon: UserCircle2, roles: ['admin', 'presidente', 'coordinador', 'voluntario'] },
  { href: '/organization', label: 'Organización', icon: Users, roles: ['admin', 'presidente'] },
  { href: '/news', label: 'Noticias', icon: Newspaper, roles: ['admin', 'presidente', 'coordinador', 'voluntario'] },
  { href: '/events', label: 'Eventos', icon: CalendarDays, roles: ['admin', 'presidente', 'coordinador', 'voluntario'] },
  { href: '/gamification', label: 'Reconocimientos', icon: Trophy, roles: ['admin', 'presidente', 'coordinador', 'voluntario'] },
  { href: '/tasks', label: 'Tareas', icon: ListChecks, roles: ['admin', 'presidente', 'coordinador', 'voluntario'] },
  { href: '/training', label: 'Capacitación', icon: GraduationCap, roles: ['admin', 'presidente', 'coordinador', 'voluntario'] },
  { href: '/president-message', label: 'Mensaje del Presidente', icon: MessageCircle, roles: ['admin', 'presidente', 'coordinador', 'voluntario'] },
  { href: '/admin-settings', label: 'Configuración', icon: Settings, roles: ['admin'] },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { userProfile } = useAuth();

  // Si no hay perfil, no renderizar nada hasta que se redirija
  if (!userProfile) {
    return null;
  }

  const userRole = userProfile.role;

  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <SidebarMenu>
      {filteredNavItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            className={cn(pathname === item.href && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90")}
            tooltip={{ children: item.label, side: "right", align: "center" }}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
