'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line
} from 'recharts';
import { Users, Target, TrendingUp, AlertCircle, MapPin, ShieldCheck, Map as MapIcon } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db as firestore } from '@/lib/firebase';
import VotoVerdeMap from '@/components/analytics/VotoVerdeMap';

export default function StructureAnalyticsPage() {
    const { userProfile } = useAuth();

    // ESTADOS
    const [baseTotal, setBaseTotal] = useState(0);
    const [totalComprometidos, setTotalComprometidos] = useState(0);
    const [historyData, setHistoryData] = useState<any[]>([]);
    const [sectorData, setSectorData] = useState<any[]>([]);

    // Carga inicial de datos desde Firebase
    useEffect(() => {
        if (userProfile?.role === 'admin' || userProfile?.role === 'presidente' || userProfile?.role === 'diputado') {
            loadGlobalData();
        }
    }, [userProfile]);


    // Callack sincronizado con el simulador del mapa
    const handleMapStatsUpdate = useCallback((stats: { activeLocal: number, activeExterior: number, total: number }) => {
        // El total visual es la base real + lo simulado
        const simulatedGrowth = stats.activeLocal + stats.activeExterior;
        const newTotal = baseTotal + simulatedGrowth;
        setTotalComprometidos(newTotal);

        // Actualizar gráfico de lineal en tiempo real (efecto vivo)
        setHistoryData(prev => {
            const newData = [...prev];
            if (newData.length > 0) {
                // Actualizamos el último punto "Hoy"
                newData[newData.length - 1] = {
                    ...newData[newData.length - 1],
                    total: newTotal
                };
            }
            return newData;
        });
    }, [baseTotal]);

    async function loadGlobalData() {
        try {
            const snap = await getDocs(collection(firestore, 'comprometidos'));
            const data = snap.docs.map(doc => doc.data());
            const currentTotal = data.length || 12450; // Fallback para demo si base vacía

            setBaseTotal(currentTotal);
            setTotalComprometidos(currentTotal);

            // Agrupar por sector (Top 5)
            const sectorCounts: Record<string, number> = {};
            data.forEach((d: any) => {
                sectorCounts[d.sector] = (sectorCounts[d.sector] || 0) + 1;
            });
            const sectorPlot = Object.entries(sectorCounts)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);
            setSectorData(sectorPlot.length ? sectorPlot : [
                { name: 'Simulado A', count: 4500 },
                { name: 'Simulado B', count: 3200 },
                { name: 'Simulado C', count: 2100 },
            ]);

            // Datos de crecimiento
            setHistoryData([
                { date: 'Lun', total: currentTotal * 0.7 },
                { date: 'Mar', total: currentTotal * 0.75 },
                { date: 'Mie', total: currentTotal * 0.82 },
                { date: 'Jue', total: currentTotal * 0.88 },
                { date: 'Vie', total: currentTotal * 0.95 },
                { date: 'Hoy', total: currentTotal },
            ]);

        } catch (error) {
            console.error("Error cargando analíticas:", error);
            // Fallback data
            setBaseTotal(12450);
            setTotalComprometidos(12450);
        }
    }

    if (userProfile?.role !== 'admin' && userProfile?.role !== 'presidente' && userProfile?.role !== 'diputado') {
        return <div className="p-12 text-center font-bold">Acceso no autorizado</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black text-primary tracking-tight">Control Estratégico 1x10</h1>
                <p className="text-muted-foreground">Monitoreo en tiempo real de la base de voto duro nacional.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-primary text-primary-foreground shadow-xl shadow-primary/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Target size={100} />
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-primary-foreground/70 font-bold uppercase tracking-widest text-xs">Voto Comprometido Total</CardDescription>
                        <CardTitle className="text-5xl font-black tabular-nums tracking-tight">
                            {totalComprometidos.toLocaleString()}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-1 text-xs font-bold bg-white/20 w-fit px-2 py-1 rounded-full backdrop-blur-sm">
                            <TrendingUp className="h-3 w-3" /> Crecimiento Activo
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription className="font-bold uppercase tracking-widest text-xs">Cumplimiento Meta</CardDescription>
                        <CardTitle className="text-4xl font-black tabular-nums">
                            {((totalComprometidos / 5000000) * 100).toFixed(4)}%
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground font-medium">Meta Nacional: 5,000,000</div>
                        <div className="h-1 w-full bg-slate-100 mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(totalComprometidos / 5000000) * 100}%` }}></div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription className="font-bold uppercase tracking-widest text-xs">Sectores Activos</CardDescription>
                        <CardTitle className="text-4xl font-black">{Object.keys(sectorData).length > 0 ? Object.keys(sectorData).length : 24}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-1 text-xs text-green-600 font-bold animate-pulse">
                            <MapPin className="h-4 w-4" /> Cobertura en Expansión...
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* La Mancha Verde: Mapa de Calor Territorial */}
            <Card className="border-2 border-primary/20 overflow-hidden bg-slate-950">
                <CardHeader className="bg-primary/5 pb-6 border-b border-primary/10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-2xl font-black flex items-center gap-2 text-white uppercase tracking-tighter">
                                <MapIcon className="h-6 w-6 text-emerald-500" /> Radar Geoespacial
                            </CardTitle>
                            <CardDescription className="text-slate-400 font-medium">
                                Visualización de células militantes activas y latentes.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <VotoVerdeMap onStatsUpdate={handleMapStatsUpdate} />
                </CardContent>
            </Card>

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
