'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
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
  User,
  Target,
  TrendingUp,
  Search,
  Filter,
  X
} from 'lucide-react';

export default function TrainingPage() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('mock-user');
    if (user) {
      setUserProfile(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Cursos para todos los usuarios con diferentes datos según rol
  const allCourses = [
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
      featured: true,
      availableForVolunteer: true,
      isEnrolled: true
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
      featured: true,
      availableForVolunteer: true,
      isEnrolled: true
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
      featured: false,
      availableForVolunteer: true,
      isEnrolled: false
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
      featured: false,
      availableForVolunteer: false,
      isEnrolled: false
    },
    {
      id: 5,
      title: 'Voluntariado y Participación Comunitaria',
      description: 'Aprende técnicas efectivas para participar activamente en tu comunidad como Posibilista.',
      instructor: 'Lic. Carmen Jiménez',
      duration: '3 horas',
      modules: 6,
      enrolled: 45,
      completed: 12,
      level: 'Básico',
      category: 'Voluntariado',
      progress: 100,
      rating: 4.9,
      featured: false,
      availableForVolunteer: true,
      isEnrolled: true,
      isCompleted: true
    },
    {
      id: 6,
      title: 'Gestión Administrativa del Partido',
      description: 'Conocimientos fundamentales sobre la administración y organización interna del partido.',
      instructor: 'Lic. Fernando Ruiz',
      duration: '7 horas',
      modules: 14,
      enrolled: 76,
      completed: 19,
      level: 'Avanzado',
      category: 'Administración',
      progress: 0,
      rating: 4.5,
      featured: false,
      availableForVolunteer: false,
      isEnrolled: false
    },
    {
      id: 7,
      title: 'Comunicación Efectiva con Medios',
      description: 'Técnicas para interactuar efectivamente con periodistas y medios de comunicación.',
      instructor: 'Dra. Laura Vásquez',
      duration: '4 horas',
      modules: 8,
      enrolled: 42,
      completed: 15,
      level: 'Intermedio',
      category: 'Comunicación',
      progress: 0,
      rating: 4.7,
      featured: false,
      availableForVolunteer: true,
      isEnrolled: false
    },
    {
      id: 8,
      title: 'Análisis de Políticas Públicas',
      description: 'Metodologías para el análisis y evaluación de políticas públicas desde la perspectiva de País Posible.',
      instructor: 'Dr. Antonio García',
      duration: '10 horas',
      modules: 20,
      enrolled: 28,
      completed: 8,
      level: 'Avanzado',
      category: 'Políticas Públicas',
      progress: 0,
      rating: 4.9,
      featured: false,
      availableForVolunteer: false,
      isEnrolled: false
    }
  ];

  const handleEnrollment = (course: any) => {
    toast({
      title: "¡Inscripción exitosa!",
      description: `Te has inscrito exitosamente en: ${course.title}`,
      variant: "default",
    });
    // Here would go the real enrollment logic
  };

  const categories = [...new Set(allCourses.map(course => course.category))];
  const levels = [...new Set(allCourses.map(course => course.level))];

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
      case 'Voluntariado': return 'bg-green-100 text-green-800';
      case 'Administración': return 'bg-red-100 text-red-800';
      case 'Políticas Públicas': return 'bg-cyan-100 text-cyan-800';
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
  const isVolunteer = userRole === 'voluntario';
  
  // Filtrar cursos según el rol
  const availableCourses = isVolunteer 
    ? allCourses.filter(course => course.availableForVolunteer)
    : allCourses;

  const enrolledCourses = availableCourses.filter(course => course.isEnrolled);
  const completedCourses = enrolledCourses.filter(course => course.isCompleted || course.progress === 100);

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === '' || course.level === selectedLevel;
    const isAvailable = userRole === 'voluntario' ? course.availableForVolunteer : true;
    
    return matchesSearch && matchesCategory && matchesLevel && isAvailable;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isVolunteer ? 'Mi Capacitación' : 'Capacitación y Formación'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isVolunteer 
              ? 'Desarrolla tus habilidades como Posibilista Activo'
              : 'Desarrolla tus habilidades como militante de País Posible'
            }
          </p>
        </div>
        <Dialog open={isExploreModalOpen} onOpenChange={setIsExploreModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <BookOpen className="h-4 w-4 mr-2" />
              {isVolunteer ? 'Mis Cursos' : 'Explorar Cursos'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Explorar Catálogo de Cursos
              </DialogTitle>
              <DialogDescription>
                Descubre y inscríbete en cursos de formación política y desarrollo personal
              </DialogDescription>
            </DialogHeader>
            
            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar cursos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos los niveles</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                      <Badge className={getCategoryColor(course.category)}>
                        {course.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span className="truncate">{course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          <span>{course.modules} módulos</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          <span>{course.rating}/5</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{course.enrolled} inscritos</span>
                        <span className={`font-medium ${
                          course.isEnrolled ? 'text-green-600' : 
                          course.availableForVolunteer ? 'text-blue-600' : 'text-gray-400'
                        }`}>
                          {course.isEnrolled ? 'Inscrito' : 
                           course.availableForVolunteer ? 'Disponible' : 'Restringido'}
                        </span>
                      </div>

                      {course.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progreso</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-600 h-1.5 rounded-full transition-all" 
                              style={{width: `${course.progress}%`}}
                            ></div>
                          </div>
                        </div>
                      )}

                      <Button 
                        onClick={() => {
                          if (!course.isEnrolled && (course.availableForVolunteer || !isVolunteer)) {
                            handleEnrollment(course);
                            setIsExploreModalOpen(false);
                          }
                        }}
                        disabled={course.isEnrolled || (!course.availableForVolunteer && isVolunteer)}
                        className="w-full"
                        variant={course.isEnrolled ? 'outline' : 'default'}
                      >
                        {course.progress === 100 || course.isCompleted ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Completado
                          </>
                        ) : course.progress > 0 ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Continuar
                          </>
                        ) : course.isEnrolled ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Iniciar Curso
                          </>
                        ) : course.availableForVolunteer || !isVolunteer ? (
                          <>
                            <BookOpen className="h-4 w-4 mr-2" />
                            Inscribirse
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 mr-2" />
                            No Disponible
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No se encontraron cursos que coincidan con tu búsqueda</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards - Para administradores */}
      {!isVolunteer && (
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
              <p className="text-xs text-muted-foreground">Posibilistas en formación</p>
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
      )}

      {/* Stats Cards - Para Posibilistas Activos */}
      {isVolunteer && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos Inscritos</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrolledCourses.length}</div>
              <p className="text-xs text-muted-foreground">Cursos activos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completados</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCourses.length}</div>
              <p className="text-xs text-muted-foreground">Certificados obtenidos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mis Horas</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">13</div>
              <p className="text-xs text-muted-foreground">Horas completadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
              <Target className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableCourses.filter(c => !c.isEnrolled).length}</div>
              <p className="text-xs text-muted-foreground">Para inscribirse</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* My Progress */}
      <Card>
        <CardHeader>
          <CardTitle>
            {isVolunteer ? 'Mi Progreso Personal' : 'Mi Progreso de Formación'}
          </CardTitle>
          <CardDescription>
            {isVolunteer 
              ? 'Tu avance como Posibilista Activo en capacitación'
              : 'Tu avance en el programa de capacitación de País Posible'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg bg-blue-50">
              <div className="text-3xl font-bold text-blue-600 mb-2">{completedCourses.length}</div>
              <div className="text-sm font-medium">Cursos Completados</div>
              <div className="text-xs text-gray-500">De {enrolledCourses.length} inscritos</div>
            </div>
            <div className="text-center p-4 border rounded-lg bg-green-50">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {isVolunteer ? '13' : '28'}
              </div>
              <div className="text-sm font-medium">Horas de Estudio</div>
              <div className="text-xs text-gray-500">Total acumuladas</div>
            </div>
            <div className="text-center p-4 border rounded-lg bg-yellow-50">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {isVolunteer ? '92%' : '85%'}
              </div>
              <div className="text-sm font-medium">Promedio General</div>
              <div className="text-xs text-gray-500">En evaluaciones</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Courses */}
      <Card>
        <CardHeader>
          <CardTitle>
            {isVolunteer ? 'Mis Cursos Actuales' : 'Cursos Recomendados'}
          </CardTitle>
          <CardDescription>
            {isVolunteer 
              ? 'Cursos en los que estás inscrito como Posibilista Activo'
              : 'Cursos destacados para tu desarrollo como militante'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(isVolunteer 
              ? availableCourses.filter(course => course.featured && course.isEnrolled) 
              : availableCourses.filter(course => course.featured)
            ).map((course) => (
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
                      {course.progress === 100 || course.isCompleted ? (
                        <div className="flex gap-2">
                          <Button className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Completado
                          </Button>
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Certificado
                          </Button>
                        </div>
                      ) : course.progress > 0 ? (
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => window.open(`/course/${course.id}/continue`, '_blank')}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Continuar Curso
                        </Button>
                      ) : course.isEnrolled ? (
                        <Button 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => window.open(`/course/${course.id}/start`, '_blank')}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Iniciar Curso
                        </Button>
                      ) : (
                        <Button 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleEnrollment(course)}
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Inscribirse
                        </Button>
                      )}
                      <Button 
                        variant="outline"
                        onClick={() => window.open(`/course/${course.id}/details`, '_blank')}
                      >
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
            <CardTitle>
              {isVolunteer ? 'Cursos Disponibles' : 'Todos los Cursos'}
            </CardTitle>
            <CardDescription>
              {isVolunteer 
                ? 'Cursos adicionales para tu desarrollo como Posibilista'
                : 'Catálogo completo de cursos disponibles'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableCourses.filter(course => !course.featured).map((course) => (
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
                    {course.progress === 100 || course.isCompleted ? (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" disabled>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completado
                      </Button>
                    ) : course.progress > 0 ? (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => window.open(`/course/${course.id}/continue`, '_blank')}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Continuar
                      </Button>
                    ) : course.isEnrolled ? (
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => window.open(`/course/${course.id}/start`, '_blank')}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Iniciar
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleEnrollment(course)}
                      >
                        <BookOpen className="h-3 w-3 mr-1" />
                        Inscribirse
                      </Button>
                    )}
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