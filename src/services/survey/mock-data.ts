import { Survey } from "@/types/survey";

export const MOCK_SURVEYS: Survey[] = [
    {
        id: 'survey-1',
        title: 'Intención de Voto - Barrio Seguro',
        description: 'Encuesta rápida sobre la percepción política en el barrio.',
        status: 'active',
        createdAt: new Date().toISOString(),
        createdBy: 'admin-1',
        questions: [
            {
                id: 'q1',
                type: 'multiple_choice',
                label: '¿Por cuál partido votaría usted mañana?',
                options: ['Fuerza del Pueblo', 'PRM', 'PLD', 'PRD', 'Otros'],
                required: true
            },
            {
                id: 'q2',
                type: 'rating',
                label: '¿Cómo califica la gestión actual del gobierno?',
                required: true
            },
            {
                id: 'q3',
                type: 'yes_no',
                label: '¿Tiene usted su cédula de identidad vigente?',
                required: true
            },
            {
                id: 'q4',
                type: 'text',
                label: '¿Cuál es el principal problema de su comunidad?',
                required: false
            }
        ]
    },
    {
        id: 'survey-2',
        title: 'Censo de Simpatizantes',
        description: 'Registro de nuevos miembros y simpatizantes del partido.',
        status: 'active',
        createdAt: new Date().toISOString(),
        createdBy: 'admin-1',
        questions: [
            {
                id: 'c1',
                type: 'text',
                label: 'Nombre completo del simpatizante',
                required: true
            },
            {
                id: 'c2',
                type: 'text',
                label: 'Número de Cédula',
                required: true
            },
            {
                id: 'c3',
                type: 'text',
                label: 'Teléfono de contacto',
                required: true
            }
        ]
    }
];
