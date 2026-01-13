'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Flower2, Music, History, ShieldCheck, Sparkles } from 'lucide-react';

export default function IdentityPage() {
    const router = useRouter();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" /> Volver
                </Button>
                <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-tighter">
                    <Sparkles className="h-4 w-4" /> Mística Institucional
                </div>
            </div>

            <div className="space-y-4">
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
                    <Flower2 className="h-8 w-8" />
                </div>
                <h1 className="text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                    Nuestra <span className="text-primary italic">Identidad y Mística</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                    Los símbolos que nos unen y la historia que nos moviliza hacia la victoria del 2028.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Flor de Cayena */}
                <CardIdentity
                    title="La Flor de Cayena"
                    icon={<Flower2 className="h-6 w-6 text-red-500" />}
                    description="Símbolo de resistencia, identidad y la belleza de nuestro pueblo. Es el emblema que 'enciende' nuestras zonas conquistadas en el mapa."
                    detail="La cayena representa la capacidad de florecer en cualquier terreno, tal como nuestro partido ha crecido en cada rincón del país."
                />

                {/* Himno */}
                <CardIdentity
                    title="Mística y Valores"
                    icon={<Music className="h-6 w-6 text-blue-500" />}
                    description="Inspirados en los ideales de democracia, justicia social y soberanía nacional."
                    detail="Nuestra formación política se basa en el legado de las luchas democráticas dominicanas, con la mirada puesta en la innovación."
                />
            </div>

            <div className="p-8 bg-primary rounded-3xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <History className="h-40 w-40" />
                </div>
                <div className="relative z-10 space-y-4">
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic">"Con la fuerza del pueblo venceremos"</h3>
                    <p className="text-white/80 max-w-xl">
                        Esta plataforma no es solo código, es la herramienta para organizar la voluntad de un pueblo que decidió ser dueño de su destino. Cada registro es un paso hacia la transformación nacional.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Identidad Institucional Certificada por la Secretaría de Asuntos Electorales.
            </div>
        </div>
    );
}

function CardIdentity({ title, icon, description, detail }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-primary/20 transition-all group">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-50 rounded-lg group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <h3 className="font-bold text-xl text-slate-900">{title}</h3>
            </div>
            <p className="text-slate-600 text-sm font-medium mb-3">{description}</p>
            <p className="text-slate-400 text-xs leading-relaxed">{detail}</p>
        </div>
    );
}
