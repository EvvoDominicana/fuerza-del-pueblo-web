'use client';

import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface Props {
    surveys: any[];
    questionKey: string; // La clave de la pregunta en la BD (ej: 'q1')
}

const COLORS = [
    'hsl(var(--primary))',
    '#3b82f6',
    '#8b5cf6',
    '#f59e0b',
    '#ef4444',
    '#ec4899',
    '#94a3b8'
];

export default function VotingTrendsChart({ surveys, questionKey }: Props) {

    // 1. Procesamiento de datos (Memoizado para rendimiento)
    const data = useMemo(() => {
        const counts: Record<string, number> = {};

        surveys.forEach(s => {
            // Obtenemos la respuesta, o 'N/A' si está vacía
            const answer = s.answers[questionKey] || 'Indeciso/Nulo';
            counts[answer] = (counts[answer] || 0) + 1;
        });

        // Transformamos a formato compatible con Recharts
        return Object.entries(counts).map(([name, value]) => ({
            name,
            value
        })).sort((a, b) => b.value - a.value); // Ordenamos de mayor a menor

    }, [surveys, questionKey]);

    if (surveys.length === 0) {
        return (
            <Card className="h-64 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed">
                <CardDescription>Sin datos suficientes para graficar</CardDescription>
            </Card>
        );
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg font-bold">Tendencia de Voto Dinámica</CardTitle>
                <CardDescription>Basado en {surveys.length} encuestas recibidas.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => [`${value} Votos`, 'Cantidad']}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
