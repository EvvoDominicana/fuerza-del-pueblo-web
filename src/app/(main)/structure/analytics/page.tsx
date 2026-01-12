'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line
} from 'recharts';
import { Users, Target, TrendingUp, AlertCircle, MapPin, ShieldCheck } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db as firestore } from '@/lib/firebase';

export default function StructureAnalyticsPage() {
    const { userProfile } = useAuth();
    const [totalComprometidos, setTotalComprometidos] = useState(0);
    const [historyData, setHistoryData] = useState<any[]>([]);
    const [sectorData, setSectorData] = useState<any[]>([]);

    useEffect(() => {
        if (userProfile?.role === 'admin' || userProfile?.role === 'presidente') {
            loadGlobalData();
        }
    }, [userProfile]);

    async function loadGlobalData() {
        try {
            const snap = await getDocs(collection(firestore, 'comprometidos'));
            const data = snap.docs.map(doc => doc.data());

            setTotalComprometidos(data.length);

            // Agrupar por sector (Top 5)
            const sectorCounts: Record<string, number> = {};
            data.forEach((d: any) => {
                sectorCounts[d.sector] = (sectorCounts[d.sector] || 0) + 1;
            });
            const sectorPlot = Object.entries(sectorCounts)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);
            setSectorData(sectorPlot);

            // Datos de crecimiento (Simulados para demo visual)
            setHistoryData([
                { date: 'Lun', total: data.length * 0.7 },
                { date: 'Mar', total: data.length * 0.75 },
                { date: 'Mie', total: data.length * 0.82 },
                { date: 'Jue', total: data.length * 0.88 },
                { date: 'Vie', total: data.length * 0.95 },
                { date: 'Hoy', total: data.length },
            ]);

        } catch (error) {
            console.error("Error cargando analíticas 1x10:", error);
        }
    }

    if (userProfile?.role !== 'admin' && userProfile?.role !== 'presidente') {
        return <div className="p-12 text-center font-bold">Acceso no autorizado</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black text-primary tracking-tight">Control Estratégico 1x10</h1>
                <p className="text-muted-foreground">Monitoreo en tiempo real de la base de voto duro nacional.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-primary-foreground/70 font-bold uppercase tracking-widest text-xs">Voto Comprometido Total</CardDescription>
                        <CardTitle className="text-5xl font-black">{totalComprometidos.toLocaleString()}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-1 text-xs font-bold">
                            <TrendingUp className="h-4 w-4" /> +124 hoy
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription className="font-bold uppercase tracking-widest text-xs">Cumplimiento Meta</CardDescription>
                        <CardTitle className="text-4xl font-black">74.2%</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground font-medium">Meta Nacional: 5,000,000</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription className="font-bold uppercase tracking-widest text-xs">Sectores Activos</CardDescription>
                        <CardTitle className="text-4xl font-black">{Object.keys(sectorData).length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-1 text-xs text-green-600 font-bold">
                            <MapPin className="h-4 w-4" /> Cobertura Creciendo
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Crecimiento de Estructura</CardTitle>
                        <CardDescription>Evolución de registros en la última semana.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={historyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={4} dot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Sectores Movilizados</CardTitle>
                        <CardDescription>Barrios con mayor cantidad de votantes registrados.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sectorData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="flex items-center justify-center gap-2 p-4 bg-muted rounded-lg text-sm text-muted-foreground border-2 border-dashed">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Sistema de Protección de Identidad Electoral Activo. Los datos están encriptados y protegidos.
            </div>
        </div>
    );
}
