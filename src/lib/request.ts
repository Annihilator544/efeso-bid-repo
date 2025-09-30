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

        leadership: `List the top 5 executives at ${companyName}. For each executive provide: 
- Full name 
- Current title 
- One-sentence background (previous role, major qualification, or relevant experience). 
Present as a numbered list.`,

        governance: `Identify up to 5 key governance bodies at ${companyName} (e.g., Board of Directors, Supervisory Board, Executive Committee, Audit Committee). 
- List only the official names/types of these bodies, one per line. 
- If fewer than 5 exist, list what is available. 
- If no data is available, respond with "Not available". 
Do not explain or define their functions.`,

        products: `Provide an overview of ${companyName}'s product and service portfolio. 
- Complete product and service catalog organized by category
   - Product lines, brands, and offerings
   - Market positioning for each product category
Use the format: 
Category – General category description: Product1, Product2, Product3.`,

        operations: `List countries where ${companyName} has significant operations. For each country specify :
        - Global footprint and market presence
   - Facility locations by type (manufacturing, distribution, offices, R&D)
   - Regional revenue distribution. 
Provide one line per country in the format: 
Country – Facility Types.`,

        financials: `Provide ${companyName}'s financial metrics for the most recent 5 fiscal years in a table with columns: Year, Revenue (with currency), Operating Profit, Net Profit, Operating Margin (%), Free Cash Flow, Total Debt. 
- Use actual figures only 
- If a metric is unavailable, write "N/A" 
- If no financial data exists at all, respond only with "Not available" 
Do not include explanations or commentary.`,

        competitors: `List the top 5–7 direct competitors of ${companyName}. For each competitor, include its primary differentiation or competitive focus in 3–6 words (e.g., "premium segment," "cost leadership," "innovation focus"). 
Present as a structured list.`,

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
