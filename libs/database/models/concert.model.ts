import { generateSeats } from "@/utils/generateSeats";
import { Schema, model, models } from "mongoose";

const ConcertSchema = new Schema(
  {
    type: { type: String, default: "concert" },
    title: { type: String, required: true },
    location: { type: String, required: true },
    datetime: { type: Date, required: true },
    price: { type: Number, required: true },
    poster: { type: String, required: true },
    performer: { type: String, required: true },
    duration: { type: String }, 
    avialableSeats: { type: Number, default: 100 }, 
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
  { timestamps: true, collection: "concerts" }
);

export const Concert = models.Concert || model("Concert", ConcertSchema);
