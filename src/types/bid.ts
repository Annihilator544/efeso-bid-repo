export interface CompanyData {
    companyName: string;
    date: string;

    overview: {
        description: string;
        founded: string;
        ownership: string;
        employees: string;
        reach: string;
        businessModel: string;
    };

    ownership: {
        currentOwner: string;
        acquisitionDetails: string;
        previousOwner: string;
        managementContinuity: string;
    };

    leadership: Array<{
        name: string;
        title: string;
        background: string;
    }>;

    governance: {
        bodies: string[];
    };

    products: Array<{
        category: string;
        items: string;
    }>;

    operations: Array<{
        country: string;
        facilities: string;
    }>;

    financials: Array<{
        year: string;
        revenue: string;
        operatingProfit: string;
        netProfit: string;
        operatingMargin: string;
        freeCashFlow: string;
        debt: string;
    }>;

    competitors: Array<{
        name: string;
        focusAreas: string;
    }>;

    profitability: {
        annualRevenue: string;
        operatingProfit: string;
        netProfit: string;
        operatingMargin: string;
        netMargin: string;
    };

    improvements: {
        costReduction: string[];
        portfolioOptimization: string[];
        pricingRevenue: string[];
        innovation: string[];
        integrationDiscipline: string[];
    };

    analysis: {
        preMeeting: {
            dissatisfaction: string[];
            levers: string[];
        };
        duringMeeting: {
            dissatisfaction: string[];
            levers: string[];
        };
    };

    followUp: Array<{
        action: string;
        who: string;
        when: string;
        zoho: string;
    }>;
}

export interface Slide {
    id: number;
    title: string;
    type: 'title' | 'bullets' | 'table' | 'two-column' | 'closing';
    content?: any;
}
