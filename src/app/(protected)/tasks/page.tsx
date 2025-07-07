'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

const tasks = [
  { id: "task1", title: "Contactar a 5 vecinos sobre el Plan de Gobierno", status: "completed", dueDate: "2024-07-20", points: 50 },
  { id: "task2", title: "Compartir 3 publicaciones del partido en redes sociales", status: "pending", dueDate: "2024-07-25", points: 30 },
  { id: "task3", title: "Asistir a la reunión de comité semanal", status: "pending", dueDate: "2024-07-22", points: 20 },
  { id: "task4", title: "Volantear en el sector Villa Juana", status: "overdue", dueDate: "2024-07-18", points: 40 },
  { id: "task5", title: "Ver el discurso de Milton Morrison y hacer un resumen", status: "in_progress", dueDate: "2024-07-30", points: 25 },
];

const statusIcons = {
  completed: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  pending: <Clock className="h-5 w-5 text-yellow-500" />,
  overdue: <AlertTriangle className="h-5 w-5 text-red-500" />,
  in_progress: <ClipboardList className="h-5 w-5 text-blue-500" />,
};

const statusText = {
  completed: "Completada",
  pending: "Pendiente",
  overdue: "Vencida",
  in_progress: "En Progreso",
};

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Mis Tareas de Movilización</h1>
      
      <Card className="shadow-green-lg">
        <CardHeader>
          <CardTitle className="font-headline">Lista de Tareas Asignadas</CardTitle>
          <CardDescription>Completa tus tareas para ganar puntos y contribuir al partido.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {tasks.map(task => (
            <Card key={task.id} className="p-4 hover:shadow-green-md transition-shadow">
              <div className="flex items-start gap-4">
                <Checkbox id={`task-${task.id}`} checked={task.status === 'completed'} aria-label={`Marcar tarea ${task.title} como completada`} className="mt-1"/>
                <div className="flex-1">
                  <label htmlFor={`task-${task.id}`} className="font-medium block cursor-pointer">{task.title}</label>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                     {/* @ts-ignore */}
                    {statusIcons[task.status]} 
                     {/* @ts-ignore */}
                    <span>{statusText[task.status]}</span>
                    <span>&bull;</span>
                    <span>Vence: {task.dueDate}</span>
                    <span>&bull;</span>
                    <Badge variant="outline">{task.points} Puntos</Badge>
                  </div>
                </div>
                {task.status !== 'completed' && (
                   <Button size="sm" variant={task.status === 'overdue' ? 'destructive' : 'default'}>
                      {task.status === 'in_progress' ? 'Actualizar' : 'Completar'}
                   </Button>
                )}
              </div>
            </Card>
          ))}
          {tasks.length === 0 && (
              <p className="text-muted-foreground text-center py-4">No tienes tareas asignadas por el momento.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
