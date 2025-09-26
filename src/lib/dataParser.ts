import { CompanyData } from '../types/bid';
import { questionMappings, getQuestionById } from './questionMapping';

export interface ParsedRow {
  questionId?: string;
  question?: string;
  answer?: string;
  [key: string]: any;
}

export function parseUploadedData(rows: ParsedRow[]): Partial<CompanyData> {
  const result: any = {};

  // Initialize nested objects
  result.overview = {};
  result.ownership = {};
  result.profitability = {};
  result.improvements = {
    costReduction: [],
    portfolioOptimization: [],
    pricingRevenue: [],
    innovation: [],
    integrationDiscipline: []
  };
  result.analysis = {
    preMeeting: { dissatisfaction: [], levers: [] },
    duringMeeting: { dissatisfaction: [], levers: [] }
  };
  result.leadership = [];
  result.products = [];
  result.operations = [];
  result.financials = [];
  result.competitors = [];
  result.followUp = [];

  rows.forEach(row => {
    let questionId = row.questionId || row['Question ID'] || row['QuestionID'];
    let answer = row.answer || row['Answer'] || row['Response'];

    if (!questionId || !answer) return;

    // Clean up questionId
    questionId = questionId.toString().trim().toUpperCase();
    if (!questionId.startsWith('Q')) {
      questionId = 'Q' + questionId.padStart(3, '0');
    }

    const mapping = getQuestionById(questionId);
    if (!mapping) {
      console.warn(`No mapping found for question ID: ${questionId}`);
      return;
    }

    const value = answer.toString().trim();
    if (!value) return;

    setNestedValue(result, mapping.dataPath, value, mapping);
  });

  return result;
}

function setNestedValue(obj: any, path: string, value: string, mapping: any) {
  const keys = path.split('.');
  let current = obj;

  // Navigate to the parent object
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }

  const finalKey = keys[keys.length - 1];

  if (mapping.type === 'array') {
    if (mapping.arrayItemStructure) {
      // Parse structured array items (e.g., "John Doe|CEO|20 years experience")
      const items = value.split('|').map(item => item.trim()).filter(item => item);
      const structuredItems = [];
      
      const structureKeys = Object.keys(mapping.arrayItemStructure);
      for (let i = 0; i < items.length; i += structureKeys.length) {
        const itemObj: any = {};
        structureKeys.forEach((key, index) => {
          if (items[i + index]) {
            itemObj[key] = items[i + index].trim();
          }
        });
        if (Object.keys(itemObj).length > 0) {
          structuredItems.push(itemObj);
        }
      }
      current[finalKey] = structuredItems;
    } else {
      // Simple array (split by |)
      current[finalKey] = value.split('|').map(item => item.trim()).filter(item => item);
    }
  } else {
    current[finalKey] = value;
  }
}

export function generateTemplateData(): ParsedRow[] {
  return questionMappings.map(mapping => ({
    questionId: mapping.questionId,
    question: mapping.question,
    answer: getExampleAnswer(mapping)
  }));
}

function getExampleAnswer(mapping: any): string {
  switch (mapping.questionId) {
    case 'Q001': return 'Valeo Foods';
    case 'Q002': return 'September 2024';
    case 'Q003': return 'Leading European food manufacturer specializing in ambient grocery products';
    case 'Q013': return 'John Smith|CEO|Former P&G executive with 15 years experience|Jane Doe|CFO|Ex-Unilever finance director';
    case 'Q014': return 'Ambient Foods|Biscuits, crackers, snacks|Dairy Products|Milk, cheese, yogurt';
    case 'Q016': return '2023|€2.1B|€180M|€120M|8.6%|€95M|€450M|2022|€1.9B|€160M|€100M|8.4%|€80M|€500M';
    default: return 'Example answer for ' + mapping.question;
  }
}