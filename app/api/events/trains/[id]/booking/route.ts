import { connectToDatabase } from "@/libs/database";
import { Train } from "@/libs/database/models/train.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const train = await Train.findById(params.id).select("title price availableSeats seats");

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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params
    const seatNumbers: string[] = await req.json();

    if (!seatNumbers?.length) {
      return new Response("No seat numbers", { status: 400 });
    }

    const result = await Train.updateOne(
      { _id: id },
      { $set: { "seats.$[s].booked": true } },
      { arrayFilters: [{ "s.seatNumber": { $in: seatNumbers } }] }
    );

    return NextResponse.json({ success: true, message: "Seats booked successfully", updated: result.modifiedCount}, {status: 200});
  } catch (error) {
    console.error("Error fetching train:", error);
    return new Response("Failed to fetch train", { status: 500 });
  }
}
