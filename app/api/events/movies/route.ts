import { connectToDatabase } from "@/libs/database";
import { Movie } from "@/libs/database/models/movie.model";

export async function GET() {
  try {
    await connectToDatabase();
    const movies = await Movie.find({},"title poster rating type");

    return new Response(JSON.stringify(movies), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching movies:", err);
    return new Response("Failed to fetch movies", { status: 500 });
  }
}
