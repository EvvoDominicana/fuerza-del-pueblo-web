'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Users,
  Calendar,
  CheckSquare,
  MessageSquare,
  TrendingUp,
  Target,
  Award,
  MapPin,
  Clock,
  AlertCircle,
  BarChart3,
  PieChart,
  Flag,
  Crown,
  Settings,
  Eye,
  Plus,
  Send,
  FileText,
  Vote
} from 'lucide-react';

const roleContent = {
  admin: {
    title: 'Panel de Administrador',
    description: 'Control total de la plataforma y vista general del partido.',
    stats: [
      { icon: Users, label: 'Militantes Activos', value: '352,847', color: 'text-blue-600' },
      { icon: Calendar, label: 'Eventos Este Mes', value: '85', color: 'text-purple-600' },
      { icon: CheckSquare, label: 'Tareas Completadas', value: '11,234', color: 'text-green-600' },
      { icon: MessageSquare, label: 'Mensajes Enviados', value: '50,678', color: 'text-orange-600' },
    ],
    badgeColor: 'bg-red-100 text-red-800'
  },
  diputado: {
    title: 'Panel Legislativo',
    description: 'Gestión legislativa y coordinación política en SDE.',
    stats: [
      { icon: Users, label: 'Electores Contactados', value: '15,402', color: 'text-blue-600', trend: '+5%' },
      { icon: FileText, label: 'Proyectos de Ley', value: '12', color: 'text-purple-600', trend: '+2' },
      { icon: CheckSquare, label: 'Gestiones Realizadas', value: '1,234', color: 'text-green-600', trend: '+12%' },
      { icon: MessageSquare, label: 'Interacciones', value: '5,678', color: 'text-orange-600', trend: '+8%' },
    ],
    badgeColor: 'bg-green-100 text-green-800'
  },
  presidente: {
    title: 'Panel Presidencial',
    description: 'Centro de comando estratégico para la gestión de la Fuerza del Pueblo.',
    stats: [
      { icon: Users, label: 'Militantes Totales', value: '352,847', color: 'text-blue-600', trend: '+12%' },
      { icon: MapPin, label: 'Provincias Activas', value: '32', color: 'text-green-600', trend: '+0' },
      { icon: Target, label: 'Objetivos Estratégicos', value: '85%', color: 'text-purple-600', trend: '+5%' },
      { icon: TrendingUp, label: 'Crecimiento Mensual', value: '4.2%', color: 'text-orange-600', trend: '+0.8%' },
    ],
    badgeColor: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
  },
  coordinador: {
    title: 'Panel de Coordinador/a',
    description: 'Tu centro de coordinación y gestión de equipos.',
    stats: [
      { icon: CheckSquare, label: 'Tareas Asignadas', value: '12', color: 'text-green-600' },
      { icon: Calendar, label: 'Eventos Coordinados', value: '5', color: 'text-purple-600' },
      { icon: Users, label: 'Equipo a Cargo', value: '25', color: 'text-blue-600' },
      { icon: MessageSquare, label: 'Días Activo', value: '28', color: 'text-orange-600' },
    ],
    badgeColor: 'bg-purple-100 text-purple-800'
  },
  voluntario: {
    title: 'Panel del Militante',
    description: 'Tu espacio para contribuir y participar activamente en la Fuerza del Pueblo.',
    stats: [
      { icon: CheckSquare, label: 'Mis Tareas Asignadas', value: '5', color: 'text-green-600' },
      { icon: Calendar, label: 'Eventos Inscritos', value: '2', color: 'text-purple-600' },
      { icon: Users, label: 'Puntos Ganados', value: '150', color: 'text-blue-600' },
      { icon: MessageSquare, label: 'Días Activo', value: '18', color: 'text-orange-600' },
    ],
    badgeColor: 'bg-green-100 text-green-800'
  },
};

