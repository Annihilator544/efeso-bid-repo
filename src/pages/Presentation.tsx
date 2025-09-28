import { PresentationViewer } from "@/components/PresentationViewer";
import { Button, buttonVariants } from "@/components/ui/button";
import useCompanyStore from "@/store/use-company-data";
import { Link } from "lucide-react";

function Presentation() {
    const { companyData } = useCompanyStore();
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
                <Button
                    onClick={() => { window.location.href = "/builder"; }}
                    variant="outline"
                    >
                    Edit Data
                    </Button>
                <Button 
                    onClick={() => { window.location.href = "/builder"; }}
                    className={buttonVariants({ variant: "efeso" })}
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

export default Presentation;