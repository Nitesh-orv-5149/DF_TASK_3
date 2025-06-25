import { connectToDatabase } from "@/libs/database";
import { Movie } from "@/libs/database/models/movie.model";

export async function POST(req: Request) {
    const body = await req.json();
    await connectToDatabase();
  
    try {
      const res = await Movie.create(body);
      if (!res) {
          return new Response("Failed to create item", { status: 400 });
      }
      return new Response(JSON.stringify(res), { status: 201 });
    } catch (err) {
      return new Response("Failed to create item", { status: 500 });
    }
  }
  