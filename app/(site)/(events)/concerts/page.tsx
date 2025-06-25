import EventsListings from "@/components/ui/EventsListings";
import { exampleConcerts } from "@/constants/exampleObjects/exampleConcerts";

export default function ConcertsPage() {
    return (
        <>
           <EventsListings eventsData={exampleConcerts} type="concert" />
        </>
    )
}