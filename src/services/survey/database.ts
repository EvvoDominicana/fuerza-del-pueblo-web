import Dexie, { type Table } from 'dexie';
import { SurveyResponse } from '@/types/survey';
import { VotanteComprometido } from '@/types/militante';

export class SurveyDatabase extends Dexie {
    surveyResponses!: Table<SurveyResponse>;
    comprometidos!: Table<VotanteComprometido>;

    constructor() {
        super('SurveyDB');
        this.version(2).stores({
            surveyResponses: '++id, surveyId, militanteId, syncStatus, createdAt',
            comprometidos: '++id, cedula, coordinadorId, syncStatus'
        });
    }
}

export const db = new SurveyDatabase();
