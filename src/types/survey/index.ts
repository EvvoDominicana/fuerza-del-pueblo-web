export type SurveyStatus = 'active' | 'draft' | 'closed';
export type QuestionType = 'multiple_choice' | 'text' | 'rating' | 'yes_no';

export interface SurveyQuestion {
    id: string;
    type: QuestionType;
    label: string;
    options?: string[]; // Para multiple_choice
    required: boolean;
}

export interface Survey {
    id: string;
    title: string;
    description: string;
    status: SurveyStatus;
    questions: SurveyQuestion[];
    createdAt: string;
    createdBy: string;
    targetCount?: number;
}

export interface SurveyResponse {
    id?: number; // Autoincremental en IndexedDB
    surveyId: string;
    militanteId: string;
    militanteName: string;
    answers: Record<string, any>;
    location: {
        lat: number;
        lng: number;
        accuracy?: number;
    };
    metadata: {
        startedAt: string;
        finishedAt: string;
        durationSeconds: number;
        deviceId: string;
        networkType: string;
        appVersion: string;
    };
    syncStatus: 'pending' | 'synced' | 'error';
    syncError?: string;
    createdAt: string;
}
