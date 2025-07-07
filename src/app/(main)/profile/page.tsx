'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit3, MapPin, Calendar, Users, Phone, Mail } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Mi Perfil</h1>
        <Button variant="outline">
          <Edit3 className="mr-2 h-4 w-4" />
          Editar Perfil
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://placehold.co/100x100.png" alt="Foto de perfil" />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-headline">Administrador General</CardTitle>
              <CardDescription className="text-base">admin@paisposible.com</CardDescription>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">Administrador</Badge>
                <Badge variant="outline">Activo</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>Santo Domingo, República Dominicana</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>Miembro desde: Enero 2024</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Users className="h-5 w-5" />
                <span>Estructura Nacional</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="h-5 w-5" />
                <span>+1 (809) 555-0123</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="h-5 w-5" />
                <span>admin@paisposible.com</span>
              </div>
            </div>
          </div>

          {/* Additional Profile Sections */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tareas Completadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">24</div>
                <p className="text-xs text-muted-foreground">Este mes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Eventos Organizados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">8</div>
                <p className="text-xs text-muted-foreground">Este año</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Puntos Acumulados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">1,250</div>
                <p className="text-xs text-muted-foreground">Total</p>
              </CardContent>
            </Card>
          </div>

          {/* Permissions and Access */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Permisos y Accesos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Gestión de Usuarios</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Completo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Gestión de Eventos</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Completo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Gestión de Tareas</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Completo</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Analytics</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Completo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Configuración</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Completo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Moderación</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Completo</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}