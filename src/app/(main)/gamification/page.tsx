'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
// import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Award,
  Medal,
  Target,
  TrendingUp,
  Users,
  Gift,
  ShoppingCart,
  Smartphone,
  Coffee,
  Shirt,
  BookOpen,
  Headphones,
  Monitor,
  Gamepad2,
  X
} from 'lucide-react';

export default function GamificationPage() {
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [userPoints, setUserPoints] = useState(1250);

  const prizes = [
    {
      id: 1,
      name: 'Camiseta Oficial del Partido',
      description: 'Camiseta de algodón con logo del partido',
      points: 200,
      icon: <Shirt className="h-8 w-8 text-blue-600" />,
      category: 'Merchandising',
      stock: 25,
      image: '/api/placeholder/200/200'
    },
    {
      id: 2,
      name: 'Libro: "Liderazgo Político"',
      description: 'Guía completa para líderes políticos modernos',
      points: 150,
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
      category: 'Educación',
      stock: 15,
      image: '/api/placeholder/200/200'
    },
    {
      id: 3,
      name: 'Auriculares Bluetooth',
      description: 'Auriculares inalámbricos de alta calidad',
      points: 400,
      icon: <Headphones className="h-8 w-8 text-purple-600" />,
      category: 'Tecnología',
      stock: 8,
      image: '/api/placeholder/200/200'
    },
    {
      id: 4,
      name: 'Taza de Café Premium',
      description: 'Taza térmica con logo del partido',
      points: 100,
      icon: <Coffee className="h-8 w-8 text-orange-600" />,
      category: 'Merchandising',
      stock: 50,
      image: '/api/placeholder/200/200'
    },
    {
      id: 5,
      name: 'Smartphone Prepago',
      description: 'Teléfono inteligente con plan de datos',
      points: 800,
      icon: <Smartphone className="h-8 w-8 text-red-600" />,
      category: 'Tecnología',
      stock: 3,
      image: '/api/placeholder/200/200'
    },
    {
      id: 6,
      name: 'Monitor Gaming 24"',
      description: 'Monitor Full HD para gaming y trabajo',
      points: 1200,
      icon: <Monitor className="h-8 w-8 text-blue-800" />,
      category: 'Tecnología',
      stock: 2,
      image: '/api/placeholder/200/200'
    },
    {
      id: 7,
      name: 'Consola de Videojuegos',
      description: 'Consola portátil con juegos incluidos',
      points: 1500,
      icon: <Gamepad2 className="h-8 w-8 text-green-800" />,
      category: 'Entretenimiento',
      stock: 1,
      image: '/api/placeholder/200/200'
    },
    {
      id: 8,
      name: 'Trofeo Personalizado',
      description: 'Trofeo grabado con tu nombre y logros',
      points: 300,
      icon: <Trophy className="h-8 w-8 text-yellow-600" />,
      category: 'Reconocimiento',
      stock: 10,
      image: '/api/placeholder/200/200'
    }
  ];

  const handleRedeem = (prize: any) => {
    if (userPoints >= prize.points) {
      setUserPoints(userPoints - prize.points);
      toast({
        title: "¡Canje exitoso!",
        description: `Has canjeado ${prize.name} por ${prize.points} puntos.`,
        variant: "default",
      });
      setIsRedeemModalOpen(false);
    } else {
      toast({
        title: "Puntos insuficientes",
        description: `Necesitas ${prize.points - userPoints} puntos más para este premio.`,
        variant: "destructive",
      });
    }
  };

  const achievements = [
    {
      id: 1,
      title: 'Líder Movilizador',
      description: 'Completó 50 tareas de movilización exitosamente',
      icon: <Trophy className="h-8 w-8 text-yellow-600" />,
      points: 500,
      unlocked: true,
      category: 'Liderazgo'
    },
    {
      id: 2,
      title: 'Organizador Estrella',
      description: 'Organizó 10 eventos comunitarios',
      icon: <Star className="h-8 w-8 text-blue-600" />,
      points: 300,
      unlocked: true,
      category: 'Eventos'
    },
    {
      id: 3,
      title: 'Comunicador Experto',
      description: 'Publicó 25 contenidos en redes sociales',
      icon: <Award className="h-8 w-8 text-green-600" />,
      points: 250,
      unlocked: true,
      category: 'Comunicación'
    },
    {
      id: 4,
      title: 'Mentor de Militantes',
      description: 'Capacitó a 20 nuevos militantes',
      icon: <Medal className="h-8 w-8 text-purple-600" />,
      points: 400,
      unlocked: false,
      category: 'Capacitación',
      progress: 65
    }
  ];

  const leaderboard = [
    {
      rank: 1,
      name: 'Milton Morrison',
      points: 2450,
      level: 'Líder Supremo',
      achievements: 15,
      avatar: 'MM'
    },
    {
      rank: 2,
      name: 'Ana Rodríguez',
      points: 1890,
      level: 'Coordinadora Elite',
      achievements: 12,
      avatar: 'AR'
    },
    {
      rank: 3,
      name: 'Carlos Martínez',
      points: 1654,
      level: 'Organizador Pro',
      achievements: 10,
      avatar: 'CM'
    },
    {
      rank: 4,
      name: 'María González',
      points: 1432,
      level: 'Movilizadora Experta',
      achievements: 9,
      avatar: 'MG'
    },
    {
      rank: 5,
      name: 'Administrador General',
      points: 1250,
      level: 'Coordinador Avanzado',
      achievements: 8,
      avatar: 'AG'
    }
  ];

  const challenges = [
    {
      id: 1,
      title: 'Maratón de Movilización',
      description: 'Completa 20 tareas de movilización en 30 días',
      reward: '500 puntos + Insignia Especial',
      progress: 65,
      timeLeft: '12 días',
      participants: 156
    },
    {
      id: 2,
      title: 'Semana del Organizador',
      description: 'Organiza 3 eventos en una semana',
      reward: '300 puntos + Título Organizador',
      progress: 33,
      timeLeft: '4 días',
      participants: 89
    },
    {
      id: 3,
      title: 'Desafío Comunicador',
      description: 'Publica contenido diario durante 14 días',
      reward: '400 puntos + Badge Comunicador',
      progress: 80,
      timeLeft: '3 días',
      participants: 234
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sistema de Reconocimientos</h1>
          <p className="text-gray-600 mt-1">
            Gana puntos, desbloquea logros y compite con otros militantes
          </p>
        </div>
        <Dialog open={isRedeemModalOpen} onOpenChange={setIsRedeemModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
              <Gift className="h-4 w-4 mr-2" />
              Canjear Puntos
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Tienda de Recompensas
              </DialogTitle>
              <DialogDescription>
                Tienes {userPoints.toLocaleString()} puntos disponibles para canjear
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {prizes.map((prize) => (
                <Card key={prize.id} className={`hover:shadow-lg transition-shadow ${userPoints < prize.points ? 'opacity-60' : ''}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {prize.icon}
                        <Badge variant="secondary">{prize.category}</Badge>
                      </div>
                      <Badge variant={userPoints >= prize.points ? 'default' : 'destructive'}>
                        {prize.points} pts
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-2">{prize.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{prize.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">Stock: {prize.stock}</span>
                      <span className={`text-sm font-medium ${userPoints >= prize.points ? 'text-green-600' : 'text-red-600'}`}>
                        {userPoints >= prize.points ? 'Disponible' : 'Insuficiente'}
                      </span>
                    </div>
                    <Button 
                      onClick={() => handleRedeem(prize)}
                      disabled={userPoints < prize.points || prize.stock === 0}
                      className="w-full"
                      variant={userPoints >= prize.points ? 'default' : 'outline'}
                    >
                      {userPoints >= prize.points ? 'Canjear' : `Faltan ${prize.points - userPoints} pts`}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Puntos Totales</CardTitle>
            <Star className="h-4 w-4 text-yellow-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userPoints.toLocaleString()}</div>
            <p className="text-xs text-blue-100">Posición #5 en ranking</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Logros Desbloqueados</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">De 15 disponibles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nivel Actual</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Coordinador Avanzado</div>
            <p className="text-xs text-muted-foreground">750 pts para siguiente nivel</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desafíos Activos</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">En progreso</p>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progreso de Nivel</CardTitle>
          <CardDescription>
            Coordinador Avanzado → Líder Regional
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>{userPoints.toLocaleString()} / 2,000 puntos</span>
              <span>{((userPoints / 2000) * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full transition-all" style={{width: `${(userPoints / 2000) * 100}%`}}></div>
            </div>
            <p className="text-sm text-gray-600">
              Necesitas {(2000 - userPoints).toLocaleString()} puntos más para alcanzar el nivel de Líder Regional
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Logros</CardTitle>
            <CardDescription>
              Tus logros desbloqueados y en progreso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`p-4 border rounded-lg ${achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${achievement.unlocked ? 'bg-white' : 'bg-gray-100 opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <Badge variant={achievement.unlocked ? 'default' : 'secondary'} className={achievement.unlocked ? 'bg-green-100 text-green-800' : ''}>
                          {achievement.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">
                          +{achievement.points} puntos
                        </span>
                        {achievement.unlocked ? (
                          <Badge className="bg-green-100 text-green-800">Desbloqueado</Badge>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full transition-all" style={{width: `${achievement.progress}%`}}></div>
                            </div>
                            <span className="text-xs text-gray-500">{achievement.progress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Ranking General</CardTitle>
            <CardDescription>
              Los militantes más destacados del partido
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboard.map((member) => (
                <div key={member.rank} className={`flex items-center gap-4 p-3 rounded-lg ${member.name === 'Administrador General' ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${
                    member.rank === 1 ? 'bg-yellow-500' : 
                    member.rank === 2 ? 'bg-gray-400' :
                    member.rank === 3 ? 'bg-amber-600' : 'bg-gray-600'
                  }`}>
                    {member.rank}
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-600">
                    {member.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.level}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">{member.points}</div>
                    <p className="text-xs text-gray-500">{member.achievements} logros</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Challenges */}
      <Card>
        <CardHeader>
          <CardTitle>Desafíos Activos</CardTitle>
          <CardDescription>
            Participa en desafíos para ganar puntos extra y reconocimientos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-purple-600" />
                  <h4 className="font-semibold">{challenge.title}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progreso</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full transition-all" style={{width: `${challenge.progress}%`}}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{challenge.participants}</span>
                    </div>
                    <span className="font-medium text-orange-600">{challenge.timeLeft}</span>
                  </div>
                  
                  <div className="text-sm font-medium text-green-600 mb-3">
                    🎁 {challenge.reward}
                  </div>
                  
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Participar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}