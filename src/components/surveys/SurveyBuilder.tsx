'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Save, MoveUp, MoveDown, Layout } from 'lucide-react';
import { Survey, SurveyQuestion, QuestionType } from '@/types/survey';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db as firestore } from '@/lib/firebase';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function SurveyBuilder() {
    const router = useRouter();
    const { userProfile } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState<Omit<SurveyQuestion, 'id'>[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const addQuestion = (type: QuestionType) => {
        setQuestions([...questions, {
            type,
            label: '',
            required: true,
            options: type === 'multiple_choice' ? ['Opción 1'] : undefined
        }]);
    };

    const removeQuestion = (index: number) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const updateQuestion = (index: number, updates: Partial<SurveyQuestion>) => {
        const newQuestions = [...questions];
        newQuestions[index] = { ...newQuestions[index], ...updates };
        setQuestions(newQuestions);
    };

    const addOption = (qIndex: number) => {
        const q = questions[qIndex];
        if (q.options) {
            updateQuestion(qIndex, { options: [...q.options, `Nueva Opción ${q.options.length + 1}`] });
        }
    };

    const updateOption = (qIndex: number, optIndex: number, value: string) => {
        const q = questions[qIndex];
        if (q.options) {
            const newOptions = [...q.options];
            newOptions[optIndex] = value;
            updateQuestion(qIndex, { options: newOptions });
        }
    };

    const moveQuestion = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === questions.length - 1)) return;
        const newQuestions = [...questions];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newQuestions[index], newQuestions[targetIndex]] = [newQuestions[targetIndex], newQuestions[index]];
        setQuestions(newQuestions);
    };

    const handleSave = async () => {
        if (!title) {
            toast({ title: "Error", description: "La encuesta necesita un título", variant: "destructive" });
            return;
        }
        if (questions.length === 0) {
            toast({ title: "Error", description: "Agrega al menos una pregunta", variant: "destructive" });
            return;
        }

        setIsSaving(true);
        try {
            const surveyData = {
                title,
                description,
                status: 'active',
                questions: questions.map((q, i) => ({ ...q, id: `q${i + 1}` })),
                createdBy: userProfile?.uid,
                createdAt: new Date().toISOString(),
                serverCreatedAt: serverTimestamp()
            };

            await addDoc(collection(firestore, 'surveys'), surveyData);

            toast({ title: "¡Éxito!", description: "Encuesta creada y publicada." });
            router.push('/surveys');
        } catch (error) {
            console.error("Error al guardar encuesta:", error);
            toast({ title: "Error", description: "No se pudo guardar la encuesta en la nube.", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8">
            <Card className="border-2 border-primary/20 shadow-lg">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-2xl font-black">Información General</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="font-bold">Título de la Encuesta</Label>
                        <Input
                            id="title"
                            placeholder="Ej: Intención de Voto Enero 2024"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-lg font-bold"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="desc" className="font-bold">Objetivo / Descripción</Label>
                        <Input
                            id="desc"
                            placeholder="Breve explicación para los militantes..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black flex items-center gap-2">
                        <Layout className="h-5 w-5 text-primary" />
                        Estructura de Preguntas ({questions.length})
                    </h2>
                    <Select onValueChange={(v) => addQuestion(v as QuestionType)}>
                        <SelectTrigger className="w-[200px] bg-primary text-primary-foreground font-bold">
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar Pregunta
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="multiple_choice">Opción Múltiple</SelectItem>
                            <SelectItem value="yes_no">Sí / No</SelectItem>
                            <SelectItem value="rating">Valoración (1-5)</SelectItem>
                            <SelectItem value="text">Texto Libre</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {questions.length === 0 && (
                    <div className="border-2 border-dashed rounded-xl p-12 text-center text-muted-foreground bg-muted/20">
                        Aún no has agregado preguntas. Selecciona un tipo arriba para comenzar.
                    </div>
                )}

                <div className="space-y-4">
                    {questions.map((q, idx) => (
                        <Card key={idx} className="group hover:border-primary/50 transition-all">
                            <CardHeader className="py-3 px-4 border-b bg-muted/30 flex flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="font-mono">#{idx + 1}</Badge>
                                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{q.type}</span>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" onClick={() => moveQuestion(idx, 'up')} disabled={idx === 0}><MoveUp className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" onClick={() => moveQuestion(idx, 'down')} disabled={idx === questions.length - 1}><MoveDown className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => removeQuestion(idx)}><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-1 space-y-2">
                                        <Label className="text-sm font-bold">Pregunta</Label>
                                        <Input
                                            placeholder="Escribe la pregunta aquí..."
                                            value={q.label}
                                            onChange={(e) => updateQuestion(idx, { label: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex items-end pb-2">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={q.required}
                                                onChange={(e) => updateQuestion(idx, { required: e.target.checked })}
                                                className="h-4 w-4 accent-primary"
                                                id={`req-${idx}`}
                                            />
                                            <label htmlFor={`req-${idx}`} className="text-xs font-bold uppercase tracking-tighter">Obligatoria</label>
                                        </div>
                                    </div>
                                </div>

                                {q.type === 'multiple_choice' && (
                                    <div className="pl-4 border-l-2 border-primary/20 space-y-2">
                                        <Label className="text-xs font-bold uppercase text-muted-foreground">Opciones de Respuesta</Label>
                                        {q.options?.map((opt, oIdx) => (
                                            <div key={oIdx} className="flex gap-2">
                                                <Input
                                                    value={opt}
                                                    onChange={(e) => updateOption(idx, oIdx, e.target.value)}
                                                    className="h-8"
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive"
                                                    onClick={() => {
                                                        const newOpts = [...(q.options || [])];
                                                        newOpts.splice(oIdx, 1);
                                                        updateQuestion(idx, { options: newOpts });
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button variant="outline" size="sm" className="mt-2 text-xs font-bold" onClick={() => addOption(idx)}>
                                            + Agregar Opción
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
                <Button variant="ghost" onClick={() => router.back()}>Cancelar</Button>
                <Button
                    size="lg"
                    className="px-10 font-black shadow-lg shadow-primary/20"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? 'Publicando...' : 'Publicar Encuesta Electoras'}
                    <Save className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}

function Badge({ children, variant = 'default', className = '' }: { children: React.ReactNode, variant?: string, className?: string }) {
    const styles = variant === 'secondary' ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground';
    return <span className={`px-2 py-0.5 rounded text-xs font-bold ${styles} ${className}`}>{children}</span>;
}
