import { Search } from "lucide-react";
import Card from "@/components/ui/Card";

export default function DisplayGrid( {data,clearFilters} : {data:any,clearFilters?:()=>void})  {
    console.log(data)
    return (
        <>
            {/* events Grid/List */}
            {data.length > 0 ? (
                <div className="flex flex-wrap gap-6 justify-center">
                {data.map((event:any) => (
                    <Card key={event._id} CardData={event} />
                ))}
                </div>
            ) : (
                <div className="text-center py-12">
                <div className="text-gray-500 mb-2">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium">No events found</h3>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                </div>
                <button
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Clear Filters
                </button>
                </div>
            )}
          </>
    )
}