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
      name: 'Comité Ejecutivo Nacional',
      leader: 'Milton Morrison',
      members: 15,
      regions: 32,
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
      name: 'Estructuras Provinciales',
      leader: 'Coordinadores Provinciales',
      members: 456,
      regions: 32,
      color: 'bg-green-100 text-green-800'
    },
    {
      level: 'Municipal',
      name: 'Comités Municipales',
      leader: 'Coordinadores Municipales',
      members: 1234,
      regions: 158,
      color: 'bg-orange-100 text-orange-800'
    },
    {
      level: 'Sectorial',
      name: 'Estructuras Sectoriales',
      leader: 'Coordinadores Sectoriales',
      members: 2847,
      regions: 445,
      color: 'bg-indigo-100 text-indigo-800'
    }
  ];

  const leaders = [
    {
      name: 'Milton Morrison',
      position: 'Presidente Nacional',
      region: 'Nacional',
      phone: '+1 (809) 555-0001',
      email: 'milton.morrison@paisposible.com',
      members: 2847
    },
    {
      name: 'Ana Rodríguez',
      position: 'Coordinadora Regional Norte',
      region: 'Santiago, Puerto Plata, Valverde',
      phone: '+1 (809) 555-0002',
      email: 'ana.rodriguez@paisposible.com',
      members: 456
    },
    {
      name: 'Carlos Martínez',
      position: 'Coordinador Regional Este',
      region: 'La Romana, San Pedro, Hato Mayor',
      phone: '+1 (809) 555-0003',
      email: 'carlos.martinez@paisposible.com',
      members: 378
    },
    {
      name: 'María González',
      position: 'Coordinadora Regional Sur',
      region: 'Barahona, Azua, San Juan',
      phone: '+1 (809) 555-0004',
      email: 'maria.gonzalez@paisposible.com',
      members: 234
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Estructura y Organización</h1>
          <p className="text-gray-600 mt-1">
            Gestiona la estructura organizacional del partido
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Building className="h-4 w-4 mr-2" />
          Nueva Estructura
        </Button>
      </div>

      {/* Organization Hierarchy */}
      <Card>
        <CardHeader>
          <CardTitle>Jerarquía Organizacional</CardTitle>
          <CardDescription>
            Estructura del partido desde el nivel nacional hasta el sectorial
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
                  <div className="text-2xl font-bold text-gray-900">{level.members}</div>
                  <p className="text-sm text-gray-600">miembros</p>
                  <p className="text-xs text-gray-500">{level.regions} unidades</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaders Directory */}
      <Card>
        <CardHeader>
          <CardTitle>Directorio de Líderes</CardTitle>
          <CardDescription>
            Información de contacto de los principales líderes del partido
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leaders.map((leader, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-full bg-green-100">
                    {leader.position.includes('Presidente') ? (
                      <Crown className="h-5 w-5 text-green-600" />
                    ) : (
                      <User className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{leader.name}</h3>
                    <p className="text-sm text-gray-600">{leader.position}</p>
                    <Badge variant="outline" className="mt-1">
                      {leader.members} miembros
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
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Ver Estructura
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Miembros</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">Militantes activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estructuras</CardTitle>
            <Building className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">645</div>
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
            <CardTitle className="text-sm font-medium">Líderes</CardTitle>
            <Crown className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Coordinadores activos</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}