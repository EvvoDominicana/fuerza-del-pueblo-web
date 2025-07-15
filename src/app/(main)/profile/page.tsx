'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { 
  Edit3, 
  MapPin, 
  Calendar, 
  Users, 
  Phone, 
  Mail, 
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Clock,
  Target,
  TrendingUp,
  Building,
  Camera,
  Save,
  User,
  Shield,
  Crown,
  Flag,
  CheckSquare,
  Upload,
  X,
  Image as ImageIcon,
  Trash2
} from 'lucide-react';

const profileData = {
  admin: {
    name: 'Administrador General',
    email: 'admin@paisposible.com',
    initials: 'AG',
    role: 'Administrador',
    roleColor: 'bg-red-100 text-red-800',
    location: 'Santo Domingo, República Dominicana',
    memberSince: 'Enero 2024',
    structure: 'Estructura Nacional',
    phone: '+1 (809) 555-0123',
    bio: 'Administrador general con más de 10 años de experiencia en gestión de organizaciones políticas y tecnología.',
    // Professional Information
    professional: {
      currentPosition: 'Administrador General - País Posible',
      department: 'Dirección Ejecutiva',
      education: [
        {
          degree: 'Maestría en Administración Pública',
          institution: 'Universidad Autónoma de Santo Domingo',
          year: '2018',
          status: 'Completado'
        },
        {
          degree: 'Licenciatura en Ingeniería de Sistemas',
          institution: 'Instituto Tecnológico de Santo Domingo',
          year: '2015',
          status: 'Completado'
        }
      ],
      experience: [
        {
          position: 'Director de Sistemas',
          company: 'Ministerio de la Presidencia',
          period: '2020 - 2024',
          description: 'Gestión de infraestructura tecnológica y sistemas administrativos.'
        },
        {
          position: 'Consultor en TI',
          company: 'Freelance',
          period: '2018 - 2020',
          description: 'Consultoría en transformación digital para organizaciones públicas.'
        }
      ],
      skills: ['Gestión de Proyectos', 'Liderazgo', 'Tecnología', 'Administración Pública', 'Análisis de Datos'],
      certifications: ['PMP - Project Management Professional', 'ITIL v4 Foundation', 'Scrum Master']
    },
    stats: [
      { label: 'Tareas Completadas', value: '24', period: 'Este mes', color: 'text-green-600' },
      { label: 'Eventos Organizados', value: '8', period: 'Este año', color: 'text-blue-600' },
      { label: 'Puntos Acumulados', value: '1,250', period: 'Total', color: 'text-purple-600' }
    ],
    permissions: [
      { name: 'Gestión de Usuarios', level: 'Completo' },
      { name: 'Gestión de Eventos', level: 'Completo' },
      { name: 'Gestión de Tareas', level: 'Completo' },
      { name: 'Analytics', level: 'Completo' },
      { name: 'Configuración', level: 'Completo' },
      { name: 'Moderación', level: 'Completo' }
    ]
  },
  presidente: {
    name: 'Milton Morrison',
    email: 'presidente@paisposible.com',
    initials: 'MM',
    role: 'Presidente del Partido',
    roleColor: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
    location: 'Santo Domingo, República Dominicana',
    memberSince: 'Fundador - 2020',
    structure: 'Dirección Nacional',
    phone: '+1 (809) 555-0100',
    bio: 'Presidente fundador de País Posible. Líder visionario con amplia experiencia en política, economía y desarrollo social de la República Dominicana.',
    // Professional Information
    professional: {
      currentPosition: 'Presidente - País Posible',
      department: 'Dirección Nacional',
      education: [
        {
          degree: 'Doctorado en Ciencias Políticas',
          institution: 'Universidad de Harvard',
          year: '2010',
          status: 'Completado'
        },
        {
          degree: 'Maestría en Economía Internacional',
          institution: 'London School of Economics',
          year: '2005',
          status: 'Completado'
        },
        {
          degree: 'Licenciatura en Derecho',
          institution: 'Universidad Nacional Pedro Henríquez Ureña',
          year: '2002',
          status: 'Completado'
        }
      ],
      experience: [
        {
          position: 'Consultor Económico Internacional',
          company: 'Banco Mundial',
          period: '2015 - 2020',
          description: 'Asesoría en políticas económicas para países de América Latina y el Caribe.'
        },
        {
          position: 'Director de Políticas Públicas',
          company: 'Think Tank Desarrollo RD',
          period: '2010 - 2015',
          description: 'Investigación y desarrollo de propuestas de políticas públicas innovadoras.'
        },
        {
          position: 'Diputado Nacional',
          company: 'Congreso Nacional',
          period: '2006 - 2010',
          description: 'Representación legislativa con enfoque en desarrollo económico y social.'
        }
      ],
      skills: ['Liderazgo Político', 'Política Económica', 'Relaciones Internacionales', 'Oratoria', 'Negociación', 'Gestión Estratégica'],
      certifications: ['Diplomado en Gobernanza - Universidad de Georgetown', 'Certificación en Liderazgo Ejecutivo - INSEAD']
    },
    stats: [
      { label: 'Tareas Completadas', value: '18', period: 'Este mes', color: 'text-green-600' },
      { label: 'Eventos Organizados', value: '5', period: 'Este año', color: 'text-blue-600' },
      { label: 'Puntos Acumulados', value: '850', period: 'Total', color: 'text-purple-600' }
    ],
    permissions: [
      { name: 'Gestión Regional', level: 'Completo' },
      { name: 'Gestión de Eventos', level: 'Regional' },
      { name: 'Gestión de Tareas', level: 'Regional' },
      { name: 'Reportes', level: 'Regional' },
      { name: 'Coordinación', level: 'Completo' }
    ]
  },
  coordinador: {
    name: 'Ana Rodríguez',
    email: 'coordinador@paisposible.com',
    initials: 'AR',
    role: 'Coordinadora Regional',
    roleColor: 'bg-purple-100 text-purple-800',
    location: 'La Vega, República Dominicana',
    memberSince: 'Mayo 2024',
    structure: 'Coordinación Regional Centro',
    phone: '+1 (809) 555-0125',
    bio: 'Coordinadora regional con sólida experiencia en gestión comunitaria y desarrollo de proyectos sociales.',
    // Professional Information
    professional: {
      currentPosition: 'Coordinadora Regional Centro - País Posible',
      department: 'Coordinación Regional',
      education: [
        {
          degree: 'Maestría en Gestión Social',
          institution: 'Universidad Católica Santo Domingo',
          year: '2020',
          status: 'Completado'
        },
        {
          degree: 'Licenciatura en Trabajo Social',
          institution: 'Universidad Autónoma de Santo Domingo',
          year: '2017',
          status: 'Completado'
        }
      ],
      experience: [
        {
          position: 'Directora de Programas Sociales',
          company: 'ONG Desarrollo Comunitario',
          period: '2021 - 2024',
          description: 'Gestión de programas de desarrollo comunitario y empoderamiento ciudadano.'
        },
        {
          position: 'Coordinadora de Proyectos',
          company: 'Fundación Manos Unidas',
          period: '2018 - 2021',
          description: 'Coordinación de proyectos de educación y salud comunitaria.'
        }
      ],
      skills: ['Gestión Comunitaria', 'Liderazgo', 'Trabajo Social', 'Coordinación de Equipos', 'Desarrollo de Proyectos'],
      certifications: ['Diplomado en Liderazgo Comunitario', 'Certificación en Gestión de Proyectos Sociales']
    },
    stats: [
      { label: 'Tareas Completadas', value: '12', period: 'Este mes', color: 'text-green-600' },
      { label: 'Eventos Coordinados', value: '3', period: 'Este año', color: 'text-blue-600' },
      { label: 'Puntos Acumulados', value: '420', period: 'Total', color: 'text-purple-600' }
    ],
    permissions: [
      { name: 'Gestión de Equipo', level: 'Local' },
      { name: 'Gestión de Eventos', level: 'Local' },
      { name: 'Gestión de Tareas', level: 'Asignadas' },
      { name: 'Reportes', level: 'Local' }
    ]
  },
  voluntario: {
    name: 'Carlos Martínez',
    email: 'voluntario@paisposible.com',
    initials: 'CM',
    role: 'Posibilista Activo',
    roleColor: 'bg-green-100 text-green-800',
    location: 'San Pedro de Macorís, República Dominicana',
    memberSince: 'Agosto 2024',
    structure: 'Base Comunitaria Sur',
    phone: '+1 (809) 555-0126',
    bio: 'Posibilista activo comprometido con el desarrollo de su comunidad y la participación ciudadana.',
    // Professional Information
    professional: {
      currentPosition: 'Ingeniero de Software - TechSolutions RD',
      department: 'Desarrollo de Software',
      education: [
        {
          degree: 'Ingeniería en Sistemas',
          institution: 'Instituto Tecnológico de Las Américas',
          year: '2022',
          status: 'Completado'
        },
        {
          degree: 'Técnico en Programación',
          institution: 'INFOTEP',
          year: '2019',
          status: 'Completado'
        }
      ],
      experience: [
        {
          position: 'Desarrollador Full Stack',
          company: 'TechSolutions RD',
          period: '2022 - Presente',
          description: 'Desarrollo de aplicaciones web y móviles para empresas locales.'
        },
        {
          position: 'Desarrollador Junior',
          company: 'StartUp Digital',
          period: '2020 - 2022',
          description: 'Desarrollo de sitios web y aplicaciones móviles básicas.'
        }
      ],
      skills: ['Programación', 'Desarrollo Web', 'Trabajo en Equipo', 'Resolución de Problemas', 'Participación Comunitaria'],
      certifications: ['AWS Cloud Practitioner', 'Google Analytics Certified']
    },
    stats: [
      { label: 'Tareas Completadas', value: '8', period: 'Este mes', color: 'text-green-600' },
      { label: 'Eventos Participados', value: '4', period: 'Este año', color: 'text-blue-600' },
      { label: 'Puntos Ganados', value: '150', period: 'Total', color: 'text-purple-600' }
    ],
    permissions: [
      { name: 'Mis Tareas', level: 'Asignadas' },
      { name: 'Eventos', level: 'Participación' },
      { name: 'Capacitaciones', level: 'Acceso' },
      { name: 'Gamificación', level: 'Personal' }
    ]
  }
};

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>('https://placehold.co/150x150.png');
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
    location: '',
    bio: '',
    currentPosition: '',
    department: ''
  });

  useEffect(() => {
    const user = localStorage.getItem('mock-user');
    if (user) {
      setUserProfile(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const handleEditProfile = () => {
    const role = userProfile?.role || 'voluntario';
    const profile = profileData[role as keyof typeof profileData] || profileData.voluntario;
    
    setEditData({
      name: profile.name,
      phone: profile.phone,
      location: profile.location,
      bio: profile.bio || '',
      currentPosition: profile.professional?.currentPosition || '',
      department: profile.professional?.department || ''
    });
    setIsEditOpen(true);
  };

  const handleSaveProfile = () => {
    toast({
      title: "Perfil actualizado",
      description: "Los cambios en tu perfil han sido guardados exitosamente.",
      variant: "default",
    });
    setIsEditOpen(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Por favor selecciona un archivo de imagen válido.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "La imagen debe ser menor a 5MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    if (selectedImage) {
      setProfileImage(selectedImage);
      toast({
        title: "¡Foto actualizada!",
        description: "Tu foto de perfil ha sido actualizada exitosamente.",
        variant: "default",
      });
      setIsImageUploadOpen(false);
      setSelectedImage(null);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage('https://placehold.co/150x150.png');
    toast({
      title: "Foto removida",
      description: "Tu foto de perfil ha sido removida.",
      variant: "default",
    });
    setIsImageUploadOpen(false);
    setSelectedImage(null);
  };

  if (loading || !userProfile) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const role = userProfile?.role || 'voluntario';
  const profile = profileData[role as keyof typeof profileData] || profileData.voluntario;

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl p-8 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src={profileImage} alt="Foto de perfil" />
                <AvatarFallback className="text-2xl font-bold bg-white text-gray-700">{profile.initials}</AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-2 -right-2 rounded-full p-2 bg-white text-gray-700 hover:bg-gray-100"
                onClick={() => setIsImageUploadOpen(true)}
              >
                <Camera className="h-3 w-3" />
              </Button>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
              <p className="text-blue-100 text-lg mb-3">{profile.email}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className={`${profile.roleColor} border-white`}>
                  {profile.role === 'admin' && <Shield className="h-3 w-3 mr-1" />}
                  {profile.role === 'presidente' && <Crown className="h-3 w-3 mr-1" />}
                  {profile.role === 'coordinador' && <Flag className="h-3 w-3 mr-1" />}
                  {profile.role === 'voluntario' && <User className="h-3 w-3 mr-1" />}
                  {profile.role}
                </Badge>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Activo
                </Badge>
              </div>
            </div>
          </div>
          
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={handleEditProfile}
              >
                <Edit3 className="mr-2 h-4 w-4" />
                Editar Perfil
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Edit3 className="h-5 w-5" />
                  Editar Perfil
                </DialogTitle>
                <DialogDescription>
                  Actualiza tu información personal y profesional
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Nombre Completo</label>
                    <Input
                      value={editData.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Teléfono</label>
                    <Input
                      value={editData.phone}
                      onChange={(e) => setEditData({...editData, phone: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Ubicación</label>
                  <Input
                    value={editData.location}
                    onChange={(e) => setEditData({...editData, location: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Biografía</label>
                  <Textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({...editData, bio: e.target.value})}
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Posición Actual</label>
                    <Input
                      value={editData.currentPosition}
                      onChange={(e) => setEditData({...editData, currentPosition: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Departamento</label>
                    <Input
                      value={editData.department}
                      onChange={(e) => setEditData({...editData, department: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Image Upload Dialog */}
          <Dialog open={isImageUploadOpen} onOpenChange={setIsImageUploadOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Cambiar Foto de Perfil
                </DialogTitle>
                <DialogDescription>
                  Selecciona una nueva imagen para tu perfil
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {/* Current Image Preview */}
                <div className="flex justify-center">
                  <Avatar className="h-32 w-32 border-2 border-gray-200">
                    <AvatarImage src={selectedImage || profileImage} alt="Vista previa" />
                    <AvatarFallback className="text-2xl font-bold bg-gray-100 text-gray-600">
                      {profile.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Upload Button */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
                      <Upload className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {selectedImage ? 'Cambiar imagen' : 'Seleccionar imagen'}
                      </span>
                    </div>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 text-center">
                    Formatos: JPG, PNG, GIF. Máximo 5MB.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsImageUploadOpen(false);
                      setSelectedImage(null);
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                  {profileImage !== 'https://placehold.co/150x150.png' && (
                    <Button 
                      variant="destructive" 
                      onClick={handleRemoveImage}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remover
                    </Button>
                  )}
                  {selectedImage && (
                    <Button 
                      onClick={handleSaveImage}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Professional Overview */}
      {profile.bio && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Acerca de {profile.name.split(' ')[0]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          </CardContent>
        </Card>
      )}

      {/* Quick Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Ubicación</p>
                <p className="font-semibold">{profile.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Miembro desde</p>
                <p className="font-semibold">{profile.memberSince}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-full">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Estructura</p>
                <p className="font-semibold">{profile.structure}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Professional Information */}
      {profile.professional && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-indigo-600" />
              Información Profesional
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Position */}
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="h-5 w-5 text-indigo-600" />
                <h4 className="font-semibold text-indigo-900">Posición Actual</h4>
              </div>
              <p className="text-lg font-medium text-indigo-800">{profile.professional.currentPosition}</p>
              <p className="text-sm text-indigo-600">{profile.professional.department}</p>
            </div>

            {/* Education */}
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-lg mb-4">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                Educación
              </h4>
              <div className="space-y-4">
                {profile.professional.education.map((edu: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-gray-900">{edu.degree}</h5>
                        <p className="text-blue-600">{edu.institution}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {edu.year}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-lg mb-4">
                <Clock className="h-5 w-5 text-green-600" />
                Experiencia Profesional
              </h4>
              <div className="space-y-4">
                {profile.professional.experience.map((exp: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium text-gray-900">{exp.position}</h5>
                        <p className="text-blue-600">{exp.company}</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-lg mb-4">
                <Target className="h-5 w-5 text-purple-600" />
                Habilidades
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.professional.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-lg mb-4">
                <Award className="h-5 w-5 text-yellow-600" />
                Certificaciones
              </h4>
              <div className="space-y-2">
                {profile.professional.certifications.map((cert: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                    <Award className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {profile.stats.map((stat, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.period}</p>
                </div>
                <div className={`p-3 rounded-full ${
                  stat.color.includes('green') ? 'bg-green-100' :
                  stat.color.includes('blue') ? 'bg-blue-100' :
                  'bg-purple-100'
                }`}>
                  {stat.label.includes('Tareas') && <CheckSquare className="h-6 w-6 text-green-600" />}
                  {stat.label.includes('Eventos') && <Calendar className="h-6 w-6 text-blue-600" />}
                  {stat.label.includes('Puntos') && <Star className="h-6 w-6 text-purple-600" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Information */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-green-600" />
            Información de Contacto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Phone className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium">{profile.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions and Access */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            Permisos y Accesos
          </CardTitle>
          <CardDescription>
            Niveles de acceso y permisos dentro de la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.permissions.map((permission, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium">{permission.name}</span>
                <Badge 
                  variant="secondary" 
                  className={
                    permission.level === 'Completo' ? 'bg-green-100 text-green-800' :
                    permission.level === 'Regional' || permission.level === 'Local' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }
                >
                  {permission.level}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}