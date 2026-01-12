'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_SURVEYS } from '@/services/survey/mock-data';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { SurveyStorageService } from '@/services/survey/storage.service';
import { SurveyResponse, Survey } from '@/types/survey';
import { toast } from '@/hooks/use-toast';
import { doc, getDoc } from 'firebase/firestore';
import { db as firestore } from '@/lib/firebase';

export default function SurveyExecutionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { userProfile } = useAuth();

    const [survey, setSurvey] = useState<Survey | null>(MOCK_SURVEYS.find(s => s.id === id) || null);
    const [loading, setLoading] = useState(!survey);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [startedAt] = useState(new Date());
    const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        async function fetchSurvey() {
            if (survey) return; // Ya lo tenemos de MOCK
            try {
                const docRef = doc(firestore, 'surveys', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSurvey({ ...docSnap.data(), id: docSnap.id } as Survey);
                }
            } catch (error) {
                console.error("Error fetching survey:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchSurvey();
    }, [id, survey]);

    useEffect(() => {
        // Intentar capturar la ubicación al inicio
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                (err) => console.error("Error capturando ubicación:", err),
                { enableHighAccuracy: true }
            );
        }
    }, []);

    if (loading) return <div className="flex items-center justify-center min-h-[50vh]">Cargando encuesta...</div>;
    if (!survey) return <div className="text-center p-12">Encuesta no encontrada</div>;

    // El presidente no debe llenar encuestas de campo, solo ver datos
    if (userProfile?.role === 'presidente') {
        router.replace('/surveys/analytics');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userProfile) return;

        setSubmitting(true);
        const finishedAt = new Date();
        const durationSeconds = Math.floor((finishedAt.getTime() - startedAt.getTime()) / 1000);

        const response: SurveyResponse = {
            surveyId: survey.id,
            militanteId: userProfile.uid,
            militanteName: userProfile.displayName,
            answers,
            location: location || { lat: 0, lng: 0 },
            metadata: {
                startedAt: startedAt.toISOString(),
                finishedAt: finishedAt.toISOString(),
                durationSeconds,
                deviceId: navigator.userAgent, // Simplificado para demo
                networkType: navigator.onLine ? 'online' : 'offline',
                appVersion: '1.0.0-ROBUST'
            },
            syncStatus: 'pending',
            createdAt: new Date().toISOString()
        };

        try {
            await SurveyStorageService.saveResponse(response);
            toast({
                title: "¡Encuesta Guardada!",
                description: navigator.onLine
                    ? "Los datos se han enviado correctamente."
                    : "Sin conexión. Los datos se guardaron localmente y se enviarán cuando recuperes internet.",
            });
            router.push('/surveys');
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo guardar la encuesta.",
                variant: "destructive"
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" /> Volver
            </Button>

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black text-primary tracking-tight">{survey.title}</h1>
                <p className="text-muted-foreground">{survey.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-xs font-bold bg-primary/5 p-2 rounded-lg border border-primary/20 text-primary uppercase">
                    <Clock className="h-3 w-3" /> Tiempo transcurrido: {Math.floor((new Date().getTime() - startedAt.getTime()) / 1000)}s
                </div>
                <div className="flex items-center gap-2 text-xs font-bold bg-primary/5 p-2 rounded-lg border border-primary/20 text-primary uppercase">
                    <MapPin className="h-3 w-3" /> {location ? 'GPS Activo' : 'Buscando GPS...'}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold bg-primary/5 p-2 rounded-lg border border-primary/20 text-primary uppercase">
                    <ShieldCheck className="h-3 w-3" /> Control Anti-Fraude Activo
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {survey.questions.map((q) => (
                    <Card key={q.id}>
                        <CardHeader className="pb-3">
                            <Label className="text-base font-bold leading-tight">
                                {q.label} {q.required && <span className="text-destructive">*</span>}
                            </Label>
                        </CardHeader>
                        <CardContent>
                            {q.type === 'multiple_choice' && (
                                <RadioGroup
                                    onValueChange={(v) => setAnswers({ ...answers, [q.id]: v })}
                                    required={q.required}
                                >
                                    {q.options?.map(opt => (
                                        <div key={opt} className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                                            <RadioGroupItem value={opt} id={`${q.id}-${opt}`} />
                                            <Label htmlFor={`${q.id}-${opt}`} className="flex-1 cursor-pointer font-medium">{opt}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}

                            {q.type === 'text' && (
                                <Textarea
                                    placeholder="Escriba aquí..."
                                    onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                                    required={q.required}
                                    className="min-h-[100px]"
                                />
                            )}

                            {q.type === 'rating' && (
                                <div className="space-y-4 pt-2">
                                    <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                        <span>Muy Mala</span>
                                        <span>Excelente</span>
                                    </div>
                                    <Slider
                                        defaultValue={[3]}
                                        max={5}
                                        step={1}
                                        onValueChange={(v) => setAnswers({ ...answers, [q.id]: v[0] })}
                                    />
                                    <div className="flex justify-between px-1">
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <span key={n} className="text-sm font-black text-primary">{n}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {q.type === 'yes_no' && (
                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        variant={answers[q.id] === 'Sí' ? 'default' : 'outline'}
                                        className="flex-1 h-12 font-bold"
                                        onClick={() => setAnswers({ ...answers, [q.id]: 'Sí' })}
                                    >
                                        Sí
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={answers[q.id] === 'No' ? 'default' : 'outline'}
                                        className="flex-1 h-12 font-bold"
                                        onClick={() => setAnswers({ ...answers, [q.id]: 'No' })}
                                    >
                                        No
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}

                <Button
                    type="submit"
                    size="lg"
                    className="w-full h-16 text-xl font-black shadow-lg shadow-primary/20"
                    disabled={submitting}
                >
                    {submitting ? 'Guardando...' : 'Finalizar y Enviar Encuesta'}
                    <Send className="ml-2 h-6 w-6" />
                </Button>
            </form>
        </div>
    );
}
