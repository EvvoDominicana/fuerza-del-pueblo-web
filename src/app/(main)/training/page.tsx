'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Play,
  Users,
  Award,
  Clock,
  CheckCircle,
  Star,
  Download,
  Calendar,
  User
} from 'lucide-react';

export default function TrainingPage() {
  const courses = [
    {
      id: 1,
      title: 'Fundamentos de la Militancia Política',
      description: 'Curso básico sobre los principios y valores de País Posible, estructura organizacional y responsabilidades del militante.',
      instructor: 'Dr. Carlos Méndez',
      duration: '4 horas',
      modules: 8,
      enrolled: 234,
      completed: 45,
      level: 'Básico',
      category: 'Formación Política',
      progress: 75,
      rating: 4.8,
      featured: true
    },
    {
      id: 2,
      title: 'Técnicas de Movilización Comunitaria',
      description: 'Herramientas prácticas para organizar y movilizar comunidades en apoyo a las iniciativas del partido.',
      instructor: 'Lic. Ana Rodríguez',
      duration: '6 horas',
      modules: 12,
      enrolled: 189,
      completed: 67,
      level: 'Intermedio',
      category: 'Organización',
      progress: 30,
      rating: 4.6,
      featured: true
    },
    {
      id: 3,
      title: 'Comunicación Política Digital',
      description: 'Estrategias y herramientas para la comunicación efectiva en redes sociales y medios digitales.',
      instructor: 'Ing. Roberto López',
      duration: '5 horas',
      modules: 10,
      enrolled: 156,
      completed: 23,
      level: 'Intermedio',
      category: 'Comunicación',
      progress: 0,
      rating: 4.9,
      featured: false
    },
    {
      id: 4,
      title: 'Liderazgo y Gestión de Equipos',
      description: 'Desarrollo de habilidades de liderazgo para coordinadores y dirigentes del partido.',
      instructor: 'Dra. María González',
      duration: '8 horas',
      modules: 15,
      enrolled: 98,
      completed: 34,
      level: 'Avanzado',
      category: 'Liderazgo',
      progress: 0,
      rating: 4.7,
      featured: false
    }
  ];

  const recentActivity = [
    {
      type: 'completion',
      user: 'Juan Pérez',
      course: 'Fundamentos de la Militancia Política',
      action: 'completó el curso',
      time: 'Hace 2 horas'
    },
    {
      type: 'enrollment',
      user: 'Maria Santos',
      course: 'Técnicas de Movilización Comunitaria',
      action: 'se inscribió en',
      time: 'Hace 4 horas'
    },
    {
      type: 'certificate',
      user: 'Carlos Martínez',
      course: 'Comunicación Política Digital',
      action: 'obtuvo certificado de',
      time: 'Hace 1 día'
    }
  ];

  const achievements = [
    {
      title: 'Estudiante Dedicado',
      description: 'Completó 5 cursos este mes',
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      earned: true
    },
    {
      title: 'Mentor Experto',
      description: 'Ayudó a 10 compañeros en sus cursos',
      icon: <Users className="h-6 w-6 text-green-600" />,
      earned: true
    },
    {
      title: 'Líder en Formación',
      description: 'Completar todos los cursos de liderazgo',
      icon: <Award className="h-6 w-6 text-yellow-600" />,
      earned: false
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Básico': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Formación Política': return 'bg-blue-100 text-blue-800';
      case 'Organización': return 'bg-purple-100 text-purple-800';
      case 'Comunicación': return 'bg-orange-100 text-orange-800';
      case 'Liderazgo': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Capacitación y Formación</h1>
          <p className="text-gray-600 mt-1">
            Desarrolla tus habilidades como militante de País Posible
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <BookOpen className="h-4 w-4 mr-2" />
          Explorar Cursos
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Disponibles</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">En 6 categorías</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes Activos</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Militantes en formación</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificados Emitidos</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">567</div>
            <p className="text-xs text-muted-foreground">Este año</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas de Formación</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,456</div>
            <p className="text-xs text-muted-foreground">Horas completadas</p>
          </CardContent>
        </Card>
      </div>

      {/* My Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Mi Progreso de Formación</CardTitle>
          <CardDescription>
            Tu avance en el programa de capacitación de País Posible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg bg-blue-50">
              <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
              <div className="text-sm font-medium">Cursos Completados</div>
              <div className="text-xs text-gray-500">De 4 inscritos</div>
            </div>
            <div className="text-center p-4 border rounded-lg bg-green-50">
              <div className="text-3xl font-bold text-green-600 mb-2">28</div>
              <div className="text-sm font-medium">Horas de Estudio</div>
              <div className="text-xs text-gray-500">Total acumuladas</div>
            </div>
            <div className="text-center p-4 border rounded-lg bg-yellow-50">
              <div className="text-3xl font-bold text-yellow-600 mb-2">85%</div>
              <div className="text-sm font-medium">Promedio General</div>
              <div className="text-xs text-gray-500">En evaluaciones</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Cursos Recomendados</CardTitle>
          <CardDescription>
            Cursos destacados para tu desarrollo como militante
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.filter(course => course.featured).map((course) => (
              <div key={course.id} className="p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                      <Badge className={getCategoryColor(course.category)}>
                        {course.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.modules} módulos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{course.rating}/5</span>
                      </div>
                    </div>
                    
                    {course.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progreso</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full transition-all" style={{width: `${course.progress}%`}}></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      {course.progress > 0 ? (
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Play className="h-4 w-4 mr-2" />
                          Continuar
                        </Button>
                      ) : (
                        <Button className="bg-green-600 hover:bg-green-700">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Inscribirse
                        </Button>
                      )}
                      <Button variant="outline">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* All Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Todos los Cursos</CardTitle>
            <CardDescription>
              Catálogo completo de cursos disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.filter(course => !course.featured).map((course) => (
                <div key={course.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{course.title}</h4>
                      <Badge className={getLevelColor(course.level)} size="sm">
                        {course.level}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{course.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{course.duration}</span>
                      <span>{course.modules} módulos</span>
                      <span>{course.enrolled} inscritos</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements & Activity */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Logros en Formación</CardTitle>
              <CardDescription>
                Reconocimientos por tu dedicación al aprendizaje
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200 opacity-60'}`}>
                    <div className="p-2 rounded-full bg-white">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>
                Últimos movimientos en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-600"> {activity.action} </span>
                      <span className="font-medium">{activity.course}</span>
                      <div className="text-xs text-gray-400">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}