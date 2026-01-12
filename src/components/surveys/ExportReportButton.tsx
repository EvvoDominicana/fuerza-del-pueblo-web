'use client';

import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2 } from 'lucide-react';
import { SurveyResponse } from '@/types/survey';

interface Props {
    surveys: any[]; // Usamos any[] para flexibilidad con datos de Firebase
}

export default function ExportReportButton({ surveys }: Props) {
    const [isGenerating, setIsGenerating] = React.useState(false);

    const generatePDF = () => {
        setIsGenerating(true);
        const doc = new jsPDF();

        // 1. CONFIGURACIÓN GENERAL
        const companyName = "FUERZA DEL PUEBLO - SISTEMA DE INTELIGENCIA";
        const reportTitle = "REPORTE EJECUTIVO DE CAMPO";
        const reportDate = new Date().toLocaleDateString('es-DO', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        // 2. CÁLCULOS DE INTELIGENCIA
        const total = surveys.length;
        // Consideramos sospechosas las de < 15 segundos
        const suspicious = surveys.filter(s => s.metadata?.durationSeconds < 15).length;
        const valid = total - suspicious;
        const qualityScore = total > 0 ? ((valid / total) * 100).toFixed(1) : "0";

        // Agrupar militantes únicos
        const uniqueMilitants = new Set(surveys.map(s => s.militanteId)).size;

        // 3. DISEÑO DEL ENCABEZADO
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(companyName, 14, 15);

        doc.setFontSize(16);
        doc.setTextColor(0, 158, 96); // Verde FP
        doc.text(reportTitle, 14, 25);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generado el: ${reportDate}`, 14, 32);

        // Línea divisoria
        doc.setDrawColor(0, 158, 96);
        doc.line(14, 35, 196, 35);

        // 4. SECCIÓN: RESUMEN OPERATIVO (KPIs)
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.setFont('helvetica', 'bold');
        doc.text("1. Resumen Operativo", 14, 45);

        // Tabla de KPIs
        autoTable(doc, {
            startY: 50,
            head: [['Métrica', 'Valor', 'Estado']],
            body: [
                ['Total Encuestas', total, 'Procesadas'],
                ['Militantes en el Terreno', uniqueMilitants, 'Activos'],
                ['Encuestas Válidas', valid, 'Certificadas'],
                ['Posible Fraude (Velocidad)', suspicious, suspicious > 0 ? '⚠️ Revisión Requerida' : 'OK'],
                ['Score de Calidad', `${qualityScore}%`, Number(qualityScore) > 90 ? 'Excelente' : 'Aceptable'],
            ],
            theme: 'striped',
            headStyles: { fillColor: [0, 158, 96] }, // Verde Institucional
        });

        // 5. SECCIÓN: DESGLOSE DE DATOS
        const votes: Record<string, number> = {};
        surveys.forEach(s => {
            // Buscamos dinámicamente campos de tipo voto
            const choice = s.answers['q1'] || 'No especificado';
            votes[choice] = (votes[choice] || 0) + 1;
        });

        const voteData = Object.entries(votes).map(([key, val]) => [key, val, `${((val / total) * 100).toFixed(1)}%`]);

        const finalY = (doc as any).lastAutoTable.finalY || 100;

        doc.setFontSize(12);
        doc.text("2. Tendencias de Intención Detectadas", 14, finalY + 15);

        autoTable(doc, {
            startY: finalY + 20,
            head: [['Opción / Candidato', 'Votos', 'Porcentaje']],
            body: voteData,
            theme: 'grid',
            headStyles: { fillColor: [52, 73, 94] },
        });

        // 6. PIE DE PÁGINA
        const pageCount = (doc as any).internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(`Documento Confidencial - Uso Exclusivo Alta Dirección FP | Página ${i} de ${pageCount}`, 14, 285);
        }

        // 7. DESCARGA
        doc.save(`Reporte_FP_Conecta_${new Date().toISOString().split('T')[0]}.pdf`);
        setIsGenerating(false);
    };

    return (
        <Button
            onClick={generatePDF}
            disabled={isGenerating || surveys.length === 0}
            className="bg-primary hover:bg-primary/90 text-white font-bold h-10 shadow-lg shadow-primary/20"
        >
            {isGenerating ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generando...
                </>
            ) : (
                <>
                    <FileDown className="mr-2 h-4 w-4" /> Exportar Reporte Ejecutivo PDF
                </>
            )}
        </Button>
    );
}
