import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BIDForm } from "@/components/BIDForm";
import { PresentationViewer } from "@/components/PresentationViewer";
import { CompanyData } from "@/types/bid";
import { buttonVariants } from "@/components/ui/button-variants";
import { FileText, Users, BarChart3, Monitor, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'form' | 'presentation'>('landing');
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);

  const handleStartBuilder = () => {
    setCurrentView('form');
  };

  const handleDataChange = (data: CompanyData) => {
    setCompanyData(data);
  };

  const handlePreview = () => {
    if (companyData) {
      setCurrentView('presentation');
    }
  };

  const handleBackToForm = () => {
    setCurrentView('form');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  if (currentView === 'presentation' && companyData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-presentation-header">
                {companyData.companyName} - Business Intelligence Deck
              </h1>
              <p className="text-gray-600 mt-2">
                Generated presentation ready for client meeting
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleBackToForm}>
                Edit Data
              </Button>
              <Button 
                className={buttonVariants({ variant: "efeso" })}
                onClick={handleBackToLanding}
              >
                New Presentation
              </Button>
            </div>
          </div>
          
          <PresentationViewer data={companyData} />
        </div>
      </div>
    );
  }

  if (currentView === 'form') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-presentation-header">
                Business Intelligence Deck Builder
              </h1>
              <p className="text-gray-600 mt-2">
                Enter company information to generate a professional EFESO BID presentation
              </p>
            </div>
            <Button variant="outline" onClick={handleBackToLanding}>
              Back to Home
            </Button>
          </div>
          
          <BIDForm onDataChange={handleDataChange} onPreview={handlePreview} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-6 bg-efeso-orange rounded"></div>
              <h2 className="text-2xl font-bold">EFESO</h2>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Business Intelligence Deck Builder
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Create professional, standardized Business Intelligence Decks for client presentations. 
              Transform your research data into compelling consulting presentations in minutes.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className={buttonVariants({ variant: "efeso", size: "xl" })}
              onClick={handleStartBuilder}
            >
              Start Building Your BID
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="bg-white/10 text-white border-white/30 hover:bg-white hover:text-gray-900 backdrop-blur-sm font-semibold"
            >
              View Sample Presentation
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-presentation-header mb-6">
              Streamline Your Client Presentation Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built specifically for EFESO management consultants to create standardized, 
              professional Business Intelligence Decks that impress clients and drive results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-2 hover:border-efeso-orange transition-colors">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-efeso-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-efeso-orange" />
                </div>
                <CardTitle className="text-xl">Standardized Template</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Follow the proven 14-slide EFESO BID structure that consultants trust for client presentations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-efeso-orange transition-colors">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-efeso-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-efeso-orange" />
                </div>
                <CardTitle className="text-xl">Company Research</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Input comprehensive company data including financials, operations, leadership, and competitive analysis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-efeso-orange transition-colors">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-efeso-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-efeso-orange" />
                </div>
                <CardTitle className="text-xl">Professional Design</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Automatically formatted with EFESO branding, professional tables, and consistent typography.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-efeso-orange transition-colors">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-efeso-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <Monitor className="h-6 w-6 text-efeso-orange" />
                </div>
                <CardTitle className="text-xl">Export & Present</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Generate PDF exports or present directly from the web interface with navigation controls.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-presentation-header mb-6">
            Ready to Create Your First BID?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your company research into a professional presentation that drives client engagement and project success.
          </p>
          
          <Button 
            className={buttonVariants({ variant: "efeso", size: "xl" })}
            onClick={handleStartBuilder}
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-presentation-header text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-8 h-4 bg-efeso-orange rounded"></div>
              <div>
                <div className="font-bold text-lg">EFESO</div>
                <div className="text-sm text-gray-300">MANAGEMENT CONSULTANTS</div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-300">
                © 2025 EFESO Management Consultants
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Business Intelligence Deck Builder
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;