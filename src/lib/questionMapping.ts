export interface QuestionMapping {
  questionId: string;
  question: string;
  dataPath: string;
  type: 'string' | 'array' | 'object';
  arrayItemStructure?: Record<string, string>;
}

export const questionMappings: QuestionMapping[] = [
  // Basic Info
  { questionId: "Q001", question: "What is the company name?", dataPath: "companyName", type: "string" },
  { questionId: "Q002", question: "What is the current date (Month YYYY)?", dataPath: "date", type: "string" },
  
  // Overview
  { questionId: "Q003", question: "Provide a company description", dataPath: "overview.description", type: "string" },
  { questionId: "Q004", question: "When was the company founded?", dataPath: "overview.founded", type: "string" },
  { questionId: "Q005", question: "What is the ownership structure?", dataPath: "overview.ownership", type: "string" },
  { questionId: "Q006", question: "How many employees does the company have?", dataPath: "overview.employees", type: "string" },
  { questionId: "Q007", question: "What is the company's global reach?", dataPath: "overview.reach", type: "string" },
  { questionId: "Q008", question: "What is the business model?", dataPath: "overview.businessModel", type: "string" },
  
  // Ownership
  { questionId: "Q009", question: "Who is the current owner?", dataPath: "ownership.currentOwner", type: "string" },
  { questionId: "Q010", question: "What are the acquisition details?", dataPath: "ownership.acquisitionDetails", type: "string" },
  { questionId: "Q011", question: "Who was the previous owner?", dataPath: "ownership.previousOwner", type: "string" },
  { questionId: "Q012", question: "What is the management continuity status?", dataPath: "ownership.managementContinuity", type: "string" },
  
  // Leadership (array items)
  { questionId: "Q013", question: "List leadership team members (Name|Title|Background)", dataPath: "leadership", type: "array", arrayItemStructure: { name: "Name", title: "Title", background: "Background" } },
  
  // Products (array items)
  { questionId: "Q014", question: "List product categories and items (Category|Items)", dataPath: "products", type: "array", arrayItemStructure: { category: "Category", items: "Items" } },
  
  // Operations (array items)
  { questionId: "Q015", question: "List countries and facilities (Country|Facilities)", dataPath: "operations", type: "array", arrayItemStructure: { country: "Country", facilities: "Facilities" } },
  
  // Financials (array items)
  { questionId: "Q016", question: "List financial data (Year|Revenue|Operating Profit|Net Profit|Operating Margin|Free Cash Flow|Debt)", dataPath: "financials", type: "array", arrayItemStructure: { year: "Year", revenue: "Revenue", operatingProfit: "Operating Profit", netProfit: "Net Profit", operatingMargin: "Operating Margin", freeCashFlow: "Free Cash Flow", debt: "Debt" } },
  
  // Competitors (array items)
  { questionId: "Q017", question: "List competitors (Name|Focus Areas)", dataPath: "competitors", type: "array", arrayItemStructure: { name: "Name", focusAreas: "Focus Areas" } },
  
  // Profitability
  { questionId: "Q018", question: "What is the annual revenue?", dataPath: "profitability.annualRevenue", type: "string" },
  { questionId: "Q019", question: "What is the operating profit?", dataPath: "profitability.operatingProfit", type: "string" },
  { questionId: "Q020", question: "What is the net profit?", dataPath: "profitability.netProfit", type: "string" },
  { questionId: "Q021", question: "What is the operating margin?", dataPath: "profitability.operatingMargin", type: "string" },
  { questionId: "Q022", question: "What is the net margin?", dataPath: "profitability.netMargin", type: "string" },
  
  // Improvements
  { questionId: "Q023", question: "List cost reduction opportunities (separate by |)", dataPath: "improvements.costReduction", type: "array" },
  { questionId: "Q024", question: "List portfolio optimization opportunities (separate by |)", dataPath: "improvements.portfolioOptimization", type: "array" },
  { questionId: "Q025", question: "List pricing & revenue opportunities (separate by |)", dataPath: "improvements.pricingRevenue", type: "array" },
  { questionId: "Q026", question: "List innovation opportunities (separate by |)", dataPath: "improvements.innovation", type: "array" },
  { questionId: "Q027", question: "List integration discipline opportunities (separate by |)", dataPath: "improvements.integrationDiscipline", type: "array" },
  
  // Analysis
  { questionId: "Q028", question: "List pre-meeting dissatisfaction elements (separate by |)", dataPath: "analysis.preMeeting.dissatisfaction", type: "array" },
  { questionId: "Q029", question: "List pre-meeting EFESO levers (separate by |)", dataPath: "analysis.preMeeting.levers", type: "array" },
  { questionId: "Q030", question: "List during-meeting dissatisfaction elements (separate by |)", dataPath: "analysis.duringMeeting.dissatisfaction", type: "array" },
  { questionId: "Q031", question: "List during-meeting EFESO levers (separate by |)", dataPath: "analysis.duringMeeting.levers", type: "array" },
  
  // Follow-up (array items)
  { questionId: "Q032", question: "List follow-up actions (Action|Who|When|Zoho)", dataPath: "followUp", type: "array", arrayItemStructure: { action: "Action", who: "Who", when: "When", zoho: "Zoho" } },
];

export function getQuestionById(questionId: string): QuestionMapping | undefined {
  return questionMappings.find(q => q.questionId === questionId);
}

export function getMappingByDataPath(dataPath: string): QuestionMapping | undefined {
  return questionMappings.find(q => q.dataPath === dataPath);
}