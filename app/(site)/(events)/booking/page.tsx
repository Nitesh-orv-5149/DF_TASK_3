"use client";

import PaymentComponent from "@/components/PaymentComponent";
import SeatSelectionComponent from "@/components/SeatSelectionComponent";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Event = {
    availableSeats: number;
    price: number;
    seats: {
        seatNumber: string;
        booked: boolean;
        _id: string;
    }[];
    title: string;
    _id: string;
};

export default function bookingPage() {
    const [event, setEvent] = useState<Event | null>(null);
    const [isPaid, setIsPaid] = useState<boolean>(false);
    const [areSeatsSelected, setAreSeatsSelected] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const eventid = searchParams.get("eventid");
    const numberOfSeats = Number(searchParams.get("seats"));
    const type = searchParams.get("type");

    if (!eventid || !numberOfSeats || !type)
        return <div className="text-center text-lg font-semibold">Invalid booking details</div>;

    const fetchEvent = async (eventid: string) => {
        try {
            const response = await axios.get(`/api/events/${type}s/${eventid}/booking`);
            if (!response) throw new Error("Event not found");
            setEvent(response.data);
            console.log("Event fetched:", response.data);
        } catch (error) {
            console.error("Error fetching event:", error);
        }
    };

    useEffect(() => {
        fetchEvent(eventid);
    }, []);

    if (!event) return <div className="text-center text-lg font-semibold">Loading event data...</div>;

    return (
        <div className="bg-gradient-to-b min-h-screen from-dark-2/50 to-50%">
            <h1 className="text-center text-3xl font-bold p-6 ">Booking Page</h1>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 p-4">
                <div className="lg:w-[70vw] w-full">
                    <SeatSelectionComponent eventid={eventid} seats={event.seats} type={type} paid={isPaid} allSelected={setAreSeatsSelected} />
                </div>
                <PaymentComponent numberOfSeats={numberOfSeats} price={event.price} onPaymentSuccess={() => setIsPaid(true)} payable={areSeatsSelected} />
            </div>
        </div>
    );
}
