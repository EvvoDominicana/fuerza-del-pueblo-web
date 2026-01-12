'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { MapPin, Users, ShieldAlert, CheckCircle2, TrendingUp, AlertTriangle, Download, PieChart as PieChartIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import ExportReportButton from '@/components/surveys/ExportReportButton';
import VotingTrendsChart from '@/components/surveys/VotingTrendsChart';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db as firestore } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { SurveyResponse } from '@/types/survey';

const INTENTION_DATA = [
    { name: 'Fuerza del Pueblo', value: 48, fill: 'hsl(var(--primary))' },
    { name: 'PRM', value: 35, fill: '#3b82f6' },
    { name: 'PLD', value: 12, fill: '#8b5cf6' },
    { name: 'Otros', value: 5, fill: '#94a3b8' },
];

const PROBLEMS_DATA = [
    { name: 'Inseguridad', count: 120 },
    { name: 'Costo Vida', count: 95 },
    { name: 'Desempleo', count: 70 },
    { name: 'Salud', count: 45 },
    { name: 'Educación', count: 30 },
];

export default function SurveyAnalyticsPage() {
    const { userProfile } = useAuth();
    const [allResponses, setAllResponses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAllResponses() {
            try {
                const q = query(collection(firestore, 'survey_responses'), orderBy('createdAt', 'desc'));
                const snap = await getDocs(q);
                const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAllResponses(data);
            } catch (err) {
                console.error("Error loading responses for analytics:", err);
            } finally {
                setLoading(false);
            }
        }
        loadAllResponses();
    }, []);

    const isLeader = userProfile?.role === 'presidente' || userProfile?.role === 'admin';

    if (!isLeader) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                <ShieldAlert className="h-16 w-14 text-amber-500" />
                <h2 className="text-2xl font-black">Acceso Restringido</h2>
                <p className="text-muted-foreground max-w-md">
                    Esta sección de Inteligencia Estratégica solo está disponible para la Alta Dirección y Administradores del Sistema.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-black text-primary tracking-tight">Análisis Estratégico</h1>
                    <p className="text-muted-foreground">Datos consolidados del panorama electoral en tiempo real.</p>
                </div>
                <div className="flex items-center gap-3">
                    <ExportReportButton surveys={allResponses} />
                    <Badge variant="outline" className="w-fit text-primary border-primary bg-primary/10 px-4 py-1 text-sm font-bold animate-pulse">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2" /> VIVO
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-bold uppercase tracking-widest">Total Encuestas</CardDescription>
                        <CardTitle className="text-3xl font-black">2,450</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-1 text-xs text-green-600 font-bold">
                            <TrendingUp className="h-3 w-3" /> +15% vs ayer
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-bold uppercase tracking-widest">Fuerza del Pueblo</CardDescription>
                        <CardTitle className="text-3xl font-black">48.2%</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Badge className="bg-primary hover:bg-primary font-black">Líder en Intención</Badge>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-bold uppercase tracking-widest">Control Calidad</CardDescription>
                        <CardTitle className="text-3xl font-black">94%</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-1 text-xs text-green-600 font-bold">
                            <CheckCircle2 className="h-3 w-3" /> Datos Verificados
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-red-200 bg-red-50">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-bold uppercase tracking-widest text-red-600">Sospechosas</CardDescription>
                        <CardTitle className="text-3xl font-black text-red-700">142</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-1 text-xs text-red-600 font-bold">
                            <AlertTriangle className="h-3 w-3" /> Bloqueadas por Anti-Fraude
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <VotingTrendsChart surveys={allResponses} questionKey="q1" />

                <Card className="min-h-[400px]">
                    <CardHeader>
                        <CardTitle>Intención de Voto (Consolidado)</CardTitle>
                        <CardDescription>Corte de datos basado en geolocalización nacional.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={INTENTION_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {INTENTION_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="min-h-[400px]">
                    <CardHeader>
                        <CardTitle>Preocupaciones Ciudadanas</CardTitle>
                        <CardDescription>Principales problemas identificados en el territorio.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={PROBLEMS_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} fontStyle="bold" />
                                <YAxis />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <CardTitle>Zonas de Mayor Crecimiento</CardTitle>
                    </div>
                    <CardDescription>Provincias con mayor actividad de militantes y simpatizantes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { prov: 'Santo Domingo', count: 850, grow: 12 },
                            { prov: 'Santiago', count: 620, grow: 8 },
                            { prov: 'Distrito Nacional', count: 540, grow: 15 },
                            { prov: 'San Cristóbal', count: 320, grow: 5 },
                        ].map(item => (
                            <div key={item.prov} className="flex items-center gap-4">
                                <div className="w-40 text-sm font-black">{item.prov}</div>
                                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary"
                                        style={{ width: `${(item.count / 850) * 100}%` }}
                                    />
                                </div>
                                <div className="w-24 text-right text-xs font-bold text-muted-foreground">
                                    {item.count} encuestas
                                </div>
                                <div className="w-12 text-right text-xs font-bold text-green-600">
                                    +{item.grow}%
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
