'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Newspaper, CalendarDays, ListChecks, Trophy, GraduationCap, MessageCircle, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface DashboardItem {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  cta: string;
  dataAiHint: string;
}

interface CategorizedDashboardItem {
  category: string;
  value: string;
  items: DashboardItem[];
}

const categorizedItems: CategorizedDashboardItem[] = [
  {
    category: 'Principal',
    value: 'principal',
    items: [
      { title: "Mi Progreso", description: "Consulta tus puntos y reconocimientos.", icon: Trophy, href: "/gamification", cta: "Ver Progreso", dataAiHint: "award trophy" },
    ],
  },
  {
    category: 'Participa',
    value: 'participa',
    items: [
      { title: "Próximos Eventos", description: "Consulta el calendario de actividades y mítines.", icon: CalendarDays, href: "/events", cta: "Ver Eventos", dataAiHint: "event calendar" },
      { title: "Tareas Pendientes", description: "Revisa tus asignaciones y contribuye activamente.", icon: ListChecks, href: "/tasks", cta: "Ver Tareas", dataAiHint: "task checklist" },
    ],
  },
  {
    category: 'Fórmate',
    value: 'formate',
    items: [
      { title: "Formación Política", description: "Accede a materiales de capacitación.", icon: GraduationCap, href: "/training", cta: "Ir a Capacitación", dataAiHint: "education learning" },
    ],
  },
  {
    category: 'Infórmate',
    value: 'informate',
    items: [
      { title: "Últimas Noticias", description: "Mantente al día con los comunicados oficiales.", icon: Newspaper, href: "/news", cta: "Ver Noticias", dataAiHint: "news politics" },
      { title: "Mensaje del Presidente", description: "Escucha las últimas palabras de Milton Morrison.", icon: MessageCircle, href: "/president-message", cta: "Leer Mensaje", dataAiHint: "leader speech" },
    ],
  },
];

export default function DashboardPage() {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold font-headline text-[hsl(var(--foreground))]">Bienvenido a País Posible Conecta</h1>
      <p className="text-muted-foreground">Tu plataforma para la participación y organización política.</p>

      <Tabs defaultValue={categorizedItems[0]?.value || 'principal'} className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4 bg-transparent p-0">
          {categorizedItems.map((category) => (
            <TabsTrigger 
              key={category.value} 
              value={category.value}
              className={cn(
                "text-primary-foreground rounded-t-md data-[state=active]:shadow-sm",
                "data-[state=active]:bg-primary",
                "data-[state=inactive]:bg-[hsl(var(--primary-darker))]"
              )}
            >
              {category.category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categorizedItems.map((category) => (
          <TabsContent key={category.value} value={category.value} className="mt-0 pt-6 bg-card rounded-b-md shadow-green">
            {category.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
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
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center">No hay elementos en esta categoría por el momento.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
