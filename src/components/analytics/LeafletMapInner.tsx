'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MilitantPoint } from './VotoVerdeMap';

/**
 * CONFIGURACIÓN DE ICONOS LEAFLET
 * Evita el error de iconos no encontrados en producción.
 */
const fixIcons = () => {
    if (typeof window !== 'undefined') {
        const anyL = L as any;
        if (anyL.Icon.Default.prototype._getIconUrl) {
            delete anyL.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: '/marker-icon-2x.png',
                iconUrl: '/marker-icon.png',
                shadowUrl: '/marker-shadow.png',
            });
        }
    }
};

interface LeafletMapInnerProps {
    view: 'local' | 'exterior';
    points: MilitantPoint[];
}

/**
 * COMPONENTE: LeafletMapInner (Versión Imperativa para Máximo Rendimiento)
 * Esta versión utiliza Leaflet puro para manejar miles de puntos de forma fluida.
 */
export default function LeafletMapInner({ view, points }: LeafletMapInnerProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const layerGroupRef = useRef<L.LayerGroup | null>(null);

    // Inyectamos estilos globales para el efecto "luciérnaga" y mapa oscuro
    useEffect(() => {
        const styleId = 'firefly-effect-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = `
                .firefly-point {
                    transition: all 0.5s ease-out;
                }
                .firefly-glow {
                    filter: drop-shadow(0 0 4px rgba(74, 222, 128, 0.8));
                    animation: pulse-glow 2s infinite alternate;
                }
                 @keyframes pulse-glow {
                    0% { opacity: 0.6; r: 3; }
                    100% { opacity: 1; r: 4.5; }
                }
                .leaflet-container {
                    background: #020617 !important;
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

    // 1. Inicialización Imperativa del Mapa
    useEffect(() => {
        fixIcons();
        if (!mapContainerRef.current) return;

        // Limpiar instancia previa si existe (Strict Mode / Hot Reload)
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }

        const container = mapContainerRef.current;
        // Purga agresiva de IDs de Leaflet
        if ((container as any)._leaflet_id) (container as any)._leaflet_id = null;

        const map = L.map(container, {
            center: view === 'local' ? [18.7357, -70.1627] : [40.7128, -74.0060],
            zoom: view === 'local' ? 9 : 5,
            zoomControl: false,
            scrollWheelZoom: false,
            attributionControl: false
        });

        // Capa Base: CartoDB Dark Matter para "La Mancha Verde"
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; CARTO'
        }).addTo(map);

        // Capa de Etiquetas sutiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
            opacity: 0.3
        }).addTo(map);

        const lg = L.layerGroup().addTo(map);
        layerGroupRef.current = lg;
        mapInstanceRef.current = map;

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []); // Se inicializa solo una vez

    // 2. Renderización Atómica de Puntos
    useEffect(() => {
        const layerGroup = layerGroupRef.current;
        if (!layerGroup) return;

        // Limpieza de capas para el frame actual
        layerGroup.clearLayers();

        // Filtrado por contexto geográfico
        const relevantPoints = points.filter(p => {
            const isExterior = p.zoneId.includes('ny') ||
                p.zoneId.includes('nj') ||
                p.zoneId.includes('madrid') ||
                p.zoneId.includes('barcelona') ||
                p.zoneId.includes('florida');
            return view === 'exterior' ? isExterior : !isExterior;
        });

        relevantPoints.forEach(pt => {
            if (pt.active) {
                // Punto Activo: Verde brillante con resplandor
                L.circleMarker([pt.lat, pt.lng], {
                    radius: 3,
                    fillColor: '#4ade80',
                    color: '#22c55e',
                    weight: 1,
                    opacity: 0.8,
                    fillOpacity: 0.8,
                    className: 'firefly-point firefly-glow'
                }).addTo(layerGroup);
            } else {
                // Punto Latente: Sutil textura de fondo
                L.circleMarker([pt.lat, pt.lng], {
                    radius: 1.2,
                    fillColor: '#1e293b',
                    color: 'transparent',
                    fillOpacity: 0.2,
                }).addTo(layerGroup);
            }
        });
    }, [view, points]);

    // Efecto de Navegación Suave (FlyTo)
    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map) return;
        const center: [number, number] = view === 'local' ? [18.7357, -70.1627] : [40.7128, -74.0060];
        const zoom = view === 'local' ? 9 : 5;
        map.flyTo(center, zoom, { duration: 1.5, easeLinearity: 0.25 });
    }, [view]);

    return (
        <div className="h-full w-full relative overflow-hidden bg-slate-950 isolate">
            <div ref={mapContainerRef} className="h-full w-full z-0" />
            <div className="absolute inset-0 pointer-events-none shadow-[inner_0_0_100px_rgba(0,0,0,0.5)] z-10" />
        </div>
    );
}
