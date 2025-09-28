import useLoadingStore from "@/store/use-loading-data";
import { LucideLoaderCircle } from "lucide-react";

function Loader() {
    const {isLoading} = useLoadingStore();
    return (
        isLoading && <div className="flex fixed items-center justify-center h-full w-full bg-black/30">
            <LucideLoaderCircle className="animate-spin h-10 w-10 text-efeso-orange" />
        </div>
    );
}

export default Loader;