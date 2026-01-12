'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Newspaper, 
  Calendar, 
  User,
  Eye,
  Share2,
  MessageCircle
} from 'lucide-react';

export default function NewsPage() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('mock-user');
    if (user) {
      setUserProfile(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const newsArticles = [
    {
      id: 1,
      title: 'Leonel Fernández Presenta Propuesta de Desarrollo Económico',
      excerpt: 'El líder de la Fuerza del Pueblo presenta un plan integral para el crecimiento económico y la creación de empleos.',
      content: 'En una conferencia de prensa, Leonel Fernández detalló su propuesta para modernizar la economía dominicana...',
      author: 'Comunicaciones FP',
      date: '2024-07-10',
      category: 'Propuestas',
      views: 5245,
      comments: 123,
      shares: 450,
      featured: true
    },
    {
      id: 2,
      title: 'Exitosa Jornada de Afiliación en la Región Norte',
      excerpt: 'Más de 5,000 nuevos miembros se suman a la Fuerza del Pueblo en Santiago y provincias aledañas.',
      content: 'La jornada superó todas las expectativas, demostrando el crecimiento exponencial del partido en el Cibao...',
      author: 'Coordinación Regional Norte',
      date: '2024-07-08',
      category: 'Actividades',
      views: 3892,
      comments: 85,
      shares: 280,
      featured: false
    },
    {
      id: 3,
      title: 'Fuerza del Pueblo Lanza Campaña "Juventud Protagonista"',
      excerpt: 'Nueva iniciativa para promover la participación política y el liderazgo de los jóvenes dominicanos.',
      content: 'La campaña incluye programas de formación, debate y participación en la toma de decisiones del partido...',
      author: 'Secretaría de la Juventud FP',
      date: '2024-07-05',
      category: 'Iniciativas',
      views: 7156,
      comments: 267,
      shares: 890,
      featured: true
    },
    {
      id: 4,
      title: 'Alianza Estratégica con Sector Agropecuario',
      excerpt: 'La Fuerza del Pueblo firma acuerdos para fortalecer la producción nacional y la seguridad alimentaria.',
      content: 'Los acuerdos buscan impulsar la tecnología en el campo y mejorar las condiciones de los productores...',
      author: 'Secretaría de Asuntos Agropecuarios',
      date: '2024-07-02',
      category: 'Alianzas',
      views: 2756,
      comments: 62,
      shares: 134,
      featured: false
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Propuestas': return 'bg-blue-100 text-blue-800';
      case 'Actividades': return 'bg-green-100 text-green-800';
      case 'Iniciativas': return 'bg-purple-100 text-purple-800';
      case 'Alianzas': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const userRole = userProfile?.role || 'voluntario';
  const canPublish = userRole === 'admin' || userRole === 'presidente' || userRole === 'coordinador';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Centro de Noticias</h1>
          <p className="text-gray-600 mt-1">
            {userRole === 'voluntario' 
              ? 'Mantente informado sobre las últimas actividades de la Fuerza del Pueblo'
              : 'Gestiona y mantente informado sobre las noticias del partido'
            }
          </p>
        </div>
        {canPublish && (
          <Button className="bg-primary hover:bg-primary/90">
            <Newspaper className="h-4 w-4 mr-2" />
            Publicar Noticia
          </Button>
        )}
      </div>

      {canPublish && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Noticias Publicadas</CardTitle>
              <Newspaper className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">147</div>
              <p className="text-xs text-muted-foreground">Este mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vistas</CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">312,456</div>
              <p className="text-xs text-muted-foreground">Lectores alcanzados</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compartidas</CardTitle>
              <Share2 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18,892</div>
              <p className="text-xs text-muted-foreground">En redes sociales</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comentarios</CardTitle>
              <MessageCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,346</div>
              <p className="text-xs text-muted-foreground">Interacciones</p>
            </CardContent>
          </Card>
        </div>
      )}

      {userRole === 'voluntario' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Noticias Leídas</CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Este mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compartidas</CardTitle>
              <Share2 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">En redes sociales</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comentarios</CardTitle>
              <MessageCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Realizados</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Noticias Destacadas</CardTitle>
          <CardDescription>
            Las noticias más importantes de la Fuerza del Pueblo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {newsArticles.filter(article => article.featured).map((article) => (
              <div key={article.id} className="p-6 border rounded-lg bg-gradient-to-r from-green-50 to-teal-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        Destacada
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-gray-600 mb-3">{article.excerpt}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{article.views} vistas</span>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    Leer Más
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Noticias Recientes</CardTitle>
          <CardDescription>
            Últimas publicaciones del partido
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {newsArticles.filter(article => !article.featured).map((article) => (
              <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{article.title}</h3>
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{article.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{article.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="h-4 w-4" />
                        <span>{article.shares}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Leer
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="h-4 w-4" />
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
