import { connectToDatabase } from "@/libs/database";
import { Concert } from "@/libs/database/models/concert.model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const concert = await Concert.findById(params.id).select("title type poster datetime duration performer price location availableSeats");

    if (!concert) {
      return new Response("concert not found", { status: 404 });
    }

    return new Response(JSON.stringify(concert), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching concert:", error);
    return new Response("Failed to fetch concert", { status: 500 });
  }
}
