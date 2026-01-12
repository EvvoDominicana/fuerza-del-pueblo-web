import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const PdfExportService = {
    /**
     * Exporta un reporte de inteligencia estratégica a PDF
     */
    async exportAnalyticsReport(data: {
        title: string;
        stats: { label: string; value: string | number }[];
        intentions: { name: string; value: number }[];
        problems: { name: string; count: number }[];
    }) {
        const doc = new jsPDF();
        const greenPrimary: [number, number, number] = [0, 158, 96]; // Color oficial aproximado FP

        // Encabezado
        doc.setFillColor(greenPrimary[0], greenPrimary[1], greenPrimary[2]);
        doc.rect(0, 0, 210, 40, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('FUERZA DEL PUEBLO', 105, 18, { align: 'center' });
        doc.setFontSize(14);
        doc.text('REPORTE DE INTELIGENCIA ESTRATÉGICA', 105, 28, { align: 'center' });

        // Título y Fecha
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.text(data.title, 14, 55);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Fecha de emisión: ${new Date().toLocaleString()}`, 14, 62);

        // Métricas Clave
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Métricas de Calidad y Alcance:', 14, 75);

        autoTable(doc, {
            startY: 80,
            head: [['Métrica', 'Valor']],
            body: data.stats.map(s => [s.label, s.value.toString()]),
            headStyles: { fillColor: greenPrimary },
        });

        // Intención de Voto
        const currentY = (doc as any).lastAutoTable.finalY + 15;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Intención de Voto Consolidada:', 14, currentY);

        autoTable(doc, {
            startY: currentY + 5,
            head: [['Partido', 'Porcentaje']],
            body: data.intentions.map(i => [i.name, `${i.value}%`]),
            headStyles: { fillColor: greenPrimary },
        });

        // Problemas Comunitarios
        const problemsY = (doc as any).lastAutoTable.finalY + 15;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Principales Problemas Identificados:', 14, problemsY);

        autoTable(doc, {
            startY: problemsY + 5,
            head: [['Problema', 'Menciones']],
            body: data.problems.map(p => [p.name, p.count.toString()]),
            headStyles: { fillColor: greenPrimary },
        });

        // Pie de página
        const pageCount = (doc as any).internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(
                'Documento Confidencial - Propiedad Intelectual de la Fuerza del Pueblo',
                105,
                285,
                { align: 'center' }
            );
        }

        doc.save(`Reporte_Inteligencia_${new Date().toISOString().split('T')[0]}.pdf`);
    }
};
