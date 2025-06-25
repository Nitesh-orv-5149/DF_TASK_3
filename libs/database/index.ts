import mongoose from "mongoose";
import mongodb from "mongodb";
import { buffer } from "stream/consumers";

const MONGODB_URI = process.env.MONGODB_URI

const cached = (global as any).mongoose || { connection: null, promise: null };

export async function connectToDatabase() {
    if (cached.connection) return cached.connection

    if (!MONGODB_URI) throw new Error("Please define the MONGODB_URI environment variable");

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'BookIt',
        bufferCommands: false,
    })

    cached.connection = await cached.promise;

    return cached.connection;
}