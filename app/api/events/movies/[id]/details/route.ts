import { connectToDatabase } from "@/libs/database";
import { Movie } from "@/libs/database/models/movie.model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const movie = await Movie.findById(params.id).select("title type poster rating language genre datetime price location availableSeats");

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
