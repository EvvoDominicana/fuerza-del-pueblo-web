'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Target, Zap } from 'lucide-react';
import Argumentario from '@/components/analytics/Argumentario';

export default function ProposalsPage() {
    const router = useRouter();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" /> Volver
                </Button>
                <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-tighter">
                    <Sparkles className="h-4 w-4" /> Visión Programática 2028
                </div>
            </div>

            <div className="space-y-4">
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
                    <Target className="h-8 w-8" />
                </div>
                <h1 className="text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                    Defensa del <span className="text-primary italic">Voto y la Propuesta</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                    Arma a nuestros militantes con los argumentos necesarios para defender la visión de progreso de la Fuerza del Pueblo en cada rincón del país.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <Argumentario />
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl text-white overflow-hidden relative">
                <Zap className="absolute -right-4 -bottom-4 h-32 w-32 text-white/5 rotate-12" />
                <h4 className="font-bold text-lg mb-2">Tip de Movilización:</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                    "Al registrar un nuevo voto duro, comparte una de estas propuestas vía WhatsApp. La gente se convence con ideas, se moviliza con esperanza."
                </p>
            </div>
        </div>
    );
}
