import AppLayout from '@/components/layout/AppLayout';
import { SidebarNav } from '@/components/navigation/SidebarNav';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Newspaper, CalendarDays, ListChecks, Users, Trophy, GraduationCap, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const dashboardItems = [
  { title: "Últimas Noticias", description: "Mantente al día con los comunicados oficiales.", icon: Newspaper, href: "/news", cta: "Ver Noticias", dataAiHint: "news politics" },
  { title: "Próximos Eventos", description: "Consulta el calendario de actividades y mítines.", icon: CalendarDays, href: "/events", cta: "Ver Eventos", dataAiHint: "event calendar" },
  { title: "Tareas Pendientes", description: "Revisa tus asignaciones y contribuye activamente.", icon: ListChecks, href: "/tasks", cta: "Ver Tareas", dataAiHint: "task checklist" },
  { title: "Mensaje del Presidente", description: "Escucha las últimas palabras de Milton Morrison.", icon: MessageCircle, href: "/president-message", cta: "Leer Mensaje", dataAiHint: "leader speech" },
  { title: "Mi Progreso", description: "Consulta tus puntos y reconocimientos.", icon: Trophy, href: "/gamification", cta: "Ver Progreso", dataAiHint: "award trophy" },
  { title: "Formación Política", description: "Accede a materiales de capacitación.", icon: GraduationCap, href: "/training", cta: "Ir a Capacitación", dataAiHint: "education learning" },
];

export default function DashboardPage() {
  return (
    <AppLayout>
      <SidebarNav />
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline text-primary">Bienvenido a País Posible Conecta</h1>
        <p className="text-muted-foreground">Tu plataforma para la participación y organización política.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.map((item) => (
          <Card key={item.title} className="flex flex-col">
            <CardHeader className="flex-row items-center gap-3 space-y-0 pb-2">
              <item.icon className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
            </CardContent>
            <CardContent className="pt-0">
               <Button asChild variant="outline" className="w-full">
                <Link href={item.href}>{item.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
