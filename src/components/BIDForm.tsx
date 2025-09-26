import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
import { CompanyData } from "@/types/bid";
import { buttonVariants } from "@/components/ui/button-variants";

interface BIDFormProps {
  onDataChange: (data: CompanyData) => void;
  onPreview: () => void;
}

export function BIDForm({ onDataChange, onPreview }: BIDFormProps) {
  const [data, setData] = useState<CompanyData>({
    companyName: "Valeo Foods",
    date: "August 2025",
    overview: {
      description: "Valeo Foods is a major international food company headquartered in Dublin, Ireland",
      founded: "2010, through the merger of Batchelors and Origin Foods",
      ownership: "Acquired by Bain Capital in 2021",
      employees: "Over 6,000 globally",
      reach: "Products sold in over 100 countries",
      businessModel: "Focused on acquiring and growing heritage food brands across Europe"
    },
    ownership: {
      currentOwner: "Bain Capital Private Equity acquired Valeo Foods in May 2021 from CapVest Partners LLP for over €1.7 billion",
      previousOwner: "CapVest, a private equity firm, had built Valeo Foods through strategic acquisitions and held ownership until the Bain Capital deal",
      acquisitionDetails: "May 2021 acquisition for over €1.7 billion",
      managementContinuity: "Seamus Kearney, the Group CEO at the time of acquisition, continued to lead the business under Bain Capital's ownership"
    },
    leadership: [
      { name: "Ronald Kers", title: "Group Chief Executive", background: "with prior leadership roles at Müller Group and 2 Sisters Food Group" },
      { name: "Louis-François Gombert", title: "Chief Financial Officer", background: "formerly with Suntory Beverage & Food and HAVEA Group" },
      { name: "Eveline Paternotte", title: "Chief People Officer", background: "with HR leadership experience at PepsiCo and SABMiller" },
      { name: "Thibaut Eissautier", title: "Chief Procurement Officer", background: "previously at Diageo and Pladis" },
      { name: "Avanti Patel", title: "Group Head of M&A", background: "leading global acquisitions" },
      { name: "Jorg Brouwer", title: "Group Commercial Director", background: "with a background at Unilever and Nomad Foods" }
    ],
    governance: {
      bodies: [
        "Corporate governance is overseen by:",
        "A Board of Directors and an Executive Committee", 
        "These bodies support strategic direction and ensure transparent financial communication"
      ]
    },
    products: [
      { category: "Snacks & Confectionery", items: "Kettle Chips, Barratt sweets, Tangerine Confectionery" },
      { category: "Biscuits & Bakery", items: "Jacob's, Balconi, Melegatti (panettone, pandoro), Dolciaria Freddi" },
      { category: "Honey", items: "Rowse Honey (UK market leader)" },
      { category: "Canned Goods", items: "Batchelors (beans, peas, pulses)" },
      { category: "Baking Ingredients", items: "Odlums (flour), Shamrock (nuts, dried fruit, sugar)" },
      { category: "Condiments & Preserves", items: "Chef sauces, Fruitfield marmalade" },
      { category: "Mediterranean Foods", items: "Roma (pasta, rice, canned tomatoes)" },
      { category: "Hot Beverages", items: "Robert Roberts (coffee and tea), Lavazza (distribution partner)" },
      { category: "Healthy & Organic Foods", items: "Kelkin (cereal, snacks)" }
    ],
    operations: [
      { country: "Ireland", facilities: "HQ in Dublin, 4 manufacturing sites" },
      { country: "United Kingdom", facilities: "12 manufacturing & distribution sites" },
      { country: "Italy", facilities: "HQ in Milan, 3 manufacturing sites" },
      { country: "Germany", facilities: "3 manufacturing sites" },
      { country: "Czech Republic", facilities: "2 manufacturing sites" },
      { country: "Netherlands", facilities: "1 manufacturing site" },
      { country: "Canada", facilities: "1 manufacturing site" }
    ],
    financials: [
      { year: "2023", revenue: "€1.39 billion", operatingProfit: "€53 million (↓ from €90.6m)", netProfit: "€34.4 million loss", operatingMargin: "Not disclosed", freeCashFlow: "Not disclosed", debt: "Not disclosed" },
      { year: "2024", revenue: "Not yet disclosed", operatingProfit: "Recovery and profitability goals achieved", netProfit: "Profitability restored", operatingMargin: "Not disclosed", freeCashFlow: "€481 million after restructuring", debt: "Net debt reduced to €3.81 billion" },
      { year: "2025 (H1)", revenue: "Not yet disclosed", operatingProfit: "Operating margin: 4.5%", netProfit: "Net income: €104 million", operatingMargin: "4.5%", freeCashFlow: "€252 million after restructuring", debt: "Net debt: €4.18 billion (currency impact)" }
    ],
    competitors: [
      { name: "Nestlé", focusAreas: "Confectionery, dairy, beverages, cereals" },
      { name: "PepsiCo", focusAreas: "Snacks (Lay's, Doritos), beverages" },
      { name: "Danone", focusAreas: "Dairy, plant-based, nutrition" },
      { name: "Kraft Heinz", focusAreas: "Sauces, canned goods, snacks" },
      { name: "General Mills", focusAreas: "Cereals, baking, snacks" },
      { name: "Conagra Brands", focusAreas: "Packaged foods, frozen meals" }
    ],
    profitability: {
      annualRevenue: "€1.39 billion (≈ $1.5 billion)",
      operatingProfit: "€31.13 million (↓ 57% YoY)",
      netProfit: "Pre-tax loss of €41.28 million",
      operatingMargin: "~2.2%",
      netMargin: "Negative"
    },
    improvements: {
      costReduction: [
        "Streamline manufacturing across its 27 factories to reduce duplication and overhead",
        "Automate production and logistics where feasible", 
        "Cut administrative costs and optimize back-office functions"
      ],
      portfolioOptimization: [
        "Divest low-margin brands or underperforming business units",
        "Focus on premium and high-growth categories like health snacks, plant-based foods, and gourmet products",
        "Rationalize SKUs to reduce complexity and improve supply chain efficiency"
      ],
      pricingRevenue: [
        "Implement dynamic pricing strategies to respond to inflation and input cost volatility",
        "Renegotiate supplier contracts and improve terms with retailers",
        "Introduce value-added products that command higher margins"
      ],
      innovation: [
        "Invest in R&D for differentiated products with better profitability",
        "Leverage iconic brands like Rowse Honey and Kettle Chips to expand into new markets",
        "Enhance marketing to build pricing power and customer loyalty"
      ],
      integrationDiscipline: [
        "Ensure synergy realization from acquired companies",
        "Avoid overpaying for targets and limit exceptional costs during integration",
        "Focus on cultural and operational alignment to accelerate margin recovery"
      ]
    },
    analysis: {
      preMeeting: {
        dissatisfaction: ["Current profitability challenges", "Integration complexity"],
        levers: ["Portfolio optimization", "Operational efficiency"]
      },
      duringMeeting: {
        dissatisfaction: ["To be discussed"],
        levers: ["To be identified"]
      }
    },
    followUp: [
      { action: "Finalize cost reduction strategy", who: "CFO", when: "End of Q3", zoho: "TBD" },
      { action: "Portfolio review completion", who: "Strategy Team", when: "Q4 2025", zoho: "TBD" }
    ]
  });

  const updateData = (path: string, value: any) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(data));
    
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setData(newData);
    onDataChange(newData);
  };

  const addArrayItem = (path: string, item: any) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(data));
    
    let current = newData;
    for (const key of keys) {
      current = current[key];
    }
    current.push(item);
    
    setData(newData);
    onDataChange(newData);
  };

  const removeArrayItem = (path: string, index: number) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(data));
    
    let current = newData;
    for (const key of keys) {
      current = current[key];
    }
    current.splice(index, 1);
    
    setData(newData);
    onDataChange(newData);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-6 h-3 bg-efeso-orange rounded"></div>
            EFESO Business Intelligence Deck Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="structure">Structure</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={data.companyName}
                    onChange={(e) => updateData('companyName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    value={data.date}
                    onChange={(e) => updateData('date', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  value={data.overview.description}
                  onChange={(e) => updateData('overview.description', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="founded">Founded</Label>
                  <Input
                    id="founded"
                    value={data.overview.founded}
                    onChange={(e) => updateData('overview.founded', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="employees">Employees</Label>
                  <Input
                    id="employees"
                    value={data.overview.employees}
                    onChange={(e) => updateData('overview.employees', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="structure" className="space-y-6 mt-6">
              <div>
                <Label>Leadership Team</Label>
                <div className="space-y-4 mt-2">
                  {data.leadership.map((leader, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        <Input
                          placeholder="Name"
                          value={leader.name}
                          onChange={(e) => updateData(`leadership.${index}.name`, e.target.value)}
                        />
                        <Input
                          placeholder="Title"
                          value={leader.title}
                          onChange={(e) => updateData(`leadership.${index}.title`, e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Background"
                            value={leader.background}
                            onChange={(e) => updateData(`leadership.${index}.background`, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('leadership', index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addArrayItem('leadership', { name: '', title: '', background: '' })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Leader
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="operations" className="space-y-6 mt-6">
              <div>
                <Label>Products & Services</Label>
                <div className="space-y-4 mt-2">
                  {data.products.map((product, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Category"
                          value={product.category}
                          onChange={(e) => updateData(`products.${index}.category`, e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Items"
                            value={product.items}
                            onChange={(e) => updateData(`products.${index}.items`, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('products', index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addArrayItem('products', { category: '', items: '' })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product Category
                  </Button>
                </div>
              </div>

              <div>
                <Label>Geographic Operations</Label>
                <div className="space-y-4 mt-2">
                  {data.operations.map((operation, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Country"
                          value={operation.country}
                          onChange={(e) => updateData(`operations.${index}.country`, e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Facilities"
                            value={operation.facilities}
                            onChange={(e) => updateData(`operations.${index}.facilities`, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('operations', index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addArrayItem('operations', { country: '', facilities: '' })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Operation
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="financials" className="space-y-6 mt-6">
              <div>
                <Label>Competitors</Label>
                <div className="space-y-4 mt-2">
                  {data.competitors.map((competitor, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Company Name"
                          value={competitor.name}
                          onChange={(e) => updateData(`competitors.${index}.name`, e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Focus Areas"
                            value={competitor.focusAreas}
                            onChange={(e) => updateData(`competitors.${index}.focusAreas`, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('competitors', index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addArrayItem('competitors', { name: '', focusAreas: '' })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Competitor
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6 mt-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label>Cost Reduction Strategies</Label>
                  <div className="space-y-2 mt-2">
                    {data.improvements.costReduction.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Textarea
                          value={item}
                          onChange={(e) => {
                            const newItems = [...data.improvements.costReduction];
                            newItems[index] = e.target.value;
                            updateData('improvements.costReduction', newItems);
                          }}
                          rows={2}
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newItems = data.improvements.costReduction.filter((_, i) => i !== index);
                            updateData('improvements.costReduction', newItems);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newItems = [...data.improvements.costReduction, ''];
                        updateData('improvements.costReduction', newItems);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Strategy
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Innovation Opportunities</Label>
                  <div className="space-y-2 mt-2">
                    {data.improvements.innovation.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Textarea
                          value={item}
                          onChange={(e) => {
                            const newItems = [...data.improvements.innovation];
                            newItems[index] = e.target.value;
                            updateData('improvements.innovation', newItems);
                          }}
                          rows={2}
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newItems = data.improvements.innovation.filter((_, i) => i !== index);
                            updateData('improvements.innovation', newItems);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newItems = [...data.improvements.innovation, ''];
                        updateData('improvements.innovation', newItems);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Opportunity
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-8">
            <Button 
              onClick={onPreview}
              className={buttonVariants({ variant: "efeso", size: "lg" })}
            >
              Preview Presentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}