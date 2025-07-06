import { connectToDatabase } from "@/libs/database";
import { Train } from "@/libs/database/models/train.model";

export async function GET() {
  try {
    await connectToDatabase();
    const trains = await Train.find({}, "title departure type");

    return new Response(JSON.stringify(trains), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching trains:", err);
    return new Response("Failed to fetch trains", { status: 500 });
  }
}
