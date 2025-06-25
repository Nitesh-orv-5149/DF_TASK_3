import { connectToDatabase } from "@/libs/database";
import { Train } from "@/libs/database/models/train.model";

export async function POST(req: Request) {
    const body = await req.json();
    await connectToDatabase();
  
    try {
      const res = await Train.create(body);
      if (!res) {
          return new Response("Failed to create item", { status: 400 });
      }
      return new Response(JSON.stringify(res), { status: 201 });
    } catch (err) {
      return new Response("Failed to create item", { status: 500 });
    }
  }
  