import AppLayout from '@/components/layout/AppLayout';
import { SidebarNav } from '@/components/navigation/SidebarNav';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ArrowRightIcon } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: "Milton Morrison presenta nuevo plan de desarrollo económico",
    category: "Economía",
    date: "2024-07-15",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "economic plan",
    summary: "El presidente del Partido País Posible detalló las propuestas para impulsar el crecimiento y la creación de empleo en la República Dominicana.",
  },
  {
    id: 2,
    title: "Partido País Posible inaugura nuevo local en Santiago",
    category: "Partido",
    date: "2024-07-12",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "office building",
    summary: "Con la presencia de altos dirigentes y militantes, se abrió un nuevo espacio para la organización y el contacto ciudadano en la ciudad corazón.",
  },
  {
    id: 3,
    title: "Juventud PPD lanza campaña de concientización ambiental",
    category: "Medio Ambiente",
    date: "2024-07-10",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "nature environment",
    summary: "Jóvenes del partido inician actividades para promover la sostenibilidad y el cuidado de nuestros recursos naturales.",
  },
];

export default function NewsPage() {
  return (
    <AppLayout>
      <SidebarNav />
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-headline">Noticias y Comunicados</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <Card key={item.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image 
                src={item.imageUrl} 
                alt={item.title} 
                width={600} 
                height={400} 
                className="w-full h-48 object-cover"
                data-ai-hint={item.dataAiHint}
              />
              <CardHeader>
                <div className="flex justify-between items-center mb-1">
                  <Badge variant="default">{item.category}</Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {item.date}
                  </div>
                </div>
                <CardTitle className="text-lg font-headline leading-tight">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{item.summary}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="p-0 h-auto text-primary">
                  <Link href={`/news/${item.id}`}>
                    Leer más <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
