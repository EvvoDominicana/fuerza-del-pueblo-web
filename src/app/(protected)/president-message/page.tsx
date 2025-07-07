'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';
import { CalendarDays, PlayCircle } from 'lucide-react';

const messages = [
  {
    id: 1,
    title: "Unidad y Visión para el Futuro",
    date: "2024-07-20",
    type: "video",
    summary: "Un mensaje inspirador sobre la importancia de la cohesión interna y los planes del partido para transformar la República Dominicana.",
    thumbnailUrl: "https://placehold.co/300x180.png",
    dataAiHint: "video message"
  },
  {
    id: 2,
    title: "Análisis de la Coyuntura Nacional",
    date: "2024-07-15",
    type: "text",
    summary: "Reflexiones sobre los principales desafíos y oportunidades que enfrenta nuestro país, y el rol del Partido País Posible.",
  },
];

export default function PresidentMessagePage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-green-xl">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-primary-foreground rounded-lg">
          <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
            <AvatarImage src="https://placehold.co/200x200.png" alt="Milton Morrison" data-ai-hint="politician leader" />
            <AvatarFallback className="text-4xl bg-primary-foreground text-primary">MM</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold font-headline">Milton Morrison</h1>
            <p className="text-xl">Presidente del Partido País Posible</p>
            <p className="mt-2 text-sm opacity-90">
              "Liderando con integridad y visión para construir una República Dominicana más justa, próspera y llena de oportunidades para todos."
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Mensajes Recientes del Presidente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {messages.map(msg => (
            <Card key={msg.id} className="hover:shadow-green-md transition-shadow">
              <CardContent className="p-4 flex gap-4 items-start">
                {msg.type === 'video' && msg.thumbnailUrl && (
                  <div className="relative w-32 h-20 flex-shrink-0">
                    <Image src={msg.thumbnailUrl} alt={`Thumbnail ${msg.title}`} layout="fill" objectFit="cover" className="rounded" data-ai-hint={msg.dataAiHint}/>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <PlayCircle className="h-8 w-8 text-white" />
                    </div>
                  </div>
                )}
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{msg.title}</h3>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 my-1">
                    <CalendarDays className="h-3 w-3" />
                    <span>{msg.date}</span>
                    <span className="mx-1">&bull;</span>
                    <span className="capitalize">{msg.type === 'video' ? 'Video Mensaje' : 'Comunicado'}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{msg.summary}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Agenda Pública Destacada</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
              <li><strong>25 de Julio:</strong> Entrevista en "El Sol de la Mañana".</li>
              <li><strong>28 de Julio:</strong> Visita comunitaria a San Cristóbal.</li>
              <li><strong>02 de Agosto:</strong> Reunión con el sector empresarial.</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Biografía y Visión</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Conoce más sobre la trayectoria y el proyecto de país de Milton Morrison.
            </p>
            {/* Placeholder, ideally links to a more detailed page or section */}
            <Image src="https://placehold.co/400x200.png" alt="Visión del partido" width={400} height={200} className="rounded-md mt-2 w-full object-cover" data-ai-hint="dominican flag landscape" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
