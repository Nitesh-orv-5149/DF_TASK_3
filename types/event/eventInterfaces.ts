import { ObjectId } from "mongodb";

export interface Seat {
  seatNumber: string;
  booked?: boolean;
}

export interface IMovie {
  _id: string | ObjectId,
  type?: string;
  title: string;
  poster: string;
  rating: number;
  language?: string;
  genre?: string;
  location?: string;
  availableSeats?: number;
  datetime: string;
  price: number;
  seats?: Seat[];
}
  
export interface ITrain {
  _id: string | ObjectId,
  type?: string,
  title: string,
  trainNumber: number,
  departure: string,
  destination: string,
  price: number,
  datetime: string,
  availableSeats: number,
  seats: Seat[]
}

export interface IConcert {
  _id?: string | ObjectId;
  type?: string;
  title: string;
  location: string;
  datetime: string;
  price: number;
  poster: string;
  performer: string;
  duration?: string;
  availableSeats?: number;
  seats?: Seat[];
  createdAt?: string;
  updatedAt?: string;
}