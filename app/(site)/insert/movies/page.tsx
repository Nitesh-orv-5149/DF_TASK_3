"use client"

import { Movie } from "@/libs/database/models/movie.model";
import { generateSeats } from "@/utils/generateSeats";

export default function InsertPage() {

  const sampleMovies = [
    {
      type: "movie",
      title: "Interstellar",
      poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      rating: 8.7,
      language: "English",
      genre: "Sci-Fi/Drama",
      datetime: new Date("2025-06-15T17:00:00Z"),
      price: 17.99,
      location: "INOX, Chennai",
      seats: generateSeats({ rows: 10, cols: 10 }),
      availableSeats: 100
    },
    {
      type: "movie",
      title: "Inception",
      poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
      rating: 8.8,
      language: "English",
      genre: "Sci-Fi/Thriller",
      datetime: new Date("2025-06-16T19:30:00Z"),
      price: 15.49,
      location: "PVR, Mumbai",
      seats: generateSeats({ rows: 8, cols: 12 }),
      availableSeats: 96
    },
    {
      type: "movie",
      title: "Kantara",
      poster: "https://image.tmdb.org/t/p/w500/jVZJbj3N8icYdFksP5D9CGEh1E3.jpg",
      rating: 8.2,
      language: "Kannada",
      genre: "Action/Drama",
      datetime: new Date("2025-06-17T18:00:00Z"),
      price: 12.99,
      location: "Cinepolis, Bangalore",
      seats: generateSeats({ rows: 9, cols: 10 }),
      availableSeats: 90
    },
    {
      type: "movie",
      title: "Jujutsu Kaisen 0",
      poster: "https://image.tmdb.org/t/p/w500/3pTwMUEavTzVOh6yLN0aEwR7uSy.jpg",
      rating: 7.9,
      language: "Japanese",
      genre: "Anime/Fantasy",
      datetime: new Date("2025-06-18T14:00:00Z"),
      price: 13.99,
      location: "INOX, Hyderabad",
      seats: generateSeats({ rows: 6, cols: 10 }),
      availableSeats: 60
    },
    {
      type: "movie",
      title: "The Dark Knight",
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      rating: 9.0,
      language: "English",
      genre: "Action/Crime",
      datetime: new Date("2025-06-19T20:00:00Z"),
      price: 16.99,
      location: "Sathyam Cinemas, Chennai",
      seats: generateSeats({ rows: 10, cols: 15 }),
      availableSeats: 150
    }
  ];
  

      const uploadMovies = async () => {
        for (const movie of sampleMovies) {
          const res = await fetch("/api/vendor/addmovie", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...movie, type: "movie" }),
          });
      
          if (!res.ok) {
            console.error(`Failed to upload ${movie.title}`);
          } else {
            console.log(`Uploaded ${movie.title}`);
          }
        }
      
        alert("Done uploading all movies");
      };
      
        return (
          <div className="p-6">
            <button
              onClick={uploadMovies}
              className="bg-green-600 text-white p-3 rounded"
            >
              Upload All Movies
            </button>
          </div>
        );
      }
      