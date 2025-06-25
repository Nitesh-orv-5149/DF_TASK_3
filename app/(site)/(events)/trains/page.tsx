"use client"

import EventsListings from "@/components/ui/EventsListings";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TrainsPage() {
    const [trains, setTrains] = useState([]);

    const fetchTrains = async () => {
        try {
        const response = await axios.get("/api/events/trains")
        setTrains(response.data)
        console.log("Trains fetched successfully:", response.data);
        if (response.data.length == 0) {
            return <div>No trains found</div>;
        }
        } catch (error) {
        console.error("Error fetching trains:", error);
        }
    }
        
    useEffect(() => {
        fetchTrains();
    }, [])
    
    return (
        <>
            <EventsListings eventsData={trains} type="train" />
        </>
    )
}