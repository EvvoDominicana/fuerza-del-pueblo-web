'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Trophy,
  Target,
  Star,
  UserCheck
} from 'lucide-react';

export default function TasksPage() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('mock-user');
    if (user) {
      setUserProfile(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Tareas para administradores/coordinadores
  const allTasks = [
    {
      id: 1,
      title: 'Movilización Digital - Redes Sociales',
      description: 'Compartir contenido oficial del partido en redes sociales personales',
      priority: 'Alta',
      status: 'Pendiente',
      points: 50,
      deadline: '2024-01-15',
      participants: 234,
      isAssigned: false,
      type: 'Movilización'
    },
    {
      id: 2,
      title: 'Registro de Nuevos Militantes',
      description: 'Invitar y registrar nuevos miembros en la plataforma',
      priority: 'Media',
      status: 'En Progreso',
      points: 30,
      deadline: '2024-01-20',
      participants: 156,
      isAssigned: false,
      type: 'Afiliación'
    },
    {
      id: 3,
      title: 'Difusión de Propuestas de Gobierno',
      description: 'Compartir y explicar las propuestas del plan de gobierno 2024-2028',
      priority: 'Alta',
      status: 'Completada',
      points: 75,
      deadline: '2024-01-10',
      participants: 445,
      isAssigned: false,
      type: 'Movilización'
    }
  ];

  // Tareas específicas para Posibilistas Activos
  const volunteerTasks = [
    {
      id: 4,
      title: 'Apoyo en Jornada de Limpieza',
      description: 'Participar en la limpieza del parque comunitario este sábado',
      priority: 'Media',
      status: 'Asignada',
      points: 25,
      deadline: '2024-01-12',
      participants: 1,
      isAssigned: true,
      type: 'Voluntariado'
    },
    {
      id: 5,
      title: 'Distribución de Volantes',
      description: 'Repartir material informativo sobre propuestas del partido en tu sector',
      priority: 'Alta',
      status: 'En Progreso',
      points: 15,
      deadline: '2024-01-14',
      participants: 1,
      isAssigned: true,
      type: 'Movilización'
    },
    {
      id: 6,
      title: 'Encuesta Comunitaria Zona Sur',
      description: 'Realizar encuesta sobre necesidades prioritarias en el sector',
      priority: 'Alta',
      status: 'Pendiente',
      points: 30,
      deadline: '2024-01-16',
      participants: 1,
      isAssigned: true,
      type: 'Investigación'
    },
    {
      id: 7,
      title: 'Asistir a Capacitación Digital',
      description: 'Participar en taller sobre herramientas digitales para militancia',
      priority: 'Baja',
      status: 'Completada',
      points: 20,
      deadline: '2024-01-08',
      participants: 1,
      isAssigned: true,
      type: 'Capacitación'
    },
    {
      id: 8,
      title: 'Registro de Contactos Locales',
      description: 'Crear lista de contactos potenciales en tu área de influencia',
      priority: 'Media',
      status: 'Disponible',
      points: 10,
      deadline: '2024-01-18',
      participants: 0,
      isAssigned: false,
      type: 'Afiliación'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completada': return 'bg-green-100 text-green-800';
      case 'En Progreso': return 'bg-yellow-100 text-yellow-800';
      case 'Pendiente': return 'bg-red-100 text-red-800';
      case 'Asignada': return 'bg-blue-100 text-blue-800';
      case 'Disponible': return 'bg-purple-100 text-purple-800';
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const userRole = userProfile?.role || 'voluntario';
  const canManageTasks = userRole === 'admin' || userRole === 'presidente' || userRole === 'coordinador';
  const tasks = userRole === 'voluntario' ? volunteerTasks : allTasks;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole === 'voluntario' ? 'Mis Tareas' : 'Tareas y Movilización'}
          </h1>
          <p className="text-gray-600 mt-1">
            {userRole === 'voluntario' 
              ? 'Tareas asignadas y disponibles para Posibilistas Activos'
              : 'Coordina acciones masivas y gestiona la participación ciudadana'
            }
          </p>
        </div>
        {canManageTasks && (
          <Button className="bg-green-600 hover:bg-green-700">
            <Target className="h-4 w-4 mr-2" />
            Nueva Tarea
          </Button>
        )}
      </div>

      {/* Stats Cards - Para administradores */}
      {canManageTasks && (
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
              <p className="text-xs text-muted-foreground">Posibilistas activos</p>
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
      )}

      {/* Stats Cards - Para Posibilistas Activos */}
      {userRole === 'voluntario' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mis Tareas Asignadas</CardTitle>
              <UserCheck className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Pendientes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completadas</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Este mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mis Puntos</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85</div>
              <p className="text-xs text-muted-foreground">Puntos ganados</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Para tomar</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {userRole === 'voluntario' ? 'Mis Tareas Asignadas' : 'Tareas de Movilización'}
          </CardTitle>
          <CardDescription>
            {userRole === 'voluntario' 
              ? 'Tareas específicas para tu rol como Posibilista Activo'
              : 'Gestiona las acciones coordinadas del partido'
            }
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
                    {userRole === 'voluntario' && task.type && (
                      <Badge variant="outline" className="text-xs">
                        {task.type}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {userRole === 'voluntario' ? (
                      <>
                        <span className="flex items-center gap-1">
                          <Trophy className="h-4 w-4" />
                          {task.points} puntos
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Vence: {task.deadline}
                        </span>
                        {task.isAssigned && (
                          <span className="flex items-center gap-1 text-blue-600">
                            <UserCheck className="h-4 w-4" />
                            Tarea personal
                          </span>
                        )}
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                  {userRole === 'voluntario' ? (
                    task.status === 'Pendiente' || task.status === 'Asignada' ? (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Completar
                      </Button>
                    ) : task.status === 'En Progreso' ? (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Continuar
                      </Button>
                    ) : task.status === 'Disponible' ? (
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Tomar Tarea
                      </Button>
                    ) : null
                  ) : (
                    task.status === 'Pendiente' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Gestionar
                      </Button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}