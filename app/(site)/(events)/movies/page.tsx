"use client";

import EventsListings from "@/components/ui/EventsListings";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("/api/events/movies")
      setMovies(response.data)
      console.log("Movies fetched successfully:", response.data);
      if (response.data.length == 0) {
        return <div>No movies found</div>;
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }
     
  useEffect(() => {
    fetchMovies();
  }, [])

  return (
    <EventsListings eventsData={movies} type="movie" />
  );
}

      

      