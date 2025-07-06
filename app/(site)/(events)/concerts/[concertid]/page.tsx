"use client";

import EventDetailsPage from "@/components/EventDetailsPage";
import { IConcert } from "@/types/event/eventInterfaces";
import axios from "axios";
import { Divide, Star } from "lucide-react";
import { use, useEffect, useState } from "react";

export default function ConcertBookingPage({ params }: { params: Promise<{ concertid: string }> }) {
  const { concertid } = use(params);
  const [concert, setConcert] = useState<IConcert | null>(null);

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const response = await axios.get(`/api/events/concerts/${concertid}/details`);
        setConcert(response.data);
        console.log("Concert fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching concert:", error);
      }
    };

    fetchConcert();

    return () => {
      setConcert(null); // optional cleanup
    };
  }, [concertid]);

  if (!concert) return <div>Loading...</div>;

  return (
    <EventDetailsPage
      event={concert}
      eventid={concertid}
      type="concert"
      description={(event) => (
        <h3 className="text-xl font-bold">Concert</h3>
      )}
    />
  );
}
