import EventDetailsPage from "@/components/EventDetailsPage"
import { exampleConcerts } from "@/constants/exampleObjects/exampleConcerts"

export default function concertBookingPage( {params}:{params: {concertid:string}} ) {
    const id = params.concertid
    const concertid = Number(id)
    return (
        <>
            <EventDetailsPage eventsArray={exampleConcerts} eventid={concertid} />
        </>
    )
}