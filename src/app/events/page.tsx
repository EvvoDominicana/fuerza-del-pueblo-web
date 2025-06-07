import AppLayout from '@/components/layout/AppLayout';
import { SidebarNav } from '@/components/navigation/SidebarNav';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar'; // Assuming basic calendar exists
import Image from 'next/image';
import { MapPin, CalendarIcon, Users, CheckCircle } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Gran Mitin en Santo Domingo Este",
    date: "2024-08-10",
    time: "4:00 PM",
    location: "Parque del Este",
    description: "Acompaña a Milton Morrison en un encuentro masivo con la militancia y simpatizantes.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "political rally",
    confirmed: true,
  },
  {
    id: 2,
    title: "Capacitación para Dirigentes Municipales",
    date: "2024-08-15",
    time: "10:00 AM - 5:00 PM",
    location: "Hotel Embajador, Salón Principal",
    description: "Jornada de formación en estrategias de campaña y liderazgo.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "conference training",
    confirmed: false,
  },
  {
    id: 3,
    title: "Encuentro Comunitario en Los Alcarrizos",
    date: "2024-08-22",
    time: "6:00 PM",
    location: "Cancha Municipal de Los Alcarrizos",
    description: "Diálogo abierto con los residentes para escuchar sus necesidades y propuestas.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "community meeting",
    confirmed: true,
  },
];

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  return (
    <AppLayout>
      <SidebarNav />
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-headline">Calendario de Eventos</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="font-headline">Selecciona una Fecha</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold font-headline">Próximos Eventos</h2>
            {events.map(event => (
              <Card key={event.id} className="overflow-hidden shadow-lg">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <Image 
                      src={event.imageUrl} 
                      alt={event.title} 
                      width={600} 
                      height={400} 
                      className="w-full h-full object-cover"
                      data-ai-hint={event.dataAiHint}
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <CardTitle className="text-xl font-headline">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4 mr-2 text-primary" /> {event.date} a las {event.time}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-primary" /> {event.location}
                      </div>
                      <p className="text-sm">{event.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" /> Asistencia esperada: Alta
                      </div>
                      {event.confirmed ? (
                        <Button variant="secondary" disabled>
                          <CheckCircle className="mr-2 h-4 w-4" /> Asistencia Confirmada
                        </Button>
                      ) : (
                        <Button variant="default">
                          Confirmar Asistencia
                        </Button>
                      )}
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
             {events.length === 0 && (
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-muted-foreground text-center">No hay eventos programados por el momento.</p>
                    </CardContent>
                </Card>
             )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
