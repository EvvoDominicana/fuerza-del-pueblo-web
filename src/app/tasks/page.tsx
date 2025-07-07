'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Trophy,
  Target
} from 'lucide-react';
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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

export default function TasksPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  const userProfile = {
    displayName: 'Administrador General',
    role: 'admin'
  };

  const tasks = [
    {
      id: 1,
      title: 'Movilización Digital - Redes Sociales',
      description: 'Compartir contenido oficial del partido en redes sociales personales',
      priority: 'Alta',
      status: 'Pendiente',
      points: 50,
      deadline: '2024-01-15',
      participants: 234
    },
    {
      id: 2,
      title: 'Registro de Nuevos Militantes',
      description: 'Invitar y registrar nuevos miembros en la plataforma',
      priority: 'Media',
      status: 'En Progreso',
      points: 30,
      deadline: '2024-01-20',
      participants: 156
    },
    {
      id: 3,
      title: 'Difusión de Propuestas de Gobierno',
      description: 'Compartir y explicar las propuestas del plan de gobierno 2024-2028',
      priority: 'Alta',
      status: 'Completada',
      points: 75,
      deadline: '2024-01-10',
      participants: 445
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completada': return 'bg-green-100 text-green-800';
      case 'En Progreso': return 'bg-yellow-100 text-yellow-800';
      case 'Pendiente': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'text-red-600';
      case 'Media': return 'text-yellow-600';
      case 'Baja': return 'text-green-600';
      default: return 'text-gray-600';
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
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Tareas y Movilización</h1>
                <p className="text-gray-600 mt-1">
                  Coordina acciones masivas y gestiona la participación ciudadana
                </p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <Target className="h-4 w-4 mr-2" />
                Nueva Tarea
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tareas Activas</CardTitle>
                  <Clock className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+3 esta semana</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completadas</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">48</div>
                  <p className="text-xs text-muted-foreground">+12 este mes</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Participantes</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">Militantes activos</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Puntos Totales</CardTitle>
                  <Trophy className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15,230</div>
                  <p className="text-xs text-muted-foreground">Sistema de gamificación</p>
                </CardContent>
              </Card>
            </div>

            {/* Tasks List */}
            <Card>
              <CardHeader>
                <CardTitle>Tareas de Movilización</CardTitle>
                <CardDescription>
                  Gestiona las acciones coordinadas del partido
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{task.title}</h3>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                          <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                            Prioridad {task.priority}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {task.participants} participantes
                          </span>
                          <span className="flex items-center gap-1">
                            <Trophy className="h-4 w-4" />
                            {task.points} puntos
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Vence: {task.deadline}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Ver Detalles
                        </Button>
                        {task.status === 'Pendiente' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Participar
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}