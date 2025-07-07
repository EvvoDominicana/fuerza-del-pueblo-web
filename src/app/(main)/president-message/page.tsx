'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Heart,
  Share2,
  Download,
  Calendar,
  Clock,
  Users,
  MessageSquare
} from 'lucide-react';

export default function PresidentMessagePage() {
  const messages = [
    {
      id: 1,
      title: 'Mensaje de Año Nuevo 2024: Construyendo el País Posible',
      description: 'Un llamado a la unidad y al trabajo conjunto para transformar la República Dominicana.',
      date: '2024-01-01',
      duration: '8:45',
      views: 15420,
      likes: 892,
      shares: 156,
      type: 'video',
      featured: true,
      transcript: 'Queridos dominicanos y dominicanas, al inicio de este nuevo año 2024, quiero dirigirme a ustedes con un mensaje de esperanza y determinación. País Posible no es solo un nombre, es una promesa que estamos construyendo juntos cada día...'
    },
    {
      id: 2,
      title: 'Reflexiones sobre el Desarrollo Rural Sostenible',
      description: 'La visión de Milton Morrison sobre la transformación del sector agropecuario dominicano.',
      date: '2024-01-15',
      duration: '12:30',
      views: 8340,
      likes: 523,
      shares: 98,
      type: 'video',
      featured: false,
      transcript: 'El campo dominicano es el corazón de nuestra nación. Durante décadas hemos visto cómo nuestros agricultores han enfrentado desafíos enormes, pero también hemos sido testigos de su resilencia extraordinaria...'
    },
    {
      id: 3,
      title: 'Llamado a la Juventud: El Futuro es Ahora',
      description: 'Un mensaje directo a los jóvenes dominicanos sobre su papel en la transformación del país.',
      date: '2024-01-08',
      duration: '6:20',
      views: 12750,
      likes: 1045,
      shares: 234,
      type: 'audio',
      featured: true,
      transcript: 'Jóvenes de mi país, ustedes no son el futuro de la República Dominicana, ustedes son el presente. Cada día que pasa sin que participen activamente en la construcción de nuestra democracia es un día perdido...'
    }
  ];

  const recentActivity = [
    {
      action: 'Nuevo mensaje publicado',
      description: 'Reflexiones sobre el Desarrollo Rural Sostenible',
      time: 'Hace 3 días',
      icon: <Play className="h-4 w-4 text-blue-600" />
    },
    {
      action: 'Comentarios respondidos',
      description: '25 comentarios en el mensaje de Año Nuevo',
      time: 'Hace 1 semana',
      icon: <MessageSquare className="h-4 w-4 text-green-600" />
    },
    {
      action: 'Transmisión en vivo',
      description: 'Sesión de preguntas y respuestas con militantes',
      time: 'Hace 2 semanas',
      icon: <Users className="h-4 w-4 text-purple-600" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mensajes del Presidente</h1>
          <p className="text-gray-600 mt-1">
            Comunicaciones directas de Milton Morrison con el pueblo dominicano
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Play className="h-4 w-4 mr-2" />
          Nuevo Mensaje
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mensajes</CardTitle>
            <Play className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Este año</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizaciones</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156,420</div>
            <p className="text-xs text-muted-foreground">Reproducciones totales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interacciones</CardTitle>
            <Heart className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,460</div>
            <p className="text-xs text-muted-foreground">Likes y comentarios</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compartidos</CardTitle>
            <Share2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,488</div>
            <p className="text-xs text-muted-foreground">En redes sociales</p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Messages */}
      <Card>
        <CardHeader>
          <CardTitle>Mensajes Destacados</CardTitle>
          <CardDescription>
            Los mensajes más importantes y recientes del presidente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {messages.filter(message => message.featured).map((message) => (
              <div key={message.id} className="p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-start gap-6">
                  <div className="w-32 h-20 bg-gray-300 rounded-lg flex items-center justify-center">
                    <Play className="h-8 w-8 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={message.type === 'video' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                        {message.type === 'video' ? 'Video' : 'Audio'}
                      </Badge>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        Destacado
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{message.title}</h3>
                    <p className="text-gray-600 mb-4">{message.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{message.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{message.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{message.views.toLocaleString()} vistas</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Play className="h-4 w-4 mr-2" />
                        Reproducir
                      </Button>
                      <Button variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Compartir
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Transcript Preview */}
                <div className="mt-6 p-4 bg-white rounded-lg border">
                  <h4 className="font-semibold mb-2">Transcripción (fragmento)</h4>
                  <p className="text-sm text-gray-600 italic">
                    "{message.transcript.substring(0, 200)}..."
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle>Mensajes Recientes</CardTitle>
            <CardDescription>
              Últimas comunicaciones presidenciales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.filter(message => !message.featured).map((message) => (
                <div key={message.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <Play className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{message.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{message.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{message.date}</span>
                      <span>{message.duration}</span>
                      <span>{message.views.toLocaleString()} vistas</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas acciones y actualizaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{activity.action}</h4>
                    <p className="text-xs text-gray-600">{activity.description}</p>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas de Engagement</CardTitle>
          <CardDescription>
            Métricas de interacción con los mensajes presidenciales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">89%</div>
              <div className="text-sm text-gray-600">Tasa de Finalización</div>
              <p className="text-xs text-gray-500 mt-1">Promedio de videos completos</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">4.8</div>
              <div className="text-sm text-gray-600">Calificación Promedio</div>
              <p className="text-xs text-gray-500 mt-1">De 5 estrellas</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">73%</div>
              <div className="text-sm text-gray-600">Tasa de Compartido</div>
              <p className="text-xs text-gray-500 mt-1">Mensajes compartidos en redes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}