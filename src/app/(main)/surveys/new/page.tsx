'use client';

import { SurveyBuilder } from '@/components/surveys/SurveyBuilder';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Rocket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ShieldAlert } from 'lucide-react';

export default function CreateSurveyPage() {
    const router = useRouter();
    const { userProfile } = useAuth();

    const isAdmin = userProfile?.role === 'admin';

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                <ShieldAlert className="h-16 w-14 text-red-500" />
                <h2 className="text-2xl font-black">Acceso Denegado</h2>
                <p className="text-muted-foreground max-w-md">
                    Solo los Administradores de Tecnología pueden crear nuevas encuestas estratégicas.
                </p>
                <Button onClick={() => router.push('/surveys')}>Volver a Encuestas</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <Button variant="ghost" className="w-fit -ml-2 h-8 text-muted-foreground hover:text-primary gap-1" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" /> Volver
                    </Button>
                    <h1 className="text-4xl font-black text-primary tracking-tight flex items-center gap-3">
                        <Rocket className="h-8 w-8" />
                        Constructor de Campo
                    </h1>
                    <p className="text-muted-foreground">Crea una nueva encuesta para despliegue inmediato en los barrios.</p>
                </div>
            </div>

            <SurveyBuilder />
        </div>
    );
}
