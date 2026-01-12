'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Importamos Leaflet dinámicamente para evitar error "window not defined" en Next.js
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Circle = dynamic(() => import('react-leaflet').then(m => m.Circle), { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then(m => m.Tooltip), { ssr: false });

// Configuración de Colores Oficiales [cite: 31]
const COLORS = {
    gris: '#95a5a6',    // < 10% (Zona fría)
    verdeClaro: '#2ecc71', // 10-50% (En progreso)
    verdeFP: '#006400',    // > 50% (Consolidación) [cite: 31]
    cayena: '#e74c3c'      // 100% (Victoria) - Usaremos rojo/flor para resaltar
};

// Datos simulados de zonas (Esto vendría de tu Base de Datos Firebase)
const ZONAS_TEST = [
    { id: 1, nombre: 'Distrito Nacional', lat: 18.4861, lng: -69.9312, meta: 50000, actual: 12000, radio: 4000 },
    { id: 2, nombre: 'Santiago', lat: 19.4517, lng: -70.6970, meta: 40000, actual: 38000, radio: 5000 }, // Casi lograda
    { id: 3, nombre: 'La Altagracia', lat: 18.6180, lng: -68.7067, meta: 10000, actual: 10000, radio: 6000 }, // ¡Lograda! (Cayena)
    { id: 4, nombre: 'Santo Domingo Este', lat: 18.4885, lng: -69.8571, meta: 60000, actual: 45000, radio: 4500 },
    { id: 5, nombre: 'La Vega', lat: 19.2222, lng: -70.5289, meta: 25000, actual: 5000, radio: 3500 },
];

export default function VotoVerdeMap() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        // Fix para iconos de Leaflet en Next.js
        (async () => {
            const L = await import('leaflet');
            // @ts-ignore
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: '/marker-icon-2x.png',
                iconUrl: '/marker-icon.png',
                shadowUrl: '/marker-shadow.png',
            });
        })();
    }, []);

    if (!isMounted) return <div className="h-96 w-full bg-slate-100 animate-pulse rounded-xl" />;

    const getColor = (actual: number, meta: number) => {
        const porcentaje = (actual / meta) * 100;
        if (porcentaje >= 100) return COLORS.cayena;
        if (porcentaje > 50) return COLORS.verdeFP;
        if (porcentaje > 10) return COLORS.verdeClaro;
        return COLORS.gris;
    };

    return (
        <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg border border-slate-200 z-0">
            <MapContainer center={[18.7357, -70.1627]} zoom={8} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {ZONAS_TEST.map((zona) => {
                    const color = getColor(zona.actual, zona.meta);
                    const porcentaje = ((zona.actual / zona.meta) * 100).toFixed(1);
                    const esVictoria = Number(porcentaje) >= 100;

                    return (
                        <Circle
                            key={zona.id}
                            center={[zona.lat, zona.lng]}
                            radius={zona.radio}
                            pathOptions={{
                                color: color,
                                fillColor: color,
                                fillOpacity: esVictoria ? 0.8 : 0.4,
                                weight: esVictoria ? 3 : 1
                            }}
                        >
                            <Tooltip sticky>
                                <div className="p-2 text-center">
                                    <strong className="text-sm uppercase block mb-1">{zona.nombre}</strong>
                                    <div className="text-xs">
                                        Progreso: <b>{porcentaje}%</b><br />
                                        ({zona.actual.toLocaleString()} / {zona.meta.toLocaleString()})
                                    </div>
                                    {esVictoria && <div className="mt-1 text-red-600 font-bold">🌺 ¡Zona Conquistada!</div>}
                                </div>
                            </Tooltip>
                        </Circle>
                    );
                })}
            </MapContainer>
        </div>
    );
}
