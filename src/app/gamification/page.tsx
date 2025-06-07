import AppLayout from '@/components/layout/AppLayout';
import { SidebarNav } from '@/components/navigation/SidebarNav';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star, Shield, Zap, Users, Award } from 'lucide-react';

const userPoints = 750;
const nextLevelPoints = 1000;

const badges = [
  { name: "Militante Fundador", icon: Shield, color: "bg-blue-500" },
  { name: "Organizador Nato", icon: Zap, color: "bg-green-500" },
  { name: "Conocedor PPD", icon: Award, color: "bg-yellow-500" },
  { name: "Gran Convocador", icon: Users, color: "bg-purple-500" },
  { name: "Leal", icon: Star, color: "bg-red-500" },
];

const leaderboard = [
  { rank: 1, name: "Ana Rodríguez", points: 1250, avatar: "AR" },
  { rank: 2, name: "Carlos Gómez", points: 1100, avatar: "CG" },
  { rank: 3, name: "Juan Pérez", points: userPoints, avatar: "JP", isCurrentUser: true },
  { rank: 4, name: "Luisa Fernández", points: 700, avatar: "LF" },
  { rank: 5, name: "Pedro Martínez", points: 650, avatar: "PM" },
];

export default function GamificationPage() {
  return (
    <AppLayout>
      <SidebarNav />
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-headline">Mis Reconocimientos y Puntos</h1>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Mi Progreso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted-foreground">Puntos Acumulados</span>
              <span className="text-lg font-bold text-primary">{userPoints} Puntos</span>
            </div>
            <Progress value={(userPoints / nextLevelPoints) * 100} aria-label={`${(userPoints / nextLevelPoints) * 100}% para el siguiente nivel`} />
            <p className="text-xs text-muted-foreground text-right">
              {nextLevelPoints - userPoints} puntos para el siguiente nivel de reconocimiento.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Mis Insignias</CardTitle>
            <CardDescription>Reconocimientos obtenidos por tu participación y compromiso.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {badges.map(badge => (
              <div key={badge.name} className="flex flex-col items-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
                <div className={`p-3 rounded-full ${badge.color} mb-2`}>
                  <badge.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs font-medium text-center">{badge.name}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Tabla de Clasificación (Top 5 General)</CardTitle>
            <CardDescription>Mira cómo te comparas con otros militantes destacados.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead className="text-right">Puntos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map(entry => (
                  <TableRow key={entry.rank} className={entry.isCurrentUser ? "bg-secondary" : ""}>
                    <TableCell className="font-medium">{entry.rank}</TableCell>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">{entry.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
