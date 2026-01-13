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
  Rocket,
  TrendingUp,
  BookOpen,
  Flower,
  PieChart as PieChartIcon
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'presidente', 'coordinador', 'voluntario', 'diputado'] },
  { href: '/profile', label: 'Mi Perfil', icon: UserCircle2, roles: ['admin', 'presidente', 'coordinador', 'voluntario', 'diputado'] },
  { href: '/organization', label: 'Organización', icon: Users, roles: ['admin', 'presidente', 'diputado'] },
  { href: '/news', label: 'Noticias', icon: Newspaper, roles: ['admin', 'presidente', 'coordinador', 'voluntario', 'diputado'] },
  { href: '/events', label: 'Eventos', icon: CalendarDays, roles: ['admin', 'presidente', 'coordinador', 'voluntario', 'diputado'] },
  { href: '/gamification', label: 'Reconocimientos', icon: Trophy, roles: ['admin', 'presidente', 'coordinador', 'voluntario', 'diputado'] },
  { href: '/tasks', label: 'Tareas', icon: ListChecks, roles: ['admin', 'presidente', 'coordinador', 'voluntario', 'diputado'] },
  { href: '/proposals', label: 'Argumentario 2028', icon: BookOpen, roles: ['admin', 'presidente', 'coordinador', 'voluntario', 'diputado'] },
  { href: '/identity', label: 'Mística FP', icon: Flower, roles: ['admin', 'presidente', 'coordinador', 'voluntario', 'diputado'] },
  { href: '/structure', label: 'Mi 1x10', icon: Users, roles: ['admin', 'coordinador', 'voluntario', 'diputado'] },
  { href: '/structure/analytics', label: 'Inteligencia Estructura', icon: TrendingUp, roles: ['admin', 'presidente', 'diputado'] },
  { href: '/surveys', label: 'Encuestas', icon: MessageCircle, roles: ['admin', 'coordinador', 'voluntario', 'diputado'] },
  { href: '/surveys/analytics', label: 'Inteligencia Electoral', icon: PieChartIcon, roles: ['admin', 'presidente', 'diputado'] },
  { href: '/training', label: 'Capacitación', icon: GraduationCap, roles: ['admin', 'presidente', 'coordinador', 'voluntario', 'diputado'] },
  { href: '/president-message', label: 'Mensaje del Presidente', icon: MessageCircle, roles: ['admin', 'presidente', 'coordinador', 'voluntario', 'diputado'] },
  { href: '/admin-settings', label: 'Configuración', icon: Settings, roles: ['admin', 'diputado'] },
  { href: '/admin/deploy', label: 'Despliegue QR', icon: Rocket, roles: ['admin', 'presidente', 'diputado'] },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { userProfile } = useAuth();
  const { setOpenMobile } = useSidebar();

  // Si no hay perfil, no renderizar nada hasta que se redirija
  if (!userProfile) {
    return null;
  }

  const userRole = userProfile.role;

  const filteredNavItems = navItems.filter(item =>
    item.roles.includes(userRole)
  );

  const handleClick = () => {
    setOpenMobile(false);
  };

  return (
    <SidebarMenu>
      {filteredNavItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            className={cn(pathname === item.href && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90")}
            tooltip={{ children: item.label, side: "right", align: "center" }}
            onClick={handleClick}
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
