'use client';

import { useState } from 'react';
import { Search, BookOpen, Shield, Hammer, Monitor, ChevronRight } from 'lucide-react';

// Datos extraídos del PDF [cite: 136, 139, 140]
const PROPUESTAS = [
    {
        id: 1,
        titulo: "Economía del Conocimiento",
        icon: <Monitor className="w-6 h-6 text-blue-500" />,
        resumen: "Transformación hacia sectores de alto valor agregado.",
        detalle: "Impulsaremos hubs tecnológicos y educación bilingüe técnica para crear empleos de calidad, dejando atrás la economía básica.",
        categoria: "Economía"
    },
    {
        id: 2,
        titulo: "Seguridad Ciudadana Integral",
        icon: <Shield className="w-6 h-6 text-green-600" />, // Verde FP
        resumen: "Enfoque integral contra la criminalidad.",
        detalle: "Uso de Big Data para prevención del delito, dignificación salarial policial y programas de 'Barrio Seguro' renovados.",
        categoria: "Seguridad"
    },
    {
        id: 3,
        titulo: "Infraestructura (RD2044)",
        icon: <Hammer className="w-6 h-6 text-orange-500" />,
        resumen: "Visión de largo plazo para el desarrollo físico.",
        detalle: "Construcción de trenes de carga y pasajeros, modernización portuaria y corredores viales para conectar el país.",
        categoria: "Obras"
    },
    {
        id: 4,
        titulo: "Resiliencia y Medio Ambiente",
        icon: <Shield className="w-6 h-6 text-teal-500" />,
        resumen: "Adaptación al cambio climático.",
        detalle: "Sistemas de drenaje pluvial modernos, protección de cuencas hidrográficas y fomento de energías renovables.",
        categoria: "Sostenibilidad"
    }
];

export default function Argumentario() {
    const [filtro, setFiltro] = useState('');

    const filtrados = PROPUESTAS.filter(p =>
        p.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
        p.detalle.toLowerCase().includes(filtro.toLowerCase()) ||
        p.categoria.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b bg-slate-50/50">
                <h2 className="text-xl font-bold text-green-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" /> Argumentario 2028
                </h2>
                <p className="text-slate-500 text-sm">Respuestas oficiales para el debate y la movilización.</p>
            </div>

            <div className="p-6">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="¿Qué responder sobre seguridad, economía...?"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    {filtrados.map((item) => (
                        <div key={item.id} className="group p-4 border rounded-xl hover:bg-green-50/50 hover:border-green-200 transition-all cursor-default">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm border group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-bold text-slate-800 group-hover:text-green-900">{item.titulo}</h3>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                            {item.categoria}
                                        </span>
                                    </div>
                                    <p className="text-sm text-green-700 font-semibold mb-2">{item.resumen}</p>
                                    <p className="text-sm text-slate-600 leading-relaxed">{item.detalle}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 self-center group-hover:text-green-500" />
                            </div>
                        </div>
                    ))}
                    {filtrados.length === 0 && (
                        <div className="text-center py-12">
                            <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                            <p className="text-slate-400">No se encontraron propuestas con ese término.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
