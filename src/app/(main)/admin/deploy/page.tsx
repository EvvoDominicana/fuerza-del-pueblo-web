'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Rocket, ShieldCheck, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AppQRCode from '@/components/admin/AppQRCode';

export default function DeployPage() {
    const router = useRouter();
    const { userProfile } = useAuth();
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.origin);
        }
    }, []);

    if (userProfile?.role !== 'admin' && userProfile?.role !== 'presidente') {
        return <div className="p-12 text-center font-bold">Acceso restringido al personal de tecnología.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" /> Volver a Configuración
                </Button>
                <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-tighter">
                    <ShieldCheck className="h-4 w-4" /> Despliegue Seguro v1.5
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
                        <Rocket className="h-8 w-8" />
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                        Inicia el Despliegue <span className="text-primary italic">Nacional</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Este código QR es la llave para que todos los militantes accedan a la plataforma. Puedes imprimirlo en carnets, stickers o proyectarlo en las asambleas.
                    </p>

                    <div className="space-y-4 pt-4">
                        <div className="p-4 bg-slate-100 rounded-xl border-l-4 border-primary">
                            <h4 className="font-bold text-slate-800">Instrucciones para Coordinadores:</h4>
                            <ol className="list-decimal list-inside mt-2 text-sm text-slate-600 space-y-1">
                                <li>Escanea el código con la cámara del celular.</li>
                                <li>Presiona "Añadir a la pantalla de inicio" en el navegador.</li>
                                <li>Inicia sesión con las credenciales de militante.</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    {/* Decorativo fondo */}
                    <div className="absolute -inset-4 bg-primary/5 rounded-[40px] blur-2xl -z-10" />
                    <AppQRCode url={currentUrl} appName="Plataforma Electoral FP" />
                </div>
            </div>
        </div>
    );
}
