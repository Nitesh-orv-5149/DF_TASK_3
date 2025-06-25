import { connectToDatabase } from "@/libs/database";
import { Concert } from "@/libs/database/models/concert.model";

export async function GET() {
  try {
    await connectToDatabase();
    const concerts = await Concert.find({},"title poster rating type");

    return new Response(JSON.stringify(concerts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching concerts:", err);
    return new Response("Failed to fetch concerts", { status: 500 });
  }
}
