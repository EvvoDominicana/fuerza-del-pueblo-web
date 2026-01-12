'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_SURVEYS } from '@/services/survey/mock-data';
import Link from 'next/link';
import { MessageSquare, ArrowRight, Activity, CloudOff, CheckCircle2, PlusCircle, PieChart } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { SurveyStorageService } from '@/services/survey/storage.service';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db as firestore } from '@/lib/firebase';
import { Survey } from '@/types/survey';

export default function SurveysPage() {
    const { userProfile } = useAuth();
    const stats = useLiveQuery(() => SurveyStorageService.getLocalStats());
    const [realSurveys, setRealSurveys] = useState<Survey[]>([]);
    const [loadingSurveys, setLoadingSurveys] = useState(true);

    const isAdmin = userProfile?.role === 'admin';
    const isPresident = userProfile?.role === 'presidente';

    useEffect(() => {
        async function fetchSurveys() {
            try {
                const q = query(collection(firestore, 'surveys'), where('status', '==', 'active'));
                const querySnapshot = await getDocs(q);
                const fetchedSurveys = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                })) as Survey[];
                setRealSurveys(fetchedSurveys);
            } catch (error) {
                console.error("Error fetching surveys:", error);
            } finally {
                setLoadingSurveys(false);
            }
        }
        fetchSurveys();
    }, []);

    const allSurveys = [...MOCK_SURVEYS, ...realSurveys];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-black text-primary tracking-tight">Inteligencia Electoral</h1>
                    <p className="text-muted-foreground">Gestiona y ejecuta las encuestas de campo para la victoria electoral.</p>
                </div>
                <div className="flex gap-2">
                    {(isAdmin || isPresident) && (
                        <Button asChild variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/5">
                            <Link href="/surveys/analytics">
                                <PieChart className="h-4 w-4" />
                                Análisis Estratégico
                            </Link>
                        </Button>
                    )}
                    {isAdmin && (
                        <Button asChild className="gap-2 font-bold shadow-lg shadow-primary/20">
                            <Link href="/surveys/new">
                                <PlusCircle className="h-4 w-4" />
                                Nueva Encuesta
                            </Link>
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs uppercase font-bold tracking-wider">Historial Local</CardDescription>
                        <CardTitle className="text-4xl font-black text-primary">{stats?.total || 0}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>{stats?.synced || 0} Sincronizadas</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-amber-500/5 border-amber-500/20">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs uppercase font-bold tracking-wider">Pendientes de Envío</CardDescription>
                        <CardTitle className="text-4xl font-black text-amber-600">{stats?.pending || 0}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CloudOff className="h-4 w-4 text-amber-500" />
                            <span>Esperando conexión a internet</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-blue-500/5 border-blue-500/20">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs uppercase font-bold tracking-wider">Encuestas Activas</CardDescription>
                        <CardTitle className="text-4xl font-black text-blue-600">{MOCK_SURVEYS.length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Activity className="h-4 w-4 text-blue-500" />
                            <span>Listas para ser aplicadas</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allSurveys.map((survey) => (
                    <Card key={survey.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">ACTIVA</Badge>
                                <MessageSquare className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <CardTitle className="group-hover:text-primary transition-colors">{survey.title}</CardTitle>
                            <CardDescription>{survey.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full group/btn">
                                <Link href={`/surveys/${survey.id}`}>
                                    Empezar Encuesta
                                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
