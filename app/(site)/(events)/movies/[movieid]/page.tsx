"use client";

import EventDetailsPage from "@/components/EventDetailsPage";
import { IMovie } from "@/types/event/eventInterfaces";
import axios from "axios";
import { Star } from "lucide-react";
import { use, useEffect, useState } from "react";

export default function MovieBookingPage({ params }: { params: Promise<{ movieid: string }> }) {
  const { movieid } = use(params);
  const [movie, setMovie] = useState<IMovie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/api/events/movies/${movieid}/details`);
        setMovie(response.data);
        console.log("Movie fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();

    return () => {
      setMovie(null); // optional cleanup
    };
  }, [movieid]);

  if (!movie) return <div>Loading...</div>;

  return (
    <EventDetailsPage
      event={movie}
      eventid={movieid}
      type="movie"
      description={(event) => (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="w-6 h-6 text-light-1 fill-light-1" />
            <span className="font-semibold text-xl">{event.rating}</span>
          </div>
          <span className="px-4 py-2 bg-gradient-to-r from-dark-1/70 to-dark-2/50 rounded-full text-base font-medium">
            {event.genre}
          </span>
          <span className="text-base">{event.language}</span>
        </div>
      )}
    />
  );
}
