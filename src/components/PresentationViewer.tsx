import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, Square, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { SlideLayout } from "@/components/SlideLayout";
import { PresentationTable } from "@/components/PresentationTable";
import { CompanyData } from "@/types/bid";

interface PresentationViewerProps {
  data: CompanyData;
}

export function PresentationViewer({ data }: PresentationViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const slides = [
    // Slide 1: Title
    {
      id: 1,
      title: "",
      type: "title" as const,
      content: (
        <SlideLayout isTitle slideNumber={1} totalSlides={14}>
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-presentation-header">
                {data.companyName}
              </h1>
              <h2 className="text-2xl text-gray-600">
                Business Intelligence Deck (BID)
              </h2>
            </div>
            
            <div className="text-lg text-gray-500">
              {data.date}
            </div>
            
            <div className="flex justify-between items-end mt-16">
              <div className="text-left">
                <div className="font-semibold text-gray-700">Company Logo</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-4 bg-efeso-orange"></div>
                <div className="text-right">
                  <div className="font-bold text-xl">EFESO</div>
                  <div className="text-sm text-gray-600">MANAGEMENT CONSULTANTS</div>
                </div>
              </div>
            </div>
          </div>
        </SlideLayout>
      )
    },
    
    // Slide 2: Who are they?
    {
      id: 2,
      title: `Who are ${data.companyName}?`,
      type: "bullets" as const,
      content: (
        <SlideLayout title={`Who are ${data.companyName}?`} slideNumber={2} totalSlides={14}>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-efeso-orange rounded-full mt-3 flex-shrink-0"></div>
              <span>{data.overview.description}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-efeso-orange rounded-full mt-3 flex-shrink-0"></div>
              <span>Founded: {data.overview.founded}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-efeso-orange rounded-full mt-3 flex-shrink-0"></div>
              <span>Ownership: {data.overview.ownership}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-efeso-orange rounded-full mt-3 flex-shrink-0"></div>
              <span>Employees: {data.overview.employees}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-efeso-orange rounded-full mt-3 flex-shrink-0"></div>
              <span>Reach: {data.overview.reach}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-efeso-orange rounded-full mt-3 flex-shrink-0"></div>
              <span>Business Model: {data.overview.businessModel}</span>
            </li>
          </ul>
        </SlideLayout>
      )
    },
    
    // Slide 3: Ownership
    {
      id: 3,
      title: `What is ${data.companyName} ownership?`,
      type: "bullets" as const,
      content: (
        <SlideLayout title={`What is ${data.companyName} ownership?`} slideNumber={3} totalSlides={14}>
          <ul className="space-y-6 text-lg">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-efeso-orange rounded-full mt-3 flex-shrink-0"></div>
              <span><strong>Current Owner:</strong> {data.ownership.currentOwner}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-efeso-orange rounded-full mt-3 flex-shrink-0"></div>
              <span><strong>Previous Owner:</strong> {data.ownership.previousOwner}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-efeso-orange rounded-full mt-3 flex-shrink-0"></div>
              <span><strong>Management Continuity:</strong> {data.ownership.managementContinuity}</span>
            </li>
          </ul>
        </SlideLayout>
      )
    },
    
    // Slide 4: Corporate Structure
    {
      id: 4,
      title: `What are ${data.companyName} Corporate structure?`,
      type: "bullets" as const,
      content: (
        <SlideLayout title={`What are ${data.companyName} Corporate structure?`} slideNumber={4} totalSlides={14}>
          <div className="space-y-8">
            <div>
              <p className="text-lg mb-6">
                {data.companyName} is led by a <strong>Group Executive Team</strong> composed of seasoned professionals from the food and beverage industry:
              </p>
              <ul className="space-y-4 text-base">
                {data.leadership.map((leader, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-efeso-orange rounded-full mt-3 flex-shrink-0"></div>
                    <span><strong>{leader.name}</strong> – {leader.title}, {leader.background}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-presentation-header mb-4">Governance Structure</h3>
              <ul className="space-y-3 text-base">
                {data.governance.bodies.map((body, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-efeso-orange rounded-full mt-3 flex-shrink-0"></div>
                    <span>{body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SlideLayout>
      )
    },
    
    // Slide 5: Products/Services
    {
      id: 5,
      title: `What do ${data.companyName} Make?`,
      type: "bullets" as const,
      content: (
        <SlideLayout title={`What do ${data.companyName} Make?`} slideNumber={5} totalSlides={14}>
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              {data.companyName} produces a wide range of branded food and beverage products, including:
            </p>
            <ul className="space-y-4 text-base">
              {data.products.map((product, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-efeso-orange rounded-full mt-3 flex-shrink-0"></div>
                  <span><strong>{product.category}:</strong> {product.items}</span>
                </li>
              ))}
            </ul>
          </div>
        </SlideLayout>
      )
    },
    
    // Slide 6: Geographic Operations
    {
      id: 6,
      title: `Where do ${data.companyName} operate?`,
      type: "table" as const,
      content: (
        <SlideLayout title={`Where do ${data.companyName} operate?`} slideNumber={6} totalSlides={14}>
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              {data.companyName} has a strong manufacturing and distribution footprint:
            </p>
            <PresentationTable
              headers={["Country", "Facilities"]}
              rows={data.operations.map(op => [op.country, op.facilities])}
            />
          </div>
        </SlideLayout>
      )
    },
    
    // Slide 7: Financial Performance
    {
      id: 7,
      title: `What is ${data.companyName} financial performance?`,
      type: "table" as const,
      content: (
        <SlideLayout title={`What is ${data.companyName} financial performance?`} slideNumber={7} totalSlides={14}>
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Financial performance over recent years:
            </p>
            <PresentationTable
              headers={["Year", "Revenue", "Operating Profit", "Net Profit", "Operating Margin", "Free Cash Flow", "Debt"]}
              rows={data.financials.map(fin => [
                fin.year, fin.revenue, fin.operatingProfit, fin.netProfit, fin.operatingMargin, fin.freeCashFlow, fin.debt
              ])}
            />
          </div>
        </SlideLayout>
      )
    },
    
    // Slide 8: Competitors
    {
      id: 8,
      title: `Who are ${data.companyName} competitors?`,
      type: "table" as const,
      content: (
        <SlideLayout title={`Who are ${data.companyName} competitors?`} slideNumber={8} totalSlides={14}>
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Key competitors in the market:
            </p>
            <PresentationTable
              headers={["Competitor", "Focus Areas"]}
              rows={data.competitors.map(comp => [comp.name, comp.focusAreas])}
            />
          </div>
        </SlideLayout>
      )
    },
    
    // Slide 9: Profitability Analysis
    {
      id: 9,
      title: `How profitable is ${data.companyName}?`,
      type: "table" as const,
      content: (
        <SlideLayout title={`How profitable is ${data.companyName}?`} slideNumber={9} totalSlides={14}>
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Current profitability metrics:
            </p>
            <PresentationTable
              headers={["Metric", "Value"]}
              rows={[
                ["Annual Revenue", data.profitability.annualRevenue],
                ["Operating Profit", data.profitability.operatingProfit],
                ["Net Profit", data.profitability.netProfit],
                ["Operating Margin", data.profitability.operatingMargin],
                ["Net Margin", data.profitability.netMargin]
              ]}
            />
          </div>
        </SlideLayout>
      )
    },
    
    // Slide 10: Improvement Opportunities
    {
      id: 10,
      title: `What are the improvement opportunities?`,
      type: "two-column" as const,
      content: (
        <SlideLayout title={`What are the improvement opportunities?`} slideNumber={10} totalSlides={14}>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-presentation-header mb-3">Cost Reduction</h3>
                <ul className="space-y-2 text-sm">
                  {data.improvements.costReduction.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-efeso-orange rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-presentation-header mb-3">Portfolio Optimization</h3>
                <ul className="space-y-2 text-sm">
                  {data.improvements.portfolioOptimization.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-efeso-orange rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-presentation-header mb-3">Pricing & Revenue</h3>
                <ul className="space-y-2 text-sm">
                  {data.improvements.pricingRevenue.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-efeso-orange rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-presentation-header mb-3">Innovation & Brand Investment</h3>
                <ul className="space-y-2 text-sm">
                  {data.improvements.innovation.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-efeso-orange rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-presentation-header mb-3">Integration Discipline</h3>
                <ul className="space-y-2 text-sm">
                  {data.improvements.integrationDiscipline.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-efeso-orange rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </SlideLayout>
      )
    },
    
    // Slide 11: Pre-Meeting Analysis
    {
      id: 11,
      title: "Pre-meeting Analysis",
      type: "two-column" as const,
      content: (
        <SlideLayout title="Pre-meeting Analysis" slideNumber={11} totalSlides={14}>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-presentation-header mb-4">Dissatisfaction Elements</h3>
              <ul className="space-y-3 text-base">
                {data.analysis.preMeeting.dissatisfaction.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-efeso-orange rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-presentation-header mb-4">EFESO Levers</h3>
              <ul className="space-y-3 text-base">
                {data.analysis.preMeeting.levers.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-efeso-orange rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SlideLayout>
      )
    },
    
    // Slide 12: During Meeting Analysis
    {
      id: 12,
      title: "During Meeting Analysis",
      type: "two-column" as const,
      content: (
        <SlideLayout title="During Meeting Analysis" slideNumber={12} totalSlides={14}>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-presentation-header mb-4">Dissatisfaction Elements</h3>
              {data.analysis.duringMeeting.dissatisfaction.length > 0 ? (
                <ul className="space-y-3 text-base">
                  {data.analysis.duringMeeting.dissatisfaction.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-efeso-orange rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500 italic">To be completed during the meeting</div>
              )}
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-presentation-header mb-4">EFESO Levers</h3>
              {data.analysis.duringMeeting.levers.length > 0 ? (
                <ul className="space-y-3 text-base">
                  {data.analysis.duringMeeting.levers.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-efeso-orange rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500 italic">To be completed during the meeting</div>
              )}
            </div>
          </div>
        </SlideLayout>
      )
    },
    
    // Slide 13: Follow-up Actions
    {
      id: 13,
      title: "Follow-up Actions",
      type: "table" as const,
      content: (
        <SlideLayout title="Follow-up Actions" slideNumber={13} totalSlides={14}>
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Next steps and action items:
            </p>
            <PresentationTable
              headers={["Action", "Who", "When", "Zoho"]}
              rows={data.followUp.map(item => [item.action, item.who, item.when, item.zoho])}
            />
          </div>
        </SlideLayout>
      )
    },
    
    // Slide 14: Closing
    {
      id: 14,
      title: "",
      type: "closing" as const,
      content: (
        <SlideLayout isTitle slideNumber={14} totalSlides={14}>
          <div className="text-center space-y-12">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-presentation-header">
                Thank You
              </h1>
              <h2 className="text-xl text-gray-600">
                Questions & Discussion
              </h2>
            </div>
            
            <div className="flex justify-center items-center gap-3 mt-20">
              <div className="w-12 h-6 bg-efeso-orange"></div>
              <div className="text-center">
                <div className="font-bold text-3xl">EFESO</div>
                <div className="text-lg text-gray-600">MANAGEMENT CONSULTANTS</div>
              </div>
            </div>
            
            <div className="text-gray-500 mt-8">
              Driving operational excellence and sustainable growth
            </div>
          </div>
        </SlideLayout>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Presentation Display */}
      <div className="relative">
        {slides[currentSlide]?.content}
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlay}
          >
            {isPlaying ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Slide {currentSlide + 1} of {slides.length}
          </span>
          
          <Button 
            className={buttonVariants({ variant: "efeso", size: "sm" })}
          >
            <FileDown className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  );
}