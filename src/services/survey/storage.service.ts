import { db } from './database';
import { SurveyResponse } from '@/types/survey';

export const SurveyStorageService = {
    /**
     * Guarda una respuesta de encuesta localmente
     */
    async saveResponse(response: SurveyResponse): Promise<number> {
        return await db.surveyResponses.add({
            ...response,
            syncStatus: 'pending',
            createdAt: new Date().toISOString()
        });
    },

    /**
     * Obtiene todas las encuestas pendientes de sincronización
     */
    async getPendingResponses(): Promise<SurveyResponse[]> {
        return await db.surveyResponses
            .where('syncStatus')
            .equals('pending')
            .toArray();
    },

    /**
     * Marca una encuesta como sincronizada
     */
    async markAsSynced(id: number): Promise<void> {
        await db.surveyResponses.update(id, {
            syncStatus: 'synced',
            syncError: undefined
        });
    },

    /**
     * Marca una encuesta con error de sincronización
     */
    async markAsError(id: number, error: string): Promise<void> {
        await db.surveyResponses.update(id, {
            syncStatus: 'error',
            syncError: error
        });
    },

    /**
     * Obtiene estadísticas locales
     */
    async getLocalStats() {
        const all = await db.surveyResponses.toArray();
        return {
            total: all.length,
            pending: all.filter(r => r.syncStatus === 'pending').length,
            synced: all.filter(r => r.syncStatus === 'synced').length
        };
    }
};
