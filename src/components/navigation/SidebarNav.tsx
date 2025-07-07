'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/profile', label: 'Mi Perfil', icon: UserCircle2 },
  { href: '/organization', label: 'Organización', icon: Users },
  { href: '/news', label: 'Noticias', icon: Newspaper },
  { href: '/events', label: 'Eventos', icon: CalendarDays },
  { href: '/gamification', label: 'Reconocimientos', icon: Trophy },
  { href: '/tasks', label: 'Tareas', icon: ListChecks },
  { href: '/training', label: 'Capacitación', icon: GraduationCap },
  { href: '/president-message', label: 'Mensaje del Presidente', icon: MessageCircle },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
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
