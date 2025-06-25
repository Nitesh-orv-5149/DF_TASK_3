"use client";

import EventDetailsPage from "@/components/EventDetailsPage";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ITrain } from "@/types/event/eventInterfaces"; 

export default function TrainBookingPage({ params }: { params: Promise<{ trainid: string }> }) {
  const { trainid } = use(params);
  const [train, setTrain] = useState<ITrain | null>(null);

  useEffect(() => {
    const fetchTrain = async () => {
      try {
        const response = await axios.get(`/api/events/trains/${trainid}/details`);
        setTrain(response.data);
        console.log("Train fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching train:", error);
      }
    };

    fetchTrain();

    return () => {
      setTrain(null);
    };
  }, [trainid]);

  if (!train) return <div>Loading...</div>;

  return (
    <EventDetailsPage 
      event={train}
      eventid={trainid}
      type="train"
      description={(event) => (
        <div className="flex gap-10 mt-10 items-center justify-center">
          <div className="bg-gradient-to-r from-dark-1 to-dark-2 p-3 font-bold rounded-full">{event.departure}</div>
          <ArrowRight />
          <div className="bg-gradient-to-r from-dark-1 to-dark-2 p-3 font-bold rounded-full">{event.destination}</div>
        </div>
      )}
    />
  );
}
