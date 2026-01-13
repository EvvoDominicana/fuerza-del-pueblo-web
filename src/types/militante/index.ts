export interface VotanteComprometido {
    id: string;
    cedula: string;
    nombre: string;
    telefono: string;
    sector: string;
    residencia: 'local' | 'exterior';
    coordinadorId: string; // El ID del militante que lo registró
    syncStatus: 'pending' | 'synced';
    createdAt: string;
    updatedAt: string;
}

export interface StructureStats {
    total: number;
    synced: number;
    pending: number;
    goalProgress: number; // Porcentaje hacia los 10
}