export default function DashboardPage() {
  const { userProfile, loading } = useAuth();
  const { toast } = useToast();

  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);
  const [isStartVotingOpen, setIsStartVotingOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const [messageTitle, setMessageTitle] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [reportType, setReportType] = useState('monthly');
  const [votingTitle, setVotingTitle] = useState('');
  const [votingOptions, setVotingOptions] = useState('');

  const handleNewMessage = () => {
    if (!messageTitle || !messageContent) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "¡Mensaje presidencial publicado!",
      description: `"${messageTitle}" ha sido enviado a todos los militantes`,
    });

    setMessageTitle('');
    setMessageContent('');
    setIsNewMessageOpen(false);
  };

  const handleCreateEvent = () => {
    if (!eventTitle || !eventDate || !eventLocation) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "¡Evento creado exitosamente!",
      description: `"${eventTitle}" programado para ${eventDate}`,
    });

    setEventTitle('');
    setEventDate('');
    setEventLocation('');
    setEventDescription('');
    setIsCreateEventOpen(false);
  };

  const handleGenerateReport = () => {
    toast({
      title: "¡Generando reporte!",
      description: `Reporte ${reportType} en proceso. Te notificaremos cuando esté listo.`,
    });
    setIsGenerateReportOpen(false);
  };

  const handleStartVoting = () => {
    if (!votingTitle || !votingOptions) {
      toast({
        title: "Error",
        description: "Por favor completa el título y las opciones de votación",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "¡Votación iniciada!",
      description: `"${votingTitle}" está ahora disponible para todos los militantes`,
    });

    setVotingTitle('');
    setVotingOptions('');
    setIsStartVotingOpen(false);
  };

  const handleConfiguration = () => {
    toast({
      title: "Configuración",
      description: "Redirigiendo al panel de configuración avanzada...",
    });
    setIsConfigOpen(false);
  };

  if (loading || !userProfile) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const role = userProfile.role;
  const content = roleContent[role] || roleContent.voluntario;

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
            <Badge className={`${content.badgeColor} text-sm`}>Rol: {userProfile.role}</Badge>
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
              {(role === 'presidente' || role === 'diputado') && stat.trend && (
                <p className="text-xs text-muted-foreground mt-1">
                  <span className={`inline-flex items-center ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {stat.trend.startsWith('+') ? '↗' : '↘'} {stat.trend}
                  </span> vs mes anterior
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {role === 'voluntario' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ✅ Mis Tareas Pendientes
                </CardTitle>
                <CardDescription>Tareas asignadas para completar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium">Encuesta barrial - Zona Este</span>
                    <span className="text-xs bg-yellow-200 px-2 py-1 rounded">Urgente</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">Apoyo evento comunitario</span>
                    <span className="text-xs bg-blue-200 px-2 py-1 rounded">Normal</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">Capacitación digital</span>
                    <span className="text-xs bg-green-200 px-2 py-1 rounded">Opcional</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📅 Próximos Eventos
                </CardTitle>
                <CardDescription>Eventos en los que estás inscrito</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-sm">Reunión Semanal de Base</div>
                    <div className="text-xs text-gray-600">Viernes 19 Jul - 7:00 PM</div>
                    <div className="text-xs text-primary">Local Comunitario</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-sm">Jornada de Reforestación</div>
                    <div className="text-xs text-gray-600">Sábado 20 Jul - 9:00 AM</div>
                    <div className="text-xs text-green-600">Parque Mirador Sur</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🏆 Mi Progreso y Reconocimientos
              </CardTitle>
              <CardDescription>Tu participación y logros como militante</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">150</div>
                  <div className="text-sm text-green-600">Puntos Ganados</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">18</div>
                  <div className="text-sm text-blue-600">Días Activo</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">3</div>
                  <div className="text-sm text-purple-600">Insignias</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-600">🎯</span>
                  <span className="text-sm font-medium text-yellow-800">¡Próximo objetivo!</span>
                </div>
                <p className="text-xs text-yellow-700 mt-1">
                  Completa 2 tareas más para obtener la insignia "Militante Comprometido"
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {(role === 'presidente' || role === 'diputado') && (
        <>
          <Card className="shadow-lg bg-gradient-to-r from-green-50 to-teal-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                Centro de Comando Presidencial
              </CardTitle>
              <CardDescription>Acciones estratégicas principales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-16 flex flex-col gap-1 bg-blue-600 hover:bg-blue-700">
                      <Send className="h-5 w-5" />
                      <span className="text-xs">Nuevo Mensaje</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        Nuevo Mensaje Presidencial
                      </DialogTitle>
                      <DialogDescription>
                        Envía un mensaje oficial a todos los militantes del partido
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Título del Mensaje</label>
                        <Input
                          value={messageTitle}
                          onChange={(e) => setMessageTitle(e.target.value)}
                          placeholder="Ej: Mensaje a la Nación"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Contenido</label>
                        <Textarea
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                          placeholder="Escribe tu mensaje aquí..."
                          className="mt-1 min-h-[120px]"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setIsNewMessageOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleNewMessage} className="bg-blue-600 hover:bg-blue-700">
                          Publicar Mensaje
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-16 flex flex-col gap-1 bg-green-600 hover:bg-green-700">
                      <Plus className="h-5 w-5" />
                      <span className="text-xs">Crear Evento</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Crear Nuevo Evento Nacional
                      </DialogTitle>
                      <DialogDescription>
                        Organiza un evento para los militantes del partido
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Título del Evento</label>
                        <Input
                          value={eventTitle}
                          onChange={(e) => setEventTitle(e.target.value)}
                          placeholder="Ej: Gran Marcha de la Esperanza"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Fecha y Hora</label>
                          <Input
                            type="datetime-local"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Ubicación</label>
                          <Input
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}
                            placeholder="Ej: Av. George Washington, SD"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Descripción</label>
                        <Textarea
                          value={eventDescription}
                          onChange={(e) => setEventDescription(e.target.value)}
                          placeholder="Describe el evento..."
                          className="mt-1"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setIsCreateEventOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleCreateEvent} className="bg-green-600 hover:bg-green-700">
                          Crear Evento
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isGenerateReportOpen} onOpenChange={setIsGenerateReportOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-16 flex flex-col gap-1 bg-purple-600 hover:bg-purple-700">
                      <FileText className="h-5 w-5" />
                      <span className="text-xs">Generar Reporte</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Generar Reporte Estratégico
                      </DialogTitle>
                      <DialogDescription>
                        Crea reportes detallados sobre el desempeño del partido
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Tipo de Reporte</label>
                        <select
                          value={reportType}
                          onChange={(e) => setReportType(e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="monthly">Reporte Mensual de Crecimiento</option>
                          <option value="quarterly">Reporte Trimestral de Actividad</option>
                          <option value="regional">Reporte Comparativo Regional</option>
                          <option value="performance">Reporte de Desempeño de Dirigentes</option>
                          <option value="financial">Reporte de Recaudaciones</option>
                        </select>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setIsGenerateReportOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleGenerateReport} className="bg-purple-600 hover:bg-purple-700">
                          Generar Reporte
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isStartVotingOpen} onOpenChange={setIsStartVotingOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-16 flex flex-col gap-1 bg-orange-600 hover:bg-orange-700">
                      <Vote className="h-5 w-5" />
                      <span className="text-xs">Iniciar Votación</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Vote className="h-5 w-5" />
                        Iniciar Nueva Consulta a las Bases
                      </DialogTitle>
                      <DialogDescription>
                        Crea una votación para que participen todos los militantes
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Título de la Consulta</label>
                        <Input
                          value={votingTitle}
                          onChange={(e) => setVotingTitle(e.target.value)}
                          placeholder="Ej: Elección de miembro del Comité Político"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Opciones (una por línea)</label>
                        <Textarea
                          value={votingOptions}
                          onChange={(e) => setVotingOptions(e.target.value)}
                          placeholder="Candidato/a A&#10;Candidato/a B&#10;Candidato/a C"
                          className="mt-1"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setIsStartVotingOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleStartVoting} className="bg-orange-600 hover:bg-orange-700">
                          Iniciar Consulta
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-16 flex flex-col gap-1 bg-indigo-600 hover:bg-indigo-700">
                      <Settings className="h-5 w-5" />
                      <span className="text-xs">Configuración</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Configuración del Sistema
                      </DialogTitle>
                      <DialogDescription>
                        Ajustes avanzados del sistema para administradores
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-16 flex flex-col gap-1">
                          <Users className="h-5 w-5" />
                          <span className="text-xs">Gestión de Usuarios</span>
                        </Button>
                        <Button variant="outline" className="h-16 flex flex-col gap-1">
                          <Crown className="h-5 w-5" />
                          <span className="text-xs">Permisos y Roles</span>
                        </Button>
                        <Button variant="outline" className="h-16 flex flex-col gap-1">
                          <BarChart3 className="h-5 w-5" />
                          <span className="text-xs">Analytics Global</span>
                        </Button>
                        <Button variant="outline" className="h-16 flex flex-col gap-1">
                          <Flag className="h-5 w-5" />
                          <span className="text-xs">Gestión de Alertas</span>
                        </Button>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button onClick={handleConfiguration} className="bg-indigo-600 hover:bg-indigo-700">
                          Abrir Panel Avanzado
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Rendimiento del Partido
                </CardTitle>
                <CardDescription>Métricas clave de desempeño</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className="cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                    onClick={() => toast({ title: "Participación en Eventos", description: "289,534 militantes participaron en eventos este mes" })}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Participación en Eventos</span>
                      <span className="text-sm text-green-600 font-bold">82%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>

                  <div
                    className="cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                    onClick={() => toast({ title: "Cumplimiento de Tareas", description: "216,300 militantes completaron sus tareas" })}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Cumplimiento de Tareas</span>
                      <span className="text-sm text-blue-600 font-bold">61%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '61%' }}></div>
                    </div>
                  </div>

                  <div
                    className="cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                    onClick={() => toast({ title: "Satisfacción Militantes", description: "95% reportan alta satisfacción (encuesta mensual)" })}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Satisfacción Militantes</span>
                      <span className="text-sm text-purple-600 font-bold">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-green-600" />
                  Distribución Regional
                </CardTitle>
                <CardDescription>Militantes por región</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div
                    className="flex items-center justify-between p-2 hover:bg-blue-50 rounded cursor-pointer transition-colors"
                    onClick={() => toast({ title: "Distrito Nacional", description: "98,500 militantes activos - Crecimiento: +15%" })}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Distrito Nacional</span>
                    </div>
                    <span className="text-sm font-bold">98,500 (28%)</span>
                  </div>
                  <div
                    className="flex items-center justify-between p-2 hover:bg-green-50 rounded cursor-pointer transition-colors"
                    onClick={() => toast({ title: "Santiago", description: "75,400 militantes activos - Crecimiento: +12%" })}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Santiago</span>
                    </div>
                    <span className="text-sm font-bold">75,400 (21%)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-purple-50 rounded cursor-pointer transition-colors"
                    onClick={() => toast({ title: "San Cristóbal", description: "41,200 militantes activos - Crecimiento: +10%" })}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">San Cristóbal</span>
                    </div>
                    <span className="text-sm font-bold">41,200 (12%)</span>
                  </div>
                  <div
                    className="flex items-center justify-between p-2 hover:bg-orange-50 rounded cursor-pointer transition-colors"
                    onClick={() => toast({ title: "Otras Regiones", description: "137,747 militantes en 29 provincias más" })}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Otras regiones</span>
                    </div>
                    <span className="text-sm font-bold">137,747 (39%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Objetivos Estratégicos
                </CardTitle>
                <CardDescription>Metas a corto y mediano plazo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Crecimiento Militancia</span>
                      <Badge className="bg-green-100 text-green-800">70%</Badge>
                    </div>
                    <p className="text-xs text-gray-600">Meta: 500,000 militantes</p>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Expansión Digital</span>
                      <Badge className="bg-blue-100 text-blue-800">85%</Badge>
                    </div>
                    <p className="text-xs text-gray-600">Meta: 90% militantes en plataforma</p>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Formación Política</span>
                      <Badge className="bg-yellow-100 text-yellow-800">68%</Badge>
                    </div>
                    <p className="text-xs text-gray-600">Meta: 80% militantes con curso básico</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  Actividad Reciente
                </CardTitle>
                <CardDescription>Últimos movimientos importantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Juramentación nuevos miembros en NY</p>
                      <p className="text-xs text-gray-500">Hace 2 horas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Gran caravana programada en DN</p>
                      <p className="text-xs text-gray-500">Hace 4 horas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Reporte mensual de crecimiento generado</p>
                      <p className="text-xs text-gray-500">Hace 1 día</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Alertas y Notificaciones
                </CardTitle>
                <CardDescription>Asuntos que requieren atención</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div
                    className="p-3 bg-red-50 border border-red-200 rounded-lg cursor-pointer hover:bg-red-100"
                    onClick={() => toast({ title: "Alerta Urgente", description: "Abriendo detalles del presupuesto para revisión..." })}
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Urgente</span>
                    </div>
                    <p className="text-xs text-red-700 mt-1">
                      Revisión pendiente de presupuesto
                    </p>
                  </div>
                  <div
                    className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg cursor-pointer hover:bg-yellow-100"
                    onClick={() => toast({ title: "Recordatorio", description: "Reunión Dirección Política mañana 10:00 AM" })}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Recordatorio</span>
                    </div>
                    <p className="text-xs text-yellow-700 mt-1">
                      Reunión Dirección Política mañana
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {role !== 'voluntario' && role !== 'presidente' && (
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
      )}
    </div>
  );
}
