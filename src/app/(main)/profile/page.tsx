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
  ImageIcon,
  MessageCircle,
  Trash2
} from 'lucide-react';
import { usePartySettings } from '@/contexts/PartySettingsContext';

const profileData = {
  admin: {
    name: 'Administrador FP',
    email: 'admin@fuerzadelpueblo.do',
    initials: 'FP',
    role: 'Administrador',
    roleColor: 'bg-red-100 text-red-800',
    location: 'Santo Domingo, República Dominicana',
    memberSince: 'Enero 2024',
    structure: 'Estructura Nacional',
    phone: '+1 (809) 555-0123',
    bio: 'Administrador de la plataforma con experiencia en gestión de sistemas para organizaciones políticas.',
    professional: {
      currentPosition: 'Administrador de Plataforma - Fuerza del Pueblo',
      department: 'Tecnología',
      education: [
        {
          degree: 'Ingeniería de Software',
          institution: 'INTEC',
          year: '2018',
          status: 'Completado'
        }
      ],
      experience: [
        {
          position: 'Director de TI',
          company: 'Agencia Digital',
          period: '2020 - 2024',
          description: 'Gestión de infraestructura tecnológica.'
        }
      ],
      skills: ['Gestión de Sistemas', 'Seguridad Informática', 'Bases de Datos', 'Next.js', 'Firebase'],
      certifications: ['CompTIA Security+', 'AWS Certified Developer']
    },
    stats: [
      { label: 'Usuarios Gestionados', value: '2,847', period: 'Total', color: 'text-green-600' },
      { label: 'Reportes Generados', value: '15', period: 'Este mes', color: 'text-blue-600' },
      { label: 'Tickets Resueltos', value: '42', period: 'Este mes', color: 'text-purple-600' }
    ],
    permissions: [
      { name: 'Gestión de Usuarios', level: 'Completo' },
      { name: 'Gestión de Contenido', level: 'Completo' },
      { name: 'Gestión de Tareas', level: 'Completo' },
      { name: 'Analytics Global', level: 'Completo' },
      { name: 'Configuración de Sistema', level: 'Completo' },
      { name: 'Moderación General', level: 'Completo' }
    ]
  },
  presidente: {
    name: 'Leonel Fernández',
    email: 'leonel.fernandez@fuerzadelpueblo.do',
    initials: 'LF',
    role: 'Presidente del Partido',
    roleColor: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
    location: 'Santo Domingo, República Dominicana',
    memberSince: 'Fundador - 2019',
    structure: 'Dirección Nacional',
    phone: '+1 (809) 555-0100',
    bio: 'Presidente de la Fuerza del Pueblo. Ex-Presidente de la República Dominicana, abogado, escritor y académico. Comprometido con la transformación y el progreso del país.',
    professional: {
      currentPosition: 'Presidente - Fuerza del Pueblo',
      department: 'Dirección Nacional',
      education: [
        {
          degree: 'Doctorado en Derecho',
          institution: 'Universidad Autónoma de Santo Domingo',
          year: '1978',
          status: 'Completado'
        }
      ],
      experience: [
        {
          position: 'Presidente de la República Dominicana',
          company: 'República Dominicana',
          period: '1996-2000, 2004-2012',
          description: 'Lideró el país durante tres períodos constitucionales.'
        }
      ],
      skills: ['Liderazgo Político', 'Estrategia', 'Relaciones Internacionales', 'Oratoria', 'Economía'],
      certifications: ['Doctor Honoris Causa en múltiples universidades internacionales.']
    },
    stats: [
      { label: 'Mensajes Emitidos', value: '18', period: 'Este mes', color: 'text-green-600' },
      { label: 'Eventos Liderados', value: '5', period: 'Este año', color: 'text-blue-600' },
      { label: 'Militantes Alcanzados', value: '1.5M+', period: 'Total', color: 'text-purple-600' }
    ],
    permissions: [
      { name: 'Visión Estratégica', level: 'Completo' },
      { name: 'Comunicación Masiva', level: 'Completo' },
      { name: 'Gestión de Directivas', level: 'Completo' },
      { name: 'Reportes Ejecutivos', level: 'Completo' }
    ]
  },
  coordinador: {
    name: 'Coordinador/a FP',
    email: 'coordinador@fuerzadelpueblo.do',
    initials: 'CF',
    role: 'Coordinador/a Regional',
    roleColor: 'bg-purple-100 text-purple-800',
    location: 'La Vega, República Dominicana',
    memberSince: 'Mayo 2021',
    structure: 'Coordinación Regional Cibao',
    phone: '+1 (809) 555-0125',
    bio: 'Coordinador regional con sólida experiencia en gestión comunitaria y organización de bases.',
    professional: {
      currentPosition: 'Coordinador Regional - Fuerza del Pueblo',
      department: 'Organización',
      education: [
        {
          degree: 'Licenciatura en Administración de Empresas',
          institution: 'PUCMM',
          year: '2015',
          status: 'Completado'
        }
      ],
      experience: [
        {
          position: 'Gerente de Proyectos Sociales',
          company: 'Fundación Progreso',
          period: '2016 - 2021',
          description: 'Liderazgo de iniciativas comunitarias.'
        }
      ],
      skills: ['Gestión de Equipos', 'Organización de Eventos', 'Liderazgo Comunitario'],
      certifications: ['Diplomado en Gerencia Política']
    },
    stats: [
      { label: 'Tareas Asignadas', value: '35', period: 'Este mes', color: 'text-green-600' },
      { label: 'Eventos Coordinados', value: '3', period: 'Este año', color: 'text-blue-600' },
      { label: 'Militantes a Cargo', value: '150', period: 'Total', color: 'text-purple-600' }
    ],
    permissions: [
      { name: 'Gestión de Equipo Local', level: 'Completo' },
      { name: 'Asignación de Tareas', level: 'Local' },
      { name: 'Reportes de Actividad', level: 'Local' }
    ]
  },
  voluntario: {
    name: 'Militante FP',
    email: 'militante@fuerzadelpueblo.do',
    initials: 'MF',
    role: 'Militante',
    roleColor: 'bg-green-100 text-green-800',
    location: 'San Pedro de Macorís, República Dominicana',
    memberSince: 'Agosto 2022',
    structure: 'Base Comunitaria Este',
    phone: '+1 (809) 555-0126',
    bio: 'Militante comprometido con los ideales de la Fuerza del Pueblo y el desarrollo de mi comunidad.',
    professional: {
      currentPosition: 'Estudiante',
      department: 'N/A',
      education: [
        {
          degree: 'Estudiante de Derecho',
          institution: 'Universidad Central del Este',
          year: 'En curso',
          status: 'En Progreso'
        }
      ],
      experience: [
        {
          position: 'Voluntario Comunitario',
          company: 'Junta de Vecinos',
          period: '2020 - Presente',
          description: 'Participación en actividades locales.'
        }
      ],
      skills: ['Trabajo en Equipo', 'Comunicación', 'Participación Comunitaria'],
      certifications: []
    },
    stats: [
      { label: 'Tareas Completadas', value: '8', period: 'Este mes', color: 'text-green-600' },
      { label: 'Eventos Asistidos', value: '4', period: 'Este año', color: 'text-blue-600' },
      { label: 'Puntos Ganados', value: '150', period: 'Total', color: 'text-purple-600' }
    ],
    permissions: [
      { name: 'Ver Tareas', level: 'Asignadas' },
      { name: 'Inscribirse a Eventos', level: 'Abiertos' },
      { name: 'Acceder a Capacitación', level: 'Básica' }
    ]
  }
};

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { settings } = usePartySettings();
  const [profileImage, setProfileImage] = useState<string>(settings.partyLogo);
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

  useEffect(() => {
    setProfileImage(settings.partyLogo);
  }, [settings.partyLogo]);


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
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Por favor selecciona un archivo de imagen válido.",
          variant: "destructive",
        });
        return;
      }

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
    setProfileImage(settings.partyLogo);
    toast({
      title: "Foto restaurada",
      description: "Se ha restaurado la foto de perfil por defecto.",
      variant: "default",
    });
    setIsImageUploadOpen(false);
    setSelectedImage(null);
  };

  if (loading || !userProfile) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const role = userProfile?.role || 'voluntario';
  const profile = profileData[role as keyof typeof profileData] || profileData.voluntario;

  return (
    <div className="space-y-8">
      <div className="relative bg-gradient-to-r from-green-600 via-green-700 to-teal-600 rounded-xl p-8 text-white shadow-2xl">
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
              <p className="text-green-100 text-lg mb-3">{profile.email}</p>
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
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Teléfono</label>
                    <Input
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Ubicación</label>
                  <Input
                    value={editData.location}
                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Biografía</label>
                  <Textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Posición Actual</label>
                    <Input
                      value={editData.currentPosition}
                      onChange={(e) => setEditData({ ...editData, currentPosition: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Departamento</label>
                    <Input
                      value={editData.department}
                      onChange={(e) => setEditData({ ...editData, department: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

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
                <div className="flex justify-center">
                  <Avatar className="h-32 w-32 border-2 border-gray-200">
                    <AvatarImage src={selectedImage || profileImage} alt="Vista previa" />
                    <AvatarFallback className="text-2xl font-bold bg-gray-100 text-gray-600">
                      {profile.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-green-50 transition-colors">
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
                  <Button
                    variant="destructive"
                    onClick={handleRemoveImage}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Restaurar
                  </Button>
                  {selectedImage && (
                    <Button
                      onClick={handleSaveImage}
                      className="bg-primary hover:bg-primary/90"
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

      {profile.bio && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Acerca de {profile.name.split(' ')[0]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
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
                <Calendar className="h-6 w-6 text-primary" />
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
              <div className="p-3 bg-green-100 rounded-full">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Estructura</p>
                <p className="font-semibold">{profile.structure}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {profile.professional && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Información Profesional
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-primary">Posición Actual</h4>
              </div>
              <p className="text-lg font-medium text-gray-800">{profile.professional.currentPosition}</p>
              <p className="text-sm text-gray-600">{profile.professional.department}</p>
            </div>

            <div>
              <h4 className="flex items-center gap-2 font-semibold text-lg mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                Educación
              </h4>
              <div className="space-y-4">
                {profile.professional.education.map((edu: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-gray-900">{edu.degree}</h5>
                        <p className="text-primary">{edu.institution}</p>
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

            <div>
              <h4 className="flex items-center gap-2 font-semibold text-lg mb-4">
                <Clock className="h-5 w-5 text-primary" />
                Experiencia Profesional
              </h4>
              <div className="space-y-4">
                {profile.professional.experience.map((exp: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium text-gray-900">{exp.position}</h5>
                        <p className="text-primary">{exp.company}</p>
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

            <div>
              <h4 className="flex items-center gap-2 font-semibold text-lg mb-4">
                <Target className="h-5 w-5 text-primary" />
                Habilidades
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.professional.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {profile.professional.certifications && profile.professional.certifications.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-lg mb-4">
                  <Award className="h-5 w-5 text-primary" />
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
            )}
          </CardContent>
        </Card>
      )}

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
                <div className={`p-3 rounded-full bg-green-100`}>
                  {(stat.label.includes('Tareas') || stat.label.includes('Tickets')) && <CheckSquare className="h-6 w-6 text-primary" />}
                  {(stat.label.includes('Eventos') || stat.label.includes('Reportes')) && <Calendar className="h-6 w-6 text-primary" />}
                  {(stat.label.includes('Puntos') || stat.label.includes('Usuarios')) && <Star className="h-6 w-6 text-primary" />}
                  {stat.label.includes('Militantes') && <Users className="h-6 w-6 text-primary" />}
                  {stat.label.includes('Mensajes') && <MessageCircle className="h-6 w-6 text-primary" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Información de Contacto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium">{profile.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                      permission.level.includes('Local') ? 'bg-blue-100 text-blue-800' :
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
