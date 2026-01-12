import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db as firestore } from '@/lib/firebase';
import { SurveyStorageService } from './storage.service';
import { SurveyResponse } from '@/types/survey';

export const SurveySyncEngine = {
    /**
     * Intenta sincronizar todas las encuestas pendientes
     */
    async syncPendingResponses(): Promise<{ success: number; failed: number }> {
        const pendingResponses = await SurveyStorageService.getPendingResponses();
        const { StructureStorageService } = await import('../militante/structure.storage');
        const pendingComprometidos = await StructureStorageService.getPendingSync();

        let successCount = 0;
        let failedCount = 0;

        // Sincronizar encuestas
        for (const response of pendingResponses) {
            try {
                await this.uploadToFirebase(response);
                if (response.id) {
                    await SurveyStorageService.markAsSynced(response.id);
                    successCount++;
                }
            } catch (error: any) {
                console.error('Error syncing response:', error);
                if (response.id) await SurveyStorageService.markAsError(response.id, error.message || 'Error desconocido');
                failedCount++;
            }
        }

        // Sincronizar 1x10
        const { doc, setDoc, serverTimestamp: firestoreTimestamp } = await import('firebase/firestore');
        for (const item of pendingComprometidos) {
            try {
                const docRef = doc(firestore, 'comprometidos', item.id);
                await setDoc(docRef, {
                    ...item,
                    syncStatus: 'synced',
                    syncedAt: firestoreTimestamp()
                });
                await StructureStorageService.markAsSynced(item.id);
                successCount++;
            } catch (error: any) {
                console.error('Error syncing comprometido:', error);
                failedCount++;
            }
        }

        return { success: successCount, failed: failedCount };
    },

    /**
     * Sube una respuesta individual a Firebase
     */
    async uploadToFirebase(response: SurveyResponse): Promise<void> {
        const responsesRef = collection(firestore, 'survey_responses');

        // Eliminamos el ID local antes de subir a Firebase
        const { id, ...firebaseData } = response;

        await addDoc(responsesRef, {
            ...firebaseData,
            serverCreatedAt: serverTimestamp(),
            // Marcamos como sincronizado en la nube
            syncStatus: 'synced'
        });
    },

    /**
     * Inicia un monitor de red para sincronización automática
     */
    initAutoSync() {
        if (typeof window !== 'undefined') {
            window.addEventListener('online', () => {
                console.log('Red recuperada, iniciando sincronización de encuestas...');
                this.syncPendingResponses();
            });

            // También intentamos sincronizar al cargar
            this.syncPendingResponses();

            // Y cada 5 minutos por si acaso
            setInterval(() => this.syncPendingResponses(), 5 * 60 * 1000);
        }
    }
};
