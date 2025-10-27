import { CompanyData } from '@/types/bid';
import { CompanyDataSchema } from '@/types/CompanyDataScheme';
import { toast } from 'sonner';

async function request(content: string, key: keyof CompanyData) {
    if (key === 'analysis' || key === 'followUp') {
        return {};
    }
    const myHeaders = new Headers();
    myHeaders.append(
        'Authorization',
        `Bearer ${import.meta.env.VITE_PERPLEXITY_API_KEY}`
    );
    myHeaders.append('Content-Type', 'application/json');
    const properties = CompanyDataSchema[key];
    const baseBody = {
        model: 'sonar',
        messages: [
            {
                role: 'user',
                content: content,
            },
        ],
        response_format: {
            type: 'json_schema',
            json_schema: {
                schema: properties,
            },
        },
        temperature: 0.2,
    };
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(baseBody),
        redirect: 'follow' as RequestRedirect,
    };
    const response = await fetch(
        'https://api.perplexity.ai/chat/completions',
        requestOptions
    );

    if (!response.ok) throw new Error(`Request failed ${response.status}`);
    const data = await response.json();
    const contentStr = data?.choices?.[0]?.message?.content ?? '{}';
    return JSON.parse(contentStr);
}

function cleanFinancials(raw: any[]): CompanyData['financials'] {
    return raw.map((row) => ({
        year: row.year.replace(/;.*$/, '').trim(), // remove CSS junk
        revenue: row.revenue.replace(/^.*?:\s*/, ''), // remove prefix like "2021:"
        operatingProfit: row.operatingProfit.replace(/^.*?:\s*/, ''),
        netProfit: row.netProfit.replace(/^.*?:\s*/, ''),
        operatingMargin: row.operatingMargin.replace(/^.*?:\s*/, ''),
        freeCashFlow: row.freeCashFlow.replace(/^.*?:\s*/, ''),
        debt: row.debt.replace(/^.*?:\s*/, ''),
        citations: row.citations,
    }));
}

async function fetchAllData(companyName: string) {
    const result: Partial<CompanyData> = {};
    const prompts = {
        overview: `Provide a structured company overview for ${companyName}. Include: 
- 1–2 sentence description of core business and industry focus 
- Founding year 
- Current ownership structure 
- Approximate employee count 
- Geographic reach/markets served 
- Primary business model 
Respond in concise factual statements only.`,

        ownership: `Summarize ${companyName}'s ownership history and current status. Include: 
- Current parent company/owner 
- Acquisition date and purchase price (if applicable) 
- Previous owners 
- Whether original management continued post-acquisition 
Format as clear bullet points.`,

        // ...existing code...
        leadership: `Provide the top 5 executives at ${companyName} as a JSON array. Each object must have:
- name: Full name of the executive
- title: Current job title
- background: One-sentence summary of their background (previous role, major qualification, or relevant experience)

Example format:
[
  {"name": "John Smith", "title": "Chief Executive Officer", "background": "Former VP at Company X with 20 years in manufacturing"},
  {"name": "Jane Doe", "title": "Chief Financial Officer", "background": "Previously CFO at Fortune 500 company"}
]

Return exactly 5 executives if available, fewer if the company has less.`,

        governance: `Provide ${companyName}'s governance structure as a JSON object with a "bodies" array. Each item should be a detailed description of a governance body.

Include:
- Board of Directors (with key member names if publicly available)
- Supervisory Board (if applicable)
- Executive Committee
- Audit Committee
- Any other significant governance bodies

Format each entry as: "Body Name: Key members/description"

Example format:
{
  "bodies": [
    "Board of Directors: John Smith (Chairman), Jane Doe, Michael Johnson",
    "Audit Committee: Sarah Williams (Chair), Robert Brown",
    "Executive Committee: 5 senior executives overseeing operations"
  ]
}

If specific member names are not publicly available, describe the body's composition (e.g., "Board of Directors: 7 independent members, 2 executive members"). Include up to 5-7 governance bodies.`,
        // ...existing code...

        products: `Provide ${companyName}'s product and service portfolio as a JSON array. Each object should have:
- category: The product category name (e.g., "Industrial Equipment", "Software Solutions")
- items: A comma-separated string of products/services in that category

Example format:
[
  {"category": "Industrial Equipment", "items": "Product A, Product B, Product C"},
  {"category": "Software Solutions", "items": "Product X, Product Y"}
]

Include all major product lines, brands, and service offerings organized by logical categories.`,

        // ...existing code...
        operations: `Provide ${companyName}'s operational presence as a JSON array. Each object should have:
- country: The country name
- facilities: Description of facility types and operations (manufacturing, distribution, offices, R&D, etc.)

Example format:
[
  {"country": "Germany", "facilities": "Manufacturing plants, R&D centers, corporate headquarters"},
  {"country": "United States", "facilities": "Distribution centers, sales offices"},
  {"country": "China", "facilities": "Manufacturing facilities, regional office"}
]

Include all countries where the company has significant operations. List 5-10 major locations.`,
        // ...existing code...

        // ...existing code...
        financials: `Provide ${companyName}'s financial metrics for the most recent 5 fiscal years as a JSON array. Each object should have:
- year: The fiscal year
- revenue: Total revenue with currency
- operatingProfit: Operating profit figure
- netProfit: Net profit figure
- operatingMargin: Operating margin as percentage
- freeCashFlow: Free cash flow figure
- debt: Total debt figure
- citations: Full URLs of sources used (comma-separated if multiple)

Example format:
[
  {
    "year": "2023",
    "revenue": "€5.97 billion",
    "operatingProfit": "€1.62 billion",
    "netProfit": "€1.24 billion",
    "operatingMargin": "27.1%",
    "freeCashFlow": "€1.02 billion",
    "debt": "€500 million",
    "citations": "https://company.com/investor-relations/annual-report-2023"
  }
]

Use actual figures only. If a metric is unavailable, write "N/A". Include full source URLs in citations field.`,

        competitors: `List the top 5-7 direct competitors of ${companyName} as a JSON array. Each object should have:
- name: Full company name
- focusAreas: Primary differentiation or competitive focus (3-6 words)

Example format:
[
  {"name": "Competitor A", "focusAreas": "Premium segment, innovation focus"},
  {"name": "Competitor B", "focusAreas": "Cost leadership, mass market"},
  {"name": "Competitor C", "focusAreas": "Specialty products, niche markets"}
]

Include 5-7 competitors with their key competitive positioning.`,
        // ...existing code...

        profitability: `Provide ${companyName}'s most recent annual profitability metrics (latest fiscal year). Include: 
- Total revenue (with currency) 
- Operating profit 
- Net profit 
- Operating margin (%) 
- Net margin (%) 
Respond with figures only, no commentary.`,

        improvements: `List ${companyName}'s recent operational improvement initiatives across 5 categories. For each category, provide 2–3 concrete initiatives: 
1. Cost reduction programs 
2. Portfolio optimization/divestments 
3. Pricing & revenue strategies 
4. Innovation & R&D investments 
5. Post-acquisition integration efforts 
Format as a structured list under each category.`,
    };

    await Promise.all(
        Object.entries(prompts).map(async ([key, prompt]) => {
            try {
                const parsed = await request(prompt, key as keyof CompanyData);

                if (key === 'financials' && Array.isArray(parsed)) {
                    result[key] = cleanFinancials(parsed);
                } else {
                    result[key] = parsed;
                }
            } catch (err) {
                console.error(`${key} failed:`, err);
            }
        })
    );
    return result;
}

export default fetchAllData;
