'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MapPin, 
  Phone, 
  Mail,
  Building,
  Crown,
  User
} from 'lucide-react';

export default function OrganizationPage() {
  const organizationData = [
    {
      level: 'Nacional',
      name: 'Dirección Central',
      leader: 'Leonel Fernández',
      members: 25,
      regions: 1,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      level: 'Regional',
      name: 'Coordinaciones Regionales',
      leader: 'Varios Coordinadores',
      members: 128,
      regions: 10,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      level: 'Provincial',
      name: 'Direcciones Provinciales',
      leader: 'Presidentes Provinciales',
      members: 456,
      regions: 32,
      color: 'bg-green-100 text-green-800'
    },
    {
      level: 'Municipal',
      name: 'Direcciones Municipales',
      leader: 'Presidentes Municipales',
      members: 1234,
      regions: 158,
      color: 'bg-orange-100 text-orange-800'
    },
    {
      level: 'De Base',
      name: 'Comités de Base',
      leader: 'Coordinadores de Comités',
      members: 352847,
      regions: '30,000+',
      color: 'bg-indigo-100 text-indigo-800'
    }
  ];

  const leaders = [
    {
      name: 'Leonel Fernández',
      position: 'Presidente del Partido',
      region: 'Nacional',
      phone: '+1 (809) 555-0100',
      email: 'l.fernandez@fuerzadelpueblo.do',
      members: 352847
    },
    {
      name: 'Radhamés Jiménez Peña',
      position: 'Coordinador Político',
      region: 'Nacional',
      phone: '+1 (809) 555-0102',
      email: 'r.jimenez@fuerzadelpueblo.do',
      members: 352847
    },
    {
      name: 'Coordinador/a Regional',
      position: 'Coordinador/a Regional Cibao',
      region: 'Santiago, La Vega, Espaillat...',
      phone: '+1 (809) 555-0200',
      email: 'cibao@fuerzadelpueblo.do',
      members: 75400
    },
    {
      name: 'Coordinador/a Provincial',
      position: 'Presidente Provincial S.D.',
      region: 'Provincia Santo Domingo',
      phone: '+1 (809) 555-0300',
      email: 'p.santodomingo@fuerzadelpueblo.do',
      members: 98500
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Estructura Organizativa</h1>
          <p className="text-gray-600 mt-1">
            Conoce y gestiona la estructura de la Fuerza del Pueblo
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Building className="h-4 w-4 mr-2" />
          Nueva Estructura
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Jerarquía del Partido</CardTitle>
          <CardDescription>
            Estructura de la Fuerza del Pueblo desde el nivel nacional hasta los comités de base
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {organizationData.map((level, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gray-100">
                    <Building className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{level.name}</h3>
                    <p className="text-sm text-gray-600">{level.leader}</p>
                    <Badge className={level.color}>
                      {level.level}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{level.members.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">miembros</p>
                  <p className="text-xs text-gray-500">{level.regions.toLocaleString()} unidades</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Directorio de Dirigentes</CardTitle>
          <CardDescription>
            Información de contacto de los principales dirigentes del partido
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leaders.map((leader, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-full bg-green-100">
                    {leader.position.includes('Presidente') ? (
                      <Crown className="h-5 w-5 text-primary" />
                    ) : (
                      <User className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{leader.name}</h3>
                    <p className="text-sm text-gray-600">{leader.position}</p>
                    <Badge variant="outline" className="mt-1">
                      {leader.members.toLocaleString()} miembros
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{leader.region}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{leader.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{leader.email}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">
                    Contactar
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Ver Estructura
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Miembros</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">352,847</div>
            <p className="text-xs text-muted-foreground">Militantes activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estructuras</CardTitle>
            <Building className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">31,500+</div>
            <p className="text-xs text-muted-foreground">Unidades organizacionales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Provincias</CardTitle>
            <MapPin className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">Cobertura nacional</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dirigentes</CardTitle>
            <Crown className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">500+</div>
            <p className="text-xs text-muted-foreground">Líderes principales</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
