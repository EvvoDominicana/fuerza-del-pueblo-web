'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  Plus,
  Eye,
  CheckCircle,
  UserCheck
} from 'lucide-react';

export default function EventsPage() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('mock-user');
    if (user) {
      setUserProfile(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Eventos para administradores/coordinadores
  const allEvents = [
    {
      id: 1,
      title: 'Asamblea Nacional de Militantes',
      description: 'Reunión nacional para revisar estrategias y planes para el próximo período electoral',
      date: '2024-01-20',
      time: '09:00 AM',
      location: 'Palacio de Convenciones, Santo Domingo',
      attendees: 450,
      status: 'Próximo',
      type: 'Asamblea',
      isInscribed: false,
      canInscribe: true
    },
    {
      id: 2,
      title: 'Capacitación en Movilización Digital',
      description: 'Taller sobre uso de redes sociales y herramientas digitales para la militancia',
      date: '2024-01-15',
      time: '02:00 PM',
      location: 'Centro de Capacitación PPD, Santiago',
      attendees: 120,
      status: 'Próximo',
      type: 'Capacitación',
      isInscribed: true,
      canInscribe: true
    },
    {
      id: 3,
      title: 'Encuentro Regional Norte',
      description: 'Reunión de coordinadores y líderes de las provincias del norte del país',
      date: '2024-01-10',
      time: '10:00 AM',
      location: 'Hotel Casa Colonial, Puerto Plata',
      attendees: 89,
      status: 'Completado',
      type: 'Regional',
      isInscribed: false,
      canInscribe: false
    },
    {
      id: 4,
      title: 'Jornada de Limpieza Comunitaria',
      description: 'Actividad de voluntariado para limpiar espacios públicos en la comunidad',
      date: '2024-01-12',
      time: '08:00 AM',
      location: 'Parque Central, San Pedro de Macorís',
      attendees: 45,
      status: 'Próximo',
      type: 'Voluntariado',
      isInscribed: true,
      canInscribe: true
    },
    {
      id: 5,
      title: 'Reunión Semanal de Base',
      description: 'Encuentro semanal de Posibilistas Activos de la zona sur',
      date: '2024-01-13',
      time: '07:00 PM',
      location: 'Local Comunitario Sur, San Pedro',
      attendees: 25,
      status: 'Próximo',
      type: 'Reunión',
      isInscribed: true,
      canInscribe: true
    }
  ];

  // Eventos específicos para Posibilistas Activos
  const volunteerEvents = allEvents.filter(event => 
    event.type === 'Capacitación' || 
    event.type === 'Voluntariado' || 
    event.type === 'Reunión' ||
    (event.type === 'Asamblea' && event.canInscribe)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'Próximo': return 'bg-blue-100 text-blue-800';
      case 'En Curso': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Asamblea': return 'bg-purple-100 text-purple-800';
      case 'Capacitación': return 'bg-orange-100 text-orange-800';
      case 'Regional': return 'bg-indigo-100 text-indigo-800';
      case 'Voluntariado': return 'bg-green-100 text-green-800';
      case 'Reunión': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
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
  const canManageEvents = userRole === 'admin' || userRole === 'presidente' || userRole === 'coordinador';
  const events = userRole === 'voluntario' ? volunteerEvents : allEvents;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole === 'voluntario' ? 'Mis Eventos' : 'Gestión de Eventos'}
          </h1>
          <p className="text-gray-600 mt-1">
            {userRole === 'voluntario' 
              ? 'Eventos en los que puedes participar como Posibilista Activo'
              : 'Organiza y coordina las actividades del partido'
            }
          </p>
        </div>
        {canManageEvents && (
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Evento
          </Button>
        )}
      </div>

      {/* Stats Cards - Para administradores */}
      {canManageEvents && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventos Este Mes</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 desde el mes pasado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participantes Total</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">Asistentes confirmados</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximos Eventos</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">En los próximos 30 días</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ubicaciones</CardTitle>
              <MapPin className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">Sedes activas</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stats Cards - Para Posibilistas Activos */}
      {userRole === 'voluntario' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventos Inscritos</CardTitle>
              <UserCheck className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Próximos eventos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventos Completados</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Este año</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Para inscribirse</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Events List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {userRole === 'voluntario' ? 'Eventos Disponibles' : 'Calendario de Eventos'}
          </CardTitle>
          <CardDescription>
            {userRole === 'voluntario' 
              ? 'Eventos en los que puedes participar como Posibilista Activo'
              : 'Gestiona las actividades y encuentros del partido'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                    <Badge variant="outline" className={getTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                    {userRole === 'voluntario' && event.isInscribed && (
                      <Badge className="bg-green-100 text-green-800">
                        ✓ Inscrito
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date} - {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} participantes</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalles
                  </Button>
                  {userRole === 'voluntario' ? (
                    event.status === 'Próximo' && !event.isInscribed && event.canInscribe ? (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Inscribirse
                      </Button>
                    ) : event.isInscribed ? (
                      <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                        Cancelar
                      </Button>
                    ) : null
                  ) : (
                    event.status === 'Próximo' && (
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