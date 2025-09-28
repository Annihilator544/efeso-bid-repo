import { PresentationViewer } from "@/components/PresentationViewer";
import { Button, buttonVariants } from "@/components/ui/button";
import useCompanyStore from "@/store/use-company-data";
import { Link } from "react-router-dom";

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
                    variant="outline"
                    asChild
                >
                    <Link to="/builder">Edit Data</Link>
                </Button>
                <Button
                    className={buttonVariants({ variant: "efeso" })}
                    asChild
                >
                    <Link to="/builder">
                        New Presentation
                    </Link>
                </Button>
            </div>
          </div>
          
          <PresentationViewer data={companyData} />
        </div>
      </div>
    );
}

export default Presentation;