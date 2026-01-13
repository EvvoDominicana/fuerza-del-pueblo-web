'use client';
import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Play, Square, RefreshCcw, Users } from 'lucide-react';

// Importamos el subcomponente de forma dinámica
const LeafletMapInner = dynamic(() => import('./LeafletMapInner'), {
    ssr: false,
    loading: () => (
        <div className="h-[600px] w-full bg-slate-900 animate-pulse rounded-xl flex flex-col items-center justify-center border border-slate-800">
            <p className="text-emerald-500 font-black uppercase tracking-widest animate-pulse">Iniciando Radar Geoespacial...</p>
        </div>
    )
});

// DEFINICIÓN DE ZONAS (Contenedores Lógicos)
const PROVINCIAS_CORE = [
    { id: 'dn', nombre: 'Distrito Nacional', lat: 18.47, lng: -69.94, radioDispersion: 0.08, meta: 50000 },
    { id: 'sd_este', nombre: 'Santo Domingo Este', lat: 18.51, lng: -69.83, radioDispersion: 0.09, meta: 45000 },
    { id: 'sd_norte', nombre: 'Santo Domingo Norte', lat: 18.57, lng: -69.91, radioDispersion: 0.08, meta: 35000 },
    { id: 'santiago', nombre: 'Santiago', lat: 19.45, lng: -70.70, radioDispersion: 0.12, meta: 60000 },
    { id: 'la_vega', nombre: 'La Vega', lat: 19.22, lng: -70.53, radioDispersion: 0.09, meta: 25000 },
    { id: 'altagracia', nombre: 'La Altagracia', lat: 18.62, lng: -68.71, radioDispersion: 0.15, meta: 20000 },
    { id: 'sc', nombre: 'San Cristóbal', lat: 18.43, lng: -70.12, radioDispersion: 0.10, meta: 28000 },
    { id: 'sp', nombre: 'San Pedro', lat: 18.45, lng: -69.30, radioDispersion: 0.09, meta: 18000 },
    { id: 'sfm', nombre: 'San Francisco', lat: 19.30, lng: -70.25, radioDispersion: 0.08, meta: 22000 },
    { id: 'barahona', nombre: 'Barahona', lat: 18.21, lng: -71.10, radioDispersion: 0.15, meta: 15000 },
];

const DIASPORA_CORE = [
    { id: 'ny_bronx', nombre: 'Bronx, NY', lat: 40.84, lng: -73.86, radioDispersion: 0.05, meta: 15000 },
    { id: 'ny_manhattan', nombre: 'Manhattan, NY', lat: 40.78, lng: -73.97, radioDispersion: 0.04, meta: 12000 },
    { id: 'nj', nombre: 'New Jersey', lat: 40.73, lng: -74.17, radioDispersion: 0.10, meta: 10000 },
    { id: 'madrid', nombre: 'Madrid', lat: 40.41, lng: -3.70, radioDispersion: 0.08, meta: 8000 },
    { id: 'barcelona', nombre: 'Barcelona', lat: 41.38, lng: 2.17, radioDispersion: 0.06, meta: 5000 },
    { id: 'florida', nombre: 'Florida (Central)', lat: 28.53, lng: -81.37, radioDispersion: 0.5, meta: 9000 },
];

export interface MilitantPoint {
    id: string;
    lat: number;
    lng: number;
    active: boolean;
    zoneId: string;
}

interface VotoVerdeMapProps {
    onStatsUpdate?: (stats: { activeLocal: number; activeExterior: number; total: number }) => void;
}

