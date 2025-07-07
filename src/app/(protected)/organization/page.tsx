import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Users, MapPin, Phone, Mail } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const structureData = [
  {
    level: "Nacional",
    leader: "Milton Morrison",
    members: 50000,
    contact: { phone: "809-000-0000", email: "presidencia@partidopaisposible.do" },
    subLevels: [
      {
        level: "Provincia: Santo Domingo",
        leader: "Ana Rodríguez",
        members: 15000,
        contact: { phone: "809-111-1111", email: "sto.dgo@partidopaisposible.do" },
        subLevels: [
          { level: "Municipio: Santo Domingo Este", leader: "Carlos Gómez", members: 5000, contact: { phone: "809-222-2222", email: "sde@partidopaisposible.do" } },
          { level: "Municipio: Santo Domingo Norte", leader: "Luisa Fernández", members: 4500, contact: { phone: "809-333-3333", email: "sdn@partidopaisposible.do" } },
        ]
      },
      {
        level: "Provincia: Santiago",
        leader: "Pedro Martínez",
        members: 12000,
        contact: { phone: "809-444-4444", email: "santiago@partidopaisposible.do" },
      }
    ]
  }
];

const StructureNode = ({ node }: { node: any }) => (
  <AccordionItem value={node.level}>
    <AccordionTrigger className="hover:no-underline">
      <div className="flex items-center gap-3">
        <Users className="h-5 w-5 text-primary" />
        <span>{node.level} ({node.members} militantes)</span>
      </div>
    </AccordionTrigger>
    <AccordionContent className="pl-6 space-y-3">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={`https://placehold.co/40x40.png?text=${node.leader.substring(0,1)}`} data-ai-hint="leader portrait" />
          <AvatarFallback>{node.leader.substring(0,2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
            <p className="font-semibold">{node.leader}</p>
            <p className="text-xs text-muted-foreground">Líder de Estructura</p>
        </div>
      </div>
      {node.contact && (
        <div className="text-sm space-y-1">
          <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> {node.contact.phone}</p>
          <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> {node.contact.email}</p>
        </div>
      )}
      {node.subLevels && node.subLevels.length > 0 && (
        <Accordion type="multiple" className="w-full">
          {node.subLevels.map((subNode: any) => (
            <StructureNode key={subNode.level} node={subNode} />
          ))}
        </Accordion>
      )}
    </AccordionContent>
  </AccordionItem>
);


export default function OrganizationPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Estructura y Organización Interna</h1>
      
      <Card className="shadow-green-lg">
        <CardHeader>
          <CardTitle className="font-headline">Mapa de Estructuras del Partido</CardTitle>
          <CardDescription>Navega la jerarquía y geografía de las estructuras del Partido País Posible.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {structureData.map(node => (
              <StructureNode key={node.level} node={node} />
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="shadow-green-lg">
        <CardHeader>
          <CardTitle className="font-headline">Directorio de Contactos</CardTitle>
          <CardDescription>Información de contacto de los líderes de estructura.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            El directorio detallado por estructura está disponible para líderes y administradores dentro de sus respectivos paneles de gestión.
            Aquí se podría mostrar una lista de los principales líderes nacionales o un buscador si fuera público.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
