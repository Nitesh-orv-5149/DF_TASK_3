"use client";

import { generateSeats } from "@/utils/generateSeats";

export default function InsertTrainPage() {
  const sampleTrains = [
    {
      type: "train",
      title: "Chennai Express",
      trainNumber: "12621",
      departure: "Chennai Central",
      destination: "Mumbai CST",
      datetime: new Date("2025-06-20T06:00:00Z"),
      price: 950,
      seats: generateSeats({ rows: 10, cols: 10 }),
      availableSeats: 100,
    },
    {
      type: "train",
      title: "Shatabdi Express",
      trainNumber: "12001",
      departure: "New Delhi",
      destination: "Bhopal Junction",
      datetime: new Date("2025-06-21T07:00:00Z"),
      price: 1200,
      seats: generateSeats({ rows: 8, cols: 12 }),
      availableSeats: 96,
    },
    {
      type: "train",
      title: "Duronto Express",
      trainNumber: "12269",
      departure: "Yesvantpur Junction",
      destination: "New Delhi",
      datetime: new Date("2025-06-22T10:00:00Z"),
      price: 1400,
      seats: generateSeats({ rows: 9, cols: 10 }),
      availableSeats: 90,
    },
    {
      type: "train",
      title: "Rajdhani Express",
      trainNumber: "12951",
      departure: "Mumbai Central",
      destination: "New Delhi",
      datetime: new Date("2025-06-23T17:30:00Z"),
      price: 1800,
      seats: generateSeats({ rows: 6, cols: 10 }),
      availableSeats: 60,
    },
    {
      type: "train",
      title: "Gatimaan Express",
      trainNumber: "12050",
      departure: "Hazrat Nizamuddin",
      destination: "Jhansi",
      datetime: new Date("2025-06-24T08:10:00Z"),
      price: 1100,
      seats: generateSeats({ rows: 10, cols: 15 }),
      availableSeats: 150,
    },
  ];

  const uploadTrains = async () => {
    for (const train of sampleTrains) {
      const res = await fetch("/api/vendor/addtrain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(train),
      });

      if (!res.ok) {
        console.error(`Failed to upload ${train.title}`);
      } else {
        console.log(`Uploaded ${train.title}`);
      }
    }

    alert("Done uploading all trains");
  };

  return (
    <div className="p-6">
      <button
        onClick={uploadTrains}
        className="bg-blue-600 text-white p-3 rounded"
      >
        Upload All Trains
      </button>
    </div>
  );
}
