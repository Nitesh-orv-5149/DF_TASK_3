import { generateSeats } from "@/utils/generateSeats";
import { Schema, model, models } from "mongoose";

const TrainSchema = new Schema(
  {
    type: {
      type: String,
      default: "train",
    },
    title: {
      type: String,
      required: true,
    },
    trainNumber: {
      type: String,
      required: true,
    },
    departure: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    datetime: {
      type: Date,
      required: true,
    },
    availableSeats: {
      type: Number,
      default: 100,
    },
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
  { timestamps: true, collection: "Trains" }
);

export const Train = models.Train || model("Train", TrainSchema);
