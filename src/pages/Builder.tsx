import { BIDForm } from "@/components/BIDForm";
import { Button } from "@/components/ui/button";
function Builder() {
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
            <Button 
                variant="outline" 
                onClick={() => { window.location.href = "/"; }}
            >
                Back to Home
            </Button>
          </div>
          <BIDForm/>
        </div>
      </div>
    );
}

export default Builder;