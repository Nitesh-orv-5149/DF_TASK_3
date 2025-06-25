import { connectToDatabase } from "@/libs/database";
import User from "@/libs/database/models/user.model";
import { NextResponse } from "next/server";

// this receives the context which includes the params from the route
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();

        const user = await User.findById(params.id, "name email phone password amount bookingIds");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User fetched", user }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch user by ID" },
            { status: 500 }
        );
    }
}
