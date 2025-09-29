import { CompanyData } from "@/types/bid";
import { CompanyDataSchema } from "@/types/CompanyDataScheme";

async function request(content: string, key: keyof CompanyData) {
    if (key === "analysis" || key === "followUp") {
        return {}; 
    }
    console.log("Requesting", import.meta.env);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${import.meta.env.VITE_PERPLEXITY_API_KEY}`);
    myHeaders.append("Content-Type", "application/json");
    const properties = CompanyDataSchema[key];
    const baseBody = {
        "model": "sonar",
        "messages": [
        {
            "role": "user", 
            "content": content
        }
        ],
        "response_format": {
        "type": "json_schema",
        "json_schema": {
            "schema": properties
        }
        }
    } 
    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(baseBody),
    redirect: 'follow' as RequestRedirect
    };
    const response = await fetch('https://api.perplexity.ai/chat/completions', requestOptions);

    if (!response.ok) throw new Error(`Request failed ${response.status}`);
    const data = await response.json();
    const contentStr = data?.choices?.[0]?.message?.content ?? "{}";
    return JSON.parse(contentStr)
}

function cleanFinancials(raw: any[]): CompanyData["financials"] {
  return raw.map(row => ({
    year: row.year.replace(/;.*$/, "").trim(), // remove CSS junk
    revenue: row.revenue.replace(/^.*?:\s*/, ""), // remove prefix like "2021:"
    operatingProfit: row.operatingProfit.replace(/^.*?:\s*/, ""),
    netProfit: row.netProfit.replace(/^.*?:\s*/, ""),
    operatingMargin: row.operatingMargin.replace(/^.*?:\s*/, ""),
    freeCashFlow: row.freeCashFlow.replace(/^.*?:\s*/, ""),
    debt: row.debt.replace(/^.*?:\s*/, "")
  }));
}


async function fetchAllData(companyName: string) {
    const result: Partial<CompanyData> = {};
    const prompts = {
    overview: `Provide a concise company profile for ${companyName}: 1-2 sentence business description, founding year, current ownership structure, approximate employee count, geographic presence/markets served, and primary business model. Format as brief factual statements.`,
    
    ownership: `Detail ${companyName}'s ownership: current parent company/owner, acquisition date and purchase price (if applicable), previous owner, and whether original management remained post-acquisition. Keep each point to one sentence.`,
    
    leadership: `List the top 5 executives at ${companyName} with: full name, current title, and 1-sentence background highlighting previous role or key qualification. Present as a structured list.`,
    
    governance: `List the top 5 most important governing bodies at ${companyName} (e.g., Board of Directors, Executive Committee, Supervisory Board, Audit Committee). Provide only the names/types of these bodies, one per line. If fewer than 5 exist, list only what exists. If no governance information is publicly available, respond with "Not available". Do not provide definitions or explanations.`,
    
    products: `Categorize ${companyName}'s product portfolio into 3-5 main categories, listing 2-3 flagship products or product lines per category. Use format: Category: Product1, Product2, Product3.`,
    
    operations: `List countries where ${companyName} has significant operations, specifying facility types (manufacturing plants, distribution centers, offices, R&D facilities) in each location. One line per country.`,
    
    financials: `Provide ${companyName}'s financial metrics for the most recent 5 fiscal years in tabular format: Year, Revenue (with currency), Operating Profit, Net Profit, Operating Margin (%), Free Cash Flow, Total Debt. Use actual figures only. For each unavailable metric, write "N/A" in that cell. If no financial data exists at all, respond with only "Not available". Do not include any explanatory text, jurisdictional clarifications, or data source notes.`,
    
    competitors: `Identify ${companyName}'s top 5-7 direct competitors, noting each competitor's primary competitive focus or differentiation in one brief phrase (e.g., "premium segment," "cost leadership," "innovation focus").`,
    
    profitability: `State ${companyName}'s most recent annual profitability metrics: total revenue, operating profit, net profit (all with currency), operating margin percentage, and net margin percentage. Use latest fiscal year data.`,
    
    improvements: `Identify specific operational improvement initiatives at ${companyName} across: (1) Cost reduction programs, (2) Portfolio optimization/divestments, (3) Pricing and revenue strategies, (4) Innovation/R&D investments, (5) Post-acquisition integration efforts. List 2-3 concrete initiatives per category.`
    };
    await Promise.all(
        Object.entries(prompts).map(async ([key, prompt]) => {
            try {
            const parsed = await request(prompt, key as keyof CompanyData);

            if (key === "financials" && Array.isArray(parsed)) {
                result[key] = cleanFinancials(parsed);
            } else {
                result[key] = parsed;
            }
            } catch (err) {
                console.error(`${key} failed:`, err);
            }
        })
    );
    console.log("Final result:", result);
    return result;
}

export default fetchAllData;