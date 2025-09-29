import { CompanyData } from '@/types/bid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
    companyData: CompanyData | null;
};
type Action = {
    setCompanyData: (data: CompanyData | null) => void;
    reset: () => void;
};

const useCompanyStore = create(
    persist<State & Action>(
        (set) => ({
            companyData: {
                companyName: 'Valeo Foods',
                date: 'August 2025',
                overview: {
                    description:
                        'Valeo Foods is a major international food company headquartered in Dublin, Ireland',
                    founded:
                        '2010, through the merger of Batchelors and Origin Foods',
                    ownership: 'Acquired by Bain Capital in 2021',
                    employees: 'Over 6,000 globally',
                    reach: 'Products sold in over 100 countries',
                    businessModel:
                        'Focused on acquiring and growing heritage food brands across Europe',
                },
                ownership: {
                    currentOwner:
                        'Bain Capital Private Equity acquired Valeo Foods in May 2021 from CapVest Partners LLP for over €1.7 billion',
                    previousOwner:
                        'CapVest, a private equity firm, had built Valeo Foods through strategic acquisitions and held ownership until the Bain Capital deal',
                    acquisitionDetails:
                        'May 2021 acquisition for over €1.7 billion',
                    managementContinuity:
                        "Seamus Kearney, the Group CEO at the time of acquisition, continued to lead the business under Bain Capital's ownership",
                },
                leadership: [
                    {
                        name: 'Ronald Kers',
                        title: 'Group Chief Executive',
                        background:
                            'with prior leadership roles at Müller Group and 2 Sisters Food Group',
                    },
                    {
                        name: 'Louis-François Gombert',
                        title: 'Chief Financial Officer',
                        background:
                            'formerly with Suntory Beverage & Food and HAVEA Group',
                    },
                    {
                        name: 'Eveline Paternotte',
                        title: 'Chief People Officer',
                        background:
                            'with HR leadership experience at PepsiCo and SABMiller',
                    },
                    {
                        name: 'Thibaut Eissautier',
                        title: 'Chief Procurement Officer',
                        background: 'previously at Diageo and Pladis',
                    },
                    {
                        name: 'Avanti Patel',
                        title: 'Group Head of M&A',
                        background: 'leading global acquisitions',
                    },
                    {
                        name: 'Jorg Brouwer',
                        title: 'Group Commercial Director',
                        background:
                            'with a background at Unilever and Nomad Foods',
                    },
                ],
                governance: {
                    bodies: [
                        'Corporate governance is overseen by:',
                        'A Board of Directors and an Executive Committee',
                        'These bodies support strategic direction and ensure transparent financial communication',
                    ],
                },
                products: [
                    {
                        category: 'Snacks & Confectionery',
                        items: 'Kettle Chips, Barratt sweets, Tangerine Confectionery',
                    },
                    {
                        category: 'Biscuits & Bakery',
                        items: "Jacob's, Balconi, Melegatti (panettone, pandoro), Dolciaria Freddi",
                    },
                    {
                        category: 'Honey',
                        items: 'Rowse Honey (UK market leader)',
                    },
                    {
                        category: 'Canned Goods',
                        items: 'Batchelors (beans, peas, pulses)',
                    },
                    {
                        category: 'Baking Ingredients',
                        items: 'Odlums (flour), Shamrock (nuts, dried fruit, sugar)',
                    },
                    {
                        category: 'Condiments & Preserves',
                        items: 'Chef sauces, Fruitfield marmalade',
                    },
                    {
                        category: 'Mediterranean Foods',
                        items: 'Roma (pasta, rice, canned tomatoes)',
                    },
                    {
                        category: 'Hot Beverages',
                        items: 'Robert Roberts (coffee and tea), Lavazza (distribution partner)',
                    },
                    {
                        category: 'Healthy & Organic Foods',
                        items: 'Kelkin (cereal, snacks)',
                    },
                ],
                operations: [
                    {
                        country: 'Ireland',
                        facilities: 'HQ in Dublin, 4 manufacturing sites',
                    },
                    {
                        country: 'United Kingdom',
                        facilities: '12 manufacturing & distribution sites',
                    },
                    {
                        country: 'Italy',
                        facilities: 'HQ in Milan, 3 manufacturing sites',
                    },
                    { country: 'Germany', facilities: '3 manufacturing sites' },
                    {
                        country: 'Czech Republic',
                        facilities: '2 manufacturing sites',
                    },
                    {
                        country: 'Netherlands',
                        facilities: '1 manufacturing site',
                    },
                    { country: 'Canada', facilities: '1 manufacturing site' },
                ],
                financials: [
                    {
                        year: '2023',
                        revenue: '€1.39 billion',
                        operatingProfit: '€53 million (↓ from €90.6m)',
                        netProfit: '€34.4 million loss',
                        operatingMargin: 'Not disclosed',
                        freeCashFlow: 'Not disclosed',
                        debt: 'Not disclosed',
                    },
                    {
                        year: '2024',
                        revenue: 'Not yet disclosed',
                        operatingProfit:
                            'Recovery and profitability goals achieved',
                        netProfit: 'Profitability restored',
                        operatingMargin: 'Not disclosed',
                        freeCashFlow: '€481 million after restructuring',
                        debt: 'Net debt reduced to €3.81 billion',
                    },
                    {
                        year: '2025 (H1)',
                        revenue: 'Not yet disclosed',
                        operatingProfit: 'Operating margin: 4.5%',
                        netProfit: 'Net income: €104 million',
                        operatingMargin: '4.5%',
                        freeCashFlow: '€252 million after restructuring',
                        debt: 'Net debt: €4.18 billion (currency impact)',
                    },
                ],
                competitors: [
                    {
                        name: 'Nestlé',
                        focusAreas: 'Confectionery, dairy, beverages, cereals',
                    },
                    {
                        name: 'PepsiCo',
                        focusAreas: "Snacks (Lay's, Doritos), beverages",
                    },
                    {
                        name: 'Danone',
                        focusAreas: 'Dairy, plant-based, nutrition',
                    },
                    {
                        name: 'Kraft Heinz',
                        focusAreas: 'Sauces, canned goods, snacks',
                    },
                    {
                        name: 'General Mills',
                        focusAreas: 'Cereals, baking, snacks',
                    },
                    {
                        name: 'Conagra Brands',
                        focusAreas: 'Packaged foods, frozen meals',
                    },
                ],
                profitability: {
                    annualRevenue: '€1.39 billion (≈ $1.5 billion)',
                    operatingProfit: '€31.13 million (↓ 57% YoY)',
                    netProfit: 'Pre-tax loss of €41.28 million',
                    operatingMargin: '~2.2%',
                    netMargin: 'Negative',
                },
                improvements: {
                    costReduction: [
                        'Streamline manufacturing across its 27 factories to reduce duplication and overhead',
                        'Automate production and logistics where feasible',
                        'Cut administrative costs and optimize back-office functions',
                    ],
                    portfolioOptimization: [
                        'Divest low-margin brands or underperforming business units',
                        'Focus on premium and high-growth categories like health snacks, plant-based foods, and gourmet products',
                        'Rationalize SKUs to reduce complexity and improve supply chain efficiency',
                    ],
                    pricingRevenue: [
                        'Implement dynamic pricing strategies to respond to inflation and input cost volatility',
                        'Renegotiate supplier contracts and improve terms with retailers',
                        'Introduce value-added products that command higher margins',
                    ],
                    innovation: [
                        'Invest in R&D for differentiated products with better profitability',
                        'Leverage iconic brands like Rowse Honey and Kettle Chips to expand into new markets',
                        'Enhance marketing to build pricing power and customer loyalty',
                    ],
                    integrationDiscipline: [
                        'Ensure synergy realization from acquired companies',
                        'Avoid overpaying for targets and limit exceptional costs during integration',
                        'Focus on cultural and operational alignment to accelerate margin recovery',
                    ],
                },
                analysis: {
                    preMeeting: {
                        dissatisfaction: [
                            'Current profitability challenges',
                            'Integration complexity',
                        ],
                        levers: [
                            'Portfolio optimization',
                            'Operational efficiency',
                        ],
                    },
                    duringMeeting: {
                        dissatisfaction: ['To be discussed'],
                        levers: ['To be identified'],
                    },
                },
                followUp: [
                    {
                        action: 'Finalize cost reduction strategy',
                        who: 'CFO',
                        when: 'End of Q3',
                        zoho: 'TBD',
                    },
                    {
                        action: 'Portfolio review completion',
                        who: 'Strategy Team',
                        when: 'Q4 2025',
                        zoho: 'TBD',
                    },
                ],
            },
            setCompanyData: (data) => set({ companyData: data }),
            reset: () =>
                set({
                    companyData: {
                        companyName: 'Valeo Foods',
                        date: 'August 2025',
                        overview: {
                            description:
                                'Valeo Foods is a major international food company headquartered in Dublin, Ireland',
                            founded:
                                '2010, through the merger of Batchelors and Origin Foods',
                            ownership: 'Acquired by Bain Capital in 2021',
                            employees: 'Over 6,000 globally',
                            reach: 'Products sold in over 100 countries',
                            businessModel:
                                'Focused on acquiring and growing heritage food brands across Europe',
                        },
                        ownership: {
                            currentOwner:
                                'Bain Capital Private Equity acquired Valeo Foods in May 2021 from CapVest Partners LLP for over €1.7 billion',
                            previousOwner:
                                'CapVest, a private equity firm, had built Valeo Foods through strategic acquisitions and held ownership until the Bain Capital deal',
                            acquisitionDetails:
                                'May 2021 acquisition for over €1.7 billion',
                            managementContinuity:
                                "Seamus Kearney, the Group CEO at the time of acquisition, continued to lead the business under Bain Capital's ownership",
                        },
                        leadership: [
                            {
                                name: 'Ronald Kers',
                                title: 'Group Chief Executive',
                                background:
                                    'with prior leadership roles at Müller Group and 2 Sisters Food Group',
                            },
                            {
                                name: 'Louis-François Gombert',
                                title: 'Chief Financial Officer',
                                background:
                                    'formerly with Suntory Beverage & Food and HAVEA Group',
                            },
                            {
                                name: 'Eveline Paternotte',
                                title: 'Chief People Officer',
                                background:
                                    'with HR leadership experience at PepsiCo and SABMiller',
                            },
                            {
                                name: 'Thibaut Eissautier',
                                title: 'Chief Procurement Officer',
                                background: 'previously at Diageo and Pladis',
                            },
                            {
                                name: 'Avanti Patel',
                                title: 'Group Head of M&A',
                                background: 'leading global acquisitions',
                            },
                            {
                                name: 'Jorg Brouwer',
                                title: 'Group Commercial Director',
                                background:
                                    'with a background at Unilever and Nomad Foods',
                            },
                        ],
                        governance: {
                            bodies: [
                                'Corporate governance is overseen by:',
                                'A Board of Directors and an Executive Committee',
                                'These bodies support strategic direction and ensure transparent financial communication',
                            ],
                        },
                        products: [
                            {
                                category: 'Snacks & Confectionery',
                                items: 'Kettle Chips, Barratt sweets, Tangerine Confectionery',
                            },
                            {
                                category: 'Biscuits & Bakery',
                                items: "Jacob's, Balconi, Melegatti (panettone, pandoro), Dolciaria Freddi",
                            },
                            {
                                category: 'Honey',
                                items: 'Rowse Honey (UK market leader)',
                            },
                            {
                                category: 'Canned Goods',
                                items: 'Batchelors (beans, peas, pulses)',
                            },
                            {
                                category: 'Baking Ingredients',
                                items: 'Odlums (flour), Shamrock (nuts, dried fruit, sugar)',
                            },
                            {
                                category: 'Condiments & Preserves',
                                items: 'Chef sauces, Fruitfield marmalade',
                            },
                            {
                                category: 'Mediterranean Foods',
                                items: 'Roma (pasta, rice, canned tomatoes)',
                            },
                            {
                                category: 'Hot Beverages',
                                items: 'Robert Roberts (coffee and tea), Lavazza (distribution partner)',
                            },
                            {
                                category: 'Healthy & Organic Foods',
                                items: 'Kelkin (cereal, snacks)',
                            },
                        ],
                        operations: [
                            {
                                country: 'Ireland',
                                facilities:
                                    'HQ in Dublin, 4 manufacturing sites',
                            },
                            {
                                country: 'United Kingdom',
                                facilities:
                                    '12 manufacturing & distribution sites',
                            },
                            {
                                country: 'Italy',
                                facilities:
                                    'HQ in Milan, 3 manufacturing sites',
                            },
                            {
                                country: 'Germany',
                                facilities: '3 manufacturing sites',
                            },
                            {
                                country: 'Czech Republic',
                                facilities: '2 manufacturing sites',
                            },
                            {
                                country: 'Netherlands',
                                facilities: '1 manufacturing site',
                            },
                            {
                                country: 'Canada',
                                facilities: '1 manufacturing site',
                            },
                        ],
                        financials: [
                            {
                                year: '2023',
                                revenue: '€1.39 billion',
                                operatingProfit: '€53 million (↓ from €90.6m)',
                                netProfit: '€34.4 million loss',
                                operatingMargin: 'Not disclosed',
                                freeCashFlow: 'Not disclosed',
                                debt: 'Not disclosed',
                            },
                            {
                                year: '2024',
                                revenue: 'Not yet disclosed',
                                operatingProfit:
                                    'Recovery and profitability goals achieved',
                                netProfit: 'Profitability restored',
                                operatingMargin: 'Not disclosed',
                                freeCashFlow:
                                    '€481 million after restructuring',
                                debt: 'Net debt reduced to €3.81 billion',
                            },
                            {
                                year: '2025 (H1)',
                                revenue: 'Not yet disclosed',
                                operatingProfit: 'Operating margin: 4.5%',
                                netProfit: 'Net income: €104 million',
                                operatingMargin: '4.5%',
                                freeCashFlow:
                                    '€252 million after restructuring',
                                debt: 'Net debt: €4.18 billion (currency impact)',
                            },
                        ],
                        competitors: [
                            {
                                name: 'Nestlé',
                                focusAreas:
                                    'Confectionery, dairy, beverages, cereals',
                            },
                            {
                                name: 'PepsiCo',
                                focusAreas:
                                    "Snacks (Lay's, Doritos), beverages",
                            },
                            {
                                name: 'Danone',
                                focusAreas: 'Dairy, plant-based, nutrition',
                            },
                            {
                                name: 'Kraft Heinz',
                                focusAreas: 'Sauces, canned goods, snacks',
                            },
                            {
                                name: 'General Mills',
                                focusAreas: 'Cereals, baking, snacks',
                            },
                            {
                                name: 'Conagra Brands',
                                focusAreas: 'Packaged foods, frozen meals',
                            },
                        ],
                        profitability: {
                            annualRevenue: '€1.39 billion (≈ $1.5 billion)',
                            operatingProfit: '€31.13 million (↓ 57% YoY)',
                            netProfit: 'Pre-tax loss of €41.28 million',
                            operatingMargin: '~2.2%',
                            netMargin: 'Negative',
                        },
                        improvements: {
                            costReduction: [
                                'Streamline manufacturing across its 27 factories to reduce duplication and overhead',
                                'Automate production and logistics where feasible',
                                'Cut administrative costs and optimize back-office functions',
                            ],
                            portfolioOptimization: [
                                'Divest low-margin brands or underperforming business units',
                                'Focus on premium and high-growth categories like health snacks, plant-based foods, and gourmet products',
                                'Rationalize SKUs to reduce complexity and improve supply chain efficiency',
                            ],
                            pricingRevenue: [
                                'Implement dynamic pricing strategies to respond to inflation and input cost volatility',
                                'Renegotiate supplier contracts and improve terms with retailers',
                                'Introduce value-added products that command higher margins',
                            ],
                            innovation: [
                                'Invest in R&D for differentiated products with better profitability',
                                'Leverage iconic brands like Rowse Honey and Kettle Chips to expand into new markets',
                                'Enhance marketing to build pricing power and customer loyalty',
                            ],
                            integrationDiscipline: [
                                'Ensure synergy realization from acquired companies',
                                'Avoid overpaying for targets and limit exceptional costs during integration',
                                'Focus on cultural and operational alignment to accelerate margin recovery',
                            ],
                        },
                        analysis: {
                            preMeeting: {
                                dissatisfaction: [
                                    'Current profitability challenges',
                                    'Integration complexity',
                                ],
                                levers: [
                                    'Portfolio optimization',
                                    'Operational efficiency',
                                ],
                            },
                            duringMeeting: {
                                dissatisfaction: ['To be discussed'],
                                levers: ['To be identified'],
                            },
                        },
                        followUp: [
                            {
                                action: 'Finalize cost reduction strategy',
                                who: 'CFO',
                                when: 'End of Q3',
                                zoho: 'TBD',
                            },
                            {
                                action: 'Portfolio review completion',
                                who: 'Strategy Team',
                                when: 'Q4 2025',
                                zoho: 'TBD',
                            },
                        ],
                    },
                }),
        }),
        {
            name: 'company-storage',
        }
    )
);

export default useCompanyStore;
