import { connectToDatabase } from "@/libs/database";
import User from "@/libs/database/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, name, password, role} = await req.json();
    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Email, name, and password are required." },
        { status: 400 }
      );
    }   

    await connectToDatabase();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 400 }
      );
    }

    const newUser = await User.create({ email, name, password, role });
    return NextResponse.json(
      { message: "User created successfully.", user: newUser },
      { status: 201 }
    );
    
  } catch (err: any) {
    console.error("Error creating user:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}