'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { Users, PlusCircle, CheckCircle2, Clock, MapPin, Phone, Search } from 'lucide-react';
import { StructureStorageService } from '@/services/militante/structure.storage';
import { VotanteComprometido, StructureStats } from '@/types/militante';
import { Input } from '@/components/ui/input';
import confetti from 'canvas-confetti';

export default function StructurePage() {
    const { userProfile } = useAuth();
    const [stats, setStats] = useState<StructureStats>({ total: 0, synced: 0, pending: 0, goalProgress: 0 });
    const [list, setList] = useState<VotanteComprometido[]>([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        if (userProfile) {
            loadData();
        }
    }, [userProfile]);

    async function loadData() {
        if (!userProfile) return;
        const s = await StructureStorageService.getStats(userProfile.uid);
        const l = await StructureStorageService.getMyComprometidos(userProfile.uid);
        setStats(s);
        setList(l);

        if (s.total >= 10) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#007a33', '#ffffff', '#ffd700']
            });
        }
    }

    const filteredList = list.filter(item =>
        item.nombre.toLowerCase().includes(filter.toLowerCase()) ||
        item.cedula.includes(filter)
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-black text-primary tracking-tight">Mi Estructura 1x10</h1>
                    <p className="text-muted-foreground">Gestiona tus 10 comprometidos para la victoria electoral.</p>
                </div>
                <Button asChild className="gap-2 font-bold shadow-lg shadow-primary/20">
                    <Link href="/structure/new">
                        <PlusCircle className="h-4 w-4" />
                        Registrar Votante
                    </Link>
                </Button>
            </div>

            {/* Metas y Progreso */}
            <Card className="border-2 border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                        <CardTitle className="text-lg font-bold">Progreso hacia la Meta (10 Comprometidos)</CardTitle>
                        <span className="text-2xl font-black text-primary">{stats.total}/10</span>
                    </div>
                    <Progress value={stats.goalProgress} className="h-3" />
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 text-sm font-medium">
                        <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="h-4 w-4" /> {stats.synced} Sincronizados
                        </div>
                        <div className="flex items-center gap-1 text-amber-600">
                            <Clock className="h-4 w-4" /> {stats.pending} Pendientes
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Buscador y Lista */}
            <div className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por nombre o cédula..."
                        className="pl-10"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredList.length === 0 ? (
                        <div className="col-span-full py-12 text-center border-2 border-dashed rounded-xl">
                            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                            <p className="text-muted-foreground font-medium">No has registrado a nadie aún.</p>
                            <Button asChild variant="link" className="text-primary p-0">
                                <Link href="/structure/new">Empieza registrando a tu primer comprometido</Link>
                            </Button>
                        </div>
                    ) : (
                        filteredList.map((item) => (
                            <Card key={item.id} className="relative overflow-hidden group hover:border-primary/50 transition-colors">
                                <div className={cn(
                                    "absolute top-0 right-0 p-2",
                                    item.syncStatus === 'synced' ? "text-green-500" : "text-amber-500"
                                )}>
                                    {item.syncStatus === 'synced' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                                </div>
                                <CardHeader className="pb-2">
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{item.cedula}</div>
                                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">{item.nombre}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Phone className="h-3 w-3" /> {item.telefono}
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="h-3 w-3" /> {item.sector}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
