import { generateSeats } from "@/utils/generateSeats";
import { Schema, model, models } from "mongoose";

const MovieSchema = new Schema(
  {
    type: { type: String, default: "movie" },
    title: { type: String, required: true },
    poster: { type: String, required: true },
    rating: { type: Number, min: 0, max: 10 },
    language: { type: String },
    genre: { type: String },
    datetime: { type: Date, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    availableSeats: { type: Number, default: 100 },
    seats: {
      type: [
        {
          seatNumber: { type: String, required: true },
          booked: { type: Boolean, default: false },
        },
      ],
      default: () => generateSeats({ rows: 10, cols: 10 }),
    },
  },
  { timestamps: true, collection: "Movies" }
);

export const Movie = models.Movie || model("Movie", MovieSchema);