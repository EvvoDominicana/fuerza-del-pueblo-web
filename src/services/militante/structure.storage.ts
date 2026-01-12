import { db } from '../survey/database';
import { VotanteComprometido, StructureStats } from '@/types/militante';

export class StructureStorageService {
    static async saveComprometido(data: VotanteComprometido) {
        return await db.comprometidos.put(data);
    }

    static async getMyComprometidos(militanteId: string): Promise<VotanteComprometido[]> {
        return await db.comprometidos
            .where('coordinadorId')
            .equals(militanteId)
            .toArray();
    }

    static async getPendingSync(): Promise<VotanteComprometido[]> {
        return await db.comprometidos
            .where('syncStatus')
            .equals('pending')
            .toArray();
    }

    static async markAsSynced(id: string) {
        return await db.comprometidos.update(id, { syncStatus: 'synced' });
    }

    static async getStats(militanteId: string): Promise<StructureStats> {
        const all = await this.getMyComprometidos(militanteId);
        const synced = all.filter(s => s.syncStatus === 'synced').length;
        const pending = all.length - synced;

        return {
            total: all.length,
            synced,
            pending,
            goalProgress: Math.min((all.length / 10) * 100, 100)
        };
    }

    static async isCedulaRegistered(cedula: string): Promise<boolean> {
        const existing = await db.comprometidos
            .where('cedula')
            .equals(cedula)
            .first();
        return !!existing;
    }
}
