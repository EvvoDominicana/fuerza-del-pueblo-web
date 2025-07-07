'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Calendar, 
  Trophy, 
  MessageSquare, 
  TrendingUp, 
  Bell,
  Target,
  Award
} from 'lucide-react';

export default function DashboardPage() {
  const { userProfile, isAdmin } = useAuth();

  const stats = [
    {
      title: 'Miembros Activos',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Eventos Este Mes',
      value: '15',
      change: '+5',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      title: 'Tareas Completadas',
      value: '1,234',
      change: '+23%',
      icon: Trophy,
      color: 'text-purple-600'
    },
    {
      title: 'Mensajes Enviados',
      value: '5,678',
      change: '+8%',
      icon: MessageSquare,
      color: 'text-orange-600'
    }
  ];

  const recentActivities = [
    { action: 'Nuevo evento creado', time: 'Hace 2 horas', type: 'event' },
    { action: 'Tarea completada por Juan Pérez', time: 'Hace 3 horas', type: 'task' },
    { action: 'Mensaje del presidente publicado', time: 'Hace 5 horas', type: 'message' },
    { action: '25 nuevos miembros registrados', time: 'Hace 1 día', type: 'members' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Bienvenido{userProfile?.displayName ? `, ${userProfile.displayName}` : ''}!
          </h1>
          <p className="text-gray-600 mt-1">
            {isAdmin() ? 'Panel de Administrador' : 'Panel de Usuario'} - País Posible Conecta
          </p>
        </div>
        {isAdmin() && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Award className="h-4 w-4 mr-1" />
            Administrador
          </Badge>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-600 mt-1">
                <span className="text-green-600 font-medium">{stat.change}</span> desde el mes pasado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Progreso de Objetivos
            </CardTitle>
            <CardDescription>
              Avance de las metas principales del mes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Registro de Nuevos Miembros</span>
                <span className="font-medium">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Eventos Realizados</span>
                <span className="font-medium">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Tareas Completadas</span>
                <span className="font-medium">90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>
            Accesos directos a las funciones más utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button asChild className="h-16 flex-col">
              <a href="/tasks">
                <Trophy className="h-6 w-6 mb-1" />
                Ver Tareas
              </a>
            </Button>
            <Button asChild variant="outline" className="h-16 flex-col">
              <a href="/events">
                <Calendar className="h-6 w-6 mb-1" />
                Eventos
              </a>
            </Button>
            <Button asChild variant="outline" className="h-16 flex-col">
              <a href="/organization">
                <Users className="h-6 w-6 mb-1" />
                Organización
              </a>
            </Button>
            <Button asChild variant="outline" className="h-16 flex-col">
              <a href="/news">
                <TrendingUp className="h-6 w-6 mb-1" />
                Noticias
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
