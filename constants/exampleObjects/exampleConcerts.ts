import { ConcertEvent } from "@/types/eventTypes";

export const exampleConcerts: ConcertEvent[] = [
    {
      id: 20,
      type: "concert",
      title: "Arijit Singh Live",
      location: "Bangalore Palace Grounds",
      datetime: "2025-06-30T19:00:00",
      price: 999,
      poster: "/images/concert1.jpg",
      availableSeats: 500,
      performer: "Arijit Singh",
      duration: "2h",
      ageLimit: 12,
    },
    {
      id: 21,
      type: "concert",
      title: "Imagine Dragons Tour",
      location: "Mumbai Arena",
      datetime: "2025-07-02T20:30:00",
      price: 1500,
      poster: "/images/concert2.jpg",
      availableSeats: 450,
      performer: "Imagine Dragons",
      duration: "2.5h",
      ageLimit: 16,
    },
    {
      id: 22,
      type: "concert",
      title: "Ilaiyaraaja Night",
      location: "Chennai Nehru Stadium",
      datetime: "2025-07-05T18:00:00",
      price: 800,
      poster: "/images/concert3.jpg",
      availableSeats: 600,
      performer: "Ilaiyaraaja",
      duration: "3h",
      ageLimit: 0,
    },
  ];
  