import { EventUnion } from "@/types/eventTypes";
import DisplayGrid from "./DisplayGrid";

interface ListingPageProps {
    eventsData: EventUnion[];
    type: "movie" | "train" | "concert";
}

export default function EventsListings( {eventsData, type} : ListingPageProps ) {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className=" shadow-sm ">
                <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-light-1 uppercase">{type}s</h1>
                    </div>
                </div>
                </div>
            </div>

            <DisplayGrid data={eventsData} />

        </div>
    )
}