export default function VotoVerdeMap({ onStatsUpdate }: VotoVerdeMapProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [view, setView] = useState<'local' | 'exterior'>('local');
    const [simulating, setSimulating] = useState(false);

    // ESTADO DE PUNTOS: Generamos miles de puntos latentes
    const [points, setPoints] = useState<MilitantPoint[]>([]);

    // Inicialización de Puntos Latentes (Solo una vez)
    useEffect(() => {
        setIsMounted(true);
        const generatedPoints: MilitantPoint[] = [];

        // Generar puntos para LOCAL
        PROVINCIAS_CORE.forEach(zone => {
            // Densidad basada en la meta (~1 punto por cada 100 votos de meta para visualización)
            const count = Math.floor(zone.meta / 100);
            for (let i = 0; i < count; i++) {
                // Generación aleatoria gaussiana simple alrededor del centro
                const u = Math.random();
                const v = Math.random();
                const w = zone.radioDispersion * Math.sqrt(-2.0 * Math.log(u));
                const latOffset = w * Math.cos(2.0 * Math.PI * v);
                const lngOffset = w * Math.sin(2.0 * Math.PI * v);

                generatedPoints.push({
                    id: `pt-${zone.id}-${i}`,
                    lat: zone.lat + latOffset,
                    lng: zone.lng + lngOffset,
                    active: false, // Inicialmente apagados
                    zoneId: zone.id
                });
            }
        });

        // Generar puntos para EXTERIOR
        DIASPORA_CORE.forEach(zone => {
            const count = Math.floor(zone.meta / 50); // Más densidad visual para exterior
            for (let i = 0; i < count; i++) {
                const u = Math.random();
                const v = Math.random();
                const w = zone.radioDispersion * Math.sqrt(-2.0 * Math.log(u));
                const latOffset = w * Math.cos(2.0 * Math.PI * v);
                const lngOffset = w * Math.sin(2.0 * Math.PI * v);

                generatedPoints.push({
                    id: `pt-${zone.id}-${i}`,
                    lat: zone.lat + latOffset,
                    lng: zone.lng + lngOffset,
                    active: false,
                    zoneId: zone.id
                });
            }
        });

        setPoints(generatedPoints);
    }, []);

    // Effect to notify parent when points change (throttled)
    useEffect(() => {
        if (!onStatsUpdate) return;

        if (simulating) {
            // Calculate stats efficiently
            const activeLocal = points.filter(p => p.active && !['ny_bronx', 'ny_manhattan', 'nj', 'madrid', 'barcelona', 'florida'].some(k => p.zoneId === k)).length;
            const activeExterior = points.filter(p => p.active && ['ny_bronx', 'ny_manhattan', 'nj', 'madrid', 'barcelona', 'florida'].some(k => p.zoneId === k)).length;

            // Only update if there's activity to report
            // Multiplicamos por un factor (e.g. 100) para simular números reales a partir de los puntos
            if (activeLocal > 0 || activeExterior > 0) {
                onStatsUpdate({
                    activeLocal: activeLocal * 123, // Factor mágico para simular escala real
                    activeExterior: activeExterior * 85,
                    total: points.length
                });
            }
        }
    }, [points, simulating, onStatsUpdate]);

    // MOTOR DE SIMULACIÓN "VIRAL"
    useEffect(() => {
        let animationFrame = 0;

        const loop = () => {
            if (!simulating) return;

            setPoints(prevPoints => {
                const nextPoints = [...prevPoints];
                const activationRate = 18; // Agresividad de contagio
                let activatedCount = 0;

                for (let i = 0; i < activationRate * 5; i++) {
                    if (activatedCount >= activationRate) break;

                    const idx = Math.floor(Math.random() * nextPoints.length);
                    const pt = nextPoints[idx];

                    if (!pt.active) {
                        nextPoints[idx] = { ...pt, active: true };
                        activatedCount++;
                    }
                }

                return activatedCount > 0 ? nextPoints : prevPoints;
            });

            animationFrame = requestAnimationFrame(loop);
        };

        if (simulating) {
            loop();
        } else {
            cancelAnimationFrame(animationFrame);
        }

        return () => cancelAnimationFrame(animationFrame);
    }, [simulating]);

    const resetSimulation = () => {
        setSimulating(false);
        setPoints(prev => prev.map(p => ({ ...p, active: false })));
        if (onStatsUpdate) onStatsUpdate({ activeLocal: 0, activeExterior: 0, total: points.length });
    };

    // Calcular estadísticas en tiempo real internas (para el KPI local del mapa)
    const stats = useMemo(() => {
        const activeLocal = points.filter(p => p.active && !['ny_bronx', 'ny_manhattan', 'nj', 'madrid', 'barcelona', 'florida'].some(k => p.zoneId === k)).length;
        const activeExterior = points.filter(p => p.active && ['ny_bronx', 'ny_manhattan', 'nj', 'madrid', 'barcelona', 'florida'].some(k => p.zoneId === k)).length;
        return { activeLocal, activeExterior, total: points.length };
    }, [points]);

    if (!isMounted) return null;

    return (
        <div className="relative w-full" suppressHydrationWarning>
            {/* Header / Controls */}
            <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-3 items-end">
                {/* View Switcher */}
                <div className="flex gap-1 p-1 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-emerald-500/30">
                    <button
                        onClick={() => setView('local')}
                        className={`px-4 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${view === 'local' ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(5,150,105,0.6)]' : 'text-slate-400 hover:text-white'}`}
                    >
                        🇩🇴 Nacional
                    </button>
                    <button
                        onClick={() => setView('exterior')}
                        className={`px-4 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${view === 'exterior' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.6)]' : 'text-slate-400 hover:text-white'}`}
                    >
                        ✈️ Diáspora
                    </button>
                </div>

                {/* KPI Display */}
                <div className="bg-slate-900/90 backdrop-blur border border-slate-700 p-3 rounded-2xl flex flex-col gap-1 w-[180px] shadow-xl">
                    <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
                        <span>Activados</span>
                        <Users size={12} />
                    </div>
                    <div className="text-2xl font-black text-white tabular-nums tracking-tight leading-none">
                        {(view === 'local' ? stats.activeLocal * 123 : stats.activeExterior * 85).toLocaleString()}
                    </div>
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mt-1">
                        <div
                            className="h-full bg-emerald-500 transition-all duration-300"
                            style={{ width: `${(view === 'local' ? stats.activeLocal : stats.activeExterior) / (view === 'local' ? 500 : 100)}%` }}
                        ></div>
                    </div>
                </div>

                {/* Simulation Controls */}
                <div className="flex gap-2">
                    {!simulating ? (
                        <button
                            onClick={() => setSimulating(true)}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-emerald-500 transition-all hover:scale-105 active:scale-95 border border-emerald-400"
                        >
                            <Play size={14} fill="currentColor" /> INICIAR RED
                        </button>
                    ) : (
                        <button
                            onClick={() => setSimulating(false)}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-amber-400 transition-all hover:scale-105 border border-amber-300"
                        >
                            <Square size={14} fill="currentColor" /> DETENER
                        </button>
                    )}

                    <button
                        onClick={resetSimulation}
                        className="p-3 rounded-full bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-all hover:rotate-180 hover:bg-slate-700"
                        title="Reiniciar Mapa"
                    >
                        <RefreshCcw size={16} />
                    </button>
                </div>
            </div>

            <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 relative group">
                <LeafletMapInner view={view} points={points} />

                {simulating && (
                    <div className="absolute bottom-6 left-6 z-[999] flex items-center gap-3">
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </div>
                        <span className="text-emerald-400 text-[10px] font-mono font-bold tracking-[0.2em] animate-pulse">
                            CONECTANDO CÉLULAS...
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
