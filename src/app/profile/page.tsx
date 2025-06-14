import AppLayout from '@/components/layout/AppLayout';
import { SidebarNav } from '@/components/navigation/SidebarNav';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Edit3 } from 'lucide-react';

export default function ProfilePage() {
  return (
    <AppLayout>
      <SidebarNav />
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
                <AvatarImage src="https://placehold.co/100x100.png" alt="Foto de perfil" data-ai-hint="profile photo" />
                <AvatarFallback>MM</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-headline">Juan Pérez de la Cruz</CardTitle>
                <CardDescription>Militante de Base - Santo Domingo Este</CardDescription>
                <div className="mt-2 flex gap-2">
                  <Badge variant="secondary">Organizador Nato</Badge>
                  <Badge variant="secondary">Leal</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2 font-headline">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong className="text-muted-foreground">Cédula:</strong> 001-XXXXXXX-X</div>
                <div><strong className="text-muted-foreground">Fecha de Nacimiento:</strong> 15/08/1985</div>
                <div><strong className="text-muted-foreground">Género:</strong> Masculino</div>
                <div><strong className="text-muted-foreground">Correo:</strong> juan.perez@example.com</div>
                <div><strong className="text-muted-foreground">Teléfono:</strong> (809) 555-1234</div>
                <div className="md:col-span-2"><strong className="text-muted-foreground">Dirección:</strong> Calle Falsa 123, Ensanche Ozama, Santo Domingo Este</div>
                <div><strong className="text-muted-foreground">Centro de Votación:</strong> Escuela República de Panamá</div>
                <div><strong className="text-muted-foreground">Mesa Electoral:</strong> 015B</div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2 font-headline">Intereses y Habilidades</h3>
              <div className="space-y-1 text-sm">
                <p><strong className="text-muted-foreground">Áreas de Interés:</strong> Educación, Economía, Medio Ambiente</p>
                <p><strong className="text-muted-foreground">Habilidades:</strong> Oratoria, Organización de Eventos, Liderazgo Comunitario</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
