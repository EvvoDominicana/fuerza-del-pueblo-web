'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, UserPlus, ShieldCheck } from 'lucide-react';
import { StructureStorageService } from '@/services/militante/structure.storage';
import { VotanteComprometido } from '@/types/militante';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

export default function NewComprometidoPage() {
    const router = useRouter();
    const { userProfile } = useAuth();
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        cedula: '',
        nombre: '',
        telefono: '',
        sector: ''
    });

    const formatCedula = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 10) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 10)}-${numbers.slice(10, 11)}`;
    };

    const isValidCedula = (cedula: string) => {
        const c = cedula.replace(/-/g, "");
        if (c.length !== 11) return false;

        // Coeficientes para el algoritmo de la JCE
        const modulos = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
        let verificador = parseInt(c[10]);
        let suma = 0;

        for (let i = 0; i < 10; i++) {
            let mult = parseInt(c[i]) * modulos[i];
            if (mult > 9) mult = mult.toString().split("").map(n => parseInt(n)).reduce((a, b) => a + b);
            suma += mult;
        }

        let res = (10 - (suma % 10)) % 10;
        return res === verificador;
    };

    const handleCedulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCedula(e.target.value);
        if (formatted.length <= 13) {
            setFormData({ ...formData, cedula: formatted });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userProfile) return;

        // Validar cédula matemática (Algoritmo de Luhn)
        if (!isValidCedula(formData.cedula)) {
            toast({
                title: "Cédula Inválida",
                description: "El número de cédula no es válido según los registros oficiales.",
                variant: "destructive"
            });
            return;
        }

        setSubmitting(true);
        try {
            // Verificar duplicidad local
            const exists = await StructureStorageService.isCedulaRegistered(formData.cedula);
            if (exists) {
                toast({ title: "Esta cédula ya está registrada en tu estructura", variant: "destructive" });
                setSubmitting(false);
                return;
            }

            const newComprometido: VotanteComprometido = {
                id: uuidv4(),
                ...formData,
                coordinadorId: userProfile.uid,
                syncStatus: 'pending',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            await StructureStorageService.saveComprometido(newComprometido);

            toast({
                title: "¡Votante registrado!",
                description: "Se ha añadido correctamente a tu estructura 1x10."
            });

            router.push('/structure');
        } catch (error) {
            toast({ title: "Error al guardar", variant: "destructive" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" /> Volver
            </Button>

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black text-primary tracking-tight">Nuevo Comprometido</h1>
                <p className="text-muted-foreground">Registra a un simpatizante para asegurar su voto.</p>
            </div>

            <Card className="border-2">
                <CardHeader>
                    <div className="flex items-center gap-2 text-primary">
                        <UserPlus className="h-5 w-5" />
                        <CardTitle>Datos del Votante</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cedula">Cédula de Identidad</Label>
                            <Input
                                id="cedula"
                                placeholder="000-0000000-0"
                                value={formData.cedula}
                                onChange={handleCedulaChange}
                                required
                                className="text-lg font-bold tracking-widest"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nombre">Nombre Completo</Label>
                                <Input
                                    id="nombre"
                                    placeholder="Nombre y Apellidos"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="telefono">Teléfono / WhatsApp</Label>
                                <Input
                                    id="telefono"
                                    placeholder="809-000-0000"
                                    type="tel"
                                    value={formData.telefono}
                                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sector">Sector / Barrio</Label>
                            <Input
                                id="sector"
                                placeholder="Ej: Los Mina, Ensanche La Paz..."
                                value={formData.sector}
                                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                                required
                            />
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full h-12 text-lg font-bold"
                                disabled={submitting}
                            >
                                {submitting ? 'Registrando...' : 'Confirmar Registro'}
                            </Button>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                            <ShieldCheck className="h-3 w-3" /> Datos protegidos por el sistema de seguridad FP
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
