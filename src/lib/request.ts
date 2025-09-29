import { CompanyData } from "@/types/bid";
import { CompanyDataSchema } from "@/types/CompanyDataScheme";

async function request(content: string, key: keyof CompanyData) {
    if (key === "analysis" || key === "followUp") {
        return {}; 
    }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer ");
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
    const content = {
        overview: `Fetch the company overview for ${companyName}, including description, founding year, ownership, employee count, global reach, and business model`,
        ownership: `Fetch the ownership details for ${companyName}, including current owner, acquisition details, previous owner, and management continuity`,
        leadership: `Fetch the top 5 leadership team for ${companyName}, including names, titles, and backgrounds`,
        governance: `Fetch the governance structure for ${companyName}, including governing bodies`,
        products: `Fetch the product portfolio for ${companyName}, including product categories and key products`,
        operations: `Fetch the global operations for ${companyName}, including countries of operation and facilities`,
        financials: `Fetch the financial performance for ${companyName} over the past 5 years, including revenue, operating profit, net profit, operating margin, free cash flow, and debt levels`,
        competitors: `Fetch the key competitors for ${companyName}, including names and focus areas`,
        profitability: `Fetch the profitability metrics for ${companyName}, including annual revenue, operating profit, net profit, operating margin, and net margin`,
        improvements: `Fetch the improvement initiatives for ${companyName}, including cost reduction efforts, efficiency programs, and strategic investments`
    }
    await Promise.all(
        Object.entries(content).map(async ([key, prompt]) => {
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