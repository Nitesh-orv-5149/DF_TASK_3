import { connectToDatabase } from "@/libs/database";
import { Movie } from "@/libs/database/models/movie.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const movie = await Movie.findById(params.id).select("title price availableSeats seats");

    if (!movie) {
      return new Response("Movie not found", { status: 404 });
    }

    return new Response(JSON.stringify(movie), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching movie:", error);
    return new Response("Failed to fetch movie", { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params
    const seatNumbers: string[] = await req.json();

    if (!seatNumbers?.length) {
      return new Response("No seat numbers", { status: 400 });
    }

    const result = await Movie.updateOne(
      { _id: id },
      { $set: { "seats.$[s].booked": true } },
      { arrayFilters: [{ "s.seatNumber": { $in: seatNumbers } }] }
    );

    return NextResponse.json({ success: true, message: "Seats booked successfully", updated: result.modifiedCount}, {status: 200});
  } catch (error) {
    console.error("Error fetching movie:", error);
    return new Response("Failed to fetch movie", { status: 500 });
  }
}
