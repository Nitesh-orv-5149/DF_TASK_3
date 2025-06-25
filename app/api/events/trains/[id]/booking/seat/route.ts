import { connectToDatabase } from "@/libs/database";
import { Train } from "@/libs/database/models/train.model";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const { id } = params;
        const seats = await Train.findById(id, "seats")
        return NextResponse.json(seats, { status: 200 });
    } catch (error) {
        console.error("Error in GET request:", error);
        return new Response("Internal Server Error", { status: 500 });
        
    }
}