"use client";

import EventsListings from "@/components/ui/EventsListings";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ConcertsPage() {
  const [concerts, setConcerts] = useState([]);

  const fetchConcerts = async () => {
    try {
      const response = await axios.get("/api/events/concerts")
      setConcerts(response.data)
      console.log("Concerts fetched successfully:", response.data);
      if (response.data.length == 0) {
        return <div>No concerts found</div>;
      }
    } catch (error) {
      console.error("Error fetching concerts:", error);
    }
  }
     
  useEffect(() => {
    fetchConcerts();
  }, [])

  return (
    <EventsListings eventsData={concerts} type="concert" />
  );
}

      

      