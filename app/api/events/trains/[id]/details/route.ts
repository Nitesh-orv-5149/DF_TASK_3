import { connectToDatabase } from "@/libs/database";
import { Train } from "@/libs/database/models/train.model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const train = await Train.findById(params.id).select("type title trainNumber departure destination price datetime availableSeats");

    if (!train) {
      return new Response("train not found", { status: 404 });
    }

    return new Response(JSON.stringify(train), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching train:", error);
    return new Response("Failed to fetch train", { status: 500 });
  }
}
