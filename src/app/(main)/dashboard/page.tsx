'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Calendar, CheckSquare, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const roleContent = {
  admin: {
    title: '👑 Panel de Administrador',
    description: 'Control total de la plataforma y vista general del partido.',
    stats: [
      { icon: Users, label: 'Miembros Activos', value: '2,847', color: 'text-blue-600' },
      { icon: Calendar, label: 'Eventos Este Mes', value: '15', color: 'text-purple-600' },
      { icon: CheckSquare, label: 'Tareas Completadas', value: '1,234', color: 'text-green-600' },
      { icon: MessageSquare, label: 'Mensajes Enviados', value: '5,678', color: 'text-orange-600' },
    ],
    badgeColor: 'bg-green-100 text-green-800'
  },
  leader: {
    title: '📊 Panel de Líder de Estructura',
    description: 'Gestión y coordinación de tu estructura regional.',
    stats: [
      { icon: Users, label: 'Miembros en Región', value: '156', color: 'text-blue-600' },
      { icon: Calendar, label: 'Eventos Organizados', value: '8', color: 'text-purple-600' },
      { icon: CheckSquare, label: 'Tareas Asignadas', value: '24', color: 'text-green-600' },
      { icon: MessageSquare, label: 'Reportes Enviados', value: '12', color: 'text-orange-600' },
    ],
    badgeColor: 'bg-purple-100 text-purple-800'
  },
  user: {
    title: '👤 Panel de Militante',
    description: 'Tu centro de participación en País Posible Conecta.',
    stats: [
      { icon: CheckSquare, label: 'Mis Tareas', value: '12', color: 'text-green-600' },
      { icon: Calendar, label: 'Eventos Inscritos', value: '5', color: 'text-purple-600' },
      { icon: Users, label: 'Puntos Ganados', value: '245', color: 'text-blue-600' },
      { icon: MessageSquare, label: 'Días Activo', value: '28', color: 'text-orange-600' },
    ],
    badgeColor: 'bg-blue-100 text-blue-800'
  },
  member: {
    title: '🤝 Panel de Miembro',
    description: 'Tu espacio para contribuir y participar activamente.',
     stats: [
      { icon: CheckSquare, label: 'Tareas Disponibles', value: '8', color: 'text-green-600' },
      { icon: Calendar, label: 'Próximos Eventos', value: '3', color: 'text-purple-600' },
      { icon: Users, label: 'Puntos de Comunidad', value: '150', color: 'text-blue-600' },
      { icon: MessageSquare, label: 'Publicaciones Leídas', value: '15', color: 'text-orange-600' },
    ],
    badgeColor: 'bg-orange-100 text-orange-800'
  },
};

export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('mock-user');
    if (user) {
      setUserProfile(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  if (loading || !userProfile) {
    return (
       <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const role = userProfile?.role || 'user';
  const content = roleContent[role as keyof typeof roleContent] || roleContent.user;

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold font-headline">
                ¡Bienvenido, {userProfile.displayName}!
              </CardTitle>
              <CardDescription className="text-lg mt-1">
                {content.title}
              </CardDescription>
            </div>
             <Badge className={content.badgeColor}>Rol: {userProfile.role}</Badge>
          </div>
          <p className="text-muted-foreground mt-2">{content.description}</p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {content.stats.map((stat) => (
          <Card key={stat.label} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Información del Usuario</CardTitle>
          <CardDescription>Detalles de tu sesión actual.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <div><strong>Nombre:</strong> {userProfile.displayName}</div>
            <div><strong>Email:</strong> {userProfile.email}</div>
            <div><strong>Rol:</strong> {userProfile.role}</div>
            <div><strong>UID:</strong> {userProfile.uid}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
