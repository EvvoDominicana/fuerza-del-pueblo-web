import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Video, Mic, BookOpen, ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const trainingModules = [
  {
    id: 1,
    type: "Documento",
    title: "Estatutos del Partido País Posible",
    icon: FileText,
    description: "Conoce las normativas y estructura fundamental de nuestro partido.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "document paper",
    progress: 100,
  },
  {
    id: 2,
    type: "Video Curso",
    title: "Historia del Partido País Posible",
    icon: Video,
    description: "Un recorrido por los momentos clave y la evolución de nuestra organización.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "video play",
    progress: 75,
  },
  {
    id: 3,
    type: "Módulo Interactivo",
    title: "Oratoria Política: Técnicas Efectivas",
    icon: Mic,
    description: "Aprende a comunicar tus ideas con impacto y persuasión.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "microphone presentation",
    progress: 20,
  },
  {
    id: 4,
    type: "Artículo",
    title: "Análisis de la Coyuntura Política Actual",
    icon: BookOpen,
    description: "Perspectivas y lineamientos del partido frente a los desafíos nacionales.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "book reading",
    progress: 0,
  },
];

export default function TrainingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Capacitación y Formación Ideológica</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainingModules.map(module => (
          <Card key={module.id} className="flex flex-col overflow-hidden shadow-green-lg hover:shadow-green-xl transition-shadow duration-300">
            <div className="relative h-48 w-full">
              <Image 
                src={module.imageUrl} 
                alt={module.title} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={module.dataAiHint}
              />
              <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center">
                <module.icon className="h-3 w-3 mr-1" /> {module.type}
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-headline">{module.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{module.description}</p>
              {module.progress > 0 && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progreso</span>
                    <span>{module.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${module.progress}%` }}></div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild variant="default" className="w-full">
                <Link href={`/training/${module.id}`}>
                  {module.progress > 0 && module.progress < 100 ? 'Continuar' : 'Iniciar'} Módulo <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Próximas Charlas y Webinars</CardTitle>
          <CardDescription>Participa en eventos de capacitación en vivo.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Consulta el <Link href="/events" className="text-primary hover:underline">calendario de eventos</Link> para ver las próximas sesiones de formación.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
