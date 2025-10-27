import { CompanyData } from './bid';

type FieldDefinition = Record<string, string | object>;

export const CompanyDataSchema: Record<keyof CompanyData, FieldDefinition> = {
    companyName: { companyName: 'string' },
    date: { date: 'string' },

    overview: {
        type: 'object',
        properties: {
            description: { type: 'string' },
            founded: { type: 'string' },
            ownership: { type: 'string' },
            employees: { type: 'string' },
            reach: { type: 'string' },
            businessModel: { type: 'string' },
        },
        required: [
            'description',
            'founded',
            'ownership',
            'employees',
            'reach',
            'businessModel',
        ],
    },

    ownership: {
        type: 'object',
        properties: {
            currentOwner: { type: 'string' },
            acquisitionDetails: { type: 'string' },
            previousOwner: { type: 'string' },
            managementContinuity: { type: 'string' },
        },
        required: [
            'currentOwner',
            'acquisitionDetails',
            'previousOwner',
            'managementContinuity',
        ],
    },

    leadership: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                title: { type: 'string' },
                background: { type: 'string' },
            },
            required: ['name', 'title', 'background'],
        },
    },

    governance: {
        type: 'object',
        properties: {
            bodies: {
                type: 'array',
                items: { type: 'string' },
            },
        },
        required: ['bodies'],
    },

    products: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                category: { type: 'string' },
                items: { type: 'string' },
            },
            required: ['category', 'items'],
        },
    },

    operations: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                country: { type: 'string' },
                facilities: { type: 'string' },
            },
            required: ['country', 'facilities'],
        },
    },

    financials: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                year: { type: 'string' },
                revenue: { type: 'string' },
                operatingProfit: { type: 'string' },
                netProfit: { type: 'string' },
                operatingMargin: { type: 'string' },
                freeCashFlow: { type: 'string' },
                debt: { type: 'string' },
                citations: { type: 'string' },
            },
            required: [
                'year',
                'revenue',
                'operatingProfit',
                'netProfit',
                'operatingMargin',
                'freeCashFlow',
                'debt',
                'citations',
            ],
        },
    },

    competitors: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                focusAreas: { type: 'string' },
            },
            required: ['name', 'focusAreas'],
        },
    },

    profitability: {
        type: 'object',
        properties: {
            annualRevenue: { type: 'string' },
            operatingProfit: { type: 'string' },
            netProfit: { type: 'string' },
            operatingMargin: { type: 'string' },
            netMargin: { type: 'string' },
        },
        required: [
            'annualRevenue',
            'operatingProfit',
            'netProfit',
            'operatingMargin',
            'netMargin',
        ],
    },

    improvements: {
        type: 'object',
        properties: {
            costReduction: { type: 'array', items: { type: 'string' } },
            portfolioOptimization: { type: 'array', items: { type: 'string' } },
            pricingRevenue: { type: 'array', items: { type: 'string' } },
            innovation: { type: 'array', items: { type: 'string' } },
            integrationDiscipline: { type: 'array', items: { type: 'string' } },
        },
        required: [
            'costReduction',
            'portfolioOptimization',
            'pricingRevenue',
            'innovation',
            'integrationDiscipline',
        ],
    },

    analysis: {
        type: 'object',
        properties: {
            preMeeting: {
                type: 'object',
                properties: {
                    dissatisfaction: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                    levers: { type: 'array', items: { type: 'string' } },
                },
                required: ['dissatisfaction', 'levers'],
            },
            duringMeeting: {
                type: 'object',
                properties: {
                    dissatisfaction: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                    levers: { type: 'array', items: { type: 'string' } },
                },
                required: ['dissatisfaction', 'levers'],
            },
        },
        required: ['preMeeting', 'duringMeeting'],
    },

    followUp: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                action: { type: 'string' },
                who: { type: 'string' },
                when: { type: 'string' },
                zoho: { type: 'string' },
            },
            required: ['action', 'who', 'when', 'zoho'],
        },
    },
};